// // eslint-disable-next-line no-unused-vars
// import React from 'react'
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate
// } from "react-router-dom";


// import Home from './pages/home/Home.jsx';
// import Order from './pages/order/Order.jsx';
// import Cart from './pages/cart/Cart.jsx';
// import Dashboard from './pages/admin/dashboard/Dashboard.jsx';
// import NoPage from './pages/nopage/NoPage.jsx';
// import MyState from "./context/data/myState";
// import Login from './pages/registration/Login.jsx';
// import Signup from './pages/registration/Signup.jsx';
// import ProductInfo from './pages/productInfo/ProductInfo.jsx';
// import AddProduct from './pages/admin/page/AddProduct.jsx';
// import UpdateProduct from './pages/admin/page/UpdateProduct.jsx';
// import {ToastContainer} from 'react-toastify';
// import CheckoutForm from './pages/checkout/CheckoutForm.jsx';
// import AddDeliveryAgent from './pages/admin/page/AddDeliveryAgent.jsx';
// // import UpdateDeliveryAgent from './pages/admin/page/UpdateDeliveryAgent.jsx';
// // import DeliveryAgentManagement from './pages/admin/page/DeliveryAgentManagement.jsx';
// import CashOnDelivery from './components/modal/CashOnDelivery.jsx';
// // import CashOnDeliveryPage from './components/modal/CashOnDeliveryPage.jsx';
// import Report from './components/report/Report.jsx';
// import ImageComponent from './pages/fetchImg/ImageComponent.jsx';
// import CheckData from './pages/checkData/checkData.jsx';
// import BOBURL from './pages/BOBURL/BOBURL.jsx';
// import PdfViewer from  './pages/viewPdf/PdfViewer.jsx';
// import FormDataSender from './pages/admin/page/FormDataSender.jsx';
// import UpdateDeliveryAgent from './pages/admin/page/UpdateDeliveryAgent.jsx';
// import showOrderDetails from './pages/showOrderDetails/showOrderDetails.jsx';

// function App() {
//   return (
//     <MyState>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home/>} />
//           <Route path="/order" element={
//             <ProtectedRoutes>
//               <Order />
//             </ProtectedRoutes>
//           } />
//           <Route path="/cart" element={<Cart/>} />
//           <Route path="/dashboard" element={
//             <ProtectedRoutesForAdmin><Dashboard /></ProtectedRoutesForAdmin>
//           } />
//           <Route path="/productinfo/:id" element={<ProductInfo/>} />
//           <Route path="/login" element={<Login/>}  />
//           <Route path='/signup'element={<Signup/>} />
//           <Route path="/addproduct" element={
//             <ProtectedRoutesForAdmin><AddProduct /></ProtectedRoutesForAdmin>} />
//           <Route path="/updateproduct" element={
//             <ProtectedRoutesForAdmin><UpdateProduct /></ProtectedRoutesForAdmin>} />
//           <Route path="/CheckoutForm" element={<CheckoutForm/>} />
//           <Route path="/AddDeliveryAgent" element={<ProtectedRoutesForAdmin><AddDeliveryAgent/></ProtectedRoutesForAdmin>} />
//           {/* <Route path="/UpdateDeliveryAgent" element={<ProtectedRoutesForAdmin><UpdateDeliveryAgent/></ProtectedRoutesForAdmin>} /> */}
//           <Route path="/CashOnDelivery" element={<ProtectedRoutes><CashOnDelivery/></ProtectedRoutes>} />
//           <Route path="/*" element={<NoPage/>} />
//           <Route path="/report" element={<Report/>} />
//           <Route path="/ImageComponent" element={<ImageComponent/>} />
//           <Route path="/checkData" element={<CheckData/>} />
//           <Route path="/BOBURL" element={<BOBURL/>} />
//           <Route path="/PdfViewer" element={<PdfViewer/>} />
//           <Route path="/FormDataSender" element={<FormDataSender/>} />
//           <Route path="/UpdateDeliveryAgent" element={<UpdateDeliveryAgent/>} />
//           <Route path="/showOrderDetails" element={<showOrderDetails/>} />
// \        </Routes>
//         <ToastContainer/>
//     </Router>
//     </MyState>
//   )
// }

// export default App

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
import CheckoutForm from './pages/checkout/CheckoutForm.jsx';
import AddDeliveryAgent from './pages/admin/page/AddDeliveryAgent.jsx';
// import UpdateDeliveryAgent from './pages/admin/page/UpdateDeliveryAgent.jsx';
// import DeliveryAgentManagement from './pages/admin/page/DeliveryAgentManagement.jsx';
import CashOnDelivery from './components/modal/CashOnDelivery.jsx';
// import CashOnDeliveryPage from './components/modal/CashOnDeliveryPage.jsx';
import Report from './components/report/Report.jsx';
import ImageComponent from './pages/fetchImg/ImageComponent.jsx';
import CheckData from './pages/checkData/checkData.jsx';
import BOBURL from './pages/BOBURL/BOBURL.jsx';
import PdfViewer from  './pages/viewPdf/PdfViewer.jsx';
import FormDataSender from './pages/admin/page/FormDataSender.jsx';
import UpdateDeliveryAgent from './pages/admin/page/UpdateDeliveryAgent.jsx';
import OrderDetails from './pages/showOrderDetails/showOrderDetails.jsx';
// import showOrderDetails from './pages/showOrderDetails/showOrderDetails.jsx';

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
          <Route path="/CheckoutForm" element={<CheckoutForm/>} />
          <Route path="/AddDeliveryAgent" element={<ProtectedRoutesForAdmin><AddDeliveryAgent/></ProtectedRoutesForAdmin>} />
          {/* <Route path="/UpdateDeliveryAgent" element={<ProtectedRoutesForAdmin><UpdateDeliveryAgent/></ProtectedRoutesForAdmin>} /> */}
          <Route path="/CashOnDelivery" element={<ProtectedRoutes><CashOnDelivery/></ProtectedRoutes>} />
          <Route path="/*" element={<NoPage/>} />
          <Route path="/report" element={<Report/>} />
          <Route path="/ImageComponent" element={<ImageComponent/>} />
          <Route path="/checkData" element={<CheckData/>} />
          <Route path="/BOBURL" element={<BOBURL/>} />
          <Route path="/PdfViewer" element={<PdfViewer/>} />
          <Route path="/FormDataSender" element={<FormDataSender/>} />
          <Route path="/UpdateDeliveryAgent" element={<UpdateDeliveryAgent/>} />
          <Route path="/OrderDetails" element={<OrderDetails/>} />
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