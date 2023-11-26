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


export default function Payment() {
    const history = useHistory();
    const [pstackTransRef, setPstackTransRef] = useState('');

    const { 
        sumsubtotal, setOptLga,
        deliveryFee, setFullName,
        fullName, setCity,
        user, setAddress,
        phone, setPhone,
        address, setStates,
        optLga,sumsubtotalUsd,
        city,base_currency,
        countries
    } = useContext(CartContext);
    const [amtPlusDel, setAmtPlusDelivery] = useState('');

    

    const dynamicConfig = ()=>{

        const config = {
            reference: (new Date()).getTime().toString(),
            email: user.email,
            amount: parseInt(sumsubtotal + deliveryFee) * 100,
            //publicKey: 'pk_test_1a1fec024222ba28bd902380bb1511969115e080'
            publicKey: 'pk_live_c2474218578bc086d8c014d69072bcb309a5e989',
        };
        const config2 = {
            reference: (new Date()).getTime().toString(),
            email: user.email,
            amount: parseInt(sumsubtotalUsd + deliveryFee) * 100,
            //publicKey: 'pk_test_1a1fec024222ba28bd902380bb1511969115e080'
            publicKey: 'pk_live_c2474218578bc086d8c014d69072bcb309a5e989',
        };

        if(base_currency === '₦'){
            return config;
        }else{
            return config2;
        }
    }


    const handlePaystackSuccessAction = (reference) => {
        setPstackTransRef(reference.reference);
        saveTransDetails();

    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {


    }

    const dynamicAmount = ()=>{
        if(base_currency === '₦'){
            return sumsubtotal;
        }else{
            return sumsubtotalUsd
        }
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
            amount: dynamicAmount(),
            lga:optLga,
            city:city,
            base_currency:base_currency,
            delivery_fee: deliveryFee,
            country: countries,
        }

        const report = await axios.post(urlPointer+'/api/order/completeorder',data);
        if(report.data == 'Transaction Completed'){
            const updateStock = await axios.post(urlPointer + '/api/order/managestock',{ip:localStorage.getItem('i_ran_zyyx')});
            if(updateStock.data == 'Product stock updated successfully'){
                localStorage.removeItem('paystack_ref');
                history.push('/success');
            }else{
                alert('Sorry please contact support as product may be out of stock')
            }
            
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
        ...dynamicConfig(),
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
        if(base_currency === '₦'){
        setAmtPlusDelivery(parseInt(sumsubtotal) + deliveryFee);

        }else{
        setAmtPlusDelivery(parseInt(sumsubtotalUsd) + deliveryFee);

        }

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
                                    {base_currency} {base_currency === '₦' ? sumsubtotal : sumsubtotalUsd}
                                </div>
                            </div><br />

                            <div style={{ display: 'block', marginBottom: 10 }}>
                                <div className='paymentTitle'>
                                    Shipping:
                                </div>
                                <div className='paymentValue'>
                                    {base_currency} {deliveryFee}
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
                                    {base_currency} {amtPlusDel}
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