import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { urlPointer } from "../components/shared/helper";
import { makeIp } from '../components/shared/functions';



export const CartContext = createContext({});
export const GlobalCartContext = ({ children }) => {
    const [sumsubtotal, setSumSubTotal] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const myIp = localStorage.getItem('i_ran_zyyx');
    const [cartSum, setCartSum] = useState('');
    const [user, setUserDetails] = useState('');
    const [refre, setRefresh] = useState('');
    const [deliveryFee, setDeliveryFee] = useState('');

    //delivery state Items

    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [states, setStates] = useState('');
    const [optLga, setOptLga] = useState('');
    const [prods, setProds] = useState([]);



    const fetchCartSum = async () => {
        const data = {
            user_ip: localStorage.getItem('i_ran_zyyx')
        }
        const feed = await axios.post(urlPointer + '/api/cart/cartsum', data);
        setCartSum(feed.data);
    }

    const userData = () => {
        const token = localStorage.getItem('usertoken');
        if (token) {
            const authAxios = axios.create({
                headers: {
                    authorization: `Bearer ${token}`
                }
            });


            authAxios.post(urlPointer + '/api/registration/userdetail')
                .then(result => {
                    setUserDetails(result.data);

                })
        }
    }

    const logout = () => {
        localStorage.removeItem('usertoken');
        window.location.reload(true)
    }

    useEffect(() => {
        getSubTotalSum();
        getProdInfo();
        makeIp();
        fetchCartSum();
        userData();
        getAllProducts();
    }, [cartSum, user, refre])

    const getProdInfo = async () => {

        const data = { user_ip: myIp }
        const cart = await axios.post(urlPointer + '/api/cart/allcartitems', data);
        setCartItems(cart.data);


    }

    const getSubTotalSum = async () => {
        const data = { ip: myIp }
        const cart = await axios.post(urlPointer + '/api/cart/getsubtotalosum', data);
        if (cart.data.length > 0) {
            const convertToObject = Object.assign({}, cart.data);
            const firstObject = convertToObject[0]
            const actualData = firstObject.subtotal;
            setSumSubTotal(actualData);
        }else{

        }

    }

    const getAllProducts = async () => {
        const products = await axios.post(urlPointer + '/api/product/shopproducts');
        setProds(products.data);

    }


    return <CartContext.Provider value={{
        sumsubtotal,
        cartItems,
        user,
        setUserDetails,
        cartSum,
        setCartSum,
        logout,
        refre,
        setRefresh,
        setDeliveryFee,
        deliveryFee,
        setFullName,
        setAddress,
        setCity,
        setPhone,
        setStates,
        setOptLga,
        fullName,
        address,
        city,
        phone,
        states,
        optLga,getAllProducts,
        setProds,prods

    }}>
        {children}
    </CartContext.Provider>
}