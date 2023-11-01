import { Carousel } from 'react-bootstrap';

function Slider() {
    return (
        <Carousel controls={false}>
            <Carousel.Item>
                <div className='sliderImageHolder'>
                    <img
                        src='/assets/img/slide_1.jpg'
                        className='sliderImage'
                    />

                </div>



                <Carousel.Caption>
                    <span className='boldHomeText'>Express Yourself With Confidence</span><br />
                    <span className='bottomHomeText' style={{ color: '#FAF9F6' }}>While You Enjoy Amazing and Mouth Watering Deals</span> <br />
                    <a href='/signup'><button className='homeButton' style={{ marginTop: 10, backgroundColor: '#fff' }}>Signup Now</button></a>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className='sliderImageHolder'>
                    <img
                        src='/assets/img/slide_2.jpg'
                        className='sliderImage'
                    />
                </div>




                <Carousel.Caption>

                    <span className='boldHomeText' style={{ color: '#BAB86C' }}>Fashion For The Modern Woman</span><br />
                    <span className='bottomHomeText' style={{ color: '#BAB86C' }}>Our new line of dresses is perfect for any occasion, from day to night</span> <br />
                    <a href='/signup'><button className='homeButton' style={{ marginTop: 10, backgroundColor: '#BAB86C' }}>Signup Now</button></a>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className='sliderImageHolder'>
                    <img
                        src='/assets/img/slide_3.jpg'
                        className='sliderImage'
                    />

                </div>




                <Carousel.Caption>

                    <span className='boldHomeText'>Shop the new collection now!</span><br />
                    <span className='bottomHomeText' style={{ color: '#FAF9F6' }}>Dare to be different. Dare to be you</span> <br />
                    <a href='/signup'><button className='homeButton' style={{ marginTop: 10, backgroundColor: '#fff' }}>Signup Now</button></a>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
    );
}

export default Slider;