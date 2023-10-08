import React from 'react';
import {FaFacebook,FaInstagram,FaTiktok} from 'react-icons/fa';








function SocialMedia() {
  return (
    <div className='socialMedia'>
    
            <a href='#'><FaFacebook color='#198754' size={25} style={{marginRight:10}} /></a>
            <a href='https://www.instagram/fancyfinery_'><FaInstagram color='#198754' size={25} style={{marginRight:10}} /></a>
            <a href='https://www.tiktok.com/fancyfinery'><FaTiktok color='#198754' size={25} style={{marginRight:10}} /></a>

            
    </div>
  );

}

export default SocialMedia;