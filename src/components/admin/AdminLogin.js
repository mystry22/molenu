import React, { useEffect, useState, useContext } from 'react';
import Footer from '../shared/Footer';
import { urlPointer } from '../shared/helper';
import axios from 'axios';
import { CgLogIn } from 'react-icons/cg';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { checkMail, checkPass } from '../shared/validation';
import { CartContext } from '../../context/CartContext';


export default function Login() {
    const history = useHistory();
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const { setRefresh } = useContext(CartContext);



    const updateEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }
    const validateInput = () => {
        const mailres = checkMail(email);
        const passres = checkPass(pass);

        setPassError(passres);
        setEmailError(mailres);

        if (mailres || passres) {
            return 'validation failed'
        } else {
            return 'ok';
        }
    }



    const updatePass = (e) => {
        e.preventDefault();
        setPass(e.target.value);
    }
    const login = async (e) => {
        e.preventDefault();
        const isOk = validateInput();
        if (isOk == 'ok') {
            const data = {
                email: email,
                pass: pass
            }
            const res = await axios.post(urlPointer + '/api/auth/adminlogin', data);
            if (res.data.msg == 'login success') {
                localStorage.setItem('admintoken', res.data.token);
                setRefresh('random strings')
                history.push('/addproduct');

            } else {
                alert('error validating user')
            }
        }

    }

    useEffect(() => {
        if (localStorage.getItem('admintoken')) {
            history.push('/addproduct');
        }
    }, [])
    return (
        <React.Fragment>

            <div className='container'>

                <div className='row'>
                    <div className='col-lg-3'></div>
                    <div className='col-lg-6'>
                        <div className='signup'>
                            <form>

                                <div className='signupText'>Admin Login</div>


                                <label className='signupp'>E-mail</label>
                                <input type="email" placeholder='email@example.com' className='forminput' onChange={updateEmail} required />
                                <br />
                                {emailError ? <span style={{ color: 'red' }}>{emailError}</span> : null}
                                <br />
                                <label className='signupp'>Password</label>
                                <input type="password" placeholder='P@$$W0rd' className='forminput' onChange={updatePass} required />
                                {passError ? <span style={{ color: 'red' }}>{passError}</span> : null}
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <button className='signupnext' onClick={login}><CgLogIn /> Login</button>
                                        <div style={{ textAlign: 'center' }}>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-lg-3'></div>
                </div>

            </div>


            <Footer />

        </React.Fragment>

    )
}