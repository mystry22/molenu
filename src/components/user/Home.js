import React, { useEffect, useState, useContext } from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import Info from '../shared/Userdetails';
import { defaultBodyStyles } from '../shared/helper';
import { urlPointer } from '../shared/helper';
import axios from 'axios';
import { FaShoppingCart, FaInstagram } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';




export default function Home() {
    const [prods, setProds] = useState([]);
    const { base_currency } = useContext(CartContext);


    const getAllProducts = async () => {
        const products = await axios.post(urlPointer + '/api/product/homeproducts');
        setProds(products.data);

    }

    useEffect(() => {
        
        document.title = "Fancy Finery | Home"
        
        getAllProducts();
    }, [])
    return (
        <React.Fragment>
            <div className='mainHolder'>
                <div style={defaultBodyStyles}>
                    <Info />

                    {/*Menu*/}
                    <Menu />

                    {/*Background Image with syles*/}

                    <div className='row homeBg'>

                        <div className='col-lg-6 col-sm-12'>
                            <div className='leftBoldHome'>

                                <div className='boldHomeText'>

                                    <span >Modern Artistic <br /> Stylish Designs</span> <br />
                                </div>

                                <div className='bottomHomeText'>

                                    <span > The best way to find your own personal style is to try different things. Don't be afraid to mix and match different pieces, or to try out new trends</span>
                                </div>

                                <a href='/shop'>
                                    <button className='homeButton'>
                                        Shop Now
                                    </button>
                                </a>

                                <a href='/signup'>
                                    <button className='homeButton2'>
                                        Sign Up
                                    </button>
                                </a>
                            </div>

                        </div>

                        <div className='col-lg-6 col-sm-12'>
                            <div className='homeImageHolder'>

                                <img src='/assets/img/bg.png' className='homeImage' />
                            </div>
                        </div>

                    </div>
                </div>

                <div className='popular'>



                    <div className='row' style={{ marginBottom: 10 }}>

                        <div className='col-lg-3 col-sm-12'>
                            <div style={{ marginTop: 50 }}>
                                <div className='experiment'>Don't be afraid to experiment</div>

                                <div className='bottomHomeText' style={{ marginBottom: 30 }}>The most important thing is to wear clothes that make you feel good about yourself. When you feel confident, you'll look your best</div>

                                <a href='/shop'>
                                    <button className='homeButton' style={{ marginBottom: 30 }}>
                                        Shop Now
                                    </button>
                                </a>
                            </div>

                        </div>


                        {prods.map(prod => (
                            <div className='col-lg-3'>
                                <div className='prod'>
                                    <div className='stock'>
                                        Stock: {prod.stock}
                                    </div>
                                    <div className='image-holder'>
                                        <a href={'/viewproduct/:ref' + prod.prod_id}><img src={prod.image_link} /></a>

                                    </div>
                                    <h4>{prod.prod_name.charAt(0).toUpperCase() + prod.prod_name.slice(1)}</h4>
                                    <h6 style={{ color: '#fff' }}>{prod.description.length > 33 ? prod.description.substring(0, 32) + '...' : prod.description}</h6>
                                    <span>{base_currency}{base_currency === '₦' ? prod.price : prod.price_usd} <strike style={{ opacity: 0.5 }}>{base_currency}{base_currency === '₦' ? prod.old_price : prod.old_price_usd}</strike></span><br />
                                    <a href={prod.video} style={{ textDecoration: 'none', margin: 10, color: '#fff', fontWeight: 'bold' }}>Product Video <FaInstagram color='#990f02' /></a><br />
                                    <a href={'/viewproduct/:ref' + prod.prod_id}> <button><FaShoppingCart /> Add To Cart</button></a>
                                </div>
                            </div>
                        ))}




                    </div>

                    <div className='row'>

                        <div className='col-lg-6 col-sm-12'>
                            <div className='experiment' >Why Choose Us</div>
                            <span className='chooseText'>We offer high-quality products at competitive prices convenient shopping options. <br />You can shop online or in our stores. <br />We also offer free shipping on orders over a certain amount.</span>

                            <div className='row' style={{ marginTop: 20 }}>
                                <div className='col-lg-6 col-sm-12'>
                                    <img src='/assets/img/logistics.png' style={{ marginBottom: 15 }} /> <br />
                                    <h6>Fast Shipping </h6>
                                    <span className='chooseText'> We can help you ship your goods anywhere in the world using fast and reliable shipping agents.</span>

                                </div>

                                <div className='col-lg-6 col-sm-12'>
                                    <img src='/assets/img/easy.png' style={{ marginBottom: 15 }} /> <br />
                                    <h6>Easy to Shop</h6>
                                    <span className='chooseText'>We allow you shop in your local currency and with a fast and reliable payment options</span>
                                </div>

                            </div>

                            <div className='row' style={{ marginTop: 20 }}>
                                <div className='col-lg-6 col-sm-12'>
                                    <img src='/assets/img/nohassel.png' style={{ marginBottom: 15 }} /> <br />
                                    <h6>No Hassle </h6>
                                    <span className='chooseText'> We believe that life should be easy. That's why we offer a no-hassle experience for all of our customers..</span>

                                </div>

                                <div className='col-lg-6 col-sm-12'>
                                    <img src='/assets/img/support.png' style={{ marginBottom: 15 }} /> <br />
                                    <h6>24/7 Support</h6>
                                    <span className='chooseText'>We know that life doesn't happen on a 9-to-5 schedule. That's why we offer 24/7 support to our customers.</span>
                                </div>

                            </div>
                        </div>

                        <div className='col-lg-6 col-sm-12'>
                            <div className='homeImageHolder'>

                                <img src='/assets/img/fash_lady.png' className='homeImage' />
                            </div>
                        </div>


                    </div>

                </div>

                <Footer />

            </div>

        </React.Fragment>

    )
}