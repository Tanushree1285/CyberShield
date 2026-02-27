from flask import Flask
from config import config_by_name
from extensions import db, cors

def create_app(config_name='dev'):
    """
    Flask Application Factory Pattern.
    Creates and configures the Flask application.
    """
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config_by_name[config_name])

    # Initialize extensions with app context
    db.init_app(app)
    
    # Configure CORS - allow all origins for /api/* routes
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

    # Register blueprints (routes)
    from routes import register_blueprints
    register_blueprints(app)

    return app
