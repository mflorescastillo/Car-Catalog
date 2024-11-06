from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS to handle cross-origin requests
from models import db, Car  # Ensure your models.py is correctly set up
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Montse1998@localhost:5432/finance_tracker'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/api/cars', methods=['GET'])
def get_cars():
    # Retrieve all cars from the database
    cars = Car.query.all()
    return jsonify([{'id': car.id, 'make': car.make, 'model': car.model, 'year': car.year, 'cylinders': car.cylinders} for car in cars])

@app.route('/api/fetch_cars', methods=['GET'])
def fetch_and_store_cars():
    # Retrieve the query parameters 'make' and 'model'
    make = request.args.get('make', '')
    model = request.args.get('model', '')

    # Prepare parameters for the external API request
    params = {
        'make': make,   # Use 'make' from the request
        'model': model, # Use 'model' from the request
        'limit': 10      # Optional limit for the number of results returned
    }

    try:
        # Call the external API to fetch car data
        response = requests.get(
            'https://api.api-ninjas.com/v1/cars',
            headers={'X-Api-Key': 'v6Kt2qQyjUhJLhSrPwD6Jw==45CfJ0JvaeGOddTY'},
            params=params
        )

        print("API Response Status Code:", response.status_code)
        print("API Response Text:", response.text)

        # Parse the JSON response from the API
        data = response.json()

        # Check for an error in the response
        if isinstance(data, dict) and 'error' in data:
            return jsonify({'error': data['error']}), 400

        # Optional: Clear existing car data to avoid duplicates
        db.session.query(Car).delete()

        # Loop through the fetched data and store it in the database
        for car in data:
            make = car.get('make')
            model = car.get('model')
            year = car.get('year')
            cylinders = car.get('cylinders')

            if make and model and year is not None and cylinders is not None:
                new_car = Car(make=make, model=model, year=year, cylinders=cylinders)
                db.session.add(new_car)

        # Commit the changes to the database
        db.session.commit()
        return jsonify({'message': 'Cars fetched and stored successfully.'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Ensure that the database tables are created before starting the app
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    app.run(debug=True, port=5000)  # Run Flask app on port 5000
