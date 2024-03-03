import React, { useState } from "react";
import axios from "axios";

const FormDataSender = () => {
  const [formData, setFormData] = useState({
    Photo: null,
    Proof: null,
    DeliveryAgent: {
      ID: "",
      NAME: "",
      ADDRESS: "",
      MobileNo: "",
      EmailId: "",
      PASSWORD: "",
      JoiningDate: "",
    },
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "Photo" || name === "Proof") {
      // Convert file to base64 data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [name]: reader.result,
        });
      };
      reader.readAsDataURL(files[0]);
    } else if (name.startsWith("DeliveryAgent.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        DeliveryAgent: {
          ...formData.DeliveryAgent,
          [field]: value,
        },
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Photo", formData.Photo);
      formDataToSend.append("Proof", formData.Proof);

      Object.entries(formData.DeliveryAgent).forEach(([key, value]) => {
        formDataToSend.append(`DeliveryAgent.${key}`, value);
      });

      const response = await axios.post(
        "https://localhost:2620/api/AgentData/createDeliveryAgent",
        formDataToSend
      );

      console.log(response.data);

      // Reset form and errors after successful submission
      setFormData({
        Photo: null,
        Proof: null,
        DeliveryAgent: {
          ID: "",
          NAME: "",
          ADDRESS: "",
          MobileNo: "",
          EmailId: "",
          PASSWORD: "",
          JoiningDate: "",
        },
      });
      setErrors(null);
    } catch (error) {
      // Handle validation errors
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.errors
      ) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error sending data:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Photo">Photo:</label>
        <input type="file" name="Photo" onChange={handleChange} />
        {errors && errors.Photo && <p className="error">{errors.Photo[0]}</p>}
      </div>

      <div>
        <label htmlFor="Proof">Proof:</label>
        <input type="file" name="Proof" onChange={handleChange} />
        {errors && errors.Proof && <p className="error">{errors.Proof[0]}</p>}
      </div>

      {Object.entries(formData.DeliveryAgent).map(([key, value]) => (
        <div key={key}>
          <label htmlFor={`DeliveryAgent.${key}`}>{key}:</label>
          <input
            type="text"
            name={`DeliveryAgent.${key}`}
            value={value}
            placeholder={`Enter ${key}`}
            onChange={handleChange}
          />
          {/* Display errors for each DeliveryAgent field if available */}
          {errors && errors[`DeliveryAgent.${key}`] && (
            <p className="error">{errors[`DeliveryAgent.${key}`][0]}</p>
          )}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormDataSender;
