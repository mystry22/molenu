import React,{useEffect, useState,useRef} from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import {defaultBodyStyles} from '../shared/helper';
import {urlPointer} from '../shared/helper';
import axios from 'axios';
import {CgLogIn} from 'react-icons/cg';
import {checkName,checkPhone,checkPass} from '../shared/validation';
import { useHistory } from 'react-router-dom';
import Info  from '../shared/Userdetails';


export default function SignUpUserData(){
    const history = useHistory();
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [phone,setPhone] = useState('');
    const [pass,setPass] = useState('');
    

    const [fnameError, setFnameError] = useState('');
    const [lnameError, setLnameError] = useState('');
    const [passError, setPassError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    
   

    const dovalidations =()=>{
        const paserr = checkPass(pass);
        const phoneerr = checkPhone(phone);
        const fnameerr = checkName(fname);
        const lnameerr = checkName(lname);

        setPassError(paserr);
        setPhoneError(phoneerr);
        setFnameError(fnameerr);
        setLnameError(lnameerr);

        if(paserr || phoneerr || fnameerr || lnameerr){
            return 'err validating'
        }else{
            return 'ok';
        }

    }
    const updateFirstName =async(e)=>{
        e.preventDefault();
        setFname(e.target.value);
    }

    const updateLastName =async(e)=>{
        e.preventDefault();
        setLname(e.target.value);
    }
    const updatePhone =async(e)=>{
        e.preventDefault();
        setPhone(e.target.value);
    }
    const updatePassword =async(e)=>{
        e.preventDefault();
        setPass(e.target.value);
    }
    const createAccount = async(e)=>{
        e.preventDefault();
        const doVali = dovalidations();

        if(doVali == 'ok'){
            const data = {
                email:localStorage.getItem('email'),
                first_name: fname,
                last_name: lname,
                phone: phone,
                pass: pass,
            }
            const res = await axios.post(urlPointer+'/api/registration/register',data);
            if(res.data.msg == 'registration okay'){
                localStorage.setItem('usertoken',res.data.token );
                if(localStorage.getItem('fart_cart')){
                    history.push('/order');
                }else{
                    history.push('/');
                }
                
            }else{
                alert(res.data.msg)
            }
        }else{

        }

        
    }

    const checkFormail =()=>{
        if(localStorage.getItem('email')){

        }else{
            history.push('/signup')
        }
    }

    useEffect(()=>{
        checkFormail();
        
    },[])
    return(
        <React.Fragment>
            <div style={defaultBodyStyles}>
            <Info />
                <Menu />
                
                    <div className='container'>

                        <div className='row'>
                            <div className='col-lg-2'></div>
                            <div className='col-lg-8'>
                             <div className='signup'>
                                <form>
                                    
                                    <h1 style={{textAlign:'center',color:'green'}}>User Data</h1>
                                    <hr />
                                    <p className='signupp'>As part of our policy on user privacy customer's data are private and as such will not be shared with a third party</p>
                                    
                                    <input type="text" placeholder='Please Enter First Name' className='forminput' onChange={updateFirstName} required /> <br />
                                    {fnameError ? <span style={{color:'red'}}>{fnameError}</span> : null}<br />

                                    <input type="text" placeholder='Please Enter Last Name' className='forminput' onChange={updateLastName} required /> <br />
                                    {lnameError ? <span style={{color:'red'}}>{lnameError}</span> : null}<br />
                                    <input type="text" placeholder='Phone Number (080 888 254 80)' className='forminput' onChange={updatePhone} required /> <br />
                                    {phoneError ? <span style={{color:'red'}}>{phoneError}</span> : null}<br />
                                    <input type="password" placeholder='Password' className='forminput' onChange={updatePassword} required /> <br />
                                    {passError ? <span style={{color:'red'}}>{passError}</span> : null}<br />
                                    
                                   
                                    
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <button className='signupnext' onClick={createAccount}>Create Account</button>
                                            <div style={{textAlign:'center'}}>
                                                <span>Aready have an Account ?</span><br />
                                                <a href='/login' className='anchor'><CgLogIn /> Login</a>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </form>
                             </div>
                            </div>
                            <div className='col-lg-2'></div>
                        </div>
                            
                    </div>        
                    
                
                <Footer />
            </div>
        </React.Fragment>
        
    )
}