import React, { useEffect, useState, useContext } from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import { defaultBodyStyles } from '../shared/helper';
import { urlPointer } from '../shared/helper';
import axios from 'axios';
import { CgLogIn } from 'react-icons/cg';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import Info from '../shared/Userdetails';
import { checkMail, checkPass } from '../shared/validation';
import { CartContext } from '../../context/CartContext';


export default function Login() {
    const history = useHistory();
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const {setRefresh} = useContext(CartContext);
    const [nomenclature,setNomen] = useState('Login');
 



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
        setNomen('Logging in ...');
        const isOk = validateInput();
        if (isOk === 'ok') {
            const data = {
                email: email,
                pass: pass
            }
            const res = await axios.post(urlPointer + '/api/auth/userlogin', data);
            if (res.data.msg === 'login success') {
                localStorage.setItem('usertoken', res.data.token);
                setRefresh('random strings')
                history.push('/');
                
            } else {
                setNomen('Login');
                alert('error validating user');
            }
        }else{
            setNomen('Login');
        }

    }

    useEffect(() => {
        if (localStorage.getItem('usertoken')) {
            history.push('/');
        }
    }, [])
    return (
        <React.Fragment>
            <div style={defaultBodyStyles}>
                <Info />
                <Menu />
            

                <div className='container'>

                    <div className='row'>
                        <div className='col-lg-3'></div>
                        <div className='col-lg-6'>
                            <div className='signup'>
                                <form>

                                    <div className='signupText'>Login</div>

                                    
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
                                            <button className='signupnext' onClick={login}><CgLogIn /> {nomenclature}</button>
                                            <div style={{ textAlign: 'center' }}>
                                                <span>Don't Have an Account ?</span><br />
                                                <a href='/signup' className='anchor'><FaAngleDoubleRight /> Signup</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='col-lg-3'></div>
                    </div>

                </div>

            </div>
            <Footer />

        </React.Fragment>

    )
}