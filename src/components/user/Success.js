import React,{useEffect} from 'react';
import {AiFillCheckCircle} from 'react-icons/ai';

function Success() {
  useEffect(()=>{
    document.title = "Fancy Finery | Payment Success"
},[])
  return (
    <div className='success'>
            <AiFillCheckCircle size={150} color='#198754' /><br />
            <p>
                Your payment is Successful and you will be contacted by 
                one of our support agents.

                <br />

                Please note that delivery may take up to 7days in worst cases<br />
                <br />
                <a href='/'><button className='homeButton' style={{color:'#fff'}}>Continue</button> </a>
            </p>

    </div>
  )
}

export default Success;