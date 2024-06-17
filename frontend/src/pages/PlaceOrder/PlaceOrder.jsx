import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import './placeOrder.css'

import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  // const {getTotalCartAmount} = useContext(StoreContext)          // before taking data from backend
  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext)       // after integrating stripe

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data,[name]:value}))
  }

  const placeorder = async (event) => {
    event.preventDefault()
    let orderItems = []
    food_list.map((item) => {
      if(cartItems[item._id]>0){
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    // console.log(orderItems);
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount() + 2,
    }
    let response = await axios.post(url + "/api/order/place",orderData,{headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url)
    }
    else{
      alert("Error")
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount() == 0){
      navigate('/cart')
    }
  },[token])

  // useEffect(() => {
  //   console.log(data);
  // },[data])


  return (
    <form onSubmit={placeorder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          {/* <input type="text" placeholder='First name' /> */}
          {/* <input type="text" placeholder='Last name' /> */}
          <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        {/* <input type="email" placeholder='Email address' /> */}
        {/* <input type="text" placeholder='Street' /> */}
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          {/* <input type="text" placeholder='City' />
          <input type="text" placeholder='State' /> */}
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          {/* <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='Country' /> */}
          <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        {/* <input type="text" placeholder='Phone' /> */}
        <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
