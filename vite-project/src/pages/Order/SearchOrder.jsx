// SearchOrder.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

// eslint-disable-next-line react/prop-types
function SearchOrder({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="container mx-auto mt-8 flex flex-col items-center justify-between mb-4 sm:flex-row sm:items-center sm:justify-between md:w-2/4">
      <h1 className="text-2xl font-bold mb-4 sm:mb-0">Your Orders</h1>
      <div className="flex flex-col items-center sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Search all orders"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 w-full sm:w-64 mb-4 sm:mb-0 sm:mr-4 rounded"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search Orders
        </button>
      </div>
    </div>
  );
}

export default SearchOrder;
