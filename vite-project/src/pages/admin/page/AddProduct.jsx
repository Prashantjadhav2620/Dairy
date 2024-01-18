// eslint-disable-next-line no-unused-vars
import React, { useContext ,useState  ,useEffect} from 'react'
import MyContext from "../../../context/data/myContext"
import {useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {

    const context = useContext(MyContext);
    const {products,setProducts,addProduct} = context

    const navigate = useNavigate();
    const cannelProduct = () =>{
        navigate('/dashboard')
    }
    const [loading, setLoading] = useState(false);

    const getProductId = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://localhost:2620/api/Products/products');
            const fetchedProductId = response.data;
            console.log("fetchedProductId", fetchedProductId);
            const lastProductId = Math.max(...fetchedProductId.map(product => product.product_Id));
            setProducts({ ...products, product_Id: lastProductId+1 });
            console.log("Last Product ID:", lastProductId);
            toast.success("Product ID fetched successfully",{
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
              });
        } catch (error) {
            console.error("Error fetching product ID:", error);
            toast.error("Failed to fetch product ID");
        } finally {
            setLoading(false);
        }
    };

    // useEffect to get product ID when the component mounts
    useEffect(() => {
        getProductId();
    }, []); 

    return (
        <div className='my-8'>
            <div className=' flex justify-center items-center h-screen'>
                <div className=' bg-gray-800 px-10 py-4 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Product</h1>
                    </div>
                    <div>
                        <input type="text"
                        value={products.product_Id}
                        onChange={(e) => setProducts({ ...products, product_Id: e.target.value })}
                            name='Id'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product Id'
                            readOnly
                        />
                    </div>
                    <div>
                        <input type="text"
                        value={products.product_Type}
                        onChange={(e) => setProducts({ ...products, product_Type: e.target.value })}
                            name='category'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                        />
                    </div>
                    <div>
                        <input type="text"
                        value={products.product_Name}
                        onChange={(e) => setProducts({ ...products, product_Name: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input type="text"
                        value={products.product_Price}
                        onChange={(e) => setProducts({ ...products, product_Price: e.target.value })}
                            name='price'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                        />
                    </div>
                    <div>
                        <input type="text"
                        value={products.product_Contity}
                        onChange={(e) => setProducts({ ...products, product_Contity: e.target.value })}
                            name='contity'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product contity'
                        />
                    </div>
                    <div>
                        <input type="text"
                        value={products.product_Image_URL}
                        onChange={(e) => setProducts({ ...products, product_Image_URL: e.target.value })}
                            name='product_Image_URL'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product imageUrl'
                        />
                    </div>
                    <div>
                       <textarea cols="30" rows="8" name='description'
                        value={products.product_Description}
                        onChange={(e) => setProducts({ ...products, product_Description: e.target.value })}
                            className=' bg-gray-600 mb-2 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product description'>

                       </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                        onClick={addProduct}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg mr-4'>
                            Add Product
                        </button>
                        <button
                        onClick={cannelProduct}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Cannel add Product
                        </button>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default AddProduct