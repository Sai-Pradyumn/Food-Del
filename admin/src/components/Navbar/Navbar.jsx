import React from 'react'
import './navbar.css'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      {/* <img className="logo" src={assets.logo} alt="" /> */}

      <Link to="/" className='logo-container'>
        <img src="/delishdrop_logo(1).png" className="logo" alt="" />
        <img src="/logo2.png" className='logo-back' alt="" />
      </Link>

      <img className='profile' src="/saii.jpg" alt="" />
    </div>
  )
}

export default Navbar
