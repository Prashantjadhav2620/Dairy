// eslint-disable-next-line no-unused-vars
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";


import Home from './pages/home/Home.jsx';
import Order from './pages/order/Order.jsx';
import Cart from './pages/cart/Cart.jsx';
import Dashboard from './pages/admin/dashboard/Dashboard.jsx';
import NoPage from './pages/nopage/NoPage.jsx';
import MyState from "./context/data/myState";
import Login from './pages/registration/Login.jsx';
import Signup from './pages/registration/Signup.jsx';
import ProductInfo from './pages/productInfo/ProductInfo.jsx';
import AddProduct from './pages/admin/page/AddProduct.jsx';
import UpdateProduct from './pages/admin/page/UpdateProduct.jsx';
import {ToastContainer} from 'react-toastify';

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/order" element={
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
          } />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/dashboard" element={
            <ProtectedRoutesForAdmin><Dashboard /></ProtectedRoutesForAdmin>
          } />
          <Route path="/productinfo/:id" element={<ProductInfo/>} />
          <Route path="/login" element={<Login/>}  />
          <Route path='/signup'element={<Signup/>} />
          <Route path="/addproduct" element={
            <ProtectedRoutesForAdmin><AddProduct /></ProtectedRoutesForAdmin>} />
          <Route path="/updateproduct" element={
            <ProtectedRoutesForAdmin><UpdateProduct /></ProtectedRoutesForAdmin>} />
          <Route path="/*" element={<NoPage/>} />
        </Routes>
        <ToastContainer/>
    </Router>
    </MyState>
  )
}

export default App



// user

// eslint-disable-next-line react/prop-types
export const ProtectedRoutes = ({ children }) => {  
  const user = localStorage.getItem('user')
  if (user) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}

//admin

// eslint-disable-next-line react/prop-types
export const ProtectedRoutesForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  console.log(admin.user.email)
  if (admin.user.email === "admin123@gmail.com") {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}


// //dealer
// // eslint-disable-next-line react/prop-types
// export const ProtectedRoutesForDealer = ({children}) => {
//   const admin = JSON.parse(localStorage.getItem('user'))
//   console.log(admin.user.email)
//   if (admin.user.email === 'knupadhyay784@gmail.com') {
//     return children
//   }
//   else {
//     return <Navigate to='/login' />
//   }
// }