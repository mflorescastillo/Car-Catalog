#!/bin/bash

makes=("Toyota" "Ford" "Honda" "Chevrolet") # Add more makes as needed

for make in "${makes[@]}"; do
    curl "http://localhost:5000/api/fetch_cars?make=$make"
done
