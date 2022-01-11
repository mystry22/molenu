import React,{useEffect, useState} from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import {useHistory} from 'react-router-dom';
import Info  from '../shared/Userdetails';
import { usePaystackPayment } from 'react-paystack';
import axios  from 'axios';
import {urlPointer} from '../shared/helper';
import {FaCreditCard} from 'react-icons/fa'



export default function Order(){
    const history =useHistory();
   const [user,setUserData] = useState('');
   const [name,setName] = useState('');
   const [email,setMail] = useState('');
   const [phone,setPhone] = useState('');
   const [sumCart,setSumSubTotal] = useState([]);
   const [amount,setAmount] = useState('');
  
   
   const myIp =localStorage.getItem('i_ran_zyyx');
 
    const config = {
        reference: (new Date()).getTime().toString(),
        email: email,
        amount: amount *100,
        publicKey: 'pk_test_0e73cfbb6c5273ec366b95f9f512686ac46950c3',
    };

    const onSuccess = (reference) => {
        localStorage.setItem('paystack_ref',reference.reference);
        localStorage.setItem('a_m_payable',amount);
        history.push('/order');

      };
      const onClose = () => {
        
    
      }

      const PaystackHookExample = () => {
        const initializePayment = usePaystackPayment(config);
        return (
          <div>
              <a  onClick={() => {
                  initializePayment(onSuccess, onClose)
              }}><button className='sharpButton'><FaCreditCard /> Make Payment</button></a>
          </div>
        );
    };
   

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
          setName(result.data.first_name);
          setMail(result.data.email);
          setPhone(result.data.phone);
          
    
         })
        }
    }

    const getSubTotalSum = async()=>{

        
        const data = {ip: myIp}
        const cart = await axios.post(urlPointer+'/api/cart/getsubtotalosum',data);
        if(cart.data < 1){
            history.push('/');
        }else{
            
            setSumSubTotal(cart.data);
            setAmount((cart.data[0].subtotal)/2);
            localStorage.setItem('payment_amt',cart.data[0].subtotal*0.5)
        }
        
        
    }

    

    useEffect(()=>{
        userData();
        getSubTotalSum();
        if(localStorage.getItem('usertoken')){
            
        }else{
            history.push('/login');
        }
    },[])
    return(
        <React.Fragment>
            <Info />
            <Menu />
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-2'>

                    </div>
                    <div className='col-lg-8'>
                        <div className='payment'>
                            <p className='signupp'>Dear {name} Kindly <b>note</b> that your order may take up to <b>7 working days</b> to deliver and you are expected to
                            secure your order by making half payment this is to ensure your commitment.<br />
                            one of our agents will reach out to you once
                            payment is made.<br/><br/>
                            you can always reach us on our mobile numbers or mail us using contact@molenu.com.ng<br />
                            However you will be required to make complete payment plus delivery fee of <b>N1500 </b>  
                             if your delivery address is in Lagos and <b>N2500</b> to any other location within Nigeria
                            on delivery of your product.
                            </p>
                            <span>Total Amount</span>: {sumCart.map(sum=>(<span>{sum.subtotal}</span>))} <br />
                            <span>Email: {email}</span><br/>
                            <span>Phone: {phone}</span><br/>
                            <span>Down Payment: </span> {sumCart.map(sum=>(<span>{sum.subtotal/2}</span>))}
                             {sumCart.map(sum=>(
                                <input type='hidden' value={sum.subtotal*0.5 } className='form-control' /> 
                            ))}
                            <br/>
                            <PaystackHookExample />
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