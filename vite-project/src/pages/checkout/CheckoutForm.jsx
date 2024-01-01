// import React, { useContext, useState } from 'react'
// import myContext from '../../context/data/myContext';

// const CheckoutForm = () => {
//   const context = useContext(myContext)
//   const { mode , } = context;

//   const [deliveryAddress, setDeliveryAddress] = useState({
//     name: '',
//     addressLine1: '',
//     addressLine2: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     deliveryInstructions: '',
//   });

//   const [paymentMethod, setPaymentMethod] = useState('');

//   const handleInputChange = (field, value) => {
//     setDeliveryAddress({
//       ...deliveryAddress,
//       [field]: value,
//     });
//   };

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add logic for submitting the order, handling payments, etc.
//     console.log('Order Submitted:', { deliveryAddress, paymentMethod });
//   };

//   return (
//     <div className="f-screen bg-gray-100 pt-5" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
//           <h1 className="mb-10 text-center text-2xl font-bold">Checkout</h1>
//           <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"></div>
//           <div className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start">
//         {/* <div className="max-w-4xl mx-auto p-4"> */}
//         <div className="rounded-lg md:w-2/3">

//           {/* Delivery Address */}
//           <div className="mt-4">
//             <h2 className="text-xl ml-10 font-semibold">1 Delivery address</h2>
//             <form className="mt-2">
//               <label className="block mb-2">Name:</label>
//               <input
//                 className="h-full border p-2"
//                 type="text"
//                 value={deliveryAddress.name}
//                 onChange={(e) => handleInputChange('name', e.target.value)}
//               />

//               {/* Other address fields go here */}

//               <label className="block mt-2 mb-2">Delivery Instructions:</label>
//               <textarea
//                 className="w-full border p-2"
//                 value={deliveryAddress.deliveryInstructions}
//                 onChange={(e) => handleInputChange('deliveryInstructions', e.target.value)}
//               />

//               <button className="bg-blue-500 text-white px-4 py-2 mt-2" type="submit">
//                 Change
//               </button>
//             </form>
//           </div>

//           {/* Payment Method */}
//           <div className="mt-4">
//             <h2 className="text-xl font-semibold">2 Select a payment method</h2>
//             <div className="mt-2">
//               <label className="flex items-center mb-2">
//                 <input
//                   type="radio"
//                   value="balance"
//                   checked={paymentMethod === 'balance'}
//                   onChange={() => handlePaymentMethodChange('balance')}
//                   className="mr-2"
//                 />
//                 Your available balance
//               </label>
//               {/* Other payment methods go here */}
//             </div>
//           </div>

//           {/* Offers */}
//           <div className="mt-4">
//             <h2 className="text-xl font-semibold">3 Offers</h2>
//             {/* Offer details go here */}
//           </div>

//           {/* Order Summary */}
//           <div className="mt-4">
//             <h2 className="text-xl font-semibold">Order Summary</h2>
//             {/* Order summary details go here */}
//             <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
//                   <div className="mb-2 flex justify-between">
//                     <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
//                     <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{10}</p>
//                   </div>
//                   <div className="flex justify-between">
//                     <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
//                     <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{10}</p>
//                   </div>
//                   <hr className="my-4" />
//                   <div className="flex justify-between mb-3">
//                     <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
//                     <div className>
//                       <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{10}</p>
//                     </div>
//                   </div>
                  
                  
//                 </div>
//           </div>

//           {/* Checkout Button */}
//           <div className="mt-4">
//             <button
//               className="bg-green-500 text-white px-4 py-2"
//               onClick={handleSubmit}
//               type="submit"
//             >
//               Place Order
//             </button>
//           </div>
//       </div>
//     </div>
//     </div>
//     // </div>
//   );
// };

// export default CheckoutForm;

import React, { useState } from 'react';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    country: 'Guernsey',
    fullName: '',
    streetNumber: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    pinCode: '',
    phone: '',
    useAsDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    // You can now use the formData state as needed, for example, send it to a server.
    console.log(formData);
    // Add additional logic for saving or processing the address.
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Enter a new delivery address</h2>

      <label className="block mb-2 ">
        <span className="text-gray-700">Country/Region</span>
        <input
          type="text"
          name="country"
          value={formData.country}
          readOnly
          className="form-input mt-1 block w-full border-green-500"
          style={{ border: '1px solid black', borderRadius: '5px' }}
        />
        <country/>
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Full Name</span>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="First and Last name"
          className="form-input mt-1 block w-full border-gray-500 "style={{ border: '1px solid black', borderRadius: '5px' }}
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Street Number</span>
        <input
          type="text"
          name="streetNumber"
          value={formData.streetNumber}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
          style={{ border: '1px solid black', borderRadius: '5px' }}
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Street Address</span>
        <input
          type="text"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          placeholder="P.O. box, company name, c/o"
          className="form-input mt-1 block w-full"
          style={{ border: '1px solid black', borderRadius: '5px' }}
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Apartment/Suite/Unit</span>
        <input
          type="text"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
          style={{ border: '1px solid black', borderRadius: '5px' }}
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">City</span>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
          style={{ border: '1px solid black', borderRadius: '5px' }}
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">State/Province/Region</span>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
          style={{ border: '1px solid black', borderRadius: '5px' }}
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">PIN Code</span>
        <input
          type="text"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
          style={{ border: '1px solid black', borderRadius: '5px' }}
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Phone Number</span>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
          style={{ border: '1px solid black', borderRadius: '5px' }}
        />
      </label>

      <label className="block mb-2">
        <input
          type="checkbox"
          name="useAsDefault"
          checked={formData.useAsDefault}
          onChange={handleChange}
          className="form-checkbox mt-1"
          style={{ border: '1px solid black', borderRadius: '5px' }}
        />
        <span className="ml-2 text-gray-700">Use as my default address</span>
      </label>

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Use this address
      </button>
    </div>
  );
};

// export default DeliveryAddressForm;

export default CheckoutForm;
