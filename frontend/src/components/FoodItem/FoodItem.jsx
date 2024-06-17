import React, { useContext, useState } from 'react'
import './foodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
const FoodItem = ({id,name,price,description,image}) => {

  // const [itemCount, setItemCount] = useState(0)
  // const {cartItems,addToCart,removeFromCart} = useContext(StoreContext);
  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);   // used this for including the url as to load the images from the backend

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        {/* <img className='food-item-image' src={image}  alt="" />        // fetched from assests */}
        <img className='food-item-image' src={url + "/images/"+image}  alt="" />

        {/* {!itemCount 
          ? <img className='add' onClick={() => setItemCount(prev => prev+1)} src={assets.add_icon_white} alt="" />
          : <div className="food-item-counter">
              <img onClick={() => setItemCount(prev => prev-1)}  src={assets.remove_icon_red} alt="" />
              <p>{itemCount}</p>
              <img onClick={() => setItemCount(prev => prev+1)}  src={assets.add_icon_green} alt="" />
            </div>
        } */}

        {!cartItems[id]                                                                                // used this as rendering the items for adding to cartList and removing directly from storeContext acoording to the id
          ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
          : <div className="food-item-counter">
              <img onClick={() => removeFromCart(id)}  src={assets.remove_icon_red} alt="" />
              <p>{cartItems[id]}</p>
              <img onClick={() => addToCart(id)}  src={assets.add_icon_green} alt="" />
            </div>
        }

      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
