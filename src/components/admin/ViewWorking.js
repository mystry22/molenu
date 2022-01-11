import React,{useEffect,useState} from 'react';
import Menu from '../shared/AdminMenu';
import Footer from '../shared/Footer';
import axios from 'axios';
import {urlPointer} from '../shared/helper';
import {useHistory,useParams} from 'react-router-dom';







export default function Working(){
    const {ref} = useParams();
    const history = useHistory();
    const [orderInfo, setOrderInfo] = useState([]);
    const [msg, setMsg] = useState('');
    
    const getAllRef = async()=>{
        const data = {
            ref:ref.substring(4)
        }
    
        const products = await axios.post(urlPointer + '/api/order/workingdetails',data);
        setOrderInfo(products.data);
        
        
        
    }

    const updateStatus =async(e)=>{
        e.preventDefault();
        const option = e.target.value;
        const data ={
            ref:ref.substring(4),
            ip: localStorage.getItem('i_ran_zyyx')
        }
        const request = await axios.post(urlPointer + '/api/order/setready',data);
        if(request.data == 'updated'){
            setMsg('Update Successful');
            setTimeout(()=>{
                history.push('/working')
            },3000)
        }
    }
    

    useEffect(()=>{
        getAllRef(); 
        
       
    },[])
    return(
        <React.Fragment>
            

                <Menu />
                <div className='container'>
                  <div className='row'>
                      <div className='col-lg-12'>
                         {msg ? <div className='alert alert-success'>{msg}</div> : null} 
                          {orderInfo ?
                          <table className='table'>
                              <tr>
                                  <th>Product Name</th>
                                  <th>Product Id</th>
                                  <th>Reference</th>
                                  <th>Size</th>
                                  <th>Qty</th>
                                  <th>Select</th>
                                  
                              </tr>
                          
                            
                           
                          {orderInfo.map(pending=>(
                                <tr key={pending.ref}>
                                    <td>{pending.prod_name}</td>
                                    <td>{pending.prod_id}</td>
                                    <td>{pending.ref}</td>
                                    <td>{pending.size}</td>
                                    <td>{pending.qty}</td>
                                    <td><select onChange={updateStatus}>
                                        <option value=''>Option</option>
                                        <option value='Working'>Ready</option>
                                        
                                        </select></td>
                                
                                </tr>
                            ))}
                            </table>
                          :
                          <h1 style={{textAlign:'center'}}>No Working</h1>
                        }
                        
                      </div>
                   

                  </div>

                  </div>
                
            
        </React.Fragment>
        
    )
}