import React, { useRef, useState, useContext } from 'react';
import { urlPointer } from '../shared/helper';
import axios from 'axios';
import { MdAccountCircle } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext'




export default function UserDetails() {
    let ref = useRef('');
    const { logout, user, cartSum, setProds, setRefresh, setBaseCurrency, base_currency } = useContext(CartContext);
    const [search, setSearchParam] = useState('');


    const setSearch = async (e) => {
        e.preventDefault();


        if (search) {
            const data = {
                prod_name: search.toLowerCase()
            }

            const res = await axios.post(urlPointer + '/api/product/search', data);

            if (res.data == 'No product found') {
                alert(res.data);
            } else {
                setProds(res.data);
                alert('Product found')
            }
        } else {

        }

    }

    const updateCurrency = async (e) => {
        //e.preventDefault();

        const base_currency = ref.current.value;

        if (base_currency) {

            const data = {
                base_currency: base_currency,
                ip: localStorage.getItem('i_ran_zyyx')
            }
            const res = await axios.post(urlPointer + '/api/product/changecurrency', data);
            if (res.data === 'currency update') {
                setRefresh('just ajsjjs lll');
                window.location.reload(true);
            }

        } else {

        }
    }

    const currencyList = [
        { label: 'CUR', value: '', id: 1 },
        { label: 'NGN', value: '₦', id: 1 },
        { label: 'USD', value: '$', id: 2 }
    ]

    return (

        <React.Fragment>
            <div className='container'>

                <div className='userdetails'>
                    <div className='row'>
                        <div className='col-lg-2'>


                            <img src='/assets/img/logo.png' style={{ width: 50, height: 50 }} />
                        </div>
                        <div className='col-lg-6'>


                            <input type='text' placeholder=' Search ' onChange={(e) => setSearchParam(e.target.value)} />
                            <button className='userdetailsSearch' onClick={(e) => setSearch(e)}>
                                Search
                            </button>
                        </div>
                        <div className='col-lg-4' style={{ textAlign: 'right' }} >



                            {user ? <span style={{ fontSize: '15px', color: '#6c757d' }}>Hi {user.first_name} </span> : <a href='/login' className='anchor'><MdAccountCircle /> </a>}
                            {user ? <a onClick={logout} style={{ fontSize: '15px', color: '#6c757d', textDecoration: 'none', cursor: 'pointer' }}> Logout </a> : null}
                            <span style={{ fontSize: '15px', color: '#6c757d' }}>Currency: {base_currency}</span>
                            <select name="currency" id="cars" style={{ fontSize: '10px', marginLeft: 5 }} onChange={(e) => updateCurrency(e)} ref={ref}>
                                {
                                    currencyList.map(curr => (
                                        <option value={curr.value} key={curr.id} >{curr.label}</option>
                                    ))
                                }

                            </select>
                            <a href='/cart' className='anchor' ><FaShoppingCart /><sup style={{ fontSize: '15px', marginLeft: '3px' }}>{cartSum}</sup></a>

                        </div>
                    </div>

                </div>

            </div>
        </React.Fragment>

    )
}