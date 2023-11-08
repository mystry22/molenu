import React, { useEffect, useState,useContext } from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import Info from '../shared/Userdetails';
import { defaultBodyStyles } from '../shared/helper';
import { urlPointer } from '../shared/helper';
import axios from 'axios';
import { FaShoppingCart,FaInstagram } from 'react-icons/fa';
import Slider from './Slider';
import { CartContext } from '../../context/CartContext';




export default function Home() {
    
    const {prods,base_currency,setBaseCurrency} = useContext(CartContext);
  
    
    return (
        <React.Fragment>
            <div style={defaultBodyStyles}>
                <Info />
                <Menu />
            </div>
            <div className='mainHolder'>
                    
                    <Slider />
            
                


                <div className='popular'>

                    {

                        prods.length > 0 ?
                        <div className='row'>
                    
                        {prods.map(prod => (
                            <div className='col-lg-3'>
                                <div className='prod'>
                                    <div className='image-holder'>
                                    <a href={'/viewproduct/:ref' + prod.prod_id}><img src={prod.image_link} /></a>

                                    </div>
                                    <h4>{prod.prod_name.charAt(0).toUpperCase() + prod.prod_name.slice(1)}</h4>
                                    <h6 style={{color:'#fff'}}>{prod.description.length > 33 ? prod.description.substring(0,32) + '...' : prod.description }</h6> 
                                    <span>{base_currency}{base_currency === '₦' ? prod.price : prod.price_usd} <strike style={{opacity:0.5}}>{base_currency}{base_currency === '₦' ? prod.price : prod.old_price_usd}</strike></span><br />
                                    <a href={prod.video} style={{textDecoration:'none',margin:10, color:'#fff', fontWeight:'bold'}}>Product Video <FaInstagram color='#990f02' /></a><br />
                                    <a href={'/viewproduct/:ref' + prod.prod_id}> <button><FaShoppingCart /> Add To Cart</button></a>
                                </div>
                            </div>
                        ))}


                    </div>:

                    <h4 style={{textAlign:'center'}}>Loading....</h4>


                    }

                    

                </div>

                <Footer />

            </div>

        </React.Fragment>

    )
}