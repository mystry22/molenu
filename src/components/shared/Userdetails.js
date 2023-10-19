import React, { useEffect, useState,useContext } from 'react';
import { urlPointer } from '../shared/helper';
import axios from 'axios';
import { MdAccountCircle } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import {CartContext} from '../../context/CartContext'




export default function UserDetails() {
    const {logout,user, setUserDetails,cartSum, setCartSum} = useContext(CartContext)


    
    return (

        <React.Fragment>
            <div className='container'>

                <div className='userdetails'>
                    <div className='row'>
                        <div className='col-lg-2'>


                           <img src='/assets/img/logo.png' style={{width:50,height:50}} />
                        </div>
                        <div className='col-lg-6'>


                            <input type='text' placeholder=' Search ' />
                            <button className='userdetailsSearch'>
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