import React, { useEffect, useState,useRef  } from 'react';
import Menu from '../shared/AdminMenu';
import Footer from '../shared/Footer';
import { proCat, getCats } from '../shared/functions';
import axios from 'axios';
import { urlPointer } from '../shared/helper';
import { useHistory } from 'react-router-dom';





export default function RemoveCategory() {
    const history = useHistory();
    const [category, setCategory] = useState([]);
    const cat_id = useRef();

    // const updateCatID  = (e)=>{
    //     e.preventDefault();
    //     setCatId(e.target.value);
    // }
    
    const removecategory = (ev) => {
        ev.preventDefault();
        const data = {
            
            cat_id: cat_id.current.value
        }
        axios.post(urlPointer + '/api/product/removecategory', data)
            .then(res => {
                alert(res.data);
            window.location.reload(true)
            })
    }


    useEffect(async () => {
        const allCats = await getCats();
        setCategory(allCats.data);

    }, [])
    return (
        <React.Fragment>


            <Menu />
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='addproduct'>
                            <h1>Remove Category</h1>
                            <form onSubmit={removecategory}>
                                <select className='form-control' name='Category' ref={cat_id} >
                                    <option value=''>Available Category</option>
                                    {category.map(cat => (
                                        <option value={cat.cat_id} key={cat.cat_id}>{cat.cat_name}</option>
                                    ))}
                                </select><br />

                                
                                <button className='form-control bg-warning text-light'>Delete Category</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </React.Fragment>

    )
}