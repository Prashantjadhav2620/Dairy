// // eslint-disable-next-line no-unused-vars
// import React from 'react';
// import {useNavigate } from 'react-router-dom'


// const CartEmpty = () => {
//     const navigate = useNavigate();

//     const login =()=>{
//         navigate('/login')
//     }

//     const signup =()=>{
//         navigate('/signup')
//     }

//   return (
//     <div className="container">
//      <div>
//      <img src={'https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg'} alt="" />
//      </div>
//       <div className="text">Your Cart is empty</div>
//       <button className="button" onClick={signup}>
//         Sign in to your account
//       </button>
//       <button className="button" onClick={login}>
//         Sign up now
//       </button>
//       <p>Shop today’s deals</p>
//     </div>
//   );
// };

// export default CartEmpty;


// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartEmpty = () => {
    const navigate = useNavigate();

    const login = () => {
        navigate('/login');
    };

    const signup = () => {
        navigate('/signup');
    };

    return (
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 mx-auto max-w-xs">
            <div className="text-center mb-6">
                <img
                    src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg"
                    alt=""
                    className="max-w-full"
                />
            </div>
            <div className="text-center">
                <div className="text-lg font-semibold mb-4">Your Cart is empty</div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 mb-4 rounded-full hover:bg-blue-700"
                    onClick={signup}
                >
                    Sign in to your account
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                    onClick={login}
                >
                    Sign up now
                </button>
                <p className="text-sm text-gray-700 mt-6">Shop today’s deals</p>
            </div>
        </div>
    );
};

export default CartEmpty;