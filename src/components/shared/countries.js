import React,{useContext} from 'react';
import {CartContext} from '../../context/CartContext';
import {austria,americas,africas,europe,uae,uk} from '../shared/Calculate_shipping';
import axios from 'axios';
import { urlPointer } from './helper';

const countries = [
{id:1, label: 'Australia',value:'Australia',shipping:'Australia' },
{id:2, label: 'France',value:'France',shipping:'Europe' },
{id:3, label: 'Germany',value:'Germany',shipping:'Europe' },
{id:4, label: 'Ireland',value:'Ireland',shipping:'Uk' },
{id:5, label: 'Italy',value:'Italy',shipping:'Europe' },
{id:6, label: 'Monaco',value:'Monaco',shipping:'Europe' },
{id:7, label: 'Netherlands',value:'Netherlands',shipping:'Europe' },
{id:7, label: 'Nigeria',value:'Nigeria',shipping:'Nigeria' },
{id:8, label: 'Norway',value:'Norway',shipping:'Europe' },
{id:9, label: 'Poland',value:'Poland',shipping:'Europe' },
{id:10, label: 'Portugal',value:'Portugal',shipping:'Europe' },
{id:11, label: 'Romania',value:'Romania',shipping:'Europe' },
{id:12, label: 'Russia',value:'Russia',shipping:'Europe' },
{id:13, label: 'Slovakia',value:'Slovakia',shipping:'Europe' },
{id:14, label: 'Slovenia',value:'Slovenia',shipping:'Europe' },
{id:15, label: 'South Africa',value:'South Africa',shipping:'Africa' },
{id:16, label: 'Spain',value:'Spain',shipping:'Europe' },
{id:17, label: 'Sweden',value:'Sweden',shipping:'Europe' },
{id:18, label: 'Switzerland',value:'Switzerland',shipping:'Europe' },
{id:19, label: 'Turkey',value:'Turkey',shipping:'Europe' },
{id:20, label: 'Ukraine',value:'Ukraine',shipping:'Europe' },
{id:21, label: 'United Arab Emirates',value:'United Arab Emirates',shipping:'Uae', },
{id:22, label: 'United Kingdom',value:'United Kingdom',shipping:'Uk' },
{id:23, label: 'United States of America',value:'United States of America',shipping:'Americas' },
{id:23, label: 'Test',value:'Test',shipping:'Test' },

];



export default function () {
    const {setCountry,setRegion,region,totalWeight,base_currency} = useContext(CartContext);
    

    const handleSelection = (e)=>{
        e.preventDefault();
        const countyObject = countries.find(u => u.value === e.target.value);
        setCountry(countyObject.value);
       setRegion(countyObject.shipping);
       const tRegion = countyObject.shipping
        evaluateShippingCost(tRegion);
    }

    const saveDeliveryCost = async (deli)=>{
        const ip = localStorage.getItem('i_ran_zyyx');
        const data = {
            ip: ip,
            delivery_fee: deli,
            base_currency: base_currency
        }

        const res = await  axios.post(urlPointer + '/api/product/savedeliveryfee',data);
        if(res.data == 'delivery set'){
            
        }else{
            alert('Unable to save delivery fee')
        }
    }
    

    const evaluateShippingCost = (tRegion)=>{
        switch(tRegion){
            case 'Americas':
                const deliveryCostAmerica = americas(totalWeight);
                saveDeliveryCost(deliveryCostAmerica);
                break;
            case 'Europe':
                const deliveryCostEurope = europe(totalWeight);
                saveDeliveryCost(deliveryCostEurope);
                break;
            case 'Uae':
                const deliveryCostUae = uae(totalWeight);
                saveDeliveryCost(deliveryCostUae);
                break;
            case 'Australia':
                const deliveryCostAustralia = austria(totalWeight);
                saveDeliveryCost(deliveryCostAustralia);
                break;
            case 'Africa':
                const deliveryCostAfrica = africas(totalWeight);
                saveDeliveryCost(deliveryCostAfrica);
                break;
            case 'Uk':
                const deliveryCostUk = uk(totalWeight);
                saveDeliveryCost(deliveryCostUk);
                break;
            case 'Test':
                const deliveryTest = 0.5;
                saveDeliveryCost(deliveryTest);
                break;
           

        }
    }
    return (
        <div>
            <select id="country" name="country" class="form-control" onChange={(e) => handleSelection(e)}>
                <option value="">Select Country</option>
                {
                    countries.map((country)=>(
                        <option value={country.value} key={country.id}>{country.label}</option>
                    ))
                }
            </select>
        </div>
    )
}
