import React,{useEffect,useState} from 'react';
import Menu from '../shared/AdminMenu';
import Footer from '../shared/Footer';
import axios from 'axios';
import {urlPointer} from '../shared/helper';
import {useHistory} from 'react-router-dom';
import {BarLoader} from 'react-spinners';






export default function ProductImage(){

    const history = useHistory();
    const [image,setImageUpload] = useState('');
    const [msg,setMsg] = useState('');
    const [filename, setFilename] = useState('');
    const [imageFileData,setImageFileData] = useState('');
    const [isSpinner, setIsSpinner] = useState(false);


    const prod_id = localStorage.getItem('prod_id');
    

    const setImage = (e)=>{
        setMsg('');
        const file = e.target.files[0];
        setImageFileData(e.target.files[0]); 
        setFilename(e.target.files[0].name);
        previewFile(file);
        
    }

    const previewFile = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            setImageUpload(reader.result);
        }
    }
    const addimage = (ev)=>{
        ev.preventDefault();
        setMsg('');
        setIsSpinner(true);
        if(!image){
            setMsg('No Image Selected');
        }

        uploadImage(image);
    }

    const uploadImage = async ()=>{
        const data = new FormData();
        data.append('image',imageFileData);
        data.append('file_name',filename);
        data.append('prod_id',prod_id);
        try{
          const response =  await axios.post(urlPointer + '/api/product/addprodimage',data,{
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                if(response.data == 'Product Image Upload Successful'){
                    setIsSpinner(false);
                    localStorage.removeItem(prod_id);
                    history.push('/addproduct');
                    
                }
        }catch(error){

        }
    }
    

   
    return(
        <React.Fragment>
            

                <Menu />
                {isSpinner ? <BarLoader Loading/> :
                  <div className='holder'>
                    <div className='addproduct'>
                        <h1>Add Product Image</h1>
                        {msg ? <span>{msg}</span> : null}
                       <form onSubmit={addimage}>
                        
                            <div className='imgholder'>
                                {image ? <img src={image} /> : <span>No Image to Preview</span> }
                                <input type='file' onChange={setImage} className='form-control' accept='images/*' />
                            </div>
                        
                        <button className='form-control bg-warning text-light'>Save</button>
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