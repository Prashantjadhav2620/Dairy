// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import MyContext from "../../../context/data/myContext";
import { useNavigate } from 'react-router-dom';

function UpdateDeliveryAgent() {
    const context = useContext(MyContext);
    const { Agents, updateAgent ,UpdateAgents, setUpdateAgents } = context;

    const navigate = useNavigate();
    
    const cancelUpdate = () => {
        navigate('/dashboard');
    };

    const handleImageUpload = () => {
        console.log("handleImageUpload");
    };

    const handleInputChange = (field, value) => {
        setUpdateAgents({
            ...UpdateAgents,
            deliveryAgent: {
                ...UpdateAgents.deliveryAgent,
                [field]: value,
            },
        });
    };

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                    <div>
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Agent</h1>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={UpdateAgents.deliveryAgent.id}
                            onChange={(e) => handleInputChange('id', e.target.value)}
                            name='Id'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Agents Id'
                            readOnly
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={UpdateAgents.deliveryAgent.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            name='name'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Agents Name'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={UpdateAgents.deliveryAgent.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            name='address'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Agents address'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={UpdateAgents.deliveryAgent.mobileNo}
                            onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                            name='mobileNo'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Agents mobileNo'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={UpdateAgents.deliveryAgent.emailId}
                            onChange={(e) => handleInputChange('emailId', e.target.value)}
                            name='emailId'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Agents emailId'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={UpdateAgents.deliveryAgent.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            name='password'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Agents password'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={UpdateAgents.deliveryAgent.joiningDate}
                            onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                            name='joiningDate'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Agents joiningDate'
                        />
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button
                            onClick={() => updateAgent(UpdateAgents.deliveryAgent.id)}
                            className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg mr-4'>
                            Update Agent
                        </button>
                        <button
                            onClick={cancelUpdate}
                            className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                            Update Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateDeliveryAgent;
