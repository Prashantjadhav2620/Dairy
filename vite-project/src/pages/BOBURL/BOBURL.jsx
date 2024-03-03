// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
// import myContext from '../../context/data/myContext';

const BOBURL = () => {
  const [imageUrl, setImageUrl] = useState("");

  // const context = useContext(myContext);
  // const [imageUrl, Get_Img] = context('');
  const [PjData, setPjData] = useState([]);
  const [Id, setId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const uploadImg = async () => {
    try {
      const data = new FormData();
      data.append("file", selectedFile);
      const objectURL = URL.createObjectURL(selectedFile);
      const SetData = {
        Id: Id,
        Photo: objectURL,
      };
      const response = await axios.post(
        "https://localhost:2620/api/pj/postpj",
        SetData
      );

      if (response.status === 200) {
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Error uploading image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const FunIDSET = (item) => {
    setId(item);
  };

  //getAllData

  const getAllData = async () => {
    try {
      const response = await axios.get("https://localhost:2620/api/pj/getpj");

      if (response.status === 200) {
        setPjData(response.data);
      } else {
        toast.error("Error uploading image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <div>
        <h1>Upload Image </h1>
        <input
          type="text"
          className="mt-4 bg-blue-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
          placeholder="Enter Id"
          onChange={(e) => FunIDSET(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <button
          className=" mt-4 bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg mr-4"
          onClick={() => uploadImg()}
        >
          Upload
        </button>
      </div>

      <h2 className="mt-4">Downloaded Image:</h2>
      <br></br>
      <button
        className=" mt-4 bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg mr-4"
        onClick={() => getAllData()}
      >
        getData
      </button>
      {PjData.map((item, index) => {
        return (
          <div key={index}>
            <div>Id: {item.id}</div>
            <div>
              <img
                src={item.photo}
                alt="Downloaded Image"
                style={{ maxWidth: "100%", height: "auto" }}
                onError={(e) => {
                  console.error("Error loading image:", e);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default BOBURL;
