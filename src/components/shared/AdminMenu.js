import React, { useEffect, useState } from 'react';
import {Nav,Navbar} from 'react-bootstrap';
import axios  from 'axios';
import { urlPointer } from './helper';
import {getPending,getWorking,getReady,getRejected} from '../shared/functions';




export default function Navigation() {
    const [cartSum,setCartSum] = useState('');
    const [pending, setPending] = useState('');
    const [working, setWorking] = useState('');
    const [ready, setReady] = useState('');
    const [rejected, setRejected] = useState('');

    const doPending = async()=>{
        const myPending = await getPending()
        setPending(myPending);
        
    }
    const doWorking = async()=>{
        const myWorking = await getWorking()
        setWorking(myWorking);
    }
    const doReady = async()=>{
        const myReady = await getReady()
        setReady(myReady);
    }
    const doRejected = async()=>{
        const myRejected = await getRejected()
        setRejected(myRejected);
    }

    

    useEffect(()=>{
        doPending();
        doWorking();
        doReady();
        doRejected();
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
                        <Nav.Link className="text-secondary" href="/addproduct"><span>AddProduct</span></Nav.Link>
                        <Nav.Link className="text-secondary" href="/editproduct"><span>EditProduct</span></Nav.Link>
                        <Nav.Link className="text-secondary" href="/addcategory"><span>AddCategory</span></Nav.Link>
                        <Nav.Link className="text-secondary" href="/removecategory"><span>RemoveCategory</span></Nav.Link>
                        {pending ? <Nav.Link className="text-secondary" href="/pending"><span>{pending}Pending</span></Nav.Link> : <Nav.Link className="text-secondary" href="/pending"><span>Pending</span></Nav.Link>}
                        {working ? <Nav.Link className="text-secondary" href="/working"><span>{working}Working</span></Nav.Link> : <Nav.Link className="text-secondary" href="/working"><span>Working</span></Nav.Link>}
                        {ready ? <Nav.Link className="text-secondary" href="/ready"><span>{ready}Ready</span></Nav.Link> : <Nav.Link className="text-secondary" href="/ready"><span>Ready</span></Nav.Link>}
                        {rejected ? <Nav.Link className="text-secondary" href="/rejected"><span>{rejected}Rejected</span></Nav.Link> : <Nav.Link className="text-secondary" href="/rejected"><span>Rejected</span></Nav.Link>}
                       
                    </Nav>
                
                    
                </Navbar.Collapse>
            </Navbar>
       
            </div>
       
        
    );
}

