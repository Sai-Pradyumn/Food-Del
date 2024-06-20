import { useRef } from 'react'
import AppDownload from '../../components/AppDownload/AppDownload'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Header from '../../components/Header/Header'
import './home.css'

import React, { useState } from 'react'

const Home = () => {

    const [category,setCategory] = useState("All");
    const exploreMenuRef = useRef(null);

    const scrollToExploreMenu = () => {
        if (exploreMenuRef.current) {
            exploreMenuRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <div>
      <Header scrollToExploreMenu={scrollToExploreMenu} />
      <div ref={exploreMenuRef}>
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  )
}

export default Home
