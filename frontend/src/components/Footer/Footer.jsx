import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {

  const openSocialMediaPage = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            {/* <img src={assets.logo} alt="" /> */}
            <Link to="/" className='logo-container'>
              <img src="/delishdrop_logo(1).png" className="logo" alt="" />
              <img src="/logo2.png" className='logo-back' alt="" />
            </Link>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui provident molestiae vel, totam voluptatem reprehenderit quo. Porro ducimus aliquid quod temporibus similique quam praesentium maxime. Quasi commodi impedit nam quaerat.</p>
            <div className="footer-social-icons">
                {/* <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" /> */}


                <img onClick={() => openSocialMediaPage('https://www.facebook.com')} src={assets.facebook_icon} alt="" />
                <img onClick={() => openSocialMediaPage('https://www.x.com')} src={assets.twitter_icon} alt="" />
                <img onClick={() => openSocialMediaPage('https://www.linkedin.com')} src={assets.linkedin_icon} alt="" />

            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-211-2452343</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>
        Copyright 2024 &copy; Tomato.com - All Right Reserved. 
      </p>
    </div>
)
}

export default Footer
