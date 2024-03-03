// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import myContext from '../../context/data/myContext';

export default function CheckData() {
  // const context = useContext(myContext);
  const [agentData, setAgentData] = useState([]);
  // const [getImg, createURL] = context();
  const [getImg, setGetImg] = useState("");

  const getAgentData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:2620/api/AgentData/getAllDeliveryAgents"
      );

      if (response.status === 200) {
        setAgentData(response.data);
      } else {
        console.error("Error fetching Get Agent call:", response);
      }
    } catch (error) {
      console.error("Error fetching Get Agent call:", error);
    }
  };

  const createURL = async (FileName) => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://localhost:2620/api/PhotoTest/DownloadImage/${FileName}`,
        responseType: "blob",
      });
      const objectURL = URL.createObjectURL(response.data);
      setGetImg(objectURL);
      const image = `'${objectURL}'`;
      return image;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAgentData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      if (agentData.length > 0) {
        await createURL(agentData[0].photo.name);
      }
    };
    fetchImage();
  }, [agentData]);

  return (
    <div>
      <div>
        <h1 className="mt-4 bg-blue-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none">
          Hello
        </h1>
      </div>
      <button
        onClick={() => getAgentData()}
        className="mt-4 bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg mr-4"
      >
        Click
      </button>
      <br></br>
      <div>
        {agentData.map((agentData1, index) => (
          <div key={index}>
            <p>ID: {agentData1.deliveryAgent.id}</p>
            <p>Name: {agentData1.deliveryAgent.name}</p>
            <p>Address: {agentData1.deliveryAgent.address}</p>
            <p>img: {agentData1.photo.name}</p>
            <img
              onChange={() => createURL(agentData1.photo.name)}
              src={getImg}
              alt="Downloaded Image"
              style={{ maxWidth: "100%", height: "auto" }}
              onError={(e) => {
                console.error("Error loading image:", e);
              }}
            />
            <p>Phone: {agentData1.proof.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
