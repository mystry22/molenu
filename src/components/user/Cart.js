import React, { useEffect, useState } from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';

import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { urlPointer } from '../shared/helper';
import { fetchIP, getProdInfo } from '../shared/functions';
import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa';
import Info from '../shared/Userdetails';
import SocialMedia from '../shared/SocialMedia';
import {defaultBodyStyles} from '../shared/helper'


export default function Cart() {
    const [sumsubtotal, setSumSubTotal] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const myIp = localStorage.getItem('i_ran_zyyx');

    const getProdInfo = async () => {



        const data = { user_ip: myIp }
        const cart = await axios.post(urlPointer + '/api/cart/allcartitems', data);
        setCartItems(cart.data);


    }

    const getSubTotalSum = async () => {


        const data = { ip: myIp }
        const cart = await axios.post(urlPointer + '/api/cart/getsubtotalosum', data);
        setSumSubTotal(cart.data);



    }

    const deleteCartItem = async (prod_id, user_ip) => {
        const data = {
            prod_id: prod_id,
            user_ip: user_ip
        }
        const res = await axios.post(urlPointer + '/api/cart/deletecartitem', data);
        if (res.data == 'cart item deleted') {
            window.location.reload(true)
        }


    }


    useEffect(() => {
        getProdInfo();
        getSubTotalSum();
    }, [])
    return (
        <React.Fragment>
            

            <div style={defaultBodyStyles}>
            <Menu />
            </div>

            <div className='row' style={{marginTop:20}}>

                <div className='col-lg-8'>
                    {cartItems.length > 0 ?
                        cartItems.map(cartitem => (
                            <div key={cartitem.prod_id}>
                                <div className='cartdisplay'>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <div className='row'>
                                                <div className='col-lg-6'>
                                                    <div className='cartImage'>
                                                        <img src={cartitem.image_link} style={{ width: '100%', height: '100%' }} />
                                                    </div>
                                                </div>
                                                <div className='col-lg-6' style={{ textAlign: 'left' }}>
                                                    <div className='cartinfo'>
                                                    <span className='anchor' style={{ color: '#1c1d1f', fontWeight: 'bold' }}>{cartitem.prod_name.length > 37 ? cartitem.prod_name.slice(0, 37) + '...' : cartitem.prod_name} </span> <br />
                                                        <span className='anchor' style={{ fontWeight: 'bold',fontSize:13 }}>{cartitem.description.length > 37 ? cartitem.description.slice(0, 37) + '...' : cartitem.description} </span> <br />
                                                        <span className='anchor'>Size [UK]: {cartitem.size}</span><br />
                                                        <span className='anchor'>Qty: {cartitem.qty}</span> <br />
                                                        <span className='anchor' style={{ fontSize: 12 }}>In stock</span>
                                                        <br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-lg-6' style={{ textAlign: 'right' }}>

                                            <div className='cartinfo'>

                                                <span className='greencolor'>N {cartitem.price}</span><br />

                                                <div className='greencolor' style={{ opacity: 0.6, marginTop: 20, }}>
                                                    <span>N {cartitem.subtotal}</span>
                                                    <span style={{ backgroundColor: '#b2d3c2', marginLeft: 10, padding: 10, borderRadius: 10, color: '#198754', fontSize: 12 }}>{cartitem.price + ' x ' + cartitem.qty}</span>
                                                </div>
                                                <button className='sharpButton' onClick={() => deleteCartItem(cartitem.prod_id, cartitem.user_ip)}><FaTrashAlt size='0.6em' /> Remove</button>

                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        )) :
                        <h1 style={{ textAlign: 'center' }}>Empty Cart</h1>

                    }
                </div>

                <div className='col-lg-3'>
                    <div className='totalcart'>
                        <span>CART SUMMARY</span>
                        <hr />
                        <div className='row'>
                            <div className='col-lg-6'>
                                <span className='cartSubtotalText'> Delivery Charges</span>

                            </div>
                            <div className='col-lg-6'>
                                <span className='cartSubtotalText' style={{ fontSize: 10 }}>

                                    Add your Delivery address at checkout to see delivery charges
                                </span>
                            </div>
                        </div>
                        <hr />
                        {sumsubtotal.length > 0 ?
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='cartTotal'>
                                        {sumsubtotal.map(sumsub => (
                                            <div className='row'>
                                                <div className='col-lg-6'>
                                                    <span className='cartSubtotalText'>Subtotal</span>

                                                </div>
                                                <div className='col-lg-6'>
                                                    <span style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 18 }}>N {sumsub.subtotal}</span>

                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='cartdisplaynobg'>
                                        <a href='/payment' ><button className='sharpButton' style={{ backgroundColor: 'orange', color: '#fff', width: '100%' }}><FaShoppingCart size='1em' /> Checkout </button></a>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            :
                            null
                        }

                        <div className='row'>
                            <div className='col-lg-12'>
                            <span >We Accept </span>
                            <img src="/assets/img/mastercard.png" className='cardList' />
                            <img src="/assets/img/visacard.png" className='cardList' />
                            <img src="/assets/img/vervecard.png" className='cardList' />

                            </div>

                        </div>
                    </div>

                </div>

                <div className='col-lg-1'>

                </div>


            </div>



            <Footer />
        </React.Fragment>
    )
}