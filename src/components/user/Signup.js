import React, { useEffect, useState, useContext } from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import { defaultBodyStyles } from '../shared/helper';
import { urlPointer } from '../shared/helper';
import axios from 'axios';
import { CgLogIn } from 'react-icons/cg';
import { checkMail } from '../shared/validation';
import { useHistory } from 'react-router-dom';
import { checkName, checkPhone, checkPass } from '../shared/validation';
import { CartContext } from '../../context/CartContext';




export default function SignUp() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const {setRefresh} = useContext(CartContext);
    const [nomenclature,setNomen] = useState('Create Account');


    const [fnameError, setFnameError] = useState('');
    const [lnameError, setLnameError] = useState('');
    const [passError, setPassError] = useState('');
    const [phoneError, setPhoneError] = useState('');





    const dovalidations = () => {
        const paserr = checkPass(pass);
        const phoneerr = checkPhone(phone);
        const fnameerr = checkName(fname);
        const lnameerr = checkName(lname);
        const emailValErr = validateMail(email);

        setPassError(paserr);
        setPhoneError(phoneerr);
        setFnameError(fnameerr);
        setLnameError(lnameerr);
        setEmailError(emailValErr);

        if (paserr != '' || phoneerr != '' || fnameerr != '' || lnameerr != ''  || emailValErr != '') {
            return 'err'
        } else {
            return 'ok';
        }

    }
    const updateFirstName = async (e) => {
        e.preventDefault();
        setFname(e.target.value);
    }

    const updateLastName = async (e) => {
        e.preventDefault();
        setLname(e.target.value);
    }
    const updatePhone = async (e) => {
        e.preventDefault();
        setPhone(e.target.value);
    }
    const updatePassword = async (e) => {
        e.preventDefault();
        setPass(e.target.value);
    }
    const createAccount = async (e) => {
        e.preventDefault();
        setNomen('Submiting....');
        const doVali = dovalidations();

        if (doVali === 'ok') {
            const data = {
                first_name: fname,
                last_name: lname,
                phone: phone,
                pass: pass,
                email: email,
            }

           
            const res = await axios.post(urlPointer + '/api/registration/register', data);
            if (res.data.msg == 'registration okay') {
                localStorage.setItem('usertoken', res.data.token);
                setRefresh('random rubishs')
                if (localStorage.getItem('fart_cart')) {
                    history.push('/delivery');
                } else {
                    history.push('/');
                }

            } else {
                setNomen('Create Account');
                alert(res.data.msg)
            }
        } else {
            setNomen('Create Account');
        }


    }



    const updateEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }
    const validateMail = () => {
        const mailres = checkMail(email);
        return mailres;
    }

    useEffect(() => {
        if (localStorage.getItem('usertoken')) {
            history.push('/');
        }
    }, [])


    return (
        <React.Fragment>
            <div style={defaultBodyStyles}>
                {/* <Info /> */}
                <Menu />


                <div className='container' style={{ marginTop: 20 }}>

                    <div className='row'>
                        <div className='col-lg-3'></div>
                        <div className='col-lg-6'>
                            <div className='signup'>
                                <form>

                                    <div className='signupText'>SIGN UP</div>

                                    <input type="text" placeholder='Email' className='forminput' onChange={updateEmail} required /> <br />
                                    {emailError ? <span style={{ color: 'red' }}>{emailError}</span> : null}<br />

                                    <input type="text" placeholder='First Name' className='forminput' onChange={updateFirstName} required /> <br />
                                    {fnameError ? <span style={{ color: 'red' }}>{fnameError}</span> : null}<br />

                                    <input type="text" placeholder='Last Name' className='forminput' onChange={updateLastName} required /> <br />
                                    {lnameError ? <span style={{ color: 'red' }}>{lnameError}</span> : null}<br />
                                    <input type="text" placeholder='Phone Number' className='forminput' onChange={updatePhone} required /> <br />
                                    {phoneError ? <span style={{ color: 'red' }}>{phoneError}</span> : null}<br />
                                    <input type="password" placeholder='Password' className='forminput' onChange={updatePassword} required /> <br />
                                    {passError ? <span style={{ color: 'red' }}>{passError}</span> : null}<br />

                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <button className='signupnext' onClick={createAccount}>{nomenclature}</button>
                                            <div style={{ textAlign: 'center' }}>
                                                <span>Aready have an Account ?</span><br />
                                                <a href='/login' className='anchor'><CgLogIn /> Login</a>
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