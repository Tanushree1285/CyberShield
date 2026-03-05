import os
from app import create_app

# Determine the configuration to use based on the environment variable
env_name = os.environ.get('FLASK_ENV', 'dev')

# Create the Flask application instance
app = create_app(env_name)

if __name__ == '__main__':
    # Entry point for running the application locally
    app.run(host='0.0.0.0', port=5000, debug=True)
