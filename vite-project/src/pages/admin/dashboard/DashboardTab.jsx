/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import myContext from '../../../context/data/myContext';
// eslint-disable-next-line no-unused-vars
import Layout from '../../../components/layout/Layout';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    FaPrint,
    FaFilePdf
  } from "react-icons/fa";

function DashboardTab() {
    const context = useContext(myContext)
    const { mode, product ,edithandle,deleteProduct,Agent ,deleteAgent,editAgenthandle,order} = context
    
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    console.log("orderorder",order)

    function openModal() {
        setIsOpen(true)
    }
    console.log("Agent ??",Agent)
    const [imageUrl, setImageUrl] = useState([]);


    const [loading, setLoading] = useState(false);

      useEffect(() => {
        const fetchData = async () => {
          if (Agent.length > 0) {
            try {
              setLoading(true);
              const imageUrls = [];
              for (let i = 0; i < Agent.length; i++) {
                const filename = Agent[i].photo.name;
                const response = await axios({
                  method: 'GET',
                  url: `https://localhost:2620/api/PhotoTest/DownloadImage/${filename}`,
                  responseType: 'blob',
                });
                if (response.data instanceof Blob) {
                  const objectURL = URL.createObjectURL(response.data);
                  console.log("objectURL", objectURL);
                  imageUrls.push(objectURL);
                } else {
                  console.error('Invalid blob data received');
                }
              }
              setImageUrl(imageUrls);
            } catch (error) {
              console.error('Error calling API:', error);
      
              if (error.response) {
                console.error('API response status:', error.response.status);
                console.error('API response data:', error.response.data);
              }
            } finally {
              setLoading(false);
            }
          } else {
            console.log("Agent is Not Found");
          }
        };
      
        fetchData();
      }, [Agent]);


      const[pdfs,setPDFs]=useState([]);
      const [currentPage, setCurrentPage] = useState(1);

      const handlePageChange = (page) => {
        setCurrentPage(page);
      };

      const handleDownloadClick = (filename) => {
        const response =  axios({
            method: 'GET',
            url: `https://localhost:2620/api/PdfStore/DownloadPdf/${filename}`,
          });

          if(response.status.code === 200){
            console.log("response",response.data)
          }
          else{
            console.log("Error")
          }
      };
 
    return (
        <div >
            <div className="container mx-auto">
                <div className="tab container mx-auto ">
                    <Tabs defaultIndex={0} className=" " >
                        <TabList className="md:flex md:space-x-8 bg-  grid grid-cols-2 text-center gap-4   md:justify-center mb-10 ">
                            <Tab>
                                <button type="button" className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-5 py-1.5 text-center bg-[#605d5d12] ">
                                    <div className="flex gap-2 items-center">
                                        <MdOutlineProductionQuantityLimits />Products</div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500  hover:shadow-pink-700  rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]    px-5 py-1.5 text-center ">
                                    <div className="flex gap-2 items-center">
                                        <AiFillShopping /> Order
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]   px-5 py-1.5 text-center ">
                                    <div className="flex gap-2 items-center">
                                        <FaUser /> Users
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]   px-5 py-1.5 text-center ">
                                    <div className="flex gap-2 items-center">
                                        <FaUser /> Delivery Agents
                                    </div>
                                </button>
                            </Tab>
                        </TabList>

                        {/* product  */}
                        <TabPanel>
                            <div className='  px-4 md:px-0 mb-16'>
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>Product Details</h1>
                                <div className=" flex justify-end">
                                   <Link to={'/addproduct'}>
                                   <button
                                        type="button"
                                        className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} > <div className="flex gap-2 items-center">
                                            Add Product <FaCartPlus size={20} />
                                        </div></button>
                                        </Link>
                                </div>
                                <div className="relative overflow-x-auto ">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
                                        <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    S.No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Quntity
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Description
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                      {product.map((item,index)=>{
                                        
                                        const {product_Id,product_Name,product_Price,product_Contity,product_Image_URL,product_Description, product_Type,date} = item;
                                        return(
                                            // eslint-disable-next-line react/jsx-key
                                            <tbody className=''>
                                            <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {product_Id}.
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                    <img className='w-16' src={product_Image_URL} alt="img" />
                                                </th>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {product_Name}
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    ₹{product_Price}
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {product_Contity}
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {product_Type}
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {product_Description}
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {date}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className=" flex gap-2">
                                                        <div className=" flex gap-2 cursor-pointer text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            <div onClick={()=>{deleteProduct(item)}} >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </div>
                                                            <Link to={'/updateProduct'}>
                                                            <div onClick={()=>{edithandle(item)}} >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                </svg>
                                                            </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                        )
                                      })}
                                    </table>

                                </div>
                            </div>
                        </TabPanel>

                        {/* Order  */}
                        <TabPanel>
                                <div className="relative overflow-x-auto mb-16">
                                    <h1 className='text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>Order Details</h1>
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-black uppercase bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Order Id
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Address
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Pincode
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Phone Number
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Email
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Order Method
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.map((item, index) => {
                                                const {
                                                    order_Id,
                                                    addressInfo,
                                                    date,
                                                    email_Id,
                                                    orderDetailsInfo,
                                                    paymentMethod,
                                                } = item;

                                                return (
                                                    <React.Fragment key={order_Id}>
                                                        {orderDetailsInfo.map((product, productIndex) => (
                                                            <tr
                                                                key={productIndex}
                                                                className="bg-gray-50 border-b dark:border-gray-700"
                                                                style={{
                                                                    backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                                                                    color: mode === "dark" ? "white" : "",
                                                                }}
                                                            >
                                                                {productIndex === 0 && (
                                                                    <td rowSpan={orderDetailsInfo.length} className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                        {order_Id}
                                                                    </td>
                                                                )}

                                                                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                                    <img className="w-16" src={product.product_Image_URL} alt="img" />
                                                                </th>
                                                                <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                    {product.product_Name}
                                                                </td>
                                                                <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                    ₹{product.product_Price * product.quantity}
                                                                </td>
                                                                <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                    {product.product_Type}
                                                                </td>
                                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                        {addressInfo.name}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                        {addressInfo.address}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                        {addressInfo.pincode}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                    
                                                                        {addressInfo.mobileNo}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                        
                                                                        {email_Id}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                        
                                                                        {paymentMethod}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                        
                                                                        {date}
                                                                    </td>
                                                            </tr>
                                                        ))}
                                                        
                                                    </React.Fragment>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                        </TabPanel>

                         {/* User  */}
                        <TabPanel>
                            {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-10">
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>Customers Details</h1>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-black uppercase bg-gray-200 " style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                S.No
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Address
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Pincode
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Phone Number
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      
                                                <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        1.
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        Name
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        Address
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        181919
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        1991818818
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                       kkk@gmail.com
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        12 Aug 2019
                                                    </td>

                                                </tr>
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>

                         {/* Delivery Boy  */}

                        <TabPanel>
                            <div className='  px-4 md:px-0 mb-16'>
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}> Delivery Agent Details</h1>
                                <div className=" flex justify-end">
                                   <Link to={'/AddDeliveryAgent'}>
                                   <button
                                        type="button"
                                        className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} > <div className="flex gap-2 items-center">
                                            Add Delivery Agent <FaUser size={20} />
                                        </div></button>
                                        </Link>
                                </div>
                                <div className="relative overflow-x-auto ">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
                                        <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    S.No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    ID
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Photo
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Address
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Mobile No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Email Id
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Password
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                   joining Date
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                   Proof
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <>
                                      {Agent.map((item,index)=>{
                                        const {id,name,address,mobileNo,emailId, password,joiningDate} = item.deliveryAgent;
                                        const {photo,proof}=item;                                     

                                        return(
                                            // eslint-disable-next-line react/jsx-key
                                            <tbody className=''>
                                            <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {index+1}
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {id}
                                                </td>
                                                 <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                    <img className='w-16' alt="img"
                                                    src={imageUrl[index]} 
                                                    onError={(e) => {
                                                        console.error('Error loading image:', e);
                                                      }}
                                                     />
                                                </th> 
                                                
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {name}
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {address}
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {mobileNo}
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {emailId}
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {/* {password} */}
                                                ******
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {joiningDate}
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                    <button onClick={()=>handleDownloadClick(proof.name)}>
                                                        <FaFilePdf className="text-danger h-10 w-10" style={{ color: "red" }} />
                                                    </button>
                                                </th>
                                                <td className="px-6 py-4">
                                                    <div className=" flex gap-2">
                                                        <div className=" flex gap-2 cursor-pointer text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            <div onClick={()=>{deleteAgent(item)}} >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </div>
                                                            <Link to={'/UpdateDeliveryAgent'}>
                                                            <div onClick={()=>{editAgenthandle(item)}} >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                </svg>
                                                            </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                        )
                                      })}
                                      </>
                                    </table>

                                </div>
                            </div>
                        </TabPanel>

                    </Tabs>
                </div>
            </div>
        </div>
    )
}




export default DashboardTab