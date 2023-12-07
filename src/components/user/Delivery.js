import React, { useState, useContext,useEffect } from 'react';
import { defaultBodyStyles } from '../shared/helper';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import { allStates } from '../shared/LGA';
import { CartContext } from '../../context/CartContext';
import { checkName, checkAddress, checkCity, checkPhone, } from '../shared/validation';
import { useHistory } from 'react-router-dom';
import Countries from '../shared/countries';
import axios from 'axios';
import { urlPointer } from '../shared/helper';


function Delivery() {
  const history = useHistory();
  const [nomen,setNomen] = useState('Continue')
  const {
    setDeliveryFee,
    countries, base_currency,

  } = useContext(CartContext);
  const [county, setCounty] = useState('');
  const [fname, setFname] = useState('');
  const [streeta, setStreeta] = useState('');
  const [cita, setCita] = useState('');
  const [phonee, setPhonee] = useState('');
  const [sstata, setSStata] = useState('');
  const [lgaaa, setLgaaa] = useState('');
  const [delierryAmount, setDelierryAmount] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [fullnameError, setFullnameError] = useState('');
  const [addressErr, setAddressError] = useState('');
  const [CityErr, setCityError] = useState('');
  const [phoneErr, setPhoneError] = useState('');
  const [stateErr, setStateError] = useState('');





  const TestOp = (val) => {
    setSStata(val.target.value)
  }

  const setFee = (val) => {
    let lga = val.target.value

    const deliFee = parseInt(lga.substr(-4, 4));
    const delLga = lga.slice(0, -4)
    setLgaaa(delLga);
    setDeliveryFee(deliFee);

  }

  const Continue = async (ev) => {
    ev.preventDefault();
    setErrMsg('');
    setNomen('Saving...');
    
    const vali = validation();

    if (vali === 'err') {
      setNomen('Continue');
    } else {
      const data = {
        delivery_name: fname,
        delivery_country: county,
        street: streeta,
        city: cita,
        phone: phonee,
        delivery_state: sstata,
        user_ip: localStorage.getItem('i_ran_zyyx'),
        delivery_fee : delierryAmount,
        lga : lgaaa
      }

      const response = await axios.post(urlPointer +'/api/product/storedelivery',data);

      if(response.data == 'delivery info saved'){
        history.push('/payment');
      }else{
        alert(response.data)
        setNomen('Continue');
      }
      // if(states == 'Lagos' && countries == 'Nigeria'){
      //   const res = await saveDeliveryCost(4000);
      //   if(res.data == 'delivery set'){
      //     history.push('/payment');
      //   }else{
      //   setNomen('Continue');
      //     alert('Error saving details')
      //   }
      // }else if( states != 'Lagos' && countries == 'Nigeria'){
      //   await saveDeliveryCost(5000);
      //   history.push('/payment');
      // }else{
      //   history.push('/payment');
      // }
      

    }

  }

  const updateCurrency = async () => {
    //e.preventDefault();
    let curr = '';

    if(countries == 'Nigeria' && base_currency == '$'){
      await setShoppingcurrency('₦')
    }else if(countries != 'Nigeria' && base_currency == '₦'){
      await setShoppingcurrency('$')
    }else{

    }
    
}

const setShoppingcurrency = async(curr)=>{
  const data = {
    base_currency: curr,
    ip: localStorage.getItem('i_ran_zyyx')
}
const res = await axios.post(urlPointer + '/api/product/changecurrency', data);
if (res.data === 'currency update') {
    window.location.reload(true);
}
}





  const validation = async() => {
    const fnRes = checkName(fname);
    const addRes = checkAddress(streeta);
    const cityRes = checkCity(cita);
    const phoneRes = checkPhone(phonee);
    const stateRes = checkName(sstata);
    const countryRes = checkName(county);

   if(county == ''){
    setErrMsg('Please select a valid country');
    return 'err';
   }else if(countries == 'Nigeria'){
  
    if (sstata == 'Lagos') {
      if (stateRes || addRes || cityRes || phoneRes || stateRes || !lgaaa) {
        setErrMsg('Please check that you filled in valid informations');
        return 'err';
      } else {
        setDelierryAmount(4000)
        return 'ok';
      }
    } else if (sstata != 'Lagos' && sstata != '') {
      if (fullnameError || addressErr || CityErr || phoneErr || stateErr) {
        setErrMsg('Please check that you filled in valid informations');

        return 'err';
      } else {
        setDelierryAmount(5000)
        return 'ok';
      }
    } else {

      setErrMsg('One or more fieds failed validation');
      return 'err'
    }
   }
   
   else if(countries != 'Nigeria'){
    if(fnRes || addRes || cityRes || phoneRes){
      setErrMsg('One or more fieds failed validation');
      return 'err';
    }else{
      return 'ok';
    }
    
   }
}

useEffect(()=>{
  updateCurrency();

    document.title = "Fancy Finery | Delivery";
},[countries])





  return (
    <>
      <div style={defaultBodyStyles}>
        <Menu />
      </div>

      <div className='row' style={{ marginTop: 20 }}>

        <div className='col-lg-4'>

        </div>

        <div className='col-lg-4 signup' style={{ padding: 30 }}>

          <div style={{ fontWeight: 'bold', marginBottom: 1, fontSize: 20 }}> Delivery Address</div> <br />
          {
            errMsg ? <div style={{ color: 'red' }}>{errMsg}</div> : null
          }
          <form className='form'>

            <Countries setCounty={setCounty} setDelierryAmount={setDelierryAmount} /><br />

            <input className='form-control' placeholder='Full Name' Name='fullname' required onChange={(ev) => setFname(ev.target.value)} />
            {
              fullnameError ? <div style={{ color: 'red' }}>{fullnameError}</div> : null
            }
            <br />
            <input className='form-control' placeholder='Street Address' Name='address' required onChange={(ev) => setStreeta(ev.target.value)} />
            {
              addressErr ? <div style={{ color: 'red' }}>{addressErr}</div> : null
            }
            <br />
            <input className='form-control' placeholder='City' Name='City' required onChange={(ev) => setCita(ev.target.value)} />
            {
              CityErr ? <div style={{ color: 'red' }}>{CityErr}</div> : null
            }
            <br />
            <input className='form-control' placeholder='Phone' Name='number' required onChange={(ev) => setPhonee(ev.target.value)} />
            {
              phoneErr ? <div style={{ color: 'red' }}>{phoneErr}</div> : null
            }
            <br />

            {
              countries === 'Nigeria' ?

                <select className='form-control' onChange={(val) => TestOp(val)} required>
                  <option disabled selected>--Select State--</option>
                  <option value="Abia">Abia</option>
                  <option value="Adamawa">Adamawa</option>
                  <option value="Akwa Ibom">Akwa Ibom</option>
                  <option value="Anambra">Anambra</option>
                  <option value="Bauchi">Bauchi</option>
                  <option value="Bayelsa">Bayelsa</option>
                  <option value="Benue">Benue</option>
                  <option value="Borno">Borno</option>
                  <option value="Cross River">Cross River</option>
                  <option value="Delta">Delta</option>
                  <option value="Ebonyi">Ebonyi</option>
                  <option value="Edo">Edo</option>
                  <option value="Ekiti">Ekiti</option>
                  <option value="Enugu">Enugu</option>
                  <option value="FCT">Federal Capital Territory</option>
                  <option value="Gombe">Gombe</option>
                  <option value="Imo">Imo</option>
                  <option value="Jigawa">Jigawa</option>
                  <option value="Kaduna">Kaduna</option>
                  <option value="Kano">Kano</option>
                  <option value="Katsina">Katsina</option>
                  <option value="Kebbi">Kebbi</option>
                  <option value="Kogi">Kogi</option>
                  <option value="Kwara">Kwara</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Nasarawa">Nasarawa</option>
                  <option value="Niger">Niger</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Ondo">Ondo</option>
                  <option value="Osun">Osun</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Plateau">Plateau</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Sokoto">Sokoto</option>
                  <option value="Taraba">Taraba</option>
                  <option value="Yobe">Yobe</option>
                  <option value="Zamfara">Zamfara</option>
                </select>

                :

                null
            }



            <br />


            {
              sstata === 'Lagos' ?

                <select className='form-control' onChange={(val) => setFee(val)}>
                  <option>--Select LGA--</option>
                  {
                    allStates.map((lga) => (
                      <option key={lga.id} value={lga.name + lga.fee} >{lga.name}</option>
                    ))
                  }
                </select>

                :
                null
            }

            <br />

            <button className='homeButton' onClick={(ev) => Continue(ev)} style={{ color: '#fff' }}>{nomen}</button>

          </form>


        </div>

        <div className='col-lg-4'>

        </div>


      </div>

      <Footer />
    </>



  );
}

export default Delivery;