import React,{useEffect,useState} from 'react';
import Menu from '../shared/AdminMenu';
import Footer from '../shared/Footer';
import {useParams,useHistory} from 'react-router-dom';
import axios from 'axios';
import {urlPointer} from '../shared/helper';
import {getCats} from '../shared/functions';




export default function AffectChanges(){
  const history = useHistory();
  const {ref} = useParams();
  const [prodInfo, setProdInfo] = useState([]);
  const [category, setCategory] = useState([]);
  const [prod_name, setProductName] = useState('');
  const [prod_desc, setProductDesc] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [cat_name, setCatName] = useState('');
  const [video, setVideo] = useState('');
  const [display_home, setDisplayHome] = useState('');
  const prod_id = ref.substring(4);

   
    const updateDisplay =(e)=>{
        e.preventDefault();
        setDisplayHome(e.target.value);
    }

    const updateCats =(e)=>{
        e.preventDefault();
        setCatName(e.target.value);
    }
    const getSelected = async()=>{
      
      const data = {
        prod_id : ref.substring(4)
      }
      const products = await axios.post(urlPointer + '/api/product/productinfo',data);
      setProdInfo(products.data);
      setDisplayHome(products.data.display_home);
      setCatName(products.data.cat_name);
      setProductName(products.data.prod_name);
      setProductDesc(products.data.description);
      setPrice(products.data.price);
      setOldPrice(products.data.old_price);
      setVideo(products.data.video)
    }

    const allCats = async()=>{
        const prodcat = await getCats();
        setCategory(prodcat.data);
        
    }

    const deleteProd = async(e)=>{
        e.preventDefault();
        const data = {
            prod_id : prod_id
        }

        const feed = await axios.post(urlPointer +'/api/product/deleteproduct',data);
        if(feed.data == 'Product Deleted Successfuly'){
            alert('Product Deleted Successfuly');
        }
    }
    const updateProd = async(e)=>{
        e.preventDefault();
        const data = {
            prod_id: prod_id,
            prod_name: prod_name,
            prod_desc: prod_desc,
            price: price,
            old_price: oldPrice,
            cat_name: cat_name,
            display_home: display_home
        }

        const response = await axios.post(urlPointer + '/api/product/editproduct',data);
        if(response.data = 'Product Edited Successfuly'){
            alert('Product Edited Successfuly');
        }
    }

    const updateName =(e)=>{
        e.preventDefault();
        setProductName(e.target.value);
    }

    const updateDesc =(e)=>{
        e.preventDefault();
        setProductDesc(e.target.value);
    }

    const updatePrice =(e)=>{
        e.preventDefault();
        setPrice(e.target.value);
    }

    const updateOldPrice =(e)=>{
        e.preventDefault();
        setOldPrice(e.target.value);
    }

    const updateVideoLink =(e)=>{
        e.preventDefault();
        setVideo(e.target.value);
    }
    useEffect(()=>{
      getSelected();
      allCats();
      
    },[])
    return(
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

                                <input type='text' defaultValue={prod_name} className='form-control' onChange={updateName} /><br />
                                <textarea className='form-control' defaultValue={prod_desc} onChange={updateDesc}></textarea><br />
                                <input type='text' className='form-control' defaultValue={price} onChange={updatePrice}/> <br />
                                <input type='text' className='form-control' defaultValue={oldPrice} onChange={updateOldPrice} /><br />
                                <input type='text' className='form-control' defaultValue={video} onChange={updateVideoLink} /><br />

                                <select name='display_home' onChange={updateDisplay} required className='form-control'>
                                    <option value=''>Display</option>
                                    <option value='Shop'>Shop</option>
                                    <option value='Home'>Home</option>
                                    <option value='No'>No</option>

                                </select><br />
                                <input type='' className='form-control' value={display_home} /><br />

                                <select name='category' onChange={updateCats} required className='form-control'>
                                    <option value=''>All Category</option>
                                    {category.map(cats=>(
                                        <option value={cats.cat_name} key={cats.cat_id}>{cats.cat_name}</option>
                                    ))}
                                </select><br />
                                
                                <input type='text' value={cat_name} className='form-control' /><br />
                                
                                    
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