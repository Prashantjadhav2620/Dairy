// // eslint-disable-next-line no-unused-vars
// // eslint-disable-next-line no-unused-vars
// import { Link,useNavigate } from 'react-router-dom'
// import myContext from '../../context/data/myContext';
// import { useContext, useState } from 'react';
// import { auth } from '../../firebase/firebaseConfig';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import Loader from '../../components/loader/Loader';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
    
//     const context = useContext(myContext)
//     const { loading,setLoading} = context

//     const navigate = useNavigate();
//     const login = async ()=>{
//       console.log("Login")
//   }
//   return (
//     <div className=' flex justify-center items-center h-screen'>
//             {loading && <Loader/>}
//             <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
//                 <div className="">
//                     <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
//                 </div>
//                 <div>
//                     <input type="email"
//                         name='username'
//                         value={email}
//                         onChange={(e)=>setEmail(e.target.value)}
//                         className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
//                         placeholder='Email'
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e)=>setPassword(e.target.value)}
//                         className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
//                         placeholder='Password'
//                     />
//                 </div>
//                 <div className=' flex justify-center mb-3'>
//                     <button
//                     //onClick={signin}
//                     onClick={login}
//                         className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
//                         Login
//                     </button>
//                     <ToastContainer/>
//                 </div>
//                 <div>
//                     <h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/SignupRg'}>Signup</Link></h2>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Login;



import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { useContext, useState } from 'react';
import Loader from '../../components/loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');

  const context = useContext(myContext);
  const { setLoading } = context;

  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);

      // Making the API request using fetch
      const response = await fetch('https://localhost:2620/api/user/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailId: emailId,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials'); // You can handle different error cases as needed
      }

      // Assuming successful login, perform further actions (e.g., navigate to a different page)
      // ...

      toast.success('Login successful'); // Use toast or any other notification method

      console.log(' successful',response)
      console.log('Login successful',response.body)
      navigate('/dashboard'); // Navigate to the dashboard or any other page upon successful login
    } catch (error) {
      console.error('Login failed:', error.message);
      toast.error('Login failed. Please check your credentials.'); // Notify the user about login failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      {context.loading && <Loader />}
      <div className='bg-gray-800 px-10 py-10 rounded-xl'>
        <div>
          <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
        </div>
        <div>
          <input
            type='email'
            name='setEmailId'
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
            placeholder='Email Id'
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
            placeholder='Password'
          />
        </div>
        <div className='flex justify-center mb-3'>
          <button
            onClick={login}
            className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
            Login
          </button>
          <ToastContainer />
        </div>
        <div>
          <h2 className='text-white'>
            Don't have an account{' '}
            <Link className='text-yellow-500 font-bold' to={'/SignupRg'}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
