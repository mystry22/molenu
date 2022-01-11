import React,{useEffect,useState} from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {urlPointer} from '../shared/helper';
import Info  from '../shared/Userdetails';
import {transactionReference} from '../shared/functions';


export default function Order(){
    const [user,setUserDetails] = useState('');
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [phone,setPhone] = useState('');
    const [add,setAdd] = useState('');
   


    const userData = ()=>{
        const token = localStorage.getItem('usertoken');
        if(token){
         const authAxios = axios.create({
           headers: {
             authorization: `Bearer ${token}`
           }
         });
 
 
         authAxios.post(urlPointer +'/api/registration/userdetail')
         .then(result =>{
          setUserDetails(result.data);
          setFname(result.data.first_name);
          setLname(result.data.last_name);
          setPhone(result.data.phone);
          
    
         })
        }
    }

    const updateFName=(e)=>{
        e.preventDefault();
        setFname(e.target.value);
    }
    const updateLName=(e)=>{
        e.preventDefault();
        setLname(e.target.value);
    }
    const updatePhone=(e)=>{
        e.preventDefault();
        setPhone(e.target.value);
    }
    const updateAdd=(e)=>{
        e.preventDefault();
        setAdd(e.target.value);
    }

    const doPayment = async(e)=>{
        e.preventDefault();
        const data ={
            first_name:fname,
            last_name:lname,
            phone:phone,
            address: add,
            user_ip: localStorage.getItem('i_ran_zyyx'),
            ref: transactionReference(),
            paystack_ref: localStorage.getItem('paystack_ref'),
            email: user.email,
            amount: localStorage.getItem('a_m_payable')

        }

        const report = await axios.post(urlPointer+'/api/order/completeorder',data);
        if(report.data == 'order completed'){
            localStorage.removeItem('paystack_ref');
            alert('Transaction Completed')
        }else{
            alert(report.data);
        }

    }


    useEffect(()=>{
        userData();
    },[])
    return(
        <React.Fragment>
            <Info />
            <Menu />
                <div className='container'>
                    
                  <div className='order'>
                    <div className='row'>
                        <div className='col-lg-2'>

                        </div>
                          
                            <div className='col-lg-8'>
                                <h1 style={{textAlign:'center'}}>Delivery Address</h1>
                                <form>
                                    <input type='text' className='forminput' defaultValue={fname} onChange={updateFName} /><br />
                                    <input type='text' className='forminput' defaultValue={lname} onChange={updateLName} /><br />
                                    <input type='text' className='forminput' defaultValue={phone} onChange={updatePhone} /><br />
                                    <textarea className='form-control' placeholder='Number/Street/LGA or Town or City/State' onChange={updateAdd}>

                                    </textarea><br />
                                    <button className='sharpButton' onClick={doPayment} >SAVE AND CONTINUE</button>
                                </form>
                            </div>
                          </div>
                        <div className='col-lg-2'>

                        </div>
                
                  </div>   
                              
                </div>
            <Footer />
        </React.Fragment>
    )
}