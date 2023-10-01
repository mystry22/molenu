import React, { useEffect, useState } from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import { defaultBodyStyles } from '../shared/helper';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { urlPointer } from '../shared/helper';
import { selectedSize } from '../shared/validation';
import { fetchIP } from '../shared/functions';
import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import Info from '../shared/Userdetails';
import SocialMedia from '../shared/SocialMedia';
import FlashMsg from '../shared/FlashMsg';





export default function ViewProduct() {
  const history = useHistory();
  const { ref } = useParams();
  const [prodInfo, setProdInfo] = useState([]);
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [ip, setIp] = useState();
  const [sizeError, setSizeError] = useState('');
  const [displayFlash, setDisplayFlash] = useState(false);

  const checkSize = (size) => {
    const mesize = selectedSize(size)
    setSizeError(mesize);
    if (sizeError !== null) {
      return 'error'
    } else {
      return 'ok'
    }
  }


  const addtocart = async (e) => {
    e.preventDefault();

    if (size) {
      setSizeError('');
      const data = {
        prod_id: prodInfo.prod_id,
        prod_name: prodInfo.prod_name,
        price: prodInfo.price,
        image_link: prodInfo.image_link,
        description: prodInfo.description,
        user_ip: localStorage.getItem('i_ran_zyyx'),
        size: size,
        qty: qty,
      }

      const req = await axios.post(urlPointer + '/api/cart/addtocart', data);
      setDisplayFlash(true)
      //alert(req.data);
    } else {

      setSizeError('Please enter a valid size');

    }


  }
  const updateSize = (e) => {
    e.preventDefault();
    setSize(e.target.value);

  }
  const getSelected = async () => {

    const data = {
      prod_id: ref.substring(4)
    }
    const products = await axios.post(urlPointer + '/api/product/productinfo', data);
    setProdInfo(products.data);
    setPrice(products.data.price);


  }

  const doInc = (e) => {
    e.preventDefault();
    let newQty = qty + 1;
    setQty(newQty);


  }

  const doDed = (e) => {
    e.preventDefault();
    let newQty = qty - 1;
    setQty(newQty);

    if (newQty < 1) {
      setQty(1);

    }

  }

  const getUserIp = async () => {
    const userIp = await fetchIP();
    setIp(userIp);
  }
  useEffect(() => {
    getSelected();
    getUserIp();

  }, [])
  return (
    <React.Fragment>
      <div style={defaultBodyStyles}>
        <Info />
        <Menu />
        <div className='row'>
          <div className='col-lg-6'>
            <div className='viewProd'>

              <div className='imgholder'>
                <img src={prodInfo.image_link} />
              </div>
            </div>

          </div>
          <div className='col-lg-6'>
            <div className='viewProdDetails'>
              <form>

                <h1>{prodInfo.prod_name}</h1>
                <h6 className='prodDesc'>{prodInfo.description}</h6>
                <span >N{prodInfo.price} <strike style={{ opacity: 0.5 }}>N{prodInfo.old_price}</strike></span><br />
                <select name='size' required onChange={updateSize}>
                  <option value=''>Size</option>
                  <option value='40'>40</option>
                  <option value='41'>41</option>
                  <option value='42'>42</option>
                  <option value='43'>43</option>
                  <option value='44'>44</option>
                  <option value='45'>45</option>
                  <option value='46'>46</option>
                </select><br />
                {sizeError ? <span style={{ color: 'red' }}>{sizeError}</span> : null}<br />
                {/* {
                  displayFlash ? <FlashMsg /> : null
                } */}
                <button className='indec' onClick={doDed}><FaMinus /></button>
                <input type='text' name='qty' size='2' value={qty} style={{ textAlign: 'center' }} />
                <button className='indec' onClick={doInc}><FaPlus /></button><br />
                <FlashMsg addtocart={addtocart} displayFlash={displayFlash} setDisplayFlash={setDisplayFlash} />
                <SocialMedia />
              </form>
            </div>
          </div>

        </div>

      </div>


      <Footer />
    </React.Fragment>

  )
}