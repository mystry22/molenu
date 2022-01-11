import React,{useEffect,useState} from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';

import {useParams,useHistory} from 'react-router-dom';
import axios from 'axios';
import {urlPointer} from '../shared/helper';
import {fetchIP, getProdInfo} from '../shared/functions';
import {FaTrashAlt,FaShoppingCart} from 'react-icons/fa';
import Info  from '../shared/Userdetails';


export default function Cart(){
    const [sumsubtotal,setSumSubTotal] = useState([]);
    const [cartItems,setCartItems] = useState([]);
    const myIp =localStorage.getItem('i_ran_zyyx');

    const getProdInfo = async()=>{

        
        
        const data = {user_ip: myIp}
        const cart = await axios.post(urlPointer+'/api/cart/allcartitems',data);
        setCartItems(cart.data);
        
       
    }

    const getSubTotalSum = async()=>{

        
        const data = {ip: myIp}
        const cart = await axios.post(urlPointer+'/api/cart/getsubtotalosum',data);
        setSumSubTotal(cart.data);
        
        
       
    }

    const deleteCartItem = async(prod_id,user_ip)=>{
        const data = {prod_id:prod_id,
                       user_ip: user_ip
                        }
        const res = await axios.post(urlPointer+'/api/cart/deletecartitem',data);
        if(res.data == 'cart item deleted'){
            window.location.reload(true)
        }
            
        
    }


    useEffect(()=>{
        getProdInfo();
        getSubTotalSum();
    },[])
    return(
        <React.Fragment>
            <Info />
            <Menu />
                <div className='container'>
                    
                        
                    
                        
                            {cartItems.length > 0 ? 
                            cartItems.map(cartitem=>(
                              <div key={cartitem.prod_id}>  
                                
                                <div className='cartdisplay'>
                                <div className='row'>
                                    <div className='col-lg-3'>
                                        <div className='cartImage'>
                                            <img src={cartitem.image_link} />
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='cartinfo'>
                                            <span className='anchor'>Seller: Molenu</span>
                                            <h6 className='darkcolor'>{cartitem.description}</h6>
                                            <span className='anchor'>Size {cartitem.size}</span><br />
                                            <span className='anchor'>Qty {cartitem.qty}</span>
                                            <br />
                                            <button className='sharpButton' onClick={()=>deleteCartItem(cartitem.prod_id,cartitem.user_ip)}><FaTrashAlt size='0.8em' /> Remove</button>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='cartinfo'>
                                            <h6 className='darkcolor'>Unit Price</h6><br />
                                            <span className='greencolor'>N{cartitem.price}</span>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='cartinfo'>
                                            <h6 className='darkcolor'>Sub Total</h6><br />
                                            <span className='greencolor'>N{cartitem.subtotal}</span>
                                        </div>
                                    </div>
                                </div>

                                
                              </div>
                              </div>
                            )) : 
                            <h1 style={{textAlign:'center'}}>Empty Cart</h1>
                        
                        }

                        {sumsubtotal.length > 0 ?
                          <div className='row'>
                              <div className='col-lg-12'>
                                    <div className='cartTotal'>
                                        {sumsubtotal.map(sumsub=>(
                                            <h4>Total N{sumsub.subtotal}</h4>
                                        ))}
                                    </div>
                              </div>
                              <div className='col-lg-12'>
                                  <div className='cartdisplaynobg'>
                                  <a href='/payment' ><button className='sharpButton'><FaShoppingCart size='1em' /> Checkout</button></a>
                                  </div>
                              </div>
                          </div>
                            :
                            null
                        }
                            
                        
                    

                     </div>   
                
            <Footer />
        </React.Fragment>
    )
}