import React,{useEffect} from 'react';
import { defaultBodyStyles } from '../shared/helper';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';

function About() {
    useEffect(()=>{
        document.title = "Fancy Finery | About"
    },[])
    return (
        <>
            <div style={defaultBodyStyles}>
                <Menu />
            </div>

            <div className='container' style={{ marginBottom: 30 }}>
                <div className='row' style={{ marginTop: 30 }}>
                    <div className='col-lg-12' style={{ textAlign: 'center' }} >

                        <hr style={{ color: '#198754', height: 5, width: 35, margin: 'auto' }} />
                        <h4 style={{ marginTop: 10, fontWeight: 'bold' }}>Welcome to Fancyfinery</h4>

                    </div>

                </div>
                <div className='row' style={{ marginTop: 30 }}>
                    <div className='col-lg-6' >
                        <h4>Our Mission</h4>

                        <div style={{ marginBottom: 40 }}>
                            At Fancyfinery, we believe that fashion is a powerful tool for self-expression and empowerment. <br />
                            We are committed to creating high-quality, sustainable clothing that is accessible to everyone,
                            regardless of their budget or style. We believe that everyone deserves to feel confident and stylish,
                            and we are here to help them do just that.
                        </div>


                        <h4>Our Vision</h4>

                        <div style={{ marginBottom: 30 }}>
                            To be the world's leading sustainable fashion company,
                            empowering people to look and feel their best while also protecting the planet
                        </div>

                        <h4>Our Values</h4>

                        <h6>Satisfaction</h6>

                        <div style={{ marginBottom: 30 }}>
                            By focusing on the customer and making continuous improvements we provide exceptional customer experience and satisfaction.
                        </div>

                        <h6>Trendy</h6>

                        <div style={{ marginBottom: 30 }}>
                            We pride ourselves because we Stay ahead of the curve with the latest fashion trends as we are passionate about creativity.
                        </div>

                        <h6>Feminine</h6>

                        <div style={{ marginBottom: 30 }}>
                            At Fancyfinery, we believe that women deserve the best. That's why we offer a wide selection of high-quality products and services that are designed to help you look and feel your best..
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <img src='/assets/img/black_woman.jpg' style={{ width: '100%', height: '100%', borderRadius: 20 }} />
                    </div>
                </div>

                

            </div>

            <Footer />
        </>
    )
}

export default About;