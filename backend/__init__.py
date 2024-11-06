from flask import Flask

app = Flask(__name__)

# Import your app's blueprints or other modules here
from .routes import routes_blueprint
app.register_blueprint(routes_blueprint)

# ... other configurations and initializations

if __name__ == '__main__':
    app.run(debug=True)
