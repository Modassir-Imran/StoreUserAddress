import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/register', formData);
      console.log(response.data);
      alert('User and Address successfully registered!');
    } catch (error) {
      alert(error.response.data.message);  // Show error message if duplication occurs
    }
  };

  return (
   
     <form onSubmit={handleSubmit} className="w-[350px]  flex flex-col items-center mx-auto p-4 bg-slate-400 shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-bold">Register User</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 w-full rounded "
        required
      />
       <div className='space-y-4'>
       <p className='flex items-start bg-blue-500 w-1/3 rounded px-3 py-1 font-medium'>Fill address</p>
      
      <input
        type="text"
        name="street"
        value={formData.street}
        onChange={handleChange}
        placeholder="Street"
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="number"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        placeholder="Postal Code"
        className="border p-2 w-full rounded"
        required
      />

       </div>
      <button
        type="submit"
        className="w-1/2 bg-green-600  text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
   
  );
};

export default RegisterForm;
