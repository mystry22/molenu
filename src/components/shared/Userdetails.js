import React, { useEffect, useState,useContext } from 'react';
import { urlPointer } from '../shared/helper';
import axios from 'axios';
import { MdAccountCircle } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import {CartContext} from '../../context/CartContext'




export default function UserDetails() {
    const {logout,user,cartSum,setProds,setRefresh} = useContext(CartContext);
    const [search,setSearchParam]= useState('');

    const setSearch =async(e)=>{
        e.preventDefault();
        

        if(search){
            const data = {
                prod_name: search.toLowerCase()
            }
            
            const res = await axios.post(urlPointer + '/api/product/search',data);

            if(res.data == 'No product found'){
                alert(res.data);
            }else{
                setProds(res.data);
                alert('Product found')
            }
        }else{
            
        }

    }
    
    return (

        <React.Fragment>
            <div className='container'>

                <div className='userdetails'>
                    <div className='row'>
                        <div className='col-lg-2'>


                           <img src='/assets/img/logo.png' style={{width:50,height:50}} />
                        </div>
                        <div className='col-lg-6'>


                            <input type='text' placeholder=' Search ' onChange={(e)=>setSearchParam(e.target.value)} />
                            <button className='userdetailsSearch' onClick={(e)=>setSearch(e)}>
                                Search
                            </button>
                        </div>
                        <div className='col-lg-4' style={{ textAlign: 'right' }} >



                            {user ? <span style={{ fontSize: '20px', color: '#6c757d' }}>Hi {user.first_name} </span> : <a href='/login' className='anchor'><MdAccountCircle /> </a>}
                            {user ? <a onClick={logout} style={{ fontSize: '20px', color: '#6c757d', textDecoration: 'none', cursor: 'pointer' }}> Logout </a> : null}
                            <a href='/cart' className='anchor' ><FaShoppingCart /><sup style={{ fontSize: '15px', marginLeft: '3px' }}>{cartSum}</sup></a>

                        </div>
                    </div>

                </div>

            </div>
        </React.Fragment>

    )
}