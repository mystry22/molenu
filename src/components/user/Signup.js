import React,{useEffect, useState,useRef} from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import {defaultBodyStyles} from '../shared/helper';
import {urlPointer} from '../shared/helper';
import axios from 'axios';
import {CgLogIn} from 'react-icons/cg';
import {FaAngleDoubleRight} from 'react-icons/fa';
import {checkMail} from '../shared/validation';
import { useHistory } from 'react-router-dom';
import Info  from '../shared/Userdetails';


export default function SignUp(){
    const history = useHistory();
    const [prods,setProds] = useState([]);
    const [visible,setVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [OTP, setOTP] = useState('');
   
    
    const getAllProducts = async()=>{
        const products = await axios.post(urlPointer + '/api/product/homeproducts');
        setProds(products.data);
        
    }

    const updateEmail =(e)=>{
        e.preventDefault();
        setEmail(e.target.value);
    }
    const validateMail =()=>{
        const mailres = checkMail(email);
        return mailres;
    }

    const sendToken=async(e)=>{
        e.preventDefault();
        const res =  validateMail();
        
        if(res == 'invalid email'){
            setEmailError('invalid email');
            setVisible(false);

        }else{
            setEmailError('');
            setVisible(true);

            const data ={email:email}
            const serverRes = await axios.post(urlPointer + '/api/token/sendotp',data);
            alert(serverRes.data);
        }
    }
    const updateToken =async(e)=>{
        e.preventDefault();
        setOTP(e.target.value);
    }
    const verifyToken = async(e)=>{
        e.preventDefault();
        const data = {
            email:email,
            OTP: OTP
        }
        const res = await axios.post(urlPointer+'/api/token/verifyotp',data);
        if(res.data == 'verification successful'){
            localStorage.setItem('email',email);
            history.push('/userdata');
        }
    }

    useEffect(()=>{
        
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
                                    
                                    <h1 style={{textAlign:'center',color:'green'}}>Signup</h1>
                                    <hr />
                                    <p className='signupp'>Create your Molenu customer account in just a few clicks! Firstly, we will need to verify your Email address</p>
                                    <label className='signupp'>Please Enter E-mail Address</label>
                                    <input type="email" placeholder='email@example.com' className='forminput' onChange={updateEmail} required />
                                    <br />
                                    {emailError ? <span style={{color:'red'}}>{emailError}</span> : null} 
                                    <br />
                                    {visible ? 
                                        <div>
                                            <label className='signupp'>Please enter OTP</label>
                                            <input type='text' className='forminput' placeholder='0135' onChange={updateToken} required /> 
                                            <span>An OTP has been sent to your email {email}</span>
                                        </div>
                                    : 
                                    null}
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <button onClick={sendToken} className='signupotp'>Send</button> <button className='signupotp' onClick={sendToken} >Resend</button>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <button className='signupnext' onClick={verifyToken}><FaAngleDoubleRight />Next</button>
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