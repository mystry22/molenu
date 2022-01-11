import React,{useEffect, useState} from 'react';
import {urlPointer} from '../shared/helper';
import axios from 'axios';
import {FaAt} from 'react-icons/fa';
import {MdAccountCircle} from 'react-icons/md';
import {FaShoppingCart} from 'react-icons/fa';
import {FaSearch} from 'react-icons/fa';
import {makeIp} from '../shared/functions';




export default function UserDetails(){
    const [cartSum,setCartSum] = useState('');
    const [user,setUserDetails] = useState('');
   

    const fetchCartSum =async()=>{
        const data = {
            user_ip : localStorage.getItem('i_ran_zyyx')
        }
        const feed = await axios.post(urlPointer + '/api/cart/cartsum',data);
        setCartSum(feed.data);
    }

    const search =(e)=>{

    }

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
    
         })
        }
    }

    const logout=()=>{
        localStorage.removeItem('usertoken');
        window.location.reload(true)
    }

    useEffect(()=>{
         makeIp();
        fetchCartSum();
        userData();
    },[cartSum])
    return(
       
           <React.Fragment>
                 <div className='container'>
                    <div className='row'>
                        <div  className='userdetails'>
                            <div className='col-lg-12'>
                                <div className='aligrightend'>
                                    <a href='/contact' className='anchor'><FaAt /> </a>
                                    <input type='text' placeholder=' search for products brands and category '  /> <a href='/search' className='anchor' onClick={search}> <FaSearch /> </a>
                                    
                                </div>
                                <div className='aligleftend' >
                                    {user ? <span style={{fontSize:'20px',color:'#6c757d'}}>Hi { user.first_name} </span> :<a href='/login' className='anchor'><MdAccountCircle  /> </a> }
                                    {user ? <a onClick={logout} style={{fontSize:'20px',color:'#6c757d',textDecoration:'none',cursor:'pointer'}}> Logout </a> : null}
                                    <a href='/cart' className='anchor' ><FaShoppingCart /><sup style={{fontSize:'15px', marginLeft: '3px'}}>{cartSum}</sup></a>
                                </div>
                            </div>

                        </div>
                    </div>
                 </div>
            </React.Fragment>
        
    )
}