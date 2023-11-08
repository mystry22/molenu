import React, { useState } from 'react';
import { defaultBodyStyles } from '../shared/helper';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import { checkMail, checkName } from '../shared/validation';
import axios from 'axios';
import { urlPointer } from '../shared/helper';
import {FaFacebook,FaInstagram,FaTiktok,FaWhatsapp} from 'react-icons/fa';


function Contact() {
  const [sendButton, setSendButton] = useState('Send');
  const [msg, setMsg] = useState('');
  const [full_name, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendContact = async (ev) => {
    ev.preventDefault();
    setSendButton('Sending...')
    setMsg('');
    const validate = doValidation();

    if (validate === 'err') {
      setMsg('One or more fields failed validation');
      setSendButton('Send');
    } else {
      const data = {
        full_name: full_name,
        email: email,
        subject: subject,
        message: message
      }

      const res = await axios.post(urlPointer + '/api/product/contact', data);

      if (res.data === 'mail sent') {
        setSendButton('Send');
        setMsg('');
        alert('Your mail has been sent and an agent will reach out to you shortly');
        window.location.reload(true);
      } else {
        setSendButton('Send');
        setMsg('');
        alert('Sorry we are unable to complete this operation at the moment please try again later')
      }


    }

  }

  const doValidation = () => {
    const full_nameRes = checkName(full_name);
    const emailRes = checkMail(email);
    const subjectRes = checkName(subject);
    const messageRes = checkName(message);

    if (full_nameRes || emailRes || subjectRes || messageRes) {
      return 'err';
    } else {
      return 'ok';
    }
  }
  return (
    <>
      <div style={defaultBodyStyles}>
        <Menu />
      </div>

      <div className='container'>

        <div className='row' style={{ marginTop: 20 }}>

          <div className='col-lg-12' style={{ textAlign: 'center' }} >

            <hr style={{ color: '#198754', height: 5, width: 35, margin: 'auto' }} />
            <h4 style={{ marginTop: 10, fontWeight: 'bold' }}>Enjoy 24/7 Support</h4>

          </div>

        </div>



        <div className='row'>

          <div className='col-lg-6' >
            <form style={{ margin: 20, backgroundColor: '#dee2e6', padding: 20 }}>
              <h4 style={{ marginBottom: 20 }}>Contact Us</h4>
              {msg ? <span style={{ color: 'red', alignSelf: 'center' }}>{msg}</span> : null}
              <input type='text' name='full_name' placeholder='Full name' required className='form-control' onChange={(ev) => setFullname(ev.target.value)} /> <br />
              <input type='text' name='Email' placeholder='Email' required className='form-control' onChange={(ev) => setEmail(ev.target.value)} /> <br />
              <input type='text' name='Subject' placeholder='Subject' required className='form-control' onChange={(ev) => setSubject(ev.target.value)} /> <br />
              <textarea placeholder='Message' required className='form-control' rows={4} onChange={(ev) => setMessage(ev.target.value)} >

              </textarea> <br />

              <button className='homeButton' style={{ width: '100%' }} onClick={(ev) => sendContact(ev)}>{sendButton}</button>


            </form>
          </div>

          <div className='col-lg-6' style={{ marginTop: 20 }}>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='contactsection'>
                  <h4>Visit Us</h4>
                  <h6>Head Office:</h6>
                  <p>
                    44 Alhaji Masha Surulere,
                    Lagos,
                    Nigeria.
                  </p>
                </div>

              </div>

              <div className='col-lg-6'>

                <div className='contactsection'>
                  <h4>Call Us</h4>
                  <h6>Phone Number:</h6>
                  <p>
                    +234 803 896 7186.<br />
                    +234 902 122 3344.
                  </p>
                </div>

              </div>
            </div>

            <div className='row' style={{marginTop:20}}>
              <div className='col-lg-12'>
                <div className='contactsection'>
                  <h4>Social Media:</h4>


                  
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default Contact;