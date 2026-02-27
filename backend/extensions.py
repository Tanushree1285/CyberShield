from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize extensions here to avoid circular imports
db = SQLAlchemy()
cors = CORS()
