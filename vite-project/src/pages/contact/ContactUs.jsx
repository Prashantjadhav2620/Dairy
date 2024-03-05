// // // eslint-disable-next-line no-unused-vars
// // import React, { useState } from "react";
// // import Layout from "../../components/layout/Layout";
// // import contactData from "./contactData";


// // const AddressDetails = () => {
// //   return (
// //     <div className="adress-details" style={{marginTop: "15px"}}>
// //       {/* Uncomment the following line if you want to include the "Dairy" heading */}
// //       {/* <h4>Dairy</h4> */}
// //       <ul>
// //         <li className="loc">
// //           H. No.8-2-293/82/A/1286,<br />
// //           Plot No.1286,<br />
// //           Road No. 1 & 65, Jubilee Hills,<br />
// //           <span>Hyderabad – 500 033</span>
// //         </li>
// //         <li className="cal">
// //           <a href="tel:040-23391221">040 - 2339 1221</a> / <a href="tel:040-23391222">222</a>
// //           <span>
// //             <a href="tel:040-42129999">040 - 4212 9999</a>
// //           </span>
// //         </li>
        
// //       </ul>
// //       <div className="busness" style={{marginTop: "50px"}}>
// //         <h1 style={{ fontSize: "25px" }}>Business and Customer Care Enquiry</h1>
// //         <h6 style={{marginTop: "5px"}}>Need assistance or want to share your Heritage experience with us?<br /> You can call us or email us:</h6>
// //         <ul>
// //           <li className="mal">
// //             <a href="mailto:customercare@heritagefoods.in">customercare@heritagefoods.in</a>
// //           </li>
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // const ContactUs = () => {
// //   const [formData, setFormData] = useState({
// //     cname: "",
// //     cemail: "",
// //     cphone: "",
// //     csubject: "",
// //     cmessage: "",
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({ ...prevData, [name]: value }));
// //   };

// //   const handleSubmit = () => {
// //     // Implement your form submission logic here
// //     console.log("Form submitted:", formData);
// //   };
  
// //   return (
// //     <>
// //       <Layout>
// //         <div className="bg-color-#ffffff">
// //           <div className="flex justify-between p-20">
// //             {/* Contact Details */}
// //             {/* <div className="w-full flex">
// //               <div className="w-1/2">
// //                 <h2 className="font-bold text-3xl" style={{ fontSize: "30px" }}>
// //                   Contact Us
// //                 </h2>

// //                 <div>
// //                   H. No.8-2-293/82/A/1286,
// //                   <br />
// //                   Plot No.1286,
// //                   <br />
// //                   Road No. 1 & 65, Jubilee Hills,
// //                   <br />
// //                   Hyderabad – 500 033
// //                   <br />
// //                 </div>
// //               </div>

// //               <div className="w-1/2">
// //                 <div  style={{marginTop: "25px"}}>
// //                   Phone: 040 - 2339 1221 / 222
// //                   <br />
// //                   Fax: 040 - 4212 9999
// //                   <br />
// //                   Alternate Phone: 040 – 2331 8090 / 040 – 2332 6789
// //                   <br />
// //                   Email:{" "}
// //                   <a
// //                     href="mailto:hfl@heritagefoods.in"
// //                     className="text-blue-500"
// //                   >
// //                     hfl@heritagefoods.in
// //                   </a>
// //                 </div>
// //               </div>
              
// //             </div> */}

// // <div className="w-full flex">
// //       <div className="w-1/2">
// //         <h2 className="font-bold text-3xl" style={{ fontSize: "30px" }}>
// //           Contact Us
// //         </h2>
// //         <AddressDetails />
// //       </div>

// //       <div className="w-1/2">
// //         <div style={{ marginTop: "50px" }}>
// //           Phone: 040 - 2339 1221 / 222
// //           <br />
// //           Fax: 040 - 4212 9999
// //           <br />
// //           Alternate Phone: 040 – 2331 8090 / 040 – 2332 6789
// //           <br />
// //           Email:{" "}
// //           <a href="mailto:hfl@heritagefoods.in" className="text-blue-500">
// //             hfl@heritagefoods.in
// //           </a>
// //         </div>
// //       </div>
// //     </div>


    
// //             <div className="w-1/2 ">
// //               <div className="max-w-md mx-auto border border-black p-6 rounded-tl-lg ">
// //                 <form name="form1" method="post" action="#" id="form1">
// //                   <div className="frm-fields space-y-4">
// //                     <h4 className="text-xl font-bold">Get in Touch</h4>

// //                     <div className="col-span-12">
// //                       <div className="form-data">
// //                         <input
// //                           type="text"
// //                           placeholder="Name"
// //                           id="cname"
// //                           name="cname"
// //                           className="w-full px-3 py-2 border rounded"
// //                           value={formData.cname}
// //                           onChange={handleChange}
// //                         />
// //                       </div>
// //                     </div>

// //                     <div className="col-span-12">
// //                       <div className="form-data">
// //                         <input
// //                           type="email"
// //                           id="cemail"
// //                           placeholder="E-mail"
// //                           name="cemail"
// //                           className="w-full px-3 py-2 border rounded"
// //                           value={formData.cemail}
// //                           onChange={handleChange}
// //                         />
// //                       </div>
// //                     </div>

// //                     <div className="col-span-12">
// //                       <div className="form-data">
// //                         <input
// //                           type="text"
// //                           placeholder="Mobile Number"
// //                           id="cphone"
// //                           name="cphone"
// //                           className="w-full px-3 py-2 border rounded"
// //                           value={formData.cphone}
// //                           onChange={handleChange}
// //                         />
// //                       </div>
// //                     </div>

// //                     <div className="col-span-12">
// //                       <div className="form-data">
// //                         <textarea
// //                           placeholder="Subject"
// //                           name="csubject"
// //                           id="csubject"
// //                           className="w-full px-3 py-2 border rounded"
// //                           value={formData.csubject}
// //                           onChange={handleChange}
// //                         ></textarea>
// //                       </div>
// //                     </div>

// //                     <div className="col-span-12">
// //                       <div className="form-data">
// //                         <textarea
// //                           placeholder="Message"
// //                           name="cmessage"
// //                           id="cmessage"
// //                           className="w-full px-3 py-2 border rounded"
// //                           value={formData.cmessage}
// //                           onChange={handleChange}
// //                         ></textarea>
// //                       </div>
// //                     </div>

// //                     <div className="col-span-12">
// //                       <div className="form-data">
// //                         <button
// //                           type="button"
// //                           name="submit"
// //                           className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out cursor-pointer"
// //                           onClick={handleSubmit}
// //                         >
// //                           Submit
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </Layout>
// //     </>
// //   );
// // };

// // export default ContactUs;


// // eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";
// import Layout from "../../components/layout/Layout";
// import contactData from "./contactData";

// const AddressDetails = () => {
//   return (
//     <div className="address-details mt-4">
//       {/* Uncomment the following line if you want to include the "Dairy" heading */}
//       {/* <h4>Dairy</h4> */}
//       <ul>
//         <li className="loc">
//           H. No.8-2-293/82/A/1286,<br />
//           Plot No.1286,<br />
//           Road No. 1 & 65, Jubilee Hills,<br />
//           <span>Hyderabad – 500 033</span>
//         </li>
//         <li className="cal">
//           <a href="tel:040-23391221">040 - 2339 1221</a> / <a href="tel:040-23391222">222</a>
//           <span>
//             <a href="tel:040-42129999">040 - 4212 9999</a>
//           </span>
//         </li>
//       </ul>
//       <div className="business mt-8">
//         <h1 className="text-2xl font-bold">Business and Customer Care Enquiry</h1>
//         <h6 className="mt-2">Need assistance or want to share your Heritage experience with us?<br /> You can call us or email us:</h6>
//         <ul>
//           <li className="mal">
//             <a href="mailto:customercare@heritagefoods.in">customercare@heritagefoods.in</a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     cname: "",
//     cemail: "",
//     cphone: "",
//     csubject: "",
//     cmessage: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = () => {
//     // Implement your form submission logic here
//     console.log("Form submitted:", formData);
//   };

//   return (
//     <>
//       <Layout>
//         <div className="bg-gray-100 p-4 sm:p-8 md:flex">
//           <div className="md:w-1/2">
//             <h2 className="font-bold text-3xl mb-4">Contact Us</h2>
//             <AddressDetails />
//           </div>

//           <div className="md:w-1/2 mt-4 md:mt-0">
//             <div className="md:ml-8">
//               <p className="text-base">Phone: 040 - 2339 1221 / 222</p>
//               <p className="text-base">Fax: 040 - 4212 9999</p>
//               <p className="text-base">Alternate Phone: 040 – 2331 8090 / 040 – 2332 6789</p>
//               <p className="text-base">Email: <a href="mailto:hfl@heritagefoods.in" className="text-blue-500">hfl@heritagefoods.in</a></p>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-md mx-auto border border-black p-6 rounded-tl-lg mt-4">
//           <form name="form1" method="post" action="#" id="form1">
//             <div className="space-y-4">
//               <h4 className="text-xl font-bold">Get in Touch</h4>

//               <div className="col-span-12">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   id="cname"
//                   name="cname"
//                   className="w-full px-3 py-2 border rounded"
//                   value={formData.cname}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="col-span-12">
//                 <input
//                   type="email"
//                   id="cemail"
//                   placeholder="E-mail"
//                   name="cemail"
//                   className="w-full px-3 py-2 border rounded"
//                   value={formData.cemail}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="col-span-12">
//                 <input
//                   type="text"
//                   placeholder="Mobile Number"
//                   id="cphone"
//                   name="cphone"
//                   className="w-full px-3 py-2 border rounded"
//                   value={formData.cphone}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="col-span-12">
//                 <textarea
//                   placeholder="Subject"
//                   name="csubject"
//                   id="csubject"
//                   className="w-full px-3 py-2 border rounded"
//                   value={formData.csubject}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>

//               <div className="col-span-12">
//                 <textarea
//                   placeholder="Message"
//                   name="cmessage"
//                   id="cmessage"
//                   className="w-full px-3 py-2 border rounded"
//                   value={formData.cmessage}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>

//               <div className="col-span-12">
//                 <button
//                   type="button"
//                   name="submit"
//                   className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out cursor-pointer"
//                   onClick={handleSubmit}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default ContactUs;


// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import contactData from "./contactData";
import { FaBold } from "react-icons/fa";

const AddressDetails = () => {
  return (
    <div className="adress-details" style={{ marginTop: "15px" }}>
      {/* Uncomment the following line if you want to include the "Dairy" heading */}
      {/* <h4>Dairy</h4> */}
      <ul>
        <li className="loc">
          H. No.8-2-293/82/A/1286,<br />
          Plot No.1286,<br />
          Road No. 1 & 65, Jubilee Hills,<br />
          <span>Hyderabad – 500 033</span>
        </li>
        <li className="cal">
          <a href="tel:040-23391221">040 - 2339 1221</a> / <a href="tel:040-23391222">222</a>
          <span>
            <a href="tel:040-42129999">040 - 4212 9999</a>
          </span>
        </li>
      </ul>
      <div className="busness" style={{ marginTop: "20px" }}>
        <h1 style={{ fontSize: "25px" }}>Business and Customer Care Enquiry</h1>
        <h6 style={{ marginTop: "5px" }}>
          Need assistance or want to share your Heritage experience with us?
          <br /> <p style={{ marginTop: "5px" }}>You can call us or email us:</p>
        </h6>
        <ul>
          <li className="mal" style={{ marginTop: "5px",marginLeft:"10px", fontSize:"20px", font:FaBold}}>
            <a href="mailto:customercare@heritagefoods.in">customercare@heritagefoods.in</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    cname: "",
    cemail: "",
    cphone: "",
    csubject: "",
    cmessage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    // Implement your form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Layout>
        <div className="bg-color-#ffffff">
          <div className="flex justify-between p-20">
            <div className="w-full flex">
              <div className="w-1/2">
                <h2 className="font-bold text-3xl" style={{ fontSize: "30px" }}>
                  Contact Us
                </h2>
                <AddressDetails />
              </div>

              <div className="w-1/2">
                <div style={{ marginTop: "50px" }}>
                  Phone: 040 - 2339 1221 / 222
                  <br />
                  Fax: 040 - 4212 9999
                  <br />
                  Alternate Phone: 040 – 2331 8090 / 040 – 2332 6789
                  <br />
                  Email:{" "}
                  <a href="mailto:hfl@heritagefoods.in" className="text-blue-500">
                    hfl@heritagefoods.in
                  </a>
                </div>
              </div>
            </div>

            <div className="w-1/2 ">
              <div className="max-w-md mx-auto border border-black p-6 rounded-tl-lg ">
                <form name="form1" method="post" action="#" id="form1">
                  <div className="frm-fields space-y-4">
                    <h4 className="text-xl font-bold">Get in Touch</h4>

                    <div className="col-span-12">
                      <div className="form-data">
                        <input
                          type="text"
                          placeholder="Name"
                          id="cname"
                          name="cname"
                          className="w-full px-3 py-2 border rounded"
                          value={formData.cname}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-span-12">
                      <div className="form-data">
                        <input
                          type="email"
                          id="cemail"
                          placeholder="E-mail"
                          name="cemail"
                          className="w-full px-3 py-2 border rounded"
                          value={formData.cemail}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-span-12">
                      <div className="form-data">
                        <input
                          type="text"
                          placeholder="Mobile Number"
                          id="cphone"
                          name="cphone"
                          className="w-full px-3 py-2 border rounded"
                          value={formData.cphone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-span-12">
                      <div className="form-data">
                        <textarea
                          placeholder="Subject"
                          name="csubject"
                          id="csubject"
                          className="w-full px-3 py-2 border rounded"
                          value={formData.csubject}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-span-12">
                      <div className="form-data">
                        <textarea
                          placeholder="Message"
                          name="cmessage"
                          id="cmessage"
                          className="w-full px-3 py-2 border rounded"
                          value={formData.cmessage}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-span-12">
                      <div className="form-data">
                        <button
                          type="button"
                          name="submit"
                          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out cursor-pointer"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ContactUs;
