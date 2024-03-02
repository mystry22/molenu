import React, { useEffect, useState, useContext } from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import { useHistory } from 'react-router-dom';
import { PaystackButton } from 'react-paystack';
import axios from 'axios';
import { urlPointer } from '../shared/helper';
import { defaultBodyStyles } from '../shared/helper';
import { CartContext } from '../../context/CartContext';
import { transactionReference } from '../shared/functions';
import { FaCreditCard } from 'react-icons/fa';


export default function Payment() {
    const history = useHistory();
    const [pstackTransRef, setPstackTransRef] = useState('');
    const [finalisePmt, setFinalisePmt] = useState('no');
    const del_fee = localStorage.getItem('del_fee');
    const Inst_del_fee = 0;



    const {
        sumsubtotal,
        user,
        optLga, sumsubtotalUsd,
        city,
        countries, totalWeight,
    } = useContext(CartContext);
   const base_currency = localStorage.getItem('base_currency');


    const [deliveryInfo, setDeliveryInfo] = useState('');


    const dynamicConfig = () => {

        if (deliveryInfo) {
            const config = {

                reference: (new Date()).getTime().toString(),
                email: user.email,
                amount: (sumsubtotal + Inst_del_fee) * 100,
                //publicKey: 'pk_test_1a1fec024222ba28bd902380bb1511969115e080'
                publicKey: 'pk_live_c2474218578bc086d8c014d69072bcb309a5e989',
                currency: 'NGN'
            };
            const config2 = {
                reference: (new Date()).getTime().toString(),
                email: user.email,
                amount: (sumsubtotalUsd + Inst_del_fee) * 100,
                //publicKey: 'pk_test_1a1fec024222ba28bd902380bb1511969115e080'
                publicKey: 'pk_live_c2474218578bc086d8c014d69072bcb309a5e989',
                currency: 'USD'
            };

            if (base_currency === '₦') {
                return config;
            } else {
                return config2;
            }
        } else {

        }

    }


    const handlePaystackSuccessAction = (reference) => {
        setPstackTransRef(reference.reference);
        saveTransDetails();

    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {


    }

    const dynamicAmount = () => {
        if (base_currency === '₦') {
            return sumsubtotal;
        } else {
            return sumsubtotalUsd
        }
    }

    const saveTransDetails = async () => {
        setFinalisePmt('yes')
        const data = {
            full_name: deliveryInfo.delivery_name,
            phone: deliveryInfo.phone,
            address: deliveryInfo.street,
            user_ip: localStorage.getItem('i_ran_zyyx'),
            ref: transactionReference(),
            paystack_ref: pstackTransRef,
            email: user.email,
            amount: dynamicAmount(),
            lga: deliveryInfo.lga,
            city: deliveryInfo.city,
            base_currency: base_currency,
            delivery_fee: deliveryInfo.delivery_fee,
            country: deliveryInfo.delivery_country,
        }

        const report = await axios.post(urlPointer + '/api/order/completeorder', data);
        if (report.data == 'Transaction Completed') {
            const updateStock = await axios.post(urlPointer + '/api/order/managestock', { ip: localStorage.getItem('i_ran_zyyx') });
            if (updateStock.data == 'Product stock updated successfully') {

                const removeDelivery = await axios.post(urlPointer + '/api/product/deletedeliveryentry', data);
                if (removeDelivery.data != null) {
                    localStorage.removeItem('deli_fee');
                    history.push('/success');
                } else {
                    alert('Sorry your payment was successful however contact the support team for follow up')
                }

            } else {
                alert('Sorry please contact support as product may be out of stock')
            }

        } else {
            alert(report.data);
        }
    }

    const returnPayment = () => {
        return (
            <div className='row'>
                <div className='col-lg-12'>
                    <button>Pay Now <FaCreditCard /> </button>

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




    const moveToDelivery = async () => {
        const myIp = localStorage.getItem('i_ran_zyyx');
        const data = { user_ip: myIp }
        const res = await axios.post(urlPointer + '/api/product/getdeliveryinfo', data);
        if (res.data == 'not available') {
            history.push('/delivery')
        } else {
            setDeliveryInfo(res.data);
        }

    }







    useEffect(() => {

        document.title = "Fancy Finery | Payment"

        if (localStorage.getItem('usertoken')) {

        } else {
            history.push('/login');
        }

        moveToDelivery();

    }, [])
    return (
        <React.Fragment>

            <div style={defaultBodyStyles}>
                <Menu />
            </div>

            {
                deliveryInfo ?

                    

            <div className='container'>

                {
                        finalisePmt == 'yes' ?
                        <div style={{ margin: 'auto', textAlign: 'center' }}>
                            <div className='loader'>

                            </div>
                            <div>Finalizing Operations.....</div>
                        </div> :
                        null
                }
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
                                    {base_currency} {Inst_del_fee}
                                </div>
                            </div><br />

                            <div style={{ display: 'block', marginBottom: 10 }}>
                                <div className='paymentTitle'>
                                    Total Weight:
                                </div>
                                <div className='paymentValue'>
                                    {totalWeight}KG
                                </div>
                            </div><br />

                            <div style={{ display: 'block', marginBottom: 10 }}>
                                <div className='paymentTitle' style={{ fontWeight: 'bold', fontSize: 18 }}>
                                    Total:
                                </div>
                                <div className='paymentValue'>
                                    {base_currency == '$' ? sumsubtotalUsd + Inst_del_fee : sumsubtotal + Inst_del_fee}
                                </div>
                            </div>

                            <div style={{ textAlign: 'center' }}>

                                <PaystackButton {...componentProps} className='paymentButtonHack' />
                            </div>




                        </div>
                    </div>
                    <div className='col-lg-4'>

                    </div>
                </div>
            </div>

            :

            <div style={{ margin: 'auto', textAlign: 'center' }}>
                <div className='loader'>

                </div>
            </div>


            }

            <Footer />
        </React.Fragment>
    )
}