
import React, { useState } from 'react';

const DeliveryAddressForm = () => {
  const [formData, setFormData] = useState({
    country: 'Guernsey',
    fullName: '',
    streetNumber: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    pinCode: '',
    phone: '',
    useAsDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    // You can now use the formData state as needed, for example, send it to a server.
    console.log(formData);
    // Add additional logic for saving or processing the address.
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Enter a new delivery address</h2>

      <label className="block mb-2">
        <span className="text-gray-700">Country/Region</span>
        <input
          type="text"
          name="country"
          value={formData.country}
          readOnly
          className="form-input mt-1 block w-full"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Full Name</span>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="First and Last name"
          className="form-input mt-1 block w-full"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Street Number</span>
        <input
          type="text"
          name="streetNumber"
          value={formData.streetNumber}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Street Address</span>
        <input
          type="text"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          placeholder="P.O. box, company name, c/o"
          className="form-input mt-1 block w-full"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Apartment/Suite/Unit</span>
        <input
          type="text"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">City</span>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">State/Province/Region</span>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">PIN Code</span>
        <input
          type="text"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Phone Number</span>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>

      <label className="block mb-2">
        <input
          type="checkbox"
          name="useAsDefault"
          checked={formData.useAsDefault}
          onChange={handleChange}
          className="form-checkbox mt-1"
        />
        <span className="ml-2 text-gray-700">Use as my default address</span>
      </label>

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Use this address
      </button>
    </div>
  );
};

export default DeliveryAddressForm;

