import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarItem from './CarItem';

function CarList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Fetch and store car data in the database
        await axios.get('http://flask:5000/api/fetch_cars'); // Endpoint to fetch and store cars
        // Now fetch the stored car data
        const response = await axios.get('http://flask:5000/api/cars'); // Endpoint to get cars from the database
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <CarItem key={car.id} car={car} />
        ))}
      </ul>
    </div>
  );
}

export default CarList;
