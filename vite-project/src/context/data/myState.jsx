// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import MyContext from './myContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

function MyState(props) {
  const [mode, setMode] = useState('light');
  // eslint-disable-next-line no-unused-vars
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';

    }
  }
  
  const [loading, setLoading] = useState(false);

  //addProduct
  const [products, setProducts] = useState({
    product_Id: null,
    product_Name: null,
    product_Price: null,
    product_Contity: null,
    product_Description: null,
    product_Type: null,
    product_Image_URL: null
  })

  const addProduct = async () => {
    if (products.product_Id == null || products.product_Name == null || products.product_Price == null || products.product_Contity == null || products.product_Description == null || products.product_Type == null || products.product_Image_URL == null) {
      return toast.error('Please fill all fields')
    }

    console.log("addProduct data", products);

    try {
      const response = await axios.post('https://localhost:2620/api/Products/createproducts', products);
      if (response.status === 200) {
        console.log(response);
        toast.success("Product added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 100,
        });
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 100);
        getProductData();
        setLoading(false);
      }
      else {
        console.log("error");
        toast.error("error");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
      setProducts(""); // Clear product form
    }
  };

  //get Products
  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true);
    try {
      // const response = await axios.get('https://localhost:2620/api/Products/products');
      const response = await axios.get('http://localhost:2620/api/Products/products');
      console.log("Product get data:>>", response.data);
      setProduct(response.data);
      toast.success("Products fetched successfully");
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 0,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);

  // update product Function

  const edithandle = (item) => {
    setProducts(item)
  }

  const updateProduct = async () => {
    setLoading(true);

    try {
      if (!products.product_Id) {
        return toast.error('Product ID is required for update');
      }

      const updateEndpoint = `https://localhost:2620/api/Products/updateproduct/${products.product_Id}`;
      const response = await axios.put(updateEndpoint, products);

      if (response.status === 200) {
        console.log(response);
        toast.success('Product updated successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 10,
        });
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
        getProductData();
        setLoading(false);
        window.location.href = '/dashboard';
      } else {
        console.log('Error updating product');
        toast.error('Error updating product');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    } finally {
      setLoading(false);
      setProducts({});
    }
  };

  // Delete Product

  // const deleteProduct = async (item) => {
  //   setLoading(true);

  //   try {
  //     const deleteEndpoint = `https://localhost:2620/api/Products/deleteproduct/${item.product_Id}`;
  //     const response = await axios.delete(deleteEndpoint);

  //     if (response.status === 200) {
  //       console.log(response);
  //       toast.success('Product deleted successfully');
  //       getProductData();
  //       setLoading(false);
  //     } else {
  //       console.log('Error deleting product');
  //       toast.error('Error deleting product');
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error('Error deleting product:', error);
  //     toast.error('Failed to delete product');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const deleteProduct = async (item) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');

    if (confirmDelete) {
      setLoading(true);

      try {
        const deleteEndpoint = `https://localhost:2620/api/Products/deleteproduct/${item.product_Id}`;
        const response = await axios.delete(deleteEndpoint);

        if (response.status === 200) {
          console.log(response);
          toast.success('Product deleted successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 100,
          });
          getProductData();
          setLoading(false);
        } else {
          console.log('Error deleting product');
          toast.error('Error deleting product');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      } finally {
        setLoading(false);
      }
    }
  };


  // Filter Products by name
  const [search, SetSearch] = useState("");
  const filterData = async (name) => {
    console.log("nameSearch", name);
    SetSearch(name)
  }

  const [ProductTotalAmount, SetProducttotalAmount] = useState(0);

  // Calculate Subtotal
  const ProductSubCost = async (amount) => {
    SetProducttotalAmount(amount)
  }

  // ==============================
  //Create Agent 
  
  const [Agents, setAgents] = useState({
    photo: null,
    proof: null,
    deliveryAgent: {
      id: 0,
      name: '',
      address: '',
      mobileNo: '',
      emailId: '',
      password: '',
      joiningDate: '',
    },
  });

  const createNewAgent = async () => {
    console.log("Agents",Agents)
    try {
      // Validate mandatory fields
      if (
        Agents.proof === null ||
        Agents.deliveryAgent.id === null ||
        Agents.deliveryAgent.name === null ||
        Agents.deliveryAgent.address === null ||
        Agents.deliveryAgent.mobileNo === null ||
        Agents.deliveryAgent.emailId === null ||
        Agents.deliveryAgent.password === null ||
        Agents.deliveryAgent.joiningDate === null
      ) {
        console.log("Error: Proof or some deliveryAgent properties are null.");
        return;
      }

      console.log("Agents in try",Agents)
  
      // Create FormData object
      const formData = new FormData();
  
      // Append the photo and proof files to the FormData
      if (Agents.photo) {
        formData.append('Photo', Agents.photo); // Assuming a JPEG image, adjust as needed
      } else {
        formData.append('Photo', new Blob([])); // Send an empty file
      }
      
      if (Agents.proof) {
        formData.append('Proof', Agents.proof); // Assuming a PDF proof, adjust as needed
      } else {
        formData.append('Proof', new Blob([])); // Send an empty file
      }
  
      // Append the deliveryAgent data as individual fields
      formData.append('DeliveryAgent.ID', String(Agents.deliveryAgent.id));
      formData.append('DeliveryAgent.NAME', Agents.deliveryAgent.name);
      formData.append('DeliveryAgent.ADDRESS', Agents.deliveryAgent.address);
      formData.append('DeliveryAgent.MobileNo', Agents.deliveryAgent.mobileNo);
      formData.append('DeliveryAgent.EmailId', Agents.deliveryAgent.emailId);
      formData.append('DeliveryAgent.PASSWORD', Agents.deliveryAgent.password);
      formData.append('DeliveryAgent.JoiningDate', Agents.deliveryAgent.joiningDate);
  
      // Make API request
      console.log("formData",formData)
      const response = await axios.post('https://localhost:2620/api/AgentData/createDeliveryAgent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        console.log(response);
        toast.success("Agent added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        // Redirect or perform necessary actions after successful agent creation
      } else {
        console.log("Error:", response.data); // Log the error response for debugging
        toast.error("Failed to add agent");
      }
    } catch (error) {
      console.error("Error adding agent:", error);
      toast.error("Failed to add agent");
    } finally {
      setLoading(false);
    }
  };

  // ============================
   // update product Function

   // Assuming this is where you define your state
   const [UpdateAgents, setUpdateAgents] = useState({
    deliveryAgent: {
      id: 0,
      name: '',
      address: '',
      mobileNo: '',
      emailId: '',
      password: '',
      joiningDate: '',
    },
   });
   
   
  const editAgenthandle = (item) => {
    setUpdateAgents(item)
  }
   
   // Function to update the agent
   const updateAgent = async (id) => {
    console.log("UpdateAgents",UpdateAgents)
    console.log("id",id)
     try {
       // Check if required fields are provided
       if (!UpdateAgents.deliveryAgent.NAME || !UpdateAgents.deliveryAgent.ADDRESS || !UpdateAgents.deliveryAgent.MobileNo || !UpdateAgents.deliveryAgent.EmailId || !UpdateAgents.deliveryAgent.PASSWORD) {
         return console.error('Missing required fields');
       }

       console.log("UpdateAgents in try ",UpdateAgents)
   
       const updateEndpoint = `https://localhost:2620/api/AgentData/updateDeliveryAgent/${id}`;
       
       // Assuming the backend API expects a payload like { DeliveryAgent: { ID, NAME, ADDRESS, MobileNo, EmailId, PASSWORD, JoiningDate } }
       const response = await axios.put(updateEndpoint, { DeliveryAgent: UpdateAgents.deliveryAgent });
   
       if (response.status === 200) {
         console.log(response);
         toast.success('Agent updated successfully', {
           position: toast.POSITION.TOP_RIGHT,
           autoClose: 1000,
         });
         getProductData();
         setLoading(false);
         window.location.href = '/dashboard';
       } else {
         console.log('Error updating Agent');
         toast.error('Error updating Agent');
         setLoading(false);
       }
     } catch (error) {
       console.error('Error updating Agent:', error);
       toast.error('Failed to update Agent');
     } 
     finally {
       setLoading(false);
       // Reset the state after the update
       setUpdateAgents({
         deliveryAgent: {
           ID: 0,
           NAME: '',
           ADDRESS: '',
           MobileNo: '',
           EmailId: '',
           PASSWORD: '',
           JoiningDate: '',
         },
       });
     }
   };

  
  //Get Agent
  const [Agent, setAgent] = useState([]);

  const getAgentData = async () => {
    try {
      // const response = await axios.get('https://localhost:2620/api/DeliveryAgent/alldeliveryagents');
      // const response = await axios.get('https://localhost:2620/api/AgentData/getAllDeliveryAgents');
      const response = await axios.get('http://localhost:2620/api/AgentData/getAllDeliveryAgents');
      console.log("Agent get data:>>", response.data);
      setAgent(response.data);
      toast.success("Agent Data fetched successfully");
    } catch (error) {
      console.error("Error fetching  Get Agent call :", error);
      toast.error("Failed to fetch Agent", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 0,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAgentData();
  }, []);

   // Delete Agent

  const deleteAgent = async (item) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');

    if (confirmDelete) {
      setLoading(true);

      try {
        const deleteEndpoint = `https://localhost:2620/api/AgentData/deleteDeliveryAgent/${item.deliveryAgent.id}`;
        const response = await axios.delete(deleteEndpoint);

        if (response.status === 200) {
          console.log(response);
          toast.success('Agent deleted successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 100,
          });
          getProductData();
          setLoading(false);
        } else {
          console.log('Error deleting Agent');
          toast.error('Error deleting Agent');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error deleting Agent:', error);
        toast.error('Failed to delete Agent');
      } finally {
        setLoading(false);
      }
    }
  };


  //===============================
  const [address,setAddress]= useState({
    Name: null,
    Address: null,
    pincode:null,
    MobileNo: null,

  })
  const [productsDetails , setproductsDetails] = useState([]);
  const [shipping,setShipping]=useState();
  const [grandTotal,setGrandTotal]=useState();
  // const[gstRate, setgstRate]=useState(0);

  // setgstRate(15)

  //====================================//
  //            ORDER                   //      
  //====================================//
  
  const [OrderInfo, setOrderInfo] = useState({
    Order_Id: null,
    User_Id: null,
    Email_Id: null,
    Date: null,
    AddressInfo: null,
    OrderDetailsInfo: [null],
    PaymentMethod: null,
  });


  //Create Order

  const CreateOrder = async()=>{
    console.log("Check is not Null OrderInfo????",(OrderInfo))

    if (
      OrderInfo.Order_Id == null ||
      OrderInfo.User_Id == null ||
      OrderInfo.Email_Id == null ||
      OrderInfo.Date == null ||
      OrderInfo.AddressInfo == null ||
      OrderInfo.OrderDetailsInfo == null ||
      OrderInfo.PaymentMethod == null
    ) {
      return toast.error('Please fill all fields');
    }
    
    setLoading(true);
    try{
      console.log("Set values Orders ty OrderInfo",(OrderInfo))

        const response = await axios.post('https://localhost:2620/api/OrderInfo/createorder',OrderInfo)
        if (response.status === 200) {
          console.log(response);
          toast.success("Order Generated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 100,
          });
          // setTimeout(() => {
          //   window.location.href = '/dashboard';
          // }, 100);
          setLoading(false);
        }
        else {
          console.log("error");
          toast.error("error");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error adding product:", error);
        toast.error("Failed to add product");
      } finally {
        setLoading(false);
        setProducts(""); // Clear product form
      }
};

  //Get order ids

  const [orderIds, setorderIds]=useState()

  const getorderIds = async()=>{
    // const response = await axios.get('https://localhost:2620/api/OrderInfo/getOrderIds')
    const response = await axios.get('http://localhost:2620/api/OrderInfo/getOrderIds')
    if(response){
      const index =response.data.length-1
      console.log("index",index)
      const id = response.data[index]
      setorderIds(id)
    }
    
  }
  useEffect(() => {
    getorderIds();
  }, []);

  const [order,setOrder]=useState()

  const getorder = async()=>{
    setLoading(true)
    try{
      const response = await axios.get(`http://localhost:2620/api/OrderInfo/getallorders`)
      if (response.status === 200) {
        console.log("response getorder",response.data)
        setOrder(response.data);
      }
      else{
        console.log("Error response getorder",response.data)
        console.log("error");
      }
    }catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Failed to fetch order", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 0,
        });
        const Order_Id=0;

        setOrder(Order_Id)
      } finally {
        setLoading(false);
      }  
  }

  useEffect(()=>[
    getorder()
  ],[])

  return (
    <MyContext.Provider value={{
      mode, toggleMode, loading, setLoading,
      products, setProducts, addProduct, product,
      edithandle, updateProduct, deleteProduct, filterData, search, ProductTotalAmount, ProductSubCost, Agent,address,setAddress,productsDetails , setproductsDetails,shipping,
      setShipping,grandTotal,setGrandTotal,OrderInfo , setOrderInfo,orderIds,CreateOrder,Agents,setAgents,createNewAgent,
      deleteAgent,editAgenthandle,updateAgent,UpdateAgents, setUpdateAgents,order
    }}>
      {props.children}
    </MyContext.Provider>
  );
}


export default MyState