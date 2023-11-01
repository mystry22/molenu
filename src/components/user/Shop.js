import React, { useEffect, useState,useContext } from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import Info from '../shared/Userdetails';
import { defaultBodyStyles } from '../shared/helper';
import { urlPointer } from '../shared/helper';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import Slider from './Slider';
import { CartContext } from '../../context/CartContext';




export default function Home() {
    
    const {prods} = useContext(CartContext);
    
    return (
        <React.Fragment>
            <div style={defaultBodyStyles}>
                <Info />
                <Menu />
            </div>
            <div className='mainHolder'>
                    
                    <Slider />
            
                


                <div className='popular'>

                    <div className='row'>

                        {prods.map(prod => (
                            <div className='col-lg-3'>
                                <div className='prod'>
                                    <div className='image-holder'>
                                    <a href={'/viewproduct/:ref' + prod.prod_id}><img src={prod.image_link} /></a>

                                    </div>
                                    <h4>{prod.prod_name.charAt(0).toUpperCase() + prod.prod_name.slice(1)}</h4>
                                    <h6>{prod.description}</h6>
                                    <span>N{prod.price} <strike style={{opacity:0.5}}>N{prod.old_price}</strike></span><br />
                                    <a href={'/viewproduct/:ref' + prod.prod_id}> <button><FaShoppingCart /> Add To Cart</button></a>
                                </div>
                            </div>
                        ))}

                       


                    </div>



                </div>

                <Footer />

            </div>

        </React.Fragment>

    )
}