
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import SearchOrder from "./SearchOrder";
import OrderNotPresent from "./OrderNotPresent";

const OrderData = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const UserId = JSON.parse(localStorage.getItem("user"));
    const userid = UserId.data.User.Uid;
  
    console.log("userid", userid)
    const context = useContext(myContext);
    const { mode, order } = context;
  
    if (!order || !Array.isArray(order)) {
      toast.error("No Orders Found");
      return null;
    } else {
      toast.success("Orders Found");
    }
    console.log("order",order)
  
    const userOrders = order.filter(
      (obj) => obj.user_Id === userid && obj.isActive
    );
  
    const handleSearch = (query) => {
      setSearchQuery(query);
    };
  
    const getOrderStatus = (order) => {
      // Assuming order status is available in each order object
      return order.status; // Replace with the actual property holding the order status
    };
  
    const filteredOrders = userOrders.filter(
      (obj) =>
        obj.user_Id === userid &&
        obj.orderDetailsInfo.some(
          (item) =>
            (item.product_Name &&
              item.product_Name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            (item.description &&
              item.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    );
  
    console.log("filteredOrders", filteredOrders)
  
    return (
      <Layout>
        <SearchOrder onSearch={handleSearch} />
        {filteredOrders.length > 0 ? (
          <div>
            {filteredOrders.map((userOrder) => {
              const orderStatus = getOrderStatus(userOrder);
  
              return (
                <div className="f-full pt-10" key={userOrder.id}>
                  {userOrder.orderDetailsInfo.map((item, index) => {
                    return (
                      <Link
                        to={{
                          pathname: "/OrderDetails",
                          state: { selectedItem: userOrder },
                        }}
                        key={userOrder.id}
                      >
                        <div
                          className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"
                          key={index}
                        >
                          <div className="rounded-lg md:w-2/3">
                            <div
                              className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                              style={{
                                backgroundColor:
                                  mode === "dark" ? "#282c34" : "",
                                color: mode === "dark" ? "white" : "",
                              }}
                            >
                              <img
                                src={item.product_Image_URL}
                                alt="product-image"
                                className="w-full rounded-lg sm:w-40"
                              />
                              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                  <h2
                                    className="text-lg font-bold text-gray-900"
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    {item.product_Name}
                                  </h2>
                                  <p
                                    className="mt-1 text-xs text-gray-700"
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    {item.product_Description}
                                  </p>
                                  <p
                                    className="mt-1 text-xs text-gray-700"
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    {item.product_Price} ₹
                                  </p>
                                </div>
  
                                {/* Progress Bar based on Order Status */}
                                <div className="mt-5 sm:mt-0">
                                  <p className="text-xs text-gray-700">
                                    Order Status: {orderStatus}
                                  </p>
                                  <div className="bg-gray-200 h-2 rounded mt-1">
                                    <div
                                      className={`bg-blue-500 h-full rounded ${
                                        orderStatus === "delivered"
                                          ? "w-full"
                                          : orderStatus === "processing"
                                          ? "w-2/3" // You can adjust these values based on your progress logic
                                          : "w-1/3"
                                      }`}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
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

export default OrderData