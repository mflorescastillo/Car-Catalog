from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Car(db.Model):
    __tablename__ = 'cars'  # Specify the table name in the database

    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    cylinders = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Car {self.make} {self.model} {self.year}>'
