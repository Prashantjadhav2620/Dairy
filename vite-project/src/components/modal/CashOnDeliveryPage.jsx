// CashOnDeliveryPage.js
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function CashOnDeliveryPage() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        className={`flex-1 text-white ${isOpen ? 'bg-green-600' : 'bg-gray-500'} hover:bg-violet-800 focus:outline-none rounded-lg p-2.5`}
        onClick={openModal}
      >
        Cash on Delivery
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-hidden"
          onClose={closeModal}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Added background color overlay
        >
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

          <div className="flex items-center justify-center h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="fixed inset-0 z-50 overflow-hidden"
                onClose={closeModal}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Added background color overlay
              >
                <div className="flex items-center justify-center h-screen">
                  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto mt-6">
                    <h2 className="text-2xl font-bold mb-4">Cash on Delivery</h2>
                    <p className="text-gray-600">
                      Thank you for choosing Cash on Delivery. Your order is confirmed and will be processed shortly.
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}



// import React from 'react';

// const CashOnDeliveryPage = () => {
//     return (
//         <div className="mt-4">
//             <h2 className="text-lg font-semibold mb-2">Cash on Delivery Process</h2>
//             <p className="text-gray-700">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </p>
//         </div>
//     );
// };

// export default CashOnDeliveryPage;
