// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
// import myContext from '../../context/data/myContext';

const ImageComponent = () => {
  const [imageUrl, setImageUrl] = useState("");

  // const context = useContext(myContext);
  // const [imageUrl, Get_Img] = context('');
  const [imgeName, setImgeName] = useState("");

  const [getImg, setGetImg] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const Get_Img = async (filename) => {
    const FileName = filename + ".jpg";
    try {
      const response = await axios({
        method: "GET",
        url: `https://localhost:2620/api/PhotoTest/DownloadImage/${FileName}`,
        responseType: "blob",
      });
      const objectURL = URL.createObjectURL(response.data);
      setImageUrl(objectURL);
    } catch (error) {
      console.error("Error calling API:", error);

      if (error.response) {
        console.error("API response status:", error.response.status);
        console.error("API response data:", error.response.data);
      }
    }
  };

  const setName = (fname) => {
    setImgeName(fname);
  };

  const GetNameImg = (fname) => {
    setGetImg(fname);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const uploadImg = async () => {
    try {
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("filename", imgeName);

      const response = await axios.post(
        "https://localhost:2620/api/PhotoTest/ImageUpload",
        data
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

  return (
    <div>
      <div>
        <h1>Upload Image </h1>
        <input
          type="text"
          className="mt-4 bg-blue-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
          placeholder="Enter Image Name"
          onChange={(e) => setName(e.target.value)}
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
      <input
        type="text"
        className="mt-4 bg-blue-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
        placeholder="Enter Image Name"
        onChange={(e) => GetNameImg(e.target.value)}
      />
      <button
        onClick={() => Get_Img(getImg)}
        className="mt-4 bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg mr-4"
      >
        Click
      </button>
      <div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Downloaded Image"
            style={{ maxWidth: "100%", height: "auto" }}
            onError={(e) => {
              console.error("Error loading image:", e);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageComponent;
