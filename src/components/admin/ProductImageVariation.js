import React, { useEffect, useState, useContext } from 'react';
import Menu from '../shared/AdminMenu';
import Footer from '../shared/Footer';
import axios from 'axios';
import { urlPointer } from '../shared/helper';
import { useHistory } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { CartContext } from '../../context/CartContext'







export default function ProductImageVariation() {
    const history = useHistory();
    const { prods } = useContext(CartContext);
    const [image, setImageUpload] = useState('');
    const [msg, setMsg] = useState('');
    const [filename, setFilename] = useState('');
    const [imageFileData, setImageFileData] = useState('');
    const [isSpinner, setIsSpinner] = useState(false);
    const [nomenclature, setNomen] = useState('Save');
    const [prod_id, setProd] = useState('');
    const [variation,setVariation] = useState('');


    const setImage = (e) => {
        setMsg('');
        const file = e.target.files[0];
        setImageFileData(e.target.files[0]);
        setFilename(e.target.files[0].name);
        previewFile(file);

    }

    const setProdIdUpdate = (ev) => {
        ev.preventDefault();
        setProd(ev.target.value);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUpload(reader.result);
        }
    }
    const addimage = (ev) => {
        ev.preventDefault();
        setNomen('Saving Image ....');
        setMsg('');
        
        if (!image || !prod_id || !variation ) {
            setMsg('Do selection');
            setNomen('Save');
        }else{
            uploadImage(image);
        }

        
    }

    const uploadImage = async () => {
        
        const data = new FormData();
        data.append('prod_id', prod_id);
        data.append('file_name', filename);
        data.append('image', imageFileData);

        if(variation == 1){

            try {
                const response = await axios.post(urlPointer + '/api/product/addprodimagevariation1', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                if (response.data == 'Product Image Upload Successful') {
                    window.location.reload(true);
    
                } else {
                    alert(response.data);
                }
            } catch (error) {
    
            }

        }else{
            try {
                const response = await axios.post(urlPointer + '/api/product/addprodimagevariation2', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                if (response.data == 'Product Image Upload Successful') {
                    window.location.reload(true);
    
                } else {
                    alert(response.data);
                }
            } catch (error) {
    
            }
        }

        
    }



    return (
        <React.Fragment>


            <Menu />
            {isSpinner ? <BarLoader Loading /> :
                <div className='holder'>

                    <div className='addproduct' style={{ paddingLeft: 150, paddingRight: 150 }}>
                        <h1>Add Product Variation</h1>


                        {msg ? <span>{msg}</span> : null}
                        <form onSubmit={addimage}>

                            <select className='form-control' onChange={(ev) => setProdIdUpdate(ev)}>
                                <option value={''} >Select Product</option>
                                {
                                    prods.map(prod => (

                                        <option value={prod.prod_id} key={prod.prod_id}>{prod.prod_name}</option>


                                    ))
                                }

                            </select>

                            <input type="radio"  name='vari' value="1" onChange={(ev)=>setVariation(ev.target.value)} />
                            <label for="Variation1">Variation 1</label>
                            <input type="radio" name='vari'  value="2" onChange={(ev)=>setVariation(ev.target.value)} />
                            <label for="Variation2"> Variation 2</label>

                            <div className='imgholder'>
                                {image ? <img src={image} /> : <span>No Image to Preview</span>}
                                <input type='file' onChange={setImage} className='form-control' accept='images/*' />
                            </div>

                            

                                            <button className='form-control bg-warning text-light'>{nomenclature}</button>
                                        </form> 
                                    </div>

                                    <div className='sidebar'>
                                        <ul>
                                            <li className='list'><a className='anchor' href='/addproduct'>Add Products</a></li>
                                            <li className='list'><a className='anchor' href='/editproduct'>Edit Products</a></li>
                                            <li className='list'><a className='anchor' href='/addcategory'>Add Category</a></li>
                                            <li className='list'><a className='anchor' href='/removecategory'>Remove Category</a></li>
                                        </ul>
                                    </div>
                                </div>

            }
                                <Footer />

                            </React.Fragment>

                            )
}