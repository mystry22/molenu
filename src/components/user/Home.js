import React,{useEffect, useState} from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import Info  from '../shared/Userdetails';
import {defaultBodyStyles} from '../shared/helper';
import {urlPointer} from '../shared/helper';
import axios from 'axios';
import {FaShoppingCart} from 'react-icons/fa';




export default function Home(){
    const [prods,setProds] = useState([]);
    
    const getAllProducts = async()=>{
        const products = await axios.post(urlPointer + '/api/product/homeproducts');
        setProds(products.data);
        
    }

    useEffect(()=>{
        getAllProducts();
    },[])
    return(
        <React.Fragment>
            <div style={defaultBodyStyles}>
                <Info />
                <Menu />
                <div className='row'>
                    
                        
                            {prods.map(prod=>(
                                <div className='col-lg-3'>
                                    <div className='prod'>
                                        <a href={'/viewproduct/:ref'+prod.prod_id}><img src={prod.image_link} /></a> 
                                        <h4>{prod.prod_name}</h4>
                                        <h6>{prod.description}</h6>
                                        <span>{prod.price} <strike>{prod.old_price}</strike></span><br />
                                        <a href={'/viewproduct/:ref'+prod.prod_id}> <button><FaShoppingCart /> Add To Cart</button></a>
                                    </div>
                                </div>
                            ))}
                              
                    
                </div>
                <Footer />
            </div>
        </React.Fragment>
        
    )
}