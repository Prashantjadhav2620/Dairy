// DeliveryAgentManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeliveryAgentManagement = () => {
  const [deliveryAgentData, setDeliveryAgentData] = useState({
    name: "",
    address: "",
    mobileNo: "",
    emailId: "",
    password: "",
    joiningDate: "",
    photo: null,
    proof: null,
  });

  const [deliveryAgentsList, setDeliveryAgentsList] = useState([]);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    setDeliveryAgentData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const createDeliveryAgent = async () => {
    try {
      const formData = new FormData();
      for (const key in deliveryAgentData) {
        formData.append(key, deliveryAgentData[key]);
      }

      const response = await axios.post(
        "http://localhost:2620/api/DeliveryAgent/createdeliveryagent",
        formData
      );
      if (response.status === 200) {
        toast.success("Agent added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setDeliveryAgentData({
          name: "",
          address: "",
          mobileNo: "",
          emailId: "",
          password: "",
          joiningDate: "",
          photo: null,
          proof: null,
        });
        // Fetch updated data after adding a new agent
        getAllDeliveryAgents();
      } else {
        toast.error("Failed to add Delivery Agent");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add Delivery Agent");
    }
  };

  const getAllDeliveryAgents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2620/api/DeliveryAgent"
      );

      const agentsList = response.data;
      setDeliveryAgentsList(agentsList);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllDeliveryAgents();
  }, []);

  return (
    <div>
      <h2>Create Delivery Agent</h2>

      <form>
        <label htmlFor="Id">Id:</label>
        <input
          type="text"
          id="Id"
          name="Id"
          value={deliveryAgentData.Id}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={deliveryAgentData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={deliveryAgentData.address}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="mobileNo">Mobile Number:</label>
        <input
          type="text"
          id="mobileNo"
          name="mobileNo"
          value={deliveryAgentData.mobileNo}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="emailId">Email ID:</label>
        <input
          type="text"
          id="emailId"
          name="emailId"
          value={deliveryAgentData.emailId}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={deliveryAgentData.password}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="joiningDate">Joining Date:</label>
        <input
          type="datetime-local"
          id="joiningDate"
          name="joiningDate"
          value={deliveryAgentData.joiningDate}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="proof">Proof:</label>
        <input
          type="file"
          id="proof"
          name="proof"
          accept="image/*"
          onChange={handleInputChange}
          required
        />
        <br />
        <br />
        <br />
        <button
          type="button"
          style={{ backgroundColor: "red" }}
          onClick={createDeliveryAgent}
        >
          Create Delivery Agent
        </button>
      </form>

      <hr />
      <br />
      <br />
      <h2>Get All Delivery Agents</h2>
      <br />
      <br />
      <button type="button" onClick={getAllDeliveryAgents}>
        Get All Delivery Agents
      </button>

      <div>
        {deliveryAgentsList.length > 0 ? (
          <div>
            <h3>Delivery Agents List</h3>
            {deliveryAgentsList.map((agent) => (
              <div key={agent.ID}>
                <p>ID: {agent.ID}</p>
                <p>Name: {agent.NAME}</p>
                <p>Address: {agent.ADDRESS}</p>
                <p>Mobile No: {agent.MobileNo}</p>
                <p>Email ID: {agent.EmailId}</p>
                <p>Joining Date: {agent.JoiningDate}</p>
                <p>
                  Proof:{" "}
                  <img
                    src={`data:image/jpeg;base64,${btoa(
                      String.fromCharCode.apply(null, agent.Proof)
                    )}`}
                    alt="Proof"
                    style={{ maxWidth: "200px" }}
                  />
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No delivery agents found</p>
        )}
      </div>
    </div>
  );
};

export default DeliveryAgentManagement;
