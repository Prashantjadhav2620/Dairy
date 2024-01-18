// // // eslint-disable-next-line no-unused-vars
// // import React, { useContext, useEffect, useState } from 'react'
// // import myContext from '../../context/data/myContext';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { deleteFromCart } from '../../redux/cartSlice';
// // import { toast } from 'react-toastify';

// // const AddCardData = () => {
    
    
// //   const context = useContext(myContext)
// //   const { mode } = context;

// //   const dispatch = useDispatch()
// //   const cartItems = useSelector((state) => state.cart)
// //   // console.log(cartItems)

// //   const [totalAmount, setTotalAmount] = useState(0);
// //   useEffect(() => {
// //     let temp = 0;
// //     cartItems.forEach((cartItem) => {
// //       temp = temp + parseInt(cartItem.product_Price)
// //     })
// //     setTotalAmount(temp);
// //     // console.log(temp)
// //   }, [cartItems])

// //   const shipping = parseInt(100);
// //   const grandTotal = shipping + totalAmount

// //   // add to cart
// //   const deleteCart = (item) => {
// //     dispatch(deleteFromCart(item))
// //     toast.success(`Deleted ${item.product_Name} from the cart`);
// //   }

// //   useEffect(() => {
// //     localStorage.setItem('cart', JSON.stringify(cartItems));
// //   }, [cartItems])


// //   return (
// //     <div className="rounded-lg md:w-2/3">
// //               {cartItems.map((item, index) => {
// //                 return (
// //                   // eslint-disable-next-line react/jsx-key
// //                     <div className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
// //                       <img src={item.product_Image_URL} alt="product-image" className="w-full rounded-lg sm:w-40" />
// //                       <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
// //                         <div className="mt-5 sm:mt-0">
// //                           <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.product_Name}</h2>
// //                           <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.product_Description}</h2>
// //                           <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.product_Price}</p>
// //                           <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Qty
// //                           <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
// //                           <select
// //                                 className="px-2 py-1 w-full rounded-md bg-yellow-400 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
// //                                 style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '' }}
// //                               >
// //                                 {[...Array(10).keys()].map((value) => (
// //                                   <option key={value + 1} value={value + 1}>
// //                                     {value + 1}
// //                                   </option>
// //                                 ))}
// //                               </select>

// //                         </div>
// //                           </p>
                          
// //                         </div>
// //                         <div onClick={()=> deleteCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
// //                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
// //                             <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
// //                           </svg>
// //                         </div>
// //                       </div>
// //                     </div>
// //                 )
// //               })}

// //             </div>
// //   )
// // }

// // export default AddCardData


// // // eslint-disable-next-line no-unused-vars
// // import React, { useContext, useEffect, useState } from 'react';
// // import myContext from '../../context/data/myContext';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { deleteFromCart } from '../../redux/cartSlice';
// // import { toast } from 'react-toastify';

// // const AddCardData = () => {
// //   const context = useContext(myContext);
// //   const { mode } = context;

// //   const dispatch = useDispatch();
// //   const cartItems = useSelector((state) => state.cart);

// //   const [quantityMap, setQuantityMap] = useState({}); // To store selected quantities for each item
// //   const [totalAmount, setTotalAmount] = useState(0);

// //   useEffect(() => {
// //     let temp = 0;
// //     cartItems.forEach((cartItem) => {
// //       const qty = quantityMap[cartItem.product_Id] || 1; // Default to 1 if quantity not selected
// //       temp = temp + parseInt(cartItem.product_Price) * qty;
// //     });
// //     setTotalAmount(temp);
// //   }, [cartItems, quantityMap]);

// //   const shipping = parseInt(100);
// //   const grandTotal = shipping + totalAmount;

// //   const deleteCart = (item) => {
// //     dispatch(deleteFromCart(item));
// //     toast.success(`Deleted ${item.product_Name} from the cart`);
// //   };

// //   const handleQuantityChange = (itemId, newQuantity) => {
// //     setQuantityMap((prevQuantityMap) => ({
// //       ...prevQuantityMap,
// //       [itemId]: newQuantity,
// //     }));
// //   };

// //   useEffect(() => {
// //     localStorage.setItem('cart', JSON.stringify(cartItems));
// //   }, [cartItems]);

// //   return (
// //     <div className="rounded-lg md:w-2/3">
// //       {cartItems.map((item, index) => {
// //         const selectedQuantity = quantityMap[item.product_Id] || 1; 
// //         return (
// //           <div key={index} className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}>
// //             <img src={item.product_Image_URL} alt="product-image" className="w-full rounded-lg sm:w-40" />
// //             <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
// //               <div className="mt-5 sm:mt-0">
// //                 <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
// //                   {item.product_Name}
// //                 </h2>
// //                 <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
// //                   {item.product_Description}
// //                 </h2>
// //                 <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
// //                   ₹{item.product_Price}
// //                 </p>
// //                 <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
// //                   Qty
                  
// //                   <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
// //                     <select
// //                       value={selectedQuantity}
// //                       onChange={(e) => handleQuantityChange(item.product_Id, e.target.value)}
// //                       className="px-2 py-1 w-full rounded-md bg-yellow-400 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
// //                       style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '' }}
// //                     >
// //                       {[...Array(10).keys()].map((value) => (
// //                         <option key={value + 1} value={value + 1}>
// //                           {value + 1}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 </p>
// //               </div>
// //               <div onClick={() => deleteCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
// //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
// //                   <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
// //                 </svg>
// //               </div>
// //             </div>
// //           </div>
// //         );
// //       })}
// //       <div className="mt-4">
// //         <p className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
// //           Subtotal: ₹{totalAmount}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddCardData;



// // eslint-disable-next-line no-unused-vars
// import React, { useContext, useEffect, useState } from 'react';
// import myContext from '../../context/data/myContext';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteFromCart } from '../../redux/cartSlice';
// import { toast } from 'react-toastify';

// const AddCardData = () => {
//   const context = useContext(myContext);
//   const { mode ,ProductSubCost} = context;

//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart);

//   const [quantityMap, setQuantityMap] = useState({});
//   const [selectedProducts, setSelectedProducts] = useState({}); // To store selected products with their checkbox states
//   const [totalAmount, setTotalAmount] = useState(0);

//   ProductSubCost(totalAmount);
//   useEffect(() => {
//     let temp = 0;
//     cartItems.forEach((cartItem) => {
//       const qty = quantityMap[cartItem.product_Id] || 1;
//       const isSelected = selectedProducts[cartItem.product_Id] || false;

//       // Calculate cost only for selected products
//       if (isSelected) {
//         temp = temp + parseInt(cartItem.product_Price) * qty;
//       }
//     });
//     // ProductSubCost(temp)
//     setTotalAmount(temp);
//   }, [cartItems, quantityMap, selectedProducts]);

//   const shipping = parseInt(100);
//   const grandTotal = shipping + totalAmount;

//   // eslint-disable-next-line no-unused-vars
//   const ttl=()=>{
//     return totalAmount
//   } 

//   const deleteCart = (item) => {
//     dispatch(deleteFromCart(item));
//     toast.success(`Deleted ${item.product_Name} from the cart`);
//   };

//   const handleQuantityChange = (itemId, newQuantity) => {
//     setQuantityMap((prevQuantityMap) => ({
//       ...prevQuantityMap,
//       [itemId]: newQuantity,
//     }));
//   };

//   const handleCheckboxChange = (itemId, isChecked) => {
//     setSelectedProducts((prevSelectedProducts) => ({
//       ...prevSelectedProducts,
//       [itemId]: isChecked,
//     }));
//   };

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   return (
//     <div className="rounded-lg md:w-2/3 ">
//       {cartItems.map((item, index) => {
//         const selectedQuantity = quantityMap[item.product_Id] || 1;
//         const isSelected = selectedProducts[item.product_Id] || false;

//         return (
//           <div
//             key={index}
//             className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
//             style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}
//           >
//             <img src={item.product_Image_URL} alt="product-image" className="w-full rounded-lg sm:w-40" />
//             <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
//               <div className="mt-5 sm:mt-0">
//                 <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
//                   {item.product_Name}
//                 </h2>
//                 <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
//                   {item.product_Description}
//                 </h2>
//                 <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
//                   ₹{item.product_Price}
//                 </p>
//                 <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
//                   Qty
//                   <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
//                     <select
//                       value={selectedQuantity}
//                       onChange={(e) => handleQuantityChange(item.product_Id, e.target.value)}
//                       className="px-2 py-1 w-full rounded-md bg-yellow-400 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
//                       style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '' }}
//                     >
//                       {[...Array(10).keys()].map((value) => (
//                         <option key={value + 1} value={value + 1}>
//                           {value + 1}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </p>
//                 {/* Checkbox for each product */}
//                 <label className="mt-2 flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={isSelected}
//                     onChange={(e) => handleCheckboxChange(item.product_Id, e.target.checked)}
//                     className="mr-2"
//                   />
//                   Include in Total
//                 </label>
//               </div>
//               <div onClick={() => deleteCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default AddCardData;


// import React, { useContext, useEffect, useState } from 'react';
// import myContext from '../../context/data/myContext';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteFromCart } from '../../redux/cartSlice';
// import { toast } from 'react-toastify';

// const AddCardData = () => {
//   const context = useContext(myContext);
//   const { mode, ProductSubCost } = context;

//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart);

//   const [quantityMap, setQuantityMap] = useState({});
//   const [selectedProducts, setSelectedProducts] = useState({});
//   const [cartMap, setCartMap] = useState({}); // To store unique products in the cart
//   const [totalAmount, setTotalAmount] = useState(0);

//   useEffect(() => {
//     const tempCartMap = {};
//     cartItems.forEach((cartItem) => {
//       const itemId = cartItem.product_Id;
//       tempCartMap[itemId] = tempCartMap[itemId] || { ...cartItem, quantity: 0 };
//       tempCartMap[itemId].quantity += 1;
//     });
//     setCartMap(tempCartMap);
//   }, [cartItems]);

//   useEffect(() => {
//     let temp = 0;
//     Object.values(cartMap).forEach((cartItem) => {
//       const qty = quantityMap[cartItem.product_Id] || 1;
//       const isSelected = selectedProducts[cartItem.product_Id] || false;

//       // Calculate cost only for selected products
//       if (isSelected) {
//         temp = temp + parseInt(cartItem.product_Price) * qty;
//       }
//     });
//     setTotalAmount(temp);
//   }, [cartMap, quantityMap, selectedProducts]);

//   ProductSubCost(totalAmount)

//   const shipping = parseInt(100);
//   const grandTotal = shipping + totalAmount;

//   const deleteCart = (item) => {
//     dispatch(deleteFromCart(item));
//     toast.success(`Deleted ${item.product_Name} from the cart`);
//   };

//   const handleQuantityChange = (itemId, newQuantity) => {
//     setQuantityMap((prevQuantityMap) => ({
//       ...prevQuantityMap,
//       [itemId]: newQuantity,
//     }));
//   };

//   const handleCheckboxChange = (itemId, isChecked) => {
//     setSelectedProducts((prevSelectedProducts) => ({
//       ...prevSelectedProducts,
//       [itemId]: isChecked,
//     }));
//   };

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   return (
//     <div className="rounded-lg md:w-2/3">
//       {Object.values(cartMap).map((item, index) => {
//         console.log("cartMap",cartMap)
//         const selectedQuantity = quantityMap[item.product_Id] || 1;
//         const isSelected = selectedProducts[item.product_Id] || false;

//         return (
//           <div
//             key={index}
//             className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
//             style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}
//           >
//             <img src={item.product_Image_URL} alt="product-image" className="w-full rounded-lg sm:w-40" />
//             <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
//               <div className="mt-5 sm:mt-0">
//                 <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
//                   {item.product_Name}
//                 </h2>
//                 <h2 className="text-sm text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
//                   {item.product_Description}
//                 </h2>
//                 <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
//                   ₹{item.product_Price}
//                 </p>
//                 <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
//                   Qty
//                   <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
//                     <select
//                       value={selectedQuantity}
//                       onChange={(e) => handleQuantityChange(item.product_Id, e.target.value)}
//                       className="px-2 py-1 w-full rounded-md bg-yellow-400 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
//                       style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '' }}
//                     >
//                       {[...Array(10).keys()].map((value) => (
//                         <option key={value + 1} value={value + 1}>
//                           {value + 1}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </p>
//                 {/* Checkbox for each product */}
//                 <label className="mt-2 flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={isSelected}
//                     onChange={(e) => handleCheckboxChange(item.product_Id, e.target.checked)}
//                     className="mr-2"
//                   />
//                   Include in Total
//                 </label>
//               </div>
//               <div onClick={() => deleteCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default AddCardData;

// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

const AddCardData = () => {
  const context = useContext(myContext);
  const { mode, ProductSubCost,productsDetails , setproductsDetails ,setShipping} = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [quantityMap, setQuantityMap] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});
  const [cartMap, setCartMap] = useState({}); // To store unique products in the cart
  const [totalAmount, setTotalAmount] = useState(0);

  // const [productsDetails , setproductsDetails] = useState([]);

  useEffect(() => {
    const tempCartMap = {};
    cartItems.forEach((cartItem) => {
      const itemId = cartItem.product_Id;
      tempCartMap[itemId] = tempCartMap[itemId] || { ...cartItem, quantity: 0 };
      tempCartMap[itemId].quantity += 1;
    });
    setCartMap(tempCartMap);
  }, [cartItems]);

  useEffect(() => {
    let temp = 0;
    Object.values(cartMap).forEach((cartItem) => {
      const qty = quantityMap[cartItem.product_Id] || 1;
      const isSelected = selectedProducts[cartItem.product_Id] || false;

      // Calculate cost only for selected products
      if (isSelected) {
        temp = temp + parseInt(cartItem.product_Price) * qty;
      }
    });
    setTotalAmount(temp);
  }, [cartMap, quantityMap, selectedProducts]);

  ProductSubCost(totalAmount);

   setShipping(0)
  // const grandTotal = shipping + totalAmount;

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success(`Deleted ${item.product_Name} from the cart`);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [itemId]: newQuantity,
    }));
    
  };

  // const handleCheckboxChange = (itemId, isChecked) => {
  //   setSelectedProducts((prevSelectedProducts) => ({
  //     ...prevSelectedProducts,
  //     [itemId]: isChecked,
  //   }));

  //   const selectedProductDetails = cartMap[itemId];

  //   // Update the productsDetails state
  //   setproductsDetails((prevProductsDetails) => {
  //     if (isChecked) {

  //       // If the product is selected, add it to the state
  //       return [...prevProductsDetails, selectedProductDetails];
  //     } else {
  //       // If the product is deselected, remove it from the state
  //       return prevProductsDetails.filter((product) => product.product_Id !== itemId);
  //     }
  //   });

  // };

  const handleCheckboxChange = (itemId, isChecked) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [itemId]: isChecked,
    }));
  
    const selectedProductDetails = cartMap[itemId];
  
    // Update the productsDetails state
    setproductsDetails((prevProductsDetails) => {
      if (isChecked) {
        // If the product is selected, add it to the state
        return [
          ...prevProductsDetails,
          { ...selectedProductDetails, quantity: quantityMap[itemId] || 1 },
        ];
      } else {
        // If the product is deselected, remove it from the state
        return prevProductsDetails.filter(
          (product) => product.product_Id !== itemId
        );
      }
    });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  useEffect(()=>{
     
    console.log("productsDetails",productsDetails)
  })

  return (
    <div className="rounded-lg md:w-2/3">
      {Object.values(cartMap).map((item, index) => {
        console.log("item",item)
        const selectedQuantity = quantityMap[item.product_Id] || item.quantity; // Use item.quantity from the cart
        const isSelected = selectedProducts[item.product_Id] || false;
      
        console.log("selectedQuantity",selectedQuantity)
        return (
          <div
            key={index}
            className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
            style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}
          >
            <img src={item.product_Image_URL} alt="product-image" className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  {item.product_Name}
                </h2>
                <h2 className="text-sm text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  {item.product_Description}
                </h2>
                <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  ₹{item.product_Price}
                </p>
                <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  Qty
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    <select
                      value={selectedQuantity}
                      // onChange={(e) => handleQuantityChange(item.product_Id, e.target.value||selectedQuantity)}
                      onChange={(e) => {
                        const newValue = e.target.value || e.value;
                        handleQuantityChange(item.product_Id, newValue);
                      }}
                      
                      className="px-2 py-1 w-full rounded-md bg-yellow-400 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                      style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '' }}
                    >
                      {[...Array(10).keys()].map((value) => (
                        <option key={value + 1} value={value + 1}>
                          {value + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </p>
                {/* Checkbox for each product */}
                <label className="mt-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => handleCheckboxChange(item.product_Id, e.target.checked)}
                    className="mr-2"
                  />
                  Include in Total
                </label>
              </div>
              <div onClick={() => deleteCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddCardData;
