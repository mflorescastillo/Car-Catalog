import React from 'react';

const CarItem = ({ car }) => {
  return (
    <div className="car-item">
      <h2>{car.make} {car.model}</h2>
      <p>Price: ${car.price}</p>
      {/* You can add more details about the car here */}
    </div>
  );
};

export default CarItem;
