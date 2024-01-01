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
      console.log("Product data1:>>", products);
      if ( products.product_Id == null ||products.product_Name == null ||products.product_Price == null || products.product_Contity == null || products.product_Description == null || products.product_Type == null || products.product_Image_URL == null) {
        return toast.error('Please fill all fields')
      }

      console.log("addProduct data", products);
  
      try {
        const response = await axios.post('https://localhost:2620/api/Products/createproducts', products);
        if(response.status === 200){
          console.log(response);
          toast.success("Product added successfully",{
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 100,
          });
          setTimeout(() => {
            window.location.href='/dashboard';
          }, 100);
          getProductData();
          setLoading(false);
        }
        else{
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
        const response = await axios.get('https://localhost:2620/api/Products/products');
        console.log("Product get data:>>", response.data);
        setProduct(response.data);
        toast.success("Products fetched successfully");
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products",{
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
            toast.success('Product updated successfully',{
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 10,
            });
            setTimeout(() => {
              window.location.href='/dashboard';
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
            toast.success('Product deleted successfully',{
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
    
    
    // // Assuming you have a button or some trigger to delete a product
    // const handleDelete = (productId) => {
    //   if (window.confirm('Are you sure you want to delete this product?')) {
    //     deleteProduct(productId);
    //   }
    // };
  
    const [search , SetSearch] =useState("");

    const filterData = async(name)=>{
      console.log("nameSearch",name);
      SetSearch(name)
    }
    const [ProductTotalAmount,SetProducttotalAmount]=useState(0);

    const ProductSubCost = async(amount)=>{
      SetProducttotalAmount(amount)
    }

  return (
    <MyContext.Provider value={{
      mode, toggleMode, loading, setLoading,
      products, setProducts, addProduct,product,
      edithandle,updateProduct,deleteProduct,filterData,search,ProductTotalAmount,ProductSubCost
    }}>
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState