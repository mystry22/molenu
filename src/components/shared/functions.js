import axios from "axios";
import {urlPointer} from '../shared/helper';
const proCat = ()=>{
    const custom = "0";
    const min =10000;
    const max = 99999;
    const delta = max-min;
    const gen = Math.random();
    const initVal = delta * gen;
    const floored = Math.floor(initVal);
    const conToString = floored.toString();
    const accountNumber = custom  + conToString;
    return accountNumber;
    

}

const getCats= async()=>{
    const cat = await axios.post(urlPointer + '/api/product/availablecategory');
    return cat;
  
}

const genProdId=()=>{
    const custom = "0";
    const min =10000000;
    const max = 99999999;
    const delta = max-min;
    const gen = Math.random();
    const initVal = delta * gen;
    const floored = Math.floor(initVal);
    const conToString = floored.toString();
    const accountNumber = custom  + conToString;
    return accountNumber;
}

const getProdInfo = async()=>{
    const prod_id = localStorage.getItem('prod_id');
    const data = {
        prod_id: prod_id
    }
    const prodData = await axios.post(urlPointer + '/api/product/productinfo',data);
    return prodData;
}

const fetchIP =async()=>{
    const res = await axios.get('https://api.ipify.org?format=jsonp?callback=?');
    return res.data;
    
    
}

const makeIp = ()=>{
    const length = 10;
    if(localStorage.getItem('i_ran_zyyx')){

    }else{
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
         }
         localStorage.setItem('i_ran_zyyx',result)
    }
    
}

const transactionReference = ()=>{
    const length = 15;
    
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
         }
         return result;

    
}

const getPending = async()=>{
    const res = await axios.get(urlPointer +'/api/order/getpendingsum');
    return res.data;

    
}

const getWorking = async()=>{
    const res = await axios.get(urlPointer +'/api/order/getworkingsum');
    return res.data;

    
}

const getReady = async()=>{
    const res = await axios.get(urlPointer +'/api/order/getreadysum');
    return res.data;

    
}
const getRejected = async()=>{
    const res = await axios.get(urlPointer +'/api/order/getrejectedsum');
    return res.data;

    
}



export{
    proCat,
    getCats,
    genProdId,
    getProdInfo,
    fetchIP,
    makeIp,
    transactionReference,
    getPending,
    getWorking,
    getReady,
    getRejected
}