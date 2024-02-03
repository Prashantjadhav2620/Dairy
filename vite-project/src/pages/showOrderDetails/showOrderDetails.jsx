// Order.jsx
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
// import { useLocation } from 'react-router-dom';


function OrderDetails() {

  const context = useContext(myContext);
  const { mode } = context;

  // const location = useLocation();
  // const selectedItem = location.state?.selectedItem;

  return (
    <Layout>
      <div className="bg-gray-100 p-4 border border-gray-200 rounded-md text-center mb-4 font-bold"> showOrderDetails </div>
      <div>
        <div className="f-full pt-10">
          <div className="mx-auto max-w-0.5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              <div
                className="flex flex-col justify-center ml-5 mb-6 rounded-lg bg-white p-6 shadow-md"
                style={{ backgroundColor: mode === "dark" ? "#282c34" : "", color: mode === "dark" ? "white" : "", height: "220px", width: "60vw", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", }} >
                <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === "dark" ? "white" : "" }} >
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === "dark" ? "white" : "" }} >
                        abc
                      </h2>
                      <p className="mt-1 text-xs text-gray-700" style={{ color: mode === "dark" ? "white" : "" }} >
                        50
                      </p>
                      <p className="mt-1 text-xs text-gray-700" style={{ color: mode === "dark" ? "white" : "" }} >
                        100 ₹
                      </p>
                    </div>
                  </div>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default OrderDetails;
