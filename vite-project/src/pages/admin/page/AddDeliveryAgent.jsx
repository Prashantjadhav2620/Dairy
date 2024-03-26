// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../../../context/data/myContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function AddDeliveryAgent() {
  const context = useContext(MyContext);
  const { Agents, setAgents, createNewAgent } = context;

  const navigate = useNavigate();

  const cancelProduct = () => {
    navigate('/dashboard');
  };

  const [loading, setLoading] = useState(false);

  const getAgentId = async () => {
    loading(true);
    try {
      const response = await axios.get('http://localhost:2620/api/AgentData/getAllDeliveryAgents');
      const fetchedAgentId = response.data;
      const lastAgentId = Math.max(0, ...fetchedAgentId.map((agent) => agent.deliveryAgent.id), 0);
      setAgents({ ...Agents, deliveryAgent: { ...Agents.deliveryAgent, id: lastAgentId + 1 } });
      toast.success("Agent ID fetched successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Agent ID:", error);
      toast.error("Failed to fetch Agent ID");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setAgents({
      ...Agents,
      deliveryAgent: {
        ...Agents.deliveryAgent,
        [field]: value,
      },
    });
  };

  const handleFileChange = (field, file) => {
    setAgents({
      ...Agents,
      [field]: file,
    });
  };

  useEffect(() => {
    getAgentId();
  }, []); 

  return (
    <div className='my-8'>
      <div className=' flex justify-center items-center h-screen'>
        <div className=' bg-gray-800 px-10 py-4 rounded-xl '>
          <div className="">
            <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Delivery Agent</h1>
          </div>
          <div>
            <input
              type="text"
              value={Agents.deliveryAgent.id}
              onChange={(e) => handleChange('id', e.target.value)}
              name='Id'
              className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Delivery Agent Id'
            />
          </div>
         
          <div>
            <input
              type="text"
              onChange={(e) => handleChange('name', e.target.value)}
              name='title'
              className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Delivery Agent Name'
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => handleChange('address', e.target.value)}
              name='DeliveryAgent Address'
              className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Delivery Agent Address'
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => handleChange('mobileNo', e.target.value)}
              name='DeliveryAgentMob'
              className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Delivery Agent Mob'
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => handleChange('emailId', e.target.value)}
              name='DeliveryAgentMob'
              className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Delivery Agent Email-id'
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => handleChange('password', e.target.value)}
              name='DeliveryAgentMob'
              className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Delivery Agent Password'
            />
          </div>

          <input
              type="datetime-local"
              onChange={(e) => handleChange('joiningDate', e.target.value)}
              name='DeliveryAgentMob'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Delivery Agent Joining Date and Time'
          />

          <div className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>Photo</span>
            <input
              type="file"
              name='Photo'
              accept="image/*"
              onChange={(e) => handleFileChange('photo', e.target.files[0])}
            />
          </div>

          <div className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>Proof</span>
            <input
              type="file"
              name='Proof'
              onChange={(e) => handleFileChange('proof', e.target.files[0])}
            />
          </div>

          <div className=' flex justify-center mb-3'>
            <button
              onClick={createNewAgent}
              className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg mr-4'>
              Add Agent
            </button>
            <button
              onClick={cancelProduct}
              className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
              Cancel Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDeliveryAgent;

