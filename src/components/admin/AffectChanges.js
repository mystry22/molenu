import React, { useEffect, useState } from 'react';
import Menu from '../shared/AdminMenu';
import Footer from '../shared/Footer';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { urlPointer } from '../shared/helper';
import { getCats } from '../shared/functions';





export default function AffectChanges() {
    const history = useHistory();
    const { ref } = useParams();
    const [prodInfo, setProdInfo] = useState([]);
    const [category, setCategory] = useState([]);
    const [prod_name, setProductName] = useState('');
    const [prod_desc, setProductDesc] = useState('');
    const [price, setPrice] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [cat_name, setCatName] = useState('');
    const [video, setVideo] = useState('');
    const [stock, setStock] = useState('');
    const [weight, setWeight] = useState('');
    const [price_usd, setPriceUsd] = useState('');
    const [old_price_usd, setOldPriceUsd] = useState('');
    const [display_home, setDisplayHome] = useState('');
    const prod_id = ref.substring(4);


    const updateDisplay = (e) => {
        e.preventDefault();
        setDisplayHome(e.target.value);
    }

    const updateCats = (e) => {
        e.preventDefault();
        setCatName(e.target.value);
    }
    const getSelected = async () => {

        const data = {
            prod_id: ref.substring(4)
        }
        const products = await axios.post(urlPointer + '/api/product/productinfo', data);
        setProdInfo(products.data);
        setDisplayHome(products.data.display_home);
        setCatName(products.data.cat_name);
        setProductName(products.data.prod_name);
        setProductDesc(products.data.description);
        setPrice(products.data.price);
        setOldPrice(products.data.old_price);
        setVideo(products.data.video)
        setWeight(products.data.weight);
        setStock(products.data.stock);
        setPriceUsd(products.data.price_usd);
        setOldPriceUsd(products.data.old_price_usd);


    }

    const allCats = async () => {
        const prodcat = await getCats();
        setCategory(prodcat.data);

    }

    const deleteProd = async (e) => {
        e.preventDefault();
        const data = {
            prod_id: prod_id
        }

        const feed = await axios.post(urlPointer + '/api/product/deleteproduct', data);
        if (feed.data == 'Product Deleted Successfuly') {
            alert('Product Deleted Successfuly');
        }
    }
    const updateProd = async (e) => {
        e.preventDefault();
        const data = {
            prod_id: prod_id,
            prod_name: prod_name,
            prod_desc: prod_desc,
            price: price,
            old_price: oldPrice,
            cat_name: cat_name,
            display_home: display_home,
            weight:weight,
            stock:stock,
            price_usd:price_usd,
            old_price_usd:old_price_usd
        }

        const response = await axios.post(urlPointer + '/api/product/editproduct', data);
        if (response.data = 'Product Edited Successfuly') {
            alert('Product Edited Successfuly');
        }
    }

    const updateName = (e) => {
        e.preventDefault();
        setProductName(e.target.value);
    }

    const updateDesc = (e) => {
        e.preventDefault();
        setProductDesc(e.target.value);
    }

    const updatePrice = (e) => {
        e.preventDefault();
        setPrice(e.target.value);
    }

    const updateOldPrice = (e) => {
        e.preventDefault();
        setOldPrice(e.target.value);
    }

    const updateVideoLink = (e) => {
        e.preventDefault();
        setVideo(e.target.value);
    }

    const updateStock = (e) => {
        e.preventDefault();
        setStock(e.target.value);
    }

    const updateWeight = (e) => {
        e.preventDefault();
        setWeight(e.target.value);
    }

    const updatePriceUsd = (e) => {
        e.preventDefault();
        setPriceUsd(e.target.value);
    }

    const updateOldPriceUsd = (e) => {
        e.preventDefault();
        setOldPriceUsd(e.target.value);
    }
    useEffect(() => {
        getSelected();
        allCats();

    }, [])
    return (
        <React.Fragment>


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
                    <div className='editprodinfo'>

                        <form>
                            <div className='row'><div className='col-lg-6'><label className='form-control'> Product name </label></div> <div className='col-lg-6'><input type='text' defaultValue={prod_name} className='form-control' onChange={updateName} /></div></div><br />
                            
                            <textarea className='form-control' defaultValue={prod_desc} onChange={updateDesc}></textarea><br />
                            <div className='row'><div className='col-lg-6'><label className='form-control'>Stock</label> </div> <div className='col-lg-6'><input type='text' className='form-control' defaultValue={stock} onChange={updateStock} /></div></div><br />
                            <div className='row'><div className='col-lg-6'><label className='form-control'> Price ₦ </label></div> <div className='col-lg-6'><input type='text' className='form-control' defaultValue={price} onChange={updatePrice} /></div></div><br />
                            <div className='row'><div className='col-lg-6'><label className='form-control'> Old Price ₦ </label></div> <div className='col-lg-6'><input type='text' className='form-control' defaultValue={oldPrice} onChange={updateOldPrice} /></div></div><br />
                            <div className='row'><div className='col-lg-6'><label className='form-control'> Price $ </label></div> <div className='col-lg-6'><input type='text' className='form-control' defaultValue={price_usd} onChange={updatePriceUsd} /></div></div><br />
                            <div className='row'><div className='col-lg-6'><label className='form-control'> Old Price $ </label></div> <div className='col-lg-6'><input type='text' className='form-control' defaultValue={old_price_usd} onChange={updateOldPriceUsd} /></div></div><br />
                            
                            <div className='row'><div className='col-lg-6'><label className='form-control'> Weight in KG </label></div> <div className='col-lg-6'><input type='text' className='form-control' defaultValue={weight} onChange={updateWeight} /></div></div><br />
                            <div className='row'><div className='col-lg-6'><label className='form-control'> Instagram video </label></div> <div className='col-lg-6'><input type='text' className='form-control' defaultValue={video} onChange={updateVideoLink} /></div></div><br />
                            <div className='row'><div className='col-lg-6'>
                            <select name='display_home' onChange={updateDisplay} required className='form-control'>
                                <option value=''>Display</option>
                                <option value='Shop'>Shop</option>
                                <option value='Home'>Home</option>
                                <option value='No'>No</option>

                            </select>
                                
                            </div> 
                            <div className='col-lg-6'><input type='' className='form-control' value={display_home} /></div></div><br />
                            
                            <div className='row'> <div className='col-lg-6'>
                            <select name='category' onChange={updateCats} required className='form-control'>
                                <option value=''>All Category</option>
                                {category.map(cats => (
                                    <option value={cats.cat_name} key={cats.cat_id}>{cats.cat_name}</option>
                                ))}
                            </select>
                            </div>

                            <div className='col-lg-6'>
                            <input type='text' value={cat_name} className='form-control' />
                            </div>
                            
                            </div> <br />
                            

                            

                            


                            <button className='form-control' onClick={updateProd}>Update</button>  <br />


                            <button className='form-control' onClick={deleteProd}>Delete</button>





                        </form>
                    </div>
                </div>
            </div>
            <Footer />

        </React.Fragment>

    )
}