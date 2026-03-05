import os

class Config:
    """Base configuration for CyberShield."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-cybershield')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    # Default Dev Database URI for SQLite
    basedir = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL', f'sqlite:///{os.path.join(basedir, "cybershield_dev.db")}')

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    
config_by_name = dict(
    dev=DevelopmentConfig,
    prod=ProductionConfig
)
