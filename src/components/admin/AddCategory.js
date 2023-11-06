import React, { useEffect, useState } from 'react';
import Menu from '../shared/AdminMenu';
import Footer from '../shared/Footer';
import { proCat, getCats } from '../shared/functions';
import axios from 'axios';
import { urlPointer } from '../shared/helper';
import { useHistory } from 'react-router-dom';





export default function Home() {
    const history = useHistory();
    const [category, setCategory] = useState([]);
    const [cat_name, setCatName] = useState('');

    const updatename = (ev) => {

        setCatName(ev.target.value);
    }



    const addcategory = (ev) => {
        ev.preventDefault();
        const data = {
            cat_name: cat_name,
            cat_id: proCat()
        }
        axios.post(urlPointer + '/api/product/addcategory', data)
            .then(res => {
                alert(res.data);
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
                            <h1>Add Category</h1>
                            <form onSubmit={addcategory}>
                                <select className='form-control' name='Category'>
                                    <option value=''>Available Category</option>
                                    {category.map(cat => (
                                        <option value={cat.cat_name} key={cat.cat_id}>{cat.cat_name}</option>
                                    ))}
                                </select><br />

                                <input type='text' name='category' required className='form-control' placeholder='Category Name' onChange={(ev) => updatename(ev)} /><br />
                                <button className='form-control bg-warning text-light'>Save Category</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </React.Fragment>

    )
}