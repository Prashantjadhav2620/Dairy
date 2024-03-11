// import React from 'react'
import Layout from '../../../components/layout/Layout'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Message = () => {
        // const [messages, setMessages] = useState([]);




        const [messages, setMessages] = useState([]);
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get('https://localhost:2620/api/Notification');
              if(response.status===200){

                console.log("response", response.data);
               setMessages(response.data)
                
              }
            } catch (error) {
              console.error("error", error);
            }
          };
        
          fetchData();
        }, []);

        console.log("messages1", messages);

        return (
          <>
          <Layout>
          <div>Message</div>
          <div className="f-w container mx-auto mt-8 p-4">
            <div className=" mx-auto bg-white rounded-md shadow-md p-6 w-full">
              <div className="text-xl font-bold mb-4">Message</div>
              {messages.map(message => (
                <div key={message.id} className="mb-2 p-2 border rounded-md">
                <p><strong>Sender Name:</strong> {message.senderName}</p>
                <p><strong>Email:</strong> {message.email}</p>
                <p><strong>Mobile:</strong> {message.mobile}</p>
                <p><strong>Subject:</strong> {message.subject}</p>
                <p><strong>Message:</strong> {message.text}</p>
              </div>
              ))}
            </div>
          </div>

          </Layout>
             
          </>
        );
      };
export default Message