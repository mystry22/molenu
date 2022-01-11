import React, { useEffect, useState } from 'react';
import Menu from '../shared/AdminMenu';
import axios from 'axios';
import { urlPointer } from '../shared/helper';
import { useHistory,useParams } from 'react-router-dom';







export default function Pending() {
    const history = useHistory();
    const { ref } = useParams();
    const [orderInfo, setOrderInfo] = useState([]);
    const [total, setSumSubTotal] = useState([]);

    const today = new Date();
    let mydate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const getAllReady = async () => {
        const data = {ref: ref.substring(4)};
        const products = await axios.post(urlPointer + '/api/order/readydetails',data);
        setOrderInfo(products.data);


    }

    const getSubTotalSum = async () => {


        const data = { ref: ref.substring(4) };
        const cart = await axios.post(urlPointer + '/api/order/totalorder', data);
        setSumSubTotal(cart.data);
        console.log(cart.data)


    }


    useEffect(async () => {
        getAllReady();
        getSubTotalSum();

    }, [])
    return (
        <React.Fragment>


            <Menu />
            <div className='container'>
                <div className='printArea'>
                <div className='row'>
                    <div className='col-lg-3'>
                        <p>
                            Molenu Fashion Mall, <br />
                            279 Ajose Adeogun Street, <br />
                            Victoria Island, <br />
                            Nigeria <br />
                            {mydate}
                        </p>
                    </div>
                    <div className='col-lg-3'>

                    </div>
                    <div className='col-lg-3'>

                    </div>
                    <div className='col-lg-3'>

                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-4'>
                        <h4>Delivery Address</h4>
                        <p>
                            234 Ajaimo street,<br />
                            Ijebu Igbo, <br />
                            Surulere Lagos
                        </p>
                    </div>
                    <div className='col-lg-4'>
                        <h4>Beneficiary</h4>
                        <p>
                            Alabi Alamu,<br />
                            08068554846 <br />
                            albi.alamu@gmail.com
                        </p>
                    </div>
                    <div className='col-lg-4'>
                        <h4>Delivery Charge</h4>
                        <p>
                            234 Ajaimo street,<br />
                            Ijebu Igbo, <br />
                            Surulere Lagos
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                        {orderInfo ?
                            <table className='table'>
                                <tr>
                                    <th>Reference</th>
                                    <th>Date</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Size</th>
                                </tr>


                                {orderInfo.map(order => (
                                    <tr key={order.ref}>

                                        <td><a href={'/print/:ref' + order.ref} className='anchor' >{order.ref}</a></td>
                                        <td> {order.order_date.substring(0, 10)}</td>
                                        <td> {order.prod_name}</td>
                                        <td> {order.price}</td>
                                        <td> {order.qty}</td>
                                        <td> {order.size}</td>


                                    </tr>
                                ))}
                            </table>
                            :
                            <h1 style={{ textAlign: 'center' }}>Not Available</h1>
                        }


                        {total.length > 0 ?
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='cartTotal'>
                                        {total.map(sumsub => (
                                            <h4>Total N{sumsub.subtotal}</h4>
                                        ))}
                                    </div>
                                </div>
                                
                            </div>
                            :
                            null
                        }
                    </div>
                </div>

                <div className='row'>
                        <div className='col-lg-12'>
                            <div className='printmsg'>
                                <span>Dear <b>Alabi Alamu</b></span><br /><br />
                                

                                <p>
                                    Thank you for your confidence in our product and we hope your order meets you well <br />
                                    If you have not recieved all your order's, kindly note that some order's may arrive in
                                    multiple batches <br />

                                    You can reach out to us on <b>contact@molenu.com.ng </b>or simply call <b>070600600125</b><br />

                                    Have a great day and thank you for shopping with us <br /><br />

                                    <b>Molenu Team</b>
                                </p>

                            </div>
                        </div>
                </div>

                </div>

            </div>


        </React.Fragment>

    )
}