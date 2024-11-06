document.getElementById("fetchButton").addEventListener("click", fetchAndDisplayCars);

async function fetchAndDisplayCars() {
    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value;
    const year = document.getElementById("year").value;
    const cylinders = document.getElementById("cylinders").value;

    // Validate inputs
    if (!make || !model || !year || !cylinders) {
        alert("Please fill out all fields.");
        return;
    }

    try {
        // First fetch car data from the external API and store it in the database
        const fetchResponse = await fetch(`http://localhost:5000/api/fetch_cars?make=${make}&model=${model}&year=${year}&cylinders=${cylinders}`);

        if (!fetchResponse.ok) {
            throw new Error("Error fetching and storing cars");
        }

        const fetchData = await fetchResponse.json();
        console.log("Fetched and stored cars:", fetchData);

        // Now fetch all cars stored in the database to display
        const carsResponse = await fetch('http://localhost:5000/api/cars');
        if (!carsResponse.ok) {
            throw new Error("Error fetching cars from the database");
        }

        const cars = await carsResponse.json();
        displayCars(cars);

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching car data.");
    }
}

function displayCars(cars) {
    const carResultsElement = document.getElementById("carResults");
    carResultsElement.innerHTML = ""; // Clear previous results

    if (cars.length === 0) {
        carResultsElement.innerHTML = "<li>No cars found</li>";
        return;
    }

    cars.forEach(car => {
        const carElement = document.createElement("li");
        carElement.textContent = `${car.make} ${car.model} (${car.year}) - Cylinders: ${car.cylinders}`;
        carResultsElement.appendChild(carElement);
    });
}
