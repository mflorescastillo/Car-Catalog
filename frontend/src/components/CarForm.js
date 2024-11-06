import React, { useState } from 'react';
import axios from 'axios';

function CarForm() {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/cars', formData);
      // Handle successful submission (e.g., show a success message)
    } catch (error) {
      // Handle errors (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for make, model, year, and price */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default CarForm;
