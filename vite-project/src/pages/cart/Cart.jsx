// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import AddCardData from './AddCardData';
import CartEmpty from './EmptyCart';


function Cart() {
  const user = JSON.parse(localStorage.getItem('user'))
  const context = useContext(myContext)
  const { mode ,ProductTotalAmount ,shipping,grandTotal,setGrandTotal} = context;

  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart)
  // console.log(cartItems)
  
  // const shipping = parseInt(100);
  const Total = shipping + ProductTotalAmount
  setGrandTotal(Total)


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems])

  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const buyNow = async () => {
    // validation 
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    }
    console.log("addressInfo",addressInfo)

    var options = {
      key: "",
      key_secret: "",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "Kisan App",
      description: "for testing purpose",
      handler: function (response) {

        // console.log(response)
        toast.success('Payment Successful')

        const paymentId = response.razorpay_payment_id
        console.log("paymentId",paymentId)

        // store in firebase 
        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId
        }

        try {
          // eslint-disable-next-line no-unused-vars, no-undef
          const result = addDoc(collection(fireDB, "orders"), orderInfo)
          console.log("result",result)
        } catch (error) {
          console.log(error)
        }
      },

      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay)
  }

  return (
    <Layout >
      <>
        <div className="f-screen bg-gray-100 pt-5" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
          <h1 className="mb-10 text-center text-2xl font-bold">Shopping Cart</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            
            {user?<AddCardData/>:<> <CartEmpty/></>
            }
            
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
                <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{ProductTotalAmount}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
                <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shipping}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between mb-3">
                <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
                <div className>
                  <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{grandTotal}</p>
                </div>
              </div>
              
              <Modal 
                  name={name} 
                  address={address} 
                  pincode={pincode} 
                  phoneNumber={phoneNumber} 
                  setName={setName} 
                  setAddress={setAddress} 
                  setPincode={setPincode} 
                  setPhoneNumber={setPhoneNumber} 
                  buyNow={buyNow} 
                  />
                  
            </div>
          </div>
        </div>
        </>
    </Layout>
  )
}

export default Cart