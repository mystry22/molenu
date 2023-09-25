import React,{useEffect,useState} from 'react';
import Menu from '../shared/AdminMenu';
import Footer from '../shared/Footer';
import {getCats,genProdId} from '../shared/functions';
import {checkName,checkDesc,checkNumber} from '../shared/validation';
import axios from 'axios';
import { urlPointer } from '../shared/helper';
import {useHistory} from 'react-router-dom';





export default function Home(){
    const history = useHistory();
    const [category, setCategory] = useState([]);
    const [prod_name, setProdName] = useState('');
    const [prod_id, setProdId] = useState('');
    const [cat, setCat] = useState('');
    const [price, setPrice] = useState('');
    const [old_price, setOldPrice] = useState('');
    const [description, setDesc] = useState('');
    const [display_home, setDisplay] = useState('');

    const [proNameError, setProdNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [oldPriceError, setOldPriceError] = useState('');
    const [descError, setDescError] = useState('');

    const [isValid, setIsValid] = useState(false);

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


    const doValidation = ()=>{
        setProdNameError(checkName(prod_name));
        setPriceError(checkNumber(price));
        setOldPriceError(checkNumber(old_price));
        setDescError(checkDesc(description));

        if(proNameError || priceError || oldPriceError || descError){
            setIsValid(false);
        }else{
            setIsValid(true);
        }
    }

    const addproduct = async(ev)=>{
        ev.preventDefault();
        setIsValid(false);

        doValidation();

        const data = {
            prod_name: prod_name,
            prod_id: prod_id,
            price: price,
            old_price: old_price,
            cat_name: cat,
            description: description,
            display_home: display_home,
            image_link: 'blank.jpg'
        };

        if(isValid){
            let feed =  await axios.post(urlPointer+ '/api/product/addproduct',data);
            if(feed.data == 'New Product Added'){
                localStorage.setItem('prod_id',prod_id);
                history.push('/addproductimage');
            }
        }else{
            
        }

       
    }
    
    const getAllCats = async()=>{
        const allCats = await getCats();
        console.log('Hello i am the prod cat' +allCats);
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
                        <form onSubmit={addproduct}>

                        
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

                            <textarea required className='form-control' placeholder='product description (not more than 37 chars Long)' onChange={(ev)=>setUpdateDesc(ev)}>
                            

                            </textarea> <br />
                            {descError ? <span className='formerror'>{descError}</span> : null}
                            <select required className='form-control' name='display' onChange={(ev)=>setUpdateDisplay(ev)}>
                                <option value=''>Display</option>
                                <option value='yes'>Yes</option>
                                <option value='no'>No</option>
                            </select><br />
                            <button className='form-control bg-warning text-light'>Save Product</button>
                        </form>
                    </div>

                    </div>
                  </div>
                <Footer />
            
        </React.Fragment>
        
    )
}