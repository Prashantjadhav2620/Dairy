
// // eslint-disable-next-line no-unused-vars
// import React, { useContext, useState, useEffect } from 'react';
// import MyContext from '../../../context/data/myContext';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';
 
// function AddDeliveryAgent() {
    
//   const context = useContext(MyContext);
//   const { Agents, setAgents, createAgent } = context;

//   const navigate = useNavigate();

//   const cancelProduct = () => {
//     navigate('/dashboard');
//   };

//   const [loading, setLoading] = useState(false);

//   const getAgentId = async () => {
//     setLoading(true);
//     try {
//       let fetchedAgentId;
//       console.log("fetchedAgentId", fetchedAgentId);
//       const response = await axios.get('https://localhost:2620/api/DeliveryAgent/alldeliveryagents');
//       fetchedAgentId = response.data;
//       if (fetchedAgentId == null) {
//         fetchedAgentId = 1;
//       }
//       console.log("fetchedAgentId 1", fetchedAgentId);
//       const lastProductId = Math.max(...fetchedAgentId.map((agent) => agent.Id));
//       console.log("Last Agent ID??:", lastProductId);
//       setAddAgents({ ...Agents, Id: lastProductId + 1 });
//       toast.success("Agent ID fetched successfully", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 1000,
//       });
//     } catch (error) {
//       console.error("Error fetching Agent ID:", error);
//       toast.error("Failed to fetch Agent ID");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       // Convert the selected file to binary data
//       const binaryData = await readFileAsDataURL(file);
//       setAgents(binaryData);
//     }
//   };

//   const readFileAsDataURL = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();

//       reader.onload = () => {
//         resolve(reader.result);
//       };

//       reader.onerror = (error) => {
//         reject(error);
//       };

//       reader.readAsDataURL(file);
//     });
//   };

//   useEffect(() => {
//     getAgentId();
//   }, []); 

// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../../../context/data/myContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function AddDeliveryAgent() {
  const context = useContext(MyContext);
  const { Agents, setAgents, createAgent } = context;

  const navigate = useNavigate();

  const cancelProduct = () => {
    navigate('/dashboard');
  };

  const [loading, setLoading] = useState(false);

  const getAgentId = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://localhost:2620/api/DeliveryAgent/alldeliveryagents');
      const fetchedAgentId = response.data;
      const lastProductId = Math.max(0, ...fetchedAgentId.map((agent) => agent.Id), 0);
      setAgents({ ...Agents, Id: lastProductId + 1 });
      toast.success("Agent ID fetched successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error fetching Agent ID:", error);
      toast.error("Failed to fetch Agent ID");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (field, event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const binaryData = await readFileAsDataURL(file);
        setAgents({ ...Agents, [field]: binaryData });
      } catch (error) {
        console.error("Error reading file:", error);
        toast.error("Failed to read the selected file");
      }
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
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
            //   value={AddAgents.Id}
              value={Agents.Id}
              onChange={(e) => setAgents({ ...Agents, Id: e.target.value })}
              name='Id'
              className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Delivery Agent Id'
            />
          </div>
          {/* <div className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>Photo</span>
            <input
              type="file"
              onChange={(e) => setAgents({ ...Agents, Photo: e.target.files[0] })}
              name='Photo'
              accept="image/*"
            />
          </div> */}
          <div className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>Photo</span>
            <input
                type="file"
                onChange={(e) => handleFileChange('Photo', e)}
                name='Photo'
                accept="image/*"
                />
          </div>
          <div>
            <input
              type="text"
              value={Agents.Name}
              onChange={(e) => setAgents({ ...Agents, Name: e.target.value })}
              name='title'
              className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Delivery Agent Name'
            />
          </div>
          <div>
            <input
              type="text"
              value={Agents.Address}
              onChange={(e) => setAgents({ ...Agents, Address: e.target.value })}
              name='DeliveryAgent Address'
              className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Delivery Agent Address'
            />
          </div>
          <div>
            <input
              type="text"
              value={Agents.MobileNo}
              onChange={(e) => setAgents({ ...Agents, MobileNo: e.target.value })}
              name='DeliveryAgentMob'
              className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Delivery Agent Mob'
            />
          </div>
          <div>
            <input
              type="text"
              value={Agents.EmailId}
              onChange={(e) => setAgents({ ...Agents, EmailId: e.target.value })}
              name='DeliveryAgentMob'
              className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Delivery Agent Email-id'
            />
          </div>
          <div>
            <input
              type="text"
              value={Agents.Password}
              onChange={(e) => setAgents({ ...Agents, Password: e.target.value })}
              name='DeliveryAgentMob'
              className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Delivery Agent Password'
            />
          </div>
          <input
                type="datetime-local"
                value={Agents.JoiningDate ? Agents.JoiningDate : new Date().toISOString().slice(0, 16)}
                onChange={(e) => setAgents({ ...Agents, JoiningDate: e.target.value })}
                name='DeliveryAgentMob'
                className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                placeholder='Delivery Agent Joining Date and Time'
            />

          {/* <div className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>Proof</span>
            <input
              type="file"
              onChange={(e) => setAgents({ ...Agents, Proof: e.target.files[0] })}
              name='Proof'
              accept="image/*"
            />
          </div> */}
          <div className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>Proof</span>
            <input
                type="file"
                onChange={(e) => handleFileChange('Proof', e)}
                name='Proof'
                accept="image/*"
                />
          </div>
          <div className=' flex justify-center mb-3'>
            <button
              onClick={createAgent}
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
