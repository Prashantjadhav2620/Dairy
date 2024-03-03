
import React, { useContext, useEffect,useState } from 'react';
import myContext from '../../context/data/myContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'jspdf-autotable'; 


export default function CashOnDeliveryPage() {
  const context = useContext(myContext);
  const { address, productsDetails , setproductsDetails,orderIds,CreateOrder} = context;

  useEffect(() => {
  }, [address]);

  const [OrderInfo, setOrderInfo] = useState({
    Order_Id: null,
    User_Id: null,
    Email_Id: null,
    Date: null,
    AddressInfo: null,
    OrderDetailsInfo: [null],
    PaymentMethod: null,
  });

  const navigate = useNavigate();
  // const [orderData, setOrderData] = useState(null);

  const handleCancelOrder = () => {
    const isConfirmed = window.confirm("Are you sure you want to cancel the order?");
    
    if (isConfirmed) {
      // Reset order data or set it to null when the order is canceled
      setproductsDetails([]);
      toast.warning("Order is Cancel !!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 0,
      });
      // Navigate to the 'cart' page
      navigate('/cart');
    }
  }
  const handleAddProduct = () => {
      navigate('/cart');
  }
  
  function generateNewOrderID(orderID = "AB-999") {
    if (orderID == null || orderID === undefined) {
        orderID = "AB-999";
    }

    const LETTERS = [
        'A', 'B', 'C', 'D', 'E', 'F',
        'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z'
    ];

    let parts = orderID.split('-');
    let letters = parts[0];
    let digits = parseInt(parts[1], 10); // Convert digits to integer
    let newDigits = digits + 1;
    let i = LETTERS.indexOf(letters[0]);
    let j = LETTERS.indexOf(letters[1]) ;
    // let j = LETTERS.indexOf(letters[1]) + 1;

    if (newDigits > 9999) {
        newDigits = 1000;
        j++;
        if (j >= 26) {
            i++;
            j = 0;
            if (i >= 26) {
                i = 0;
            }
        }
        letters = `${LETTERS[i]}${LETTERS[j]}`;
    }

    const newOrderID = `${letters}-${newDigits}`;
    return newOrderID;
}

const handleConfirmOrder = () => {
  const orderId = generateNewOrderID(orderIds);
  const currentDateTime = new Date().toISOString(); 
   const PayMethod="Cash On Delivery";
   const UserId =JSON.parse(localStorage.getItem('user'));
   const userid= UserId.data.User.Uid;
   const EmailId =JSON.parse(localStorage.getItem('user'));
   const useremail= EmailId.data.User.Email;
  // const userid = JSON.parse(localStorage.getItem('user')).user.uid;
  // const useremail= JSON.parse(localStorage.getItem('user')).user.emailId;
  
  // const setOrderInfo = {
  //   Order_Id: orderId,
  //   User_Id: userid,
  //   Email_Id: useremail,
  //   Date: currentDateTime,
  //   AddressInfo: address,
  //   OrderDetailsInfo: productsDetails,
  //   PaymentMethod: PayMethod,
  //   IsActive: true,
  // };
  // CreateOrder(OrderInfo)
  setOrderInfo({
    Order_Id: orderId,
    User_Id: userid,
    Email_Id: useremail,
    Date: currentDateTime,
    AddressInfo: address,
    OrderDetailsInfo: productsDetails,
    PaymentMethod: PayMethod,
    IsActive: true,
  });

  console.log("setOrderInfo",setOrderInfo)
  CreateOrder(OrderInfo);

  // navigate(`/Report`);
}



  return (
    <div className=' bg-blue-900'>
       <div className='flex items-center justify-center bg-blue-100'>
          <h1 className="text-2xl font-bold mb-4 mt-3">Order confirm!</h1>
        </div>
        <div className='flex flex-wrap bg-blue-900'>
          {/* Address Details */}
          <div className='w-full lg:w-1/2 p-4'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-2xl font-bold mb-4'>Address Details</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='font-bold'>Name: {address.Name}</p>
                </div><br></br>
                <div>
                  <p className='font-bold'>Address:{address.Address}</p>
                </div><br></br>
                <div>
                  <p className='font-bold'>Pincode:{address.pincode}</p>
                </div><br></br>
                <div>
                  <p className='font-bold'>Mobile Number:{address.MobileNo}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className='w-full lg:w-1/2 p-4'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-2xl font-bold mb-4'>Product Details</h3>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr>
                      <th className='text-left'>Product Name</th>
                      <th className='text-left'>Quantity</th>
                      <th className='text-left'>Unit Price</th>
                      <th className='text-left'>Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsDetails.map((product, index) => {
                      const productCost = product.quantity * product.product_Price; // Calculate product cost
                      return (
                        <tr key={index}>
                          <td className='py-2'>{product.product_Name}</td>
                          <td className='py-2'>{product.quantity}</td>
                          <td className='py-2'>{product.product_Price}</td>
                          <td className='py-2'>{productCost}</td>
                        </tr>
                      );
                    })}
                    {/* Separator Line */}
                    <tr>
                      <td colSpan="4" className='border-t font-bold'></td>
                    </tr>
                    {/* Total Cost Row */}
                    <tr>
                      <td colSpan="3" className='py-2 font-bold text-right'>Total Cost:</td>
                      <td className='py-2 font-bold'>
                        {productsDetails.reduce((total, product) => total + product.quantity * product.product_Price, 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </div>


        <div className='flex flex-wrap bg-blue-900'>
          {/* Order Actions */}
          <div className='w-full lg:w-1/2 p-4'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-2xl font-bold mb-4'>Order Actions</h3>
              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded-md'
                    onClick={() => handleAddProduct()}
                  >
                    Add Product
                  </button>
                </div>
                <div>
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded-md'
                    onClick={() => handleCancelOrder()}
                  >
                    Cancel Order
                  </button>
                </div>
                <div>
                  <button
                    className='bg-green-500 text-white px-4 py-2 rounded-md'
                    // onClick={() => handleConfirmOrder()}
                    onClick={() => handleConfirmOrder()}
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
}
