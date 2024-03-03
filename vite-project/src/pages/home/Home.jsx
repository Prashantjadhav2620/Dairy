//eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
//import myContext from '../../context/data/myContext'
// import HeroSection from '../../components/heroSection/HeroSection'
import Layout from '../../components/layout/Layout'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
// import Testimonial from '../../components/testimonial/Testimonial'
import {  useSelector } from 'react-redux'
//import { useDispatch, useSelector } from 'react-redux'
// import { addToCart, deleteFromCart } from '../../redux/cartSlice'


function Home() {
  
  return (
    <Layout>
      {/* <HeroSection /> */}
      <Filter />
      <ProductCard />
      <Track />
      {/* <Testimonial /> */}

    </Layout>
  )
}

export default Home