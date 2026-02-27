from .article_routes import article_bp
from .helpline_routes import helpline_bp
from .portal_routes import portal_bp
from .guide_routes import guide_bp
from .dashboard_routes import dashboard_bp

def register_blueprints(app):
    """
    Register all blueprints (API routes) to the Flask app.
    """
    app.register_blueprint(article_bp)
    app.register_blueprint(helpline_bp)
    app.register_blueprint(portal_bp)
    app.register_blueprint(guide_bp)
    app.register_blueprint(dashboard_bp)
