import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaShoppingCart,FaCheck } from 'react-icons/fa';


function FlashMsg({addtocart,displayFlash, setDisplayFlash }) {



  return (
    <>
     <button className='addtocart' onClick={addtocart}><FaShoppingCart /> Add To Cart</button>


      <Modal
        show={displayFlash}
        backdrop="static"
        keyboard={false}
        
      >
        <Modal.Body
        style={{
            backgroundColor:'#198754',
            color: '#fff',
            textAlign:'center',
        
        }}
        >
          <span style={{marginRight:10}}>Product Added Successfuly.</span> <FaCheck style={{marginRight:10}} />
          <Button variant="secondary"style={{borderRadius:50}} onClick={()=>setDisplayFlash(false)}>X</Button>

        </Modal.Body>
       
      </Modal>
    </>
  );
}

export default FlashMsg;