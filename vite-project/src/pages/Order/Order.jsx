
// Order.jsx
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import SearchOrder from './SearchOrder';
import OrderNotPresent from './OrderNotPresent';
import { Link } from 'react-router-dom';

function Order() {
  const [searchQuery, setSearchQuery] = useState('');

  const userid = JSON.parse(localStorage.getItem('user'))?.user?.uid;
  console.log('userid:', userid);

  const context = useContext(myContext);
  const { mode, order } = context;

  if (!order || !Array.isArray(order)) {
    console.log('null data or not an array');
    return null;
  } else {
    console.log('order', order);
  }

  const userOrders = order.filter((obj) => obj.user_Id === userid);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredOrders = userOrders.filter(
    (obj) =>
      obj.user_Id === userid &&
      obj.orderDetailsInfo.some(
        (item) =>
          item.product_Name && item.product_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );
  // const navigate = useNavigate();


  return (
    <Layout>
      <SearchOrder onSearch={handleSearch} />
      {filteredOrders.length > 0 ? (
        <div>
          {filteredOrders.map((userOrder) => {
            return (
              <div className="f-full pt-10" key={userOrder.id}>
                {userOrder.orderDetailsInfo.map((item, index) => {
                  return (
                    <>
                      <Link to="/showOrderDetails">
                    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0" key={index}>
                      <div className="rounded-lg md:w-2/3">
                        <div
                          className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                          style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}
                        >
                          <img src={item.product_Image_URL} alt="product-image" className="w-full rounded-lg sm:w-40" />
                          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div className="mt-5 sm:mt-0">
                              <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                {item.product_Name}
                              </h2>
                              <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                {item.description}
                              </p>
                              <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                {item.product_Price} ₹
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </Link>
                    
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <OrderNotPresent />
      )}
    </Layout>
  );
}

export default Order;
