import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import CashOnDeliveryPage from './CashOnDeliveryPage'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Modal() {
    let [isOpen, setIsOpen] = useState(false);

    const context = useContext(myContext)
    const { mode ,address,setAddress ,productsDetails } = context;

    let [selectedPaymentMethod, setSelectedPaymentMethod,] = useState(null);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        if(productsDetails.length>0){
            setIsOpen(true);
        }
        else{
            toast.error("Plz select product first??", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 0,
              });
        }
    }

    function handlePaymentMethod(method) {
        setSelectedPaymentMethod(method);
    }

    const  method=(method)=>{
        if (method === 'cod') {
            return <CashOnDeliveryPage/>
        }
    }
    const navigate = useNavigate();
    const CashOnDelivery =()=>{
        if(address.name!=null||address.Address!=null||address.MobileNo!=null||address.pincode!=null){
            navigate('/CashOnDelivery')
        }else{
            toast.error("Fill all fields ??", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 0,
              });
        }
    }
    return (
        <>
            <div className="text-center rounded-lg text-white font-bold">
                <button
                    type="button"
                    onClick={openModal}
                    className="w-full bg-violet-600 py-2 text-center rounded-lg text-white font-bold bg-green-600"
                >
                Proceed to Buy
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-2 text-left align-middle shadow-xl transition-all bg-gray-50">

                                    <section className="">
                                        <div className="flex flex-col items-center justify-center py-8 mx-auto lg:py-0">

                                            <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                                    <form className="space-y-4 md:space-y-6" action="#">
                                                        <div>
                                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Name</label>
                                                            <input type="name" name="name" id="name" className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" 
                                                            onChange={(e) => setAddress({ ...address, Name: e.target.value })}
                                                            required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Address</label>
                                                            <input type="text" name="address" id="address" className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                                            onChange={(e) => setAddress({ ...address, Address: e.target.value })}
                                                             required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">Enter Pincode</label>
                                                            <input type="text" name="pincode" id="pincode" className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                                             required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900">Enter Mobile Number</label>
                                                            <input type="text" name="mobileNumber" id="mobileNumber" className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                                            onChange={(e) => setAddress({ ...address, MobileNo: e.target.value })}
                                                             required />
                                                        </div>

                                                        <div>
                                                            <label className="block mb-2 text-sm font-medium text-gray-900">Choose Payment Method</label>
                                                            <div className="flex space-x-4">
                                                                <button
                                                                    type="button"
                                                                    className={`flex-1 text-white bg-violet-600 hover:bg-violet-800 focus:outline-none rounded-lg p-2.5 ${selectedPaymentMethod === 'online' ? 'bg-green-600' : 'bg-gray-500'}`}
                                                                    onClick={() => handlePaymentMethod('online')}
                                                                >
                                                                    Online Payment
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className={`flex-1 text-white bg-violet-600 hover:bg-violet-800 focus:outline-none rounded-lg p-2.5 ${selectedPaymentMethod === 'cod' ? 'bg-green-600' : 'bg-gray-500'}`}
                                                                    onClick={() =>CashOnDelivery() }
                                                                >
                                                                    Cash on Delivery
                                                                </button>
                                                                {/* <CashOnDeliveryPage/> */}
                                                            </div>
                                                        </div>
                                                    </form>
                                                    {/* <button onClick={closeModal} type="button" className="focus:outline-none w-full text-white bg-violet-600 bg-green-600 hover:bg-violet-800 outline-0 font-medium rounded-lg text-sm px-5 py-2.5">Order Now</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

