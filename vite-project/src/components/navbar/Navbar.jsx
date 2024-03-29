// eslint-disable-next-line no-unused-vars
import { Fragment, useContext, useState ,useEffect} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Link,useNavigate } from 'react-router-dom'
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import myContext from '../../context/data/myContext'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux'
import { Badge } from 'react-bootstrap';
import { IoMdNotificationsOutline } from 'react-icons/io';
// import { Badge } from '@mui/material'; // Material-UI Badge component for visual appeal
// import { IoMdNotificationsOutline } from 'react-icons/io'
import axios from 'axios'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const context = useContext(myContext)
  const { toggleMode, mode } = context
  
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'))

  const logout = () => {
    localStorage.clear('user');
    navigate('/')
  }

  const Login = () => {
    navigate('/login')
  }

  const cartItems = useSelector((state) => state.cart)

  const [messages, setMessages] = useState([]);
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get('https://localhost:2620/api/Notification');
              if(response.status===200){

                console.log("response", response.data);
                const activeMessages = response.data.filter(message => message.isActive === true);
                if (activeMessages.length > 0) {
                  setGetRows(activeMessages.length);
                  setMessages(activeMessages, () => {
                  });
                }
                
              }
            } catch (error) {
              console.error("error", error);
            }
          };
        
          fetchData();
        }, []);

        console.log("messages",messages)

  const [getRows, setGetRows] = useState([]);

  console.log("getRows",getRows)

  return (
    <div className="bg-white sticky top-0 z-50  "  >
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  
                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-900 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    All Products
                  </Link>
                  
                  {user ? <div className="flow-root">
                    <Link to={'/order'} style={{ color: mode === 'dark' ? 'white' : '', }} className="-m-2 block p-2 font-medium text-gray-900">
                      Order
                    </Link>
                  </div>:""}
                  
                    {/* {user?.user?.email === "admin123@gmail.com"?<div className="flow-root"> <Link to={'/dashboard'} className="-m-2 block p-2 font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      admin 
                    </Link>
                    </div>:""}  */}
                  {user?.data?.User?.Email === "Admin123@gmail.com" ? (
                    <div className="flow-root">
                      <Link to={'/dashboard'} className="-m-2 block p-2 font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        admin
                      </Link>
                    </div>
                  ) : null}

                {user?.data?.User?.Email === "Admin123@gmail.com" ? (
                    <div className="flow-root">
                      <Link to={'/Notification'} className="-m-2 block p-2 font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        Notification's
                      </Link>
                    </div>
                  ) : null}
                  
                  {user ?<div className="flow-root">
                    <a onClick={logout} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Logout
                    </a>
                  </div>:
                  <a onClick={Login} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                  Login
                </a>}
                  <div className="flow-root">
                    <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="https://th.bing.com/th/id/OIP.XKdZgJT9MaVBqYDg-5JlvgAAAA?rs=1&pid=ImgDetMain"
                        // src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                        alt="Dan_Abromov" />                                        </Link>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* desktop  */}
      <header className="relative bg-white">
        {/* <p className="flex h-10 items-center justify-center bg-pink-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8" style={{ backgroundColor: mode === 'dark' ? 'rgb(62 64 66)' : '', color: mode === 'dark' ? 'white' : '', }}>
          Get free delivery on orders over ₹500
        </p> */}

        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)} style={{ backgroundColor: mode === 'dark' ? 'rgb(80 82 87)' : '', color: mode === 'dark' ? 'white' : '', }}
              >
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'} className='flex'>
                  <div className="flex ">
                    <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>  ꧁༒༻☬ད शेतकरी </h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    All Products
                  </Link>
                  {user?<Link to={'/order'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Order
                  </Link>:""}
                  {
                    user?.data?.User?.Email === "Admin123@gmail.com" ?<Link to={'/dashboard'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Admin
                  </Link>:""
                  }
                  

                  
                  

                  {user?<a onClick={logout} className="text-sm font-medium text-gray-700 cursor-pointer  " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Logout
                  </a>:<Link to={'/login'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Login
                  </Link>}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                  </a>
                </div>
                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      className="inline-block w-10 h-10 rounded-full"
                      src="https://th.bing.com/th/id/OIP.XKdZgJT9MaVBqYDg-5JlvgAAAA?rs=1&pid=ImgDetMain"
                      // src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                      alt="Dan_Abromov" />
                  </a>
                </div>
                {/* {
                  user?.data?.User?.Email === "Admin123@gmail.com" && (
                    <div className="ml-4 flow-root lg:ml-6 relative">
                      <Link to={'/Notification'} className="group -m-2 flex items-center p-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                      <IoMdNotificationsOutline style={{ width: '24px', height: '24px' }} />

                      </Link>
                    </div>
                  )
                } */}
                {
                  user?.data?.User?.Email === "Admin123@gmail.com" && (
                    <div className="ml-4 flow-root lg:ml-6 ">
                      <Link to="/Notification" className="group -m-2 flex items-center p-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        <Badge badgeContent={getRows === '0' ? '0' : getRows} color='error'>
                          <IoMdNotificationsOutline style={{ width: '24px', height: '24px' }} />
                          
                        </Badge>
                      </Link>
                    </div>
                  )
                }
                  {/* {user?.data?.User?.Email === "Admin123@gmail.com" && (
                    <Link to="/Notification" className="group -m-2 flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <div className="ml-4 flow-root lg:ml-6 relative">
                      <Badge badgeContent={getRows === '0' ? '0' : getRows} color="error">
                        <IoMdNotificationsOutline className="text-red-500 hover:text-red-700 dark:text-white dark:hover:text-red-300 w-6 h-6" />
                      </Badge>
                      </div>
                    </Link>
                  )} */}

                {/* Search */}
                <div className="flex lg:ml-6">
                  <button className='' onClick={toggleMode}>
                    {/* <MdDarkMode size={35} style={{ color: mode === 'dark' ? 'white' : '' }} /> */}
                    {mode === 'light' ?
                      (<FiSun className='' size={30} />
                      ) : 'dark' ?
                        (<BsFillCloudSunFill size={30} />
                        ) : ''}
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to={'/cart'} className="group -m-2 flex items-center p-2" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === 'dark' ? 'white' : '', }}>{cartItems.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}