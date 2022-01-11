import React,{useEffect,useState} from 'react';
import Menu from '../shared/AdminMenu';
import Footer from '../shared/Footer';
import axios from 'axios';
import {urlPointer} from '../shared/helper';
import {useHistory} from 'react-router-dom';







export default function Pending(){
    const history = useHistory();
    const [orderInfo, setOrderInfo] = useState([]);
    const [isPend, setIsPend] = useState(false);

    const getAllWorking = async()=>{
      
        const products = await axios.get(urlPointer + '/api/order/allworking');
        if(products.data == 'None Available'){
            setIsPend(false);
        }else{
            setIsPend(true);
            setOrderInfo(products.data);
        }
        
        
        
    }
    

    useEffect(async()=>{
        getAllWorking(); 
        
       
    },[])
    return(
        <React.Fragment>
            

                <Menu />
                <div className='container'>
                  <div className='row'>
                      <div className='col-lg-12'>
                          {isPend ? 
                          
                           <table className='table'>
                               <tr>
                                  <th>Reference</th>
                                  <th>Date</th>
                               </tr>
                                

                                {orderInfo.map(order=>(
                                    <tr key={order.ref}>
                                        <td><a href={'/viewworking/:ref'+order.ref} className='anchor' >{order.ref}</a></td>
                                        <td> {order.order_date.substring(0,10)}</td>
                                    </tr>
                                ))}
                           </table>
                           :
                           <h1 style={{textAlign:'center'}}>Not Available</h1>
                        }
                      </div>
                   

                  </div>

                  </div>
            
            
        </React.Fragment>
        
    )
}