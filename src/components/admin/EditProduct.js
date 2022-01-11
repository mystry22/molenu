import React,{useEffect,useState} from 'react';
import Menu from '../shared/AdminMenu';
import Footer from '../shared/Footer';
import axios from 'axios';
import {urlPointer} from '../shared/helper';
import {getProdInfo} from '../shared/functions';
import {useHistory} from 'react-router-dom';
import {BarLoader} from 'react-spinners';






export default function ProductImage(){
    const history = useHistory();
    const [prodInfo, setProdInfo] = useState([]);
    
    const id = 1234;

   

    const uploadImage = async ()=>{
        
    }

    const getAllProds = async()=>{
      
        const products = await axios.post(urlPointer + '/api/product/allproducts');
        setProdInfo(products.data);
        
        
    }
    

    useEffect(async()=>{
        getAllProds(); 
       
    },[])
    return(
        <React.Fragment>
            

                <Menu />
                
                  <div className='row'>
                      <div className='col-lg-6'>
                          {prodInfo.map(prods=>(

                        <div className='row'>

                            <div className='col-lg-12'>
                                <div className='editproduct'>
                                    <div className='row'>
                                        <div className='col-lg-5'>
                                            <div className='editimage'>
                                                <img src={prods.image_link} />
                                            </div>
                                        </div>
                                        <div className='col-lg-7'>
                                            <div className='editprodinfo'>
                                                <h4>{prods.description}</h4>
                                                <hr />
                                                <span>{prods.price} <strike>{prods.old_price}</strike></span><br/ >
                                                
                                                <h4>{prods.prod_name}</h4><br />
                                                <a href={'/changes/:ref'+prods.prod_id} ><button >Edit</button></a>
                                            </div>
                                        </div>
                                </div>

                                </div>
                            </div>

                            </div>
                            ))}
                      </div>
                    
                    <div className='col-lg-6'>
                        <div className='sidebar'>
                            <ul>
                                <li className='list'><a className='anchor' href='/addproduct'>Add Products</a></li>
                                <li className='list'><a className='anchor' href='/editproduct'>Edit Products</a></li>
                                <li className='list'><a className='anchor' href='/addcategory'>Add Category</a></li>
                                <li className='list'><a className='anchor' href='/removecategory'>Remove Category</a></li>
                            </ul>
                        </div>
                    </div>

                  </div>

                
                <Footer />
            
        </React.Fragment>
        
    )
}