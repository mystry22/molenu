import React from 'react';
import {FaFacebook} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {FaTwitter} from 'react-icons/fa';




function SocialMedia() {
  return (
    <div className='socialMedia'>
    
            <a href='#'><FaFacebook color='#198754' size={25} style={{marginRight:10}} /></a>
            <a href='#'><FaInstagram color='#198754' size={25} style={{marginRight:10}} /></a>
            <a href='#'><FaTwitter color='#198754' size={25} style={{marginRight:10}} /></a>

        
    </div>
  )
}

export default SocialMedia;