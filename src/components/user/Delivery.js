import React,{useState,useContext} from 'react';
import { defaultBodyStyles } from '../shared/helper';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import {allStates} from '../shared/LGA';
import { CartContext } from '../../context/CartContext';
import {checkName,checkAddress,checkCity,checkPhone, } from '../shared/validation';
import { useHistory } from 'react-router-dom';

function Delivery() {
  const history = useHistory();
  const {
    setDeliveryFee,
    fullName,
    setFullName,
    address,setAddress,
    city,setCity,
    phone,setPhone,
    states,setStates,
    optLga, setOptLga,

  } = useContext(CartContext);
  const [errMsg, setErrMsg] = useState('');
  const [fullnameError, setFullnameError] = useState('');
  const [addressErr, setAddressError] = useState('');
  const [CityErr, setCityError] = useState('');
  const [phoneErr, setPhoneError] = useState('');
  const [stateErr, setStateError] = useState('');





  const TestOp = (val)=>{
    setStates(val.target.value)
  }

  const setFee = (val)=>{
    let lga = val.target.value
    
    const deliFee = parseInt(lga.substr(-4,4));
    const delLga = lga.slice(0,-4)
    setOptLga(delLga);
    setDeliveryFee(deliFee);
    
  }

  const Continue = async(ev)=>{
    ev.preventDefault();
    setErrMsg('');
    const vali = validation();
    
    

    if(vali === 'err'){

    }else{
      history.push('/payment')

    }
    
  }

  

  const validation =()=>{
    const fnRes = checkName(fullName);
    const addRes = checkAddress(address);
    const cityRes = checkCity(city);
    const phoneRes = checkPhone(phone);
    const stateRes = checkName(fullName);
    

    setFullnameError(fnRes);
    setAddressError(addRes);
    setCityError(cityRes);
    setPhoneError(phoneRes);
    setStateError(stateRes)

    if(states=='Lagos')
    {
      if(fullnameError || addressErr || CityErr || phoneErr || stateErr || !optLga ){
      setErrMsg('One or more fieds failed validation');
      
        return 'err';
      }else{
        return 'ok';
      }
    }else if(states != 'Lagos' && states != ''){
      if(fullnameError || addressErr || CityErr || phoneErr || stateErr ){
      setErrMsg('One or more fieds failed validation');

        return 'err';
      }else{
        setDeliveryFee(50);
        return 'ok';
      }
    }else{
      
      setErrMsg('Please Select A Valid State');
      return 'err'
    }

  }

  

  return (
    <>
      <div style={defaultBodyStyles}>
        <Menu />
      </div>

      <div className='row' style={{ marginTop:20}}>

        <div className='col-lg-4'>

        </div>

        <div className='col-lg-4 signup' style={{padding:30}}>

          <div style={{fontWeight:'bold',marginBottom:1,fontSize:20 }}> Delivery Address</div> <br />
          {
            errMsg ? <div style={{color:'red'}}>{errMsg}</div> : null
          }
          <form className='form'>

            <input className='form-control' placeholder='Full Name' Name='fullname' required onChange={(ev)=>setFullName(ev.target.value)} />
            {
            fullnameError ? <div style={{color:'red'}}>{fullnameError}</div> : null
            }
            <br />
            <input className='form-control' placeholder='Street Address' Name='address' required onChange={(ev)=>setAddress(ev.target.value)} />
            {
            addressErr ? <div style={{color:'red'}}>{addressErr}</div> : null
            }
            <br />
            <input className='form-control' placeholder='City' Name='City' required onChange={(ev)=>setCity(ev.target.value)} />
            {
            CityErr ? <div style={{color:'red'}}>{CityErr}</div> : null
            }
            <br />
            <input className='form-control' placeholder='Phone' Name='number' required onChange={(ev)=>setPhone(ev.target.value)} />
            {
            phoneErr ? <div style={{color:'red'}}>{phoneErr}</div> : null
            }
            <br />

            <select className='form-control' onChange={(val)=>TestOp(val)} required>
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

            <br />


            {
              states === 'Lagos' ? 

              <select className='form-control' onChange={(val)=>setFee(val)}>
                <option>--Select LGA--</option>
                {
                 allStates.map((lga)=>(
                  <option key={lga.id} value={lga.name + lga.fee} >{lga.name}</option>
                 )) 
                }
              </select>

              :
              null
            }

            <br />

            <button className='homeButton' onClick={(ev)=>Continue(ev)} style={{color:'#fff'}}>Continue</button>

          </form>


        </div>

        <div className='col-lg-4'>

        </div>


      </div>

      <Footer />
    </>



  )
}

export default Delivery;