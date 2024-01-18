
// // eslint-disable-next-line no-unused-vars
// import React,{useContext} from "react";
// import { FaPrint, FaFilePdf, FaPhoneAlt, FaCircle } from "react-icons/fa";
// import "tailwindcss/tailwind.css";
// import myContext from '../../context/data/myContext';
// // import { useNavigate } from 'react-router-dom';
// // import { toast } from 'react-toastify';

// export default function Report() {
//   // const navigate = useNavigate();
//   const context = useContext(myContext);
//   const { address, productsDetails} = context;

//   const subtotal = productsDetails.reduce((total, product) =>
//   total + product.quantity * product.product_Price,0);
//     const gstRate = 15; // GST rate in percentage
//     const gstAmount = (subtotal * gstRate) / 100;
//     const totalAmount = subtotal + gstAmount;

//     console.log("productsDetails Report",productsDetails)
//     const handlePrint = () => {
//       console.log("cliked")
//       const printWindow = window.open("", "_blank");
//       printWindow.document.write(`
//         <html>
//           <head>
//             <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
//             <style>
//               @media print {
//                 body * {
//                   visibility: hidden;
//                 }
//                 .max-w-3xl, .max-w-3xl * {
//                   visibility: visible;
//                 }
//                 .max-w-3xl {
//                   position: absolute;
//                   left: 0;
//                   top: 0;
//                 }
//               }
//             </style>
//           </head>
//           <body>${document.querySelector(".max-w-3xl").outerHTML}</body>
//         </html>
//       `);
//       printWindow.document.close();
//       printWindow.print();
//     };

//   return (
//     <div className="bg-blue-800">
//     <div className="py-5">
//       <div className="max-w-3xl mx-auto p-6 bg-white shadow-md">
//       <p className="text-gray-600 text-center font-bold mr-4">INVOICE</p>
//         <div className="flex items-baseline justify-between mb-4">
//           <div>
//             <p className="text-blue-500 text-lg">
//               Invoice &gt;&gt; <strong>ID: #123-123</strong>
//             </p>
//           </div>
//           <div className="flex wrap space-x-3">
//               <button className="text-capitalize bg-gray-100 p-2 flex items-center hover:bg-gray-200 transition duration-300 ease-in-out">
//                 <FaPrint className="text-primary" style={{ color: 'blue' }} 
//                 onClick={handlePrint}/>
//                 <span className="ml-2">Print</span>
//               </button>
//               <button className="text-capitalize bg-gray-100 p-2 flex items-center hover:bg-gray-200 transition duration-300 ease-in-out">
//                 <FaFilePdf className="text-danger" style={{ color: 'red' }} />
//                 <span className="ml-2">Export</span>
//               </button>
//           </div>

//           {/* </div> */}
//         </div>
//         <hr />
//         <div className="text-center mb-8">
//         <p className="pt-2 text-gray-700 font-weight-bold">꧁༒༻☬ད शेतकरी </p>
//           <p className="pt-2 text-gray-700">www.dairyapp.com</p>
//         </div>
//         <div className="flex">
//           <div className="w-1/2">
//             <ul className="list-none">
//               <li className="text-gray-600">
//                 To: <span className="text-blue-500">{address.Name}</span>
//               </li>
//               <li className="text-gray-600">{address.Address}</li>
//               <li className="text-gray-600">{address.pincode}</li>
//               <li className="text-gray-600">
//                 <FaPhoneAlt className="inline-block" />{address.MobileNo}
//               </li>
//             </ul>
//           </div>

//           <div className="w-1/2">
//             <p className="text-gray-600">Invoice</p>
//             <ul className="list-none">
//               <li className="text-gray-600 flex items-center">
//                 <FaCircle className="inline-block mr-2" style={{ color: "#84B0CA" }} />
//                 <span className="font-bold">ID:</span> #123-456
//               </li>
//               <li className="text-gray-600 flex items-center">
//                 <FaCircle className="inline-block mr-2" style={{ color: "#84B0CA" }} />
//                 <span className="font-bold">Creation Date: </span>Jun 23, 2021
//               </li>
//               <li className="text-gray-600 flex items-center">
//                 <FaCircle className="inline-block mr-2" style={{ color: "#84B0CA" }} />
//                 <span className="font-bold">Status:</span>
//                 <span className="badge bg-yellow-400 bg-warning text-black font-bold ml-1 br-3 rounded px-1"> Unpaid </span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="my-8">
//           <table className="w-full table-auto items-center">
//             <thead className="text-white" style={{ backgroundColor: "#84B0CA" }}>
//               <tr>
//                 <th className="px-4 py-2">#</th>
//                 <th className="px-4 py-2">Description</th>
//                 <th className="px-4 py-2">Qty</th>
//                 <th className="px-4 py-2">Unit Price</th>
//                 <th className="px-4 py-2">Amount</th>
//               </tr>
//             </thead>
//             <tbody className="items-center">
//               {productsDetails.map((product, index) => (
//                 <tr key={index}>
//                   <td className="border px-4 py-2">{index + 1}</td>
//                   <td className="border px-4 py-2">{product.product_Name}</td> {/* Replace with the actual property name for product description */}
//                   <td className="border px-4 py-2">{product.quantity}</td>
//                   <td className="border px-4 py-2">${product.product_Price.toFixed(2)}</td>
//                   <td className="border px-4 py-2">${(product.quantity * product.product_Price).toFixed(2)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex justify-between">
//             <div className="w-1/2">
//                 <p className="text-gray-600 ml-3">Add additional notes and payment information</p>
//             </div>
//             <div className="w-1/3 flex items-end">
//               <table className="ml-3">
//                 <tr>
//                   <td className="text-black mr-4">SubTotal</td>
//                   <td className="ext-black mr-3">${subtotal.toFixed(2)}</td>
//                 </tr>
//                 <tr>
//                   <td className="text-black mr-4">Shipping Cost</td>
//                   <td className="ext-black mr-3">$0</td>
//                 </tr>
//                 <tr>
//                   <td className="text-black mr-4">GST (15%)</td>
//                   <td className="ext-black mr-3">${gstAmount.toFixed(2)}</td>
//                 </tr>
//                 <tr>
//                   <td colSpan="2" style={{ borderTop: "2px dotted black", margin: "20px 0" }}></td>
//                 </tr>
//                 <tr>
//                   <td className="text-black font-bold mr-4 mt-4">Total Amount</td>
//                   <td className="ext-black font-bold mr-3">${totalAmount.toFixed(2)}</td>
//                 </tr>
//               </table>
//             </div>
//           </div>

//         <hr />
//         <div className="flex">
//           <div className="w-2/2">
//             <p className="text-gray-600 text-center">Thank you for your purchase</p>
//           </div>
         
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }




// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import {
  FaPrint,
  FaFilePdf,
  FaPhoneAlt,
  FaCircle
} from "react-icons/fa";
import "tailwindcss/tailwind.css";
import myContext from "../../context/data/myContext";
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

export default function Report() {
  // const navigate = useNavigate();
  const context = useContext(myContext);
  const { address, productsDetails } = context;

  const subtotal = productsDetails.reduce(
    (total, product) => total + product.quantity * product.product_Price,
    0
  );
  const gstRate = 15; // GST rate in percentage
  const gstAmount = (subtotal * gstRate) / 100;
  const totalAmount = subtotal + gstAmount;

  console.log("productsDetails Report", productsDetails);
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-blue-800">
      <div className="py-5">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md sm:p-4">
          <p className="text-gray-600 text-center font-bold mr-4">INVOICE</p>
          <div className="flex flex-col sm:flex-row items-baseline justify-between mb-4">
            <div>
              <p className="text-blue-500 text-lg">
                Invoice &gt;&gt; <strong>ID: #123-123</strong>
              </p>
            </div>
            <div className="flex wrap space-x-3">
              <button className="text-capitalize bg-gray-100 p-2 flex items-center hover:bg-gray-200 transition duration-300 ease-in-out">
                <FaPrint
                  className="text-primary"
                  style={{ color: "blue" }}
                  onClick={handlePrint}
                />
                <span className="ml-2">Print</span>
              </button>
              <button className="text-capitalize bg-gray-100 p-2 flex items-center hover:bg-gray-200 transition duration-300 ease-in-out">
                <FaFilePdf
                  className="text-danger"
                  style={{ color: "red" }}
                />
                <span className="ml-2">Export</span>
              </button>
            </div>
          </div>
          <hr />
          <div className="text-center mb-8">
            <p className="pt-2 text-gray-700 font-weight-bold">꧁༒༻☬ད शेतकरी </p>
            <p className="pt-2 text-gray-700">www.dairyapp.com</p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <ul className="list-none">
                <li className="text-gray-600">
                  To: <span className="text-blue-500">{address.Name}</span>
                </li>
                <li className="text-gray-600">{address.Address}</li>
                <li className="text-gray-600">{address.pincode}</li>
                <li className="text-gray-600">
                  <FaPhoneAlt className="inline-block" /> - 
                  {address.MobileNo}
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2">
              <p className="text-gray-600">Invoice</p>
              <ul className="list-none">
                <li className="text-gray-600 flex items-center">
                  <FaCircle
                    className="inline-block mr-2"
                    style={{ color: "#84B0CA" }}
                  />
                  <span className="font-bold">ID:</span> #123-456
                </li>
                <li className="text-gray-600 flex items-center">
                  <FaCircle
                    className="inline-block mr-2"
                    style={{ color: "#84B0CA" }}
                  />
                  <span className="font-bold">Creation Date: </span>Jun 23, 2021
                </li>
                <li className="text-gray-600 flex items-center">
                  <FaCircle
                    className="inline-block mr-2"
                    style={{ color: "#84B0CA" }}
                  />
                  <span className="font-bold">Status:</span>
                  <span className="badge bg-yellow-400 bg-warning text-black font-bold ml-1 br-3 rounded px-1">
                    {" "}
                    Unpaid{" "}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="my-8 overflow-x-auto">
            <table className="w-full table-auto items-center">
              <thead className="text-white" style={{ backgroundColor: "#84B0CA" }}>
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Qty</th>
                  <th className="px-4 py-2">Unit Price</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody className="items-center">
                {productsDetails.map((product, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                      {product.product_Name}
                    </td>
                    <td className="border px-4 py-2">{product.quantity}</td>
                    <td className="border px-4 py-2">
                      ${product.product_Price.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      ${(product.quantity * product.product_Price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <p className="text-gray-600 ml-3">
                Add additional notes and payment information
              </p>
            </div>
            <div className="w-full sm:w-1/3 flex items-end">
              <table className="ml-3">
                <tr>
                  <td className="text-black mr-4">SubTotal</td>
                  <td className="ext-black mr-3">${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="text-black mr-4">Shipping Cost</td>
                  <td className="ext-black mr-3">$0</td>
                </tr>
                <tr>
                  <td className="text-black mr-4">GST (15%)</td>
                  <td className="ext-black mr-3">${gstAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    style={{ borderTop: "2px dotted black", margin: "20px 0" }}
                  ></td>
                </tr>
                <tr>
                  <td className="text-black font-bold mr-4 mt-4">
                    Total Amount
                  </td>
                  <td className="ext-black font-bold mr-3">
                    ${totalAmount.toFixed(2)}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <hr />
          <div className="flex">
            <div className="w-full">
              <p className="text-gray-600 text-center">
                Thank you for your purchase
              </p>
              <p className="text-gray-600 font-bold text-center">
                Visit Again..!!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
