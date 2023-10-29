import React from 'react';
import SocialMedia from './SocialMedia';
export default function Footer() {
    return (
        <React.Fragment>
            <div className='container'>
                <div className='row footer'>
                    <div className='col-lg-4 col-sm-12'>
                        <div className='submail'>
                            <img src='/assets/img/email.png' /> <span className='experiment' style={{ fontSize: 20 }}>Subscribe to Newsletter</span>
                            <input type='email' placeholder='johndoe@gmail.com' />
                            <button className='homeButton' style={{ borderRadius: 20, width: 120 }}> Subscribe</button> <br />
                            <SocialMedia />
                        </div>
                    </div>
                    <div className='col-lg-2 col-sm-12'>
                        <span className='experiment' style={{ fontSize: 20 }}>Useful Links</span>
                        <div className='links'>
                            <ul>
                                <li><a href='/'>Home</a></li>
                                <li><a href='/about'>Aboutus</a></li>
                                <li><a href='/signup'>Signup</a></li>
                                <li><a href='/login'>Login</a></li>
                                <li><a href='/contact'>Contact</a></li>
                                <li><a href='/shop'>Shop</a></li>
                                <li><a href='/cart'>Cart</a></li>
                            </ul>
                        </div>

                    </div>

                    <div className='col-lg-3 col-sm-12'>
                        <span className='experiment' style={{ fontSize: 20 }}>Contact</span>
                        <h6 style={{ fontWeight: 500, color: '#6a6a6a' }} >Head Office</h6>
                        <span className='contact'>
                            44 Alhaji Masha Surulere, <br />Lagos, <br />Nigeria. <br />
                            +234 803 896 7186.<br />
                            +234 902 122 3344.<br />
                        </span>

                    </div>

                    <div className='col-lg-3 col-sm-12'>

                        <span className='experiment' style={{ fontSize: 20 }}>Sure Benefits</span><br />

                        <ul className='benefits'>
                            <li>Best Designs</li>
                            <li>Quality Assured</li>
                            <li>Fast Delivery</li>
                            <li>Affordable Prices</li>
                            <li>24/7 Customer Support</li>
                        </ul>



                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-12 col-sm-4'>
                        <hr style={{ margin: 30 }} />
                    </div>

                </div>

                <div className='row contact'>
                    <div className='col-lg-6 col-sm-4' style={{textAlign:'left'}}>
                        Copyright ©2023. All Rights Reserved. <br /> Designed by Hentech Pro
                    </div>

                    <div className='col-lg-6 col-sm-4 contact' style={{textAlign:'right'}}>


                        Terms & Conditions
                        Privacy Policy


                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}