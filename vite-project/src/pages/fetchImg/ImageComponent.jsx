

// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageComponent = () => {
//   const [imageUrl, setImageUrl] = useState('');

//   const Get_Img = async (filename) => {
//     const FileName=filename+".jpg"
//     console.log("filename", FileName)
//     try {
//       const response = await axios({
//         method: 'GET',
//         url: `https://localhost:2620/api/PhotoTest/DownloadImage/${FileName}`,
//         responseType: 'blob',
//       });

//       // Log additional information for debugging
//       console.log("response", response);
//       console.log("response.data", response.data);

//       const objectURL = URL.createObjectURL(response.data);

//       // Log the object URL for debugging
//       console.log("objectURL", objectURL);

//       setImageUrl(objectURL);
//     } catch (error) {
//       console.error('Error calling API:', error);

//       // Log specific error information for debugging
//       if (error.response) {
//         console.error('API response status:', error.response.status);
//         console.error('API response data:', error.response.data);
//       }
//     }
//   };

//   const [imgeName, setImgeName] = useState('')

//   const setName =(fname)=>{
//     console.log("fname",fname)  
//     setImgeName(fname)
//   }

//   const uploadImg = async()=>{
//     console.log("imgeName",imgeName)
//     console.log("imageUrl",imageUrl)
//     const data = new FormData()
//     data.append('file', imageUrl)
//     data.append('filename', imgeName)
//     const response = await axios.post("https://localhost:2620/api/PhotoTest/ImageUpload", data)
//     if (response.status === 200) {
//         console.log("response",response);
//     }
//     else{
//         console.log("error",response);
//     }
//   }

//   return (
//     <div>
//         <div>
//             <h1>Upload Image </h1>
//             <input type="text"
//             className='mt-4 bg-blue-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
//             placeholder="Enter Image Name" 
//             onChange={(e)=> setName(e.target.value)}/>
//             <input type="file" /> 
//             <button      
//                className=' mt-4 bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg mr-4'
//                onClick={() => uploadImg()}
//             >
//                 Upload
//             </button>
//         </div>
//       <h2 className='mt-4'>Downloaded Image:</h2>
//       <input type="text"
//             className='mt-4 bg-blue-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
//             placeholder="Enter Image Name" />
//       <button
//         onClick={() => Get_Img('TEST')}
//         className='mt-4 bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg mr-4'
//       >
//         Click
//       </button>
//       <div>
//         {imageUrl && (
//           <img
//             src={imageUrl}
//             alt="Downloaded Image"
//             style={{ maxWidth: '100%', height: 'auto' }}
//             onError={(e) => {
//               console.error('Error loading image:', e);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageComponent;


// eslint-disable-next-line no-unused-vars
import React, { useContext,useState } from 'react';
import axios from 'axios';
// import myContext from '../../context/data/myContext';

const ImageComponent = () => {
  const [imageUrl, setImageUrl] = useState('');

  // const context = useContext(myContext);
  // const [imageUrl, Get_Img] = context('');
  const [imgeName, setImgeName] = useState('');

  const[getImg , setGetImg] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);

  const Get_Img = async (filename) => {
    const FileName = filename + ".jpg";
    console.log("filename", FileName);
    try {
      const response = await axios({
        method: 'GET',
        url: `https://localhost:2620/api/PhotoTest/DownloadImage/${FileName}`,
        responseType: 'blob',
      });

      console.log("response", response);
      console.log("response.data", response.data);

      const objectURL = URL.createObjectURL(response.data);

      console.log("objectURL", objectURL);

      setImageUrl(objectURL);
    } catch (error) {
      console.error('Error calling API:', error);

      if (error.response) {
        console.error('API response status:', error.response.status);
        console.error('API response data:', error.response.data);
      }
    }
  };

  const setName = (fname) => {
    console.log("fname", fname);
    setImgeName(fname);
  };

  const GetNameImg = (fname) => {
    console.log("GetNameImg", fname);
    setGetImg(fname);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const uploadImg = async () => {
    console.log("imgeName", imgeName);
    console.log("selectedFile", selectedFile);

    try {
      const data = new FormData();
      data.append('file', selectedFile);
      data.append('filename', imgeName);

      const response = await axios.post("https://localhost:2620/api/PhotoTest/ImageUpload", data);

      if (response.status === 200) {
        console.log("response", response);
      } else {
        console.log("error", response);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <div>
        <h1>Upload Image </h1>
        <input
          type="text"
          className='mt-4 bg-blue-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
          placeholder="Enter Image Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <button
          className=' mt-4 bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg mr-4'
          onClick={() => uploadImg()}
        >
          Upload
        </button>
      </div>
      <h2 className='mt-4'>Downloaded Image:</h2>
      <input
        type="text"
        className='mt-4 bg-blue-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
        placeholder="Enter Image Name"
        onChange={(e)=>GetNameImg(e.target.value)}
      />
      <button
        onClick={() => Get_Img(getImg)}
        className='mt-4 bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg mr-4'
      >
        Click
      </button>
      <div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Downloaded Image"
            style={{ maxWidth: '100%', height: 'auto' }}
            onError={(e) => {
              console.error('Error loading image:', e);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageComponent;
