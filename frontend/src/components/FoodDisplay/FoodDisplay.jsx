import React, { useContext } from 'react'
import './foodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const { food_list, searchQuery } = useContext(StoreContext)

    const filteredFoodList = food_list.filter(item => {
      const matchesCategory = category === "All" || category === item.category;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
  });

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {/* {food_list.map((item,index) => {
          if(category === "All" || category === item.category){
            // return <FoodItem key={index} id={item.id} name={item.name} description={item.description} image={item.image} price={item.price} />    // if there is no _id then from the storeContext while adding items to cart all the id gets added (all ids render at a time) 
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} image={item.image} price={item.price} />
          }
        })} */}
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              image={item.image}
              price={item.price}
            />
          ))
        ) : (
            <p>No items found</p>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay
