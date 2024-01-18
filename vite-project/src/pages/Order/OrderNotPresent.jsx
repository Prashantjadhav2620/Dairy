 6565// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function OrderNotPresent() {
  const context = useContext(myContext);

  const { mode } = context;

  return (
    <div className="f-full pt-10">
      <div className="mx-auto max-w-0.5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          <div
            className="flex flex-col justify-center items-center mb-6 rounded-lg bg-white p-6 shadow-md"
            style={{
              backgroundColor: mode === 'dark' ? '#282c34' : '',
              color: mode === 'dark' ? 'white' : '',
              height: '200px',
              width: '60vw',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            <h2
              className="text-lg font-bold text-gray-900"
              style={{ color: mode === 'dark' ? 'white' : '' }}
            >
              Not Ordered
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderNotPresent;

