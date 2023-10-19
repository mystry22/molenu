import React, { useEffect, useState, useContext } from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import { useHistory } from 'react-router-dom';
import { PaystackButton } from 'react-paystack';
import axios from 'axios';
import { urlPointer } from '../shared/helper';
import { defaultBodyStyles } from '../shared/helper';
import { CartContext } from '../../context/CartContext';
import {transactionReference} from '../shared/functions';


export default function Order() {
    const history = useHistory();
    const [pstackTransRef, setPstackTransRef] = useState('');

    const { 
        sumsubtotal, setOptLga,
        deliveryFee, setFullName,
        fullName, setCity,
        user, setAddress,
        phone, setPhone,
        address, setStates,
        optLga, 
        city
    } = useContext(CartContext);
    const [amtPlusDel, setAmtPlusDelivery] = useState('');

    const config = {
        reference: (new Date()).getTime().toString(),
        email: user.email,
        amount: parseInt(sumsubtotal + deliveryFee) * 100,
        publicKey: 'pk_live_c2474218578bc086d8c014d69072bcb309a5e989',
    };


    const handlePaystackSuccessAction = (reference) => {
        setPstackTransRef(reference.reference);
        saveTransDetails();

    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {


    }

    const saveTransDetails = async()=>{
        const data ={
            full_name:fullName,
            phone:phone,
            address: address,
            user_ip: localStorage.getItem('i_ran_zyyx'),
            ref: transactionReference(),
            paystack_ref: pstackTransRef,
            email: user.email,
            amount: sumsubtotal,
            lga:optLga,
            city:city
        }

        const report = await axios.post(urlPointer+'/api/order/completeorder',data);
        if(report.data == 'order completed'){
            setFullName('');
            setAddress('');
            setCity('');
            setPhone('');
            setStates('');
            setOptLga('');
            localStorage.removeItem('paystack_ref');
            history.push('/success');
        }else{
            alert(report.data);
        }
    }

    const returnPayment = () => {
        return (
            <div className='row'>
                <div className='col-lg-12'>
                    <img src="/assets/img/payment.png" />
                </div>
            </div>
        )
    }

    const componentProps = {
        ...config,
        text: returnPayment(),
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };


    const myIp = localStorage.getItem('i_ran_zyyx');

    const moveToDelivery = () => {
        if (fullName) {

        } else {
            history.push('/delivery');
        }
    }

    const doTotalling = () => {
        setAmtPlusDelivery(parseInt(sumsubtotal) + deliveryFee);

    }



    useEffect(() => {

        if (localStorage.getItem('usertoken')) {

        } else {
            history.push('/login');
        }
        moveToDelivery();
        doTotalling();
    }, [])
    return (
        <React.Fragment>

            <div style={defaultBodyStyles}>
                <Menu />
            </div>

            <div className='container'>
                <div className='row'>
                    <div className='col-lg-4'>

                    </div>
                    <div className='col-lg-4' style={{ marginTop: 20 }}>
                        <div className='payment'>

                            <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Payment</div>

                            <div style={{ display: 'block', marginBottom: 10 }}>
                                <div className='paymentTitle'>
                                    Subtotal:
                                </div>
                                <div className='paymentValue'>
                                    NGN {sumsubtotal}
                                </div>
                            </div><br />

                            <div style={{ display: 'block', marginBottom: 10 }}>
                                <div className='paymentTitle'>
                                    Delivery:
                                </div>
                                <div className='paymentValue'>
                                    NGN {deliveryFee}
                                </div>
                            </div><br />

                            <div style={{ display: 'block', marginBottom: 10 }}>
                                <div className='paymentTitle'>
                                    Other Charges:
                                </div>
                                <div className='paymentValue'>
                                    NA
                                </div>
                            </div><br />

                            <div style={{ display: 'block', marginBottom: 10 }}>
                                <div className='paymentTitle' style={{ fontWeight: 'bold', fontSize: 18 }}>
                                    Total:
                                </div>
                                <div className='paymentValue'>
                                    NGN {amtPlusDel}
                                </div>
                            </div>

                            <div style={{textAlign:'center'}}>
                                <span style={{fontWeight:'bold'}}>Pay Now</span>
                                <PaystackButton {...componentProps} className='paymentButtonHack' />
                            </div>




                        </div>
                    </div>
                    <div className='col-lg-4'>

                    </div>
                </div>
            </div>

            <Footer />
        </React.Fragment>
    )
}