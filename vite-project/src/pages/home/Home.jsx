//eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial';
//import myContext from '../../context/data/myContext'

function Home() {
 
  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard/>
      <Track/>
      <Testimonial />
    </Layout>
  )
}

export default Home