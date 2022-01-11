import React, { useEffect, useState } from 'react';
import {Nav,Navbar} from 'react-bootstrap';
import axios  from 'axios';
import { urlPointer } from './helper';
import {FaShoppingCart} from 'react-icons/fa';




export default function Navigation() {
    const [cartSum,setCartSum] = useState('');

    const fetchIP =async()=>{
        const res = await axios.get('https://api.ipify.org?format=jsonp?callback=?');
        const data = {
            user_ip : res.data
        }
        const feed = await axios.post(urlPointer + '/api/cart/cartsum',data);
        setCartSum(feed.data);
        
        
    }

    useEffect(()=>{
        fetchIP();
    },[])

    return (

            <div className="menuWrap">
             <Navbar bg="" expand="lg">
                <Navbar.Brand className="text-secondary"><span style={{fontSize:'25px '}}>Molenu</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="container-fluid mr-auto">
                        
                        
                    </Nav>
                    <Nav>
                        <Nav.Link className="text-secondary" href="/"><span>Home</span></Nav.Link>
                        <Nav.Link className="text-secondary" href="/aboutus"><span>About</span></Nav.Link>
                        <Nav.Link className="text-secondary" href="/products"><span>Products</span></Nav.Link>
                        <Nav.Link className="text-secondary" href="/login"><span>SignIn</span></Nav.Link>
                        <Nav.Link className="text-secondary" href="/contact"><span>Contact</span></Nav.Link>
                       
                    </Nav>
                
                    
                </Navbar.Collapse>
            </Navbar>
       
            </div>
       
        
    );
}

