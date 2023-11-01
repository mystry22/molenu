import React,{useEffect,useState} from 'react';
import Menu from '../shared/AdminMenu';
import Footer from '../shared/Footer';
import {getCats,genProdId} from '../shared/functions';
import {checkName,checkDesc,checkNumber} from '../shared/validation';
import axios from 'axios';
import { urlPointer } from '../shared/helper';
import {useHistory} from 'react-router-dom';
import {allPostReqs} from '../shared/functions'





export default function Home(){
    const history = useHistory();
    const [category, setCategory] = useState([]);
    const [prod_name, setProdName] = useState('');
    const [prod_id, setProdId] = useState('');
    const [cat, setCat] = useState('');
    const [price, setPrice] = useState('');
    const [old_price, setOldPrice] = useState('');
    const [price_usd, setPriceUsd] = useState('');
    const [old_price_usd, setOldPriceUsd] = useState('');
    const [description, setDesc] = useState('');
    const [display_home, setDisplay] = useState('');
    const [video, setvideo] = useState('');


    const [proNameError, setProdNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [oldPriceError, setOldPriceError] = useState('');
    const [descError, setDescError] = useState('');
    const [price_usdErr, setPriceUsdErr] = useState('');
    const [oldPriceUsdError, setOldPriceUsdErrorr] = useState('');


    const setUpdateCat =(ev)=>{
        ev.preventDefault();
        setCat(ev.target.value);
    }

    const setUpdateProdName =(ev)=>{
        ev.preventDefault();
        setProdName(ev.target.value);
    }
    const setUpdatePrice =(ev)=>{
        ev.preventDefault();
        setPrice(ev.target.value);
    }
    const setUpdateOldPrice =(ev)=>{
        ev.preventDefault();
        setOldPrice(ev.target.value);
    }
    const setUpdateDesc =(ev)=>{
        ev.preventDefault();
        setDesc(ev.target.value);
    }
    const setUpdateDisplay =(ev)=>{
        ev.preventDefault();
        setDisplay(ev.target.value);
    }

    const setUpdatePriceUsd = (ev)=>{
        ev.preventDefault();
        setPriceUsd(ev.target.value);
    }

    const setUpdateOldPriceUsd = (ev)=>{
        ev.preventDefault();
        setOldPriceUsd(ev.target.value);
    }

    const setUpdatedVideoLink = (ev)=>{
        ev.preventDefault();
        setvideo(ev.target.value);
    }

    


    const doValidation = ()=>{
        const prodNameRes = checkName(prod_name);
        const priceRes = checkNumber(price);
        const oldPriceRes = checkNumber(old_price);
        const descRes = checkDesc(description);
        const oldPriceUsedRes = checkNumber(old_price_usd);
        const priceUsdRes = checkNumber(price_usd);
        

        setProdNameError(prodNameRes);
        setPriceError(priceRes);
        setOldPriceError(oldPriceRes);
        setDescError(descRes);
        setPriceUsdErr(priceUsdRes);
        setOldPriceError(oldPriceUsedRes)


        if(proNameError || priceError || oldPriceError || descError || price_usdErr || oldPriceUsdError){
            return 'err'
        }else{
            return 'ok'
        }
    }

    const addproduct = async(ev)=>{
        ev.preventDefault();

        const isValid = doValidation();
        const setCharForprodName = prod_name.toLowerCase();

        const data = {
            prod_name: setCharForprodName,
            prod_id: prod_id,
            price: price,
            old_price: old_price,
            cat_name: cat,
            description: description,
            display_home: display_home,
            image_link: urlPointer+'/products/',
            price_usd:price_usd,
            old_price_usd: old_price_usd,
            video:video

        };

        if(isValid == 'ok'){
            const res = await allPostReqs('/api/product/addproduct',data,'New Product Added');

            if(res == 'New Product Added'){
                localStorage.setItem('prod_id',prod_id);
                history.push('/addproductimage');
            }
            
        }else{
            
        }

       
    }
    
    const getAllCats = async()=>{
        const allCats = await getCats();
        setCategory(allCats.data);
    }

    useEffect(()=>{
        getAllCats();
        setProdId(genProdId());
    },[])
    return(
        <React.Fragment>
            

                <Menu />
                  <div className='container'>
                      <div className='col-lg-12'>
                    <div className='addproduct'>
                        <h1>Add Product</h1>
                        <form>

                        
                            <select required className='form-control' name='Category' onChange={(ev)=>setUpdateCat(ev)}>
                                <option value=''>Category</option>
                                {category.map(cat=>(
                                    <option value={cat.cat_name} key={cat.cat_id}>{cat.cat_name}</option>
                                ))}
                            </select><br />
                            <input type='text' name='prod_name' className='form-control' placeholder='Product Name' onChange={(ev)=>setUpdateProdName(ev)} /><br />
                            {proNameError ? <span className='formerror'>{proNameError}</span> : null}

                            <input type='text' name='price' className='form-control' placeholder='Price' required onChange={(ev)=>setUpdatePrice(ev)} /><br />
                            {priceError ? <span className='formerror'>{priceError}</span> : null}

                            <input type='text' name='old_price' className='form-control' placeholder='Old Price' required onChange={(ev)=>setUpdateOldPrice(ev)} /><br />
                            {oldPriceError ? <span className='formerror'>{oldPriceError}</span> : null}

                            <input type='text' name='old_price' className='form-control' placeholder='Old Price in USD' required onChange={(ev)=>setUpdateOldPriceUsd(ev)} /><br />
                            {oldPriceError ? <span className='formerror'>{oldPriceError}</span> : null}

                            <input type='text' name='old_price' className='form-control' placeholder='Price in USD' required onChange={(ev)=>setUpdatePriceUsd(ev)} /><br />
                            {oldPriceError ? <span className='formerror'>{oldPriceError}</span> : null}

                            <input type='text' name='video' className='form-control' placeholder='Video Link' onChange={(ev)=>setUpdatedVideoLink(ev)} /><br />
                            

                            <textarea required className='form-control' placeholder='product description (not more than 37 chars Long)' onChange={(ev)=>setUpdateDesc(ev)}>
                            

                            </textarea> <br />
                            {descError ? <span className='formerror'>{descError}</span> : null}
                            <select required className='form-control' name='display' onChange={(ev)=>setUpdateDisplay(ev)}>
                                <option value=''>Display</option>
                                <option value='Home'>Home</option>
                                <option value='Shop'>Shop</option>
                                <option value='no'>No</option>
                            </select><br />
                            <button className='form-control bg-warning text-light' onClick={(ev)=>addproduct(ev)}>Save Product</button>
                        </form>
                    </div>

                    </div>
                  </div>
                <Footer />
            
        </React.Fragment>
        
    )
}