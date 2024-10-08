import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';


const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("home");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const {getTotalCartAmount, token, setToken, setSearchQuery} = useContext(StoreContext)

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleCancelSearch = () => {
    setSearchQuery("");
    setIsSearchVisible(false);
  }

  return (
    <div className="nav">
      <div className='navbar'>
          {/* <Link to="/"><img src={assets.logo} alt="" className='logo'/></Link> */}
          <Link to="/" className='logo-container'>
            <img src="/delishdrop_logo(1).png" className="logo" alt="" />
            <img src="/logo2.png" className='logo-back' alt="" />
          </Link>

          <ul className="navbar-menu">

              {/* <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</li>
              <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</li>
              <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</li>
              <li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</li> */}

              <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
              <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
              <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
              <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>

          </ul>
          <div className="navbar-right">
            {/* <img src={assets.search_icon} alt="" /> */}

            {isSearchVisible ? (
              <div className='search-input-container'>
                <input 
                  className='search-input'
                  type="text" 
                  placeholder="Search..." 
                  onChange={handleSearchChange} 
                />
                <button className='cancel-btn' onClick={handleCancelSearch} >X</button>
              </div>
            ) : (
              <img 
                src={assets.search_icon} 
                alt="" 
                className="navbar-search-icon" 
                onClick={() => setIsSearchVisible(true)} 
              />
            )}

            <div className="navbar-search-icon">
              <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
              <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
            </div>
            {!token
              ?<button onClick={() => setShowLogin(true)}>Sign In</button>
              : <div className="navbar-profile">
                  <img src={assets.profile_icon} alt="" />
                  <ul className="navbar-profile-dropdown">
                    <li onClick={() => navigate('/myorders')} > <img src={assets.bag_icon} alt="" /> <p>Orders</p> </li>
                    <hr />
                    <li onClick={logout}> <img src={assets.logout_icon} alt="" /> <p>LogOut</p> </li>
                  </ul>
                </div>
            }
          </div>
      </div>
    </div>
  )
}

export default Navbar
