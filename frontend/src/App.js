import React, { useEffect, useState } from 'react';

const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch car data from the Flask API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cars'); // Adjust the URL as necessary
        const data = await response.json();
        setCars(data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Car Inventory</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>{car.make} {car.model} - ${car.price}</li> // Adjust according to your data structure
        ))}
      </ul>
    </div>
  );
};

export default App;
