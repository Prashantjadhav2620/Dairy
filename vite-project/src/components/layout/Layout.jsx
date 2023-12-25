// eslint-disable-next-line no-unused-vars
import React from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
