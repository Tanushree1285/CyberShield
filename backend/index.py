import os
from app import create_app

# Set production environment for Vercel
os.environ['FLASK_ENV'] = 'prod'

# Initialize the Flask app instance for Vercel Serverless Functions
app = create_app('prod')

# Vercel's python runtime expects the application object to be named 'app'.
