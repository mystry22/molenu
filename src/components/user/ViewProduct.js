import React, { useEffect, useState, useContext } from 'react';
import Menu from '../shared/Menu';
import Footer from '../shared/Footer';
import { defaultBodyStyles, } from '../shared/helper';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { urlPointer } from '../shared/helper';
import { fetchIP } from '../shared/functions';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Info from '../shared/Userdetails';
import FlashMsg from '../shared/FlashMsg';
import { CartContext } from '../../context/CartContext';



export default function ViewProduct() {
  const history = useHistory();
  const { ref } = useParams();
  const [prodInfo, setProdInfo] = useState('');
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState('');
  const [priceUsd, setPriceUsd] = useState('');
  const [size, setSize] = useState('');
  const [heights, setHeights] = useState('');
  const [ip, setIp] = useState();
  const [sizeError, setSizeError] = useState('');
  const [weight, setWeight] = useState('');
  const [displayFlash, setDisplayFlash] = useState(false);
  const { setRefresh, totalWeight, setTotalWeight } = useContext(CartContext);
  const [nomenclature, setNomen] = useState('Add To Cart');
  const [displayImage, setDp] = useState('');

  const base_currency = localStorage.getItem('base_currency');


  const addtocart = async (e) => {
    e.preventDefault();
    setNomen('Adding....');
    const valiStock = await validateStock();
    const evalWeiht = doWeight(prodInfo.weight * qty);

    if (size && heights) {
      if (valiStock == 'ok' && evalWeiht == 'ok') {
        setSizeError('');

        const data = {
          prod_id: prodInfo.prod_id,
          prod_name: prodInfo.prod_name,
          price: prodInfo.price,
          price_usd: prodInfo.price_usd,
          image_link: prodInfo.image_link,
          description: prodInfo.description,
          user_ip: localStorage.getItem('i_ran_zyyx'),
          size: size,
          qty: qty,
          heights: heights,
          weight: prodInfo.weight * qty
        }

        const req = await axios.post(urlPointer + '/api/cart/addtocart', data);
        //const req = await allPostReqs('/api/cart/addtocart',data);
        if (req.data == 'Product Inserted Successfuly') {
          setNomen('Product Added');
          setRefresh('random rubish')
          setDisplayFlash(true)
        } else {
          setNomen('Add To Cart');
        }
      } else {
        setNomen('Add To Cart');
        alert('Sorry this product may be out of stock or the cummulative weight of the product is more than 4KG')
      }


    } else {
      setNomen('Add To Cart');
      setSizeError('Please enter a valid size and height');

    }


  }
  const updateSize = (e) => {
    e.preventDefault();
    setSize(e.target.value);

  }

  const updateHeight = (e) => {
    e.preventDefault();
    setHeights(e.target.value);

  }
  const getSelected = async () => {

    const data = {
      prod_id: ref.substring(4)
    }
    const products = await axios.post(urlPointer + '/api/product/productinfo', data);
    
    setProdInfo(products.data);
    setPrice(products.data.price);
    setPriceUsd(products.data.price_usd);
    setDp(products.data.image_link);


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

  const validateStock = async () => {

    const data = {
      prod_id: prodInfo.prod_id
    }

    const stockValue = await axios.post(urlPointer + '/api/product/getstockvalue', data);

    if (stockValue.data >= qty) {
      return 'ok';
    } else {
      return 'err'
    }

  }

  const getUserIp = async () => {
    const userIp = await fetchIP();
    setIp(userIp);
  }

  const doWeight = (weight) => {
    const currentTotalWeight = weight + totalWeight;
    if (currentTotalWeight > 4.0) {
      return 'err';
    } else {
      return 'ok';
    }
  }

  const changeImageDisplay = (image) => {
    if (image) {
      setDp(image)
    } else {

    }
  }

  useEffect(() => {

    document.title = "Fancy Finery | View Product"

    getSelected();
    getUserIp();

  }, [])
  return (
    <React.Fragment>
      <div style={defaultBodyStyles}>
        <Info />
        <Menu />

        {
          setProdInfo.length > 0 ?

            <div className='row'>
              <div className='col-lg-6'>
                <div className='viewProd'>

                  <div className='imgholder'>
                    <img src={displayImage} style={{width:'100%', height:450}} /> <br />
                  </div>

                  <div className='imgholder'>
                    <div className='row' >
                      <div className='col-lg-4  viewProdSmallImg'>

                        <a onClick={() => changeImageDisplay(prodInfo.image_link)} style={{ cursor: 'pointer', height:220 }}> <img src={prodInfo.image_link} /> </a>
                      </div>
                      <div className='col-lg-4 viewProdSmallImg'>
                        <a onClick={() => changeImageDisplay(prodInfo.image_variation1)} style={{ cursor: 'pointer', height:220 }}><img src={prodInfo.image_variation1} /> </a>
                      </div>
                      <div className='col-lg-4 viewProdSmallImg'>
                        <a onClick={() => changeImageDisplay(prodInfo.image_variation2)} style={{ cursor: 'pointer', height:220 }}><img src={prodInfo.image_variation2} /> </a>
                      </div>

                    </div>
                  </div>


                </div>

              </div>
              <div className='col-lg-6'>
                <div className='viewProdDetails'>
                  <form>

                    <h1>{prodInfo.prod_name}</h1>
                    <h6 className='prodDesc'>{prodInfo.description}</h6>
                    <span >{base_currency}{base_currency === '₦' ? prodInfo.price : prodInfo.price_usd} <strike style={{ opacity: 0.5 }}>{base_currency}{base_currency === '₦' ? prodInfo.old_price : prodInfo.old_price_usd}</strike></span><br />
                    <select name='size' required onChange={updateSize} >
                      <option value=''>Size [UK Sizes]</option>
                      <option value='4'>4</option>
                      <option value='6'>6</option>
                      <option value='8'>8</option>
                      <option value='10'>10</option>
                      <option value='12'>12</option>
                      <option value='14'>14</option>
                      <option value='16'>16</option>
                      <option value='18'>18</option>
                      <option value='20'>20</option>
                      <option value='22'>22</option>
                      <option value='24'>24</option>
                      <option value='26'>26</option>
                    </select><br />

                    <select name='size' required onChange={updateHeight}>
                      <option value=''>Height</option>
                      <option value='5.0ft-5.5ft'>5.0ft-5.5ft</option>
                      <option value='5.6ft-5.7ft'>5.6ft-5.7ft</option>
                      <option value='5.8ft-6.0ft'>5.8ft-6.0ft</option>

                    </select><br />

                    {sizeError ? <span style={{ color: 'red' }}>{sizeError}</span> : null}<br />
                    {/* {
                  displayFlash ? <FlashMsg /> : null
                } */}
                    <button className='indec' onClick={doDed}><FaMinus /></button>
                    <input type='text' name='qty' size='2' value={qty} style={{ textAlign: 'center', backgroundColor: '#fff' }} />
                    <button className='indec' onClick={doInc}><FaPlus /></button><br />
                    <FlashMsg addtocart={addtocart} displayFlash={displayFlash} setDisplayFlash={setDisplayFlash} nomenclature={nomenclature} />


                  </form>
                </div>
              </div>

            </div>

            :
            <div style={{ margin: 'auto', textAlign: 'center', marginTop: 30 }}>
              <div className='loader'></div>

              <div style={{ marginTop: 10 }}>{'Loading product information...'}</div>

            </div>
        }

      </div>


      <Footer />
    </React.Fragment>

  )
}