import atexit
from flask import Flask
from config import config_by_name
from extensions import db, cors

def start_scheduler(app):
    """Initializes the background scheduler for RSS and scraper ingestion tasks."""
    try:
        from apscheduler.schedulers.background import BackgroundScheduler
        from automation.jobs.fetch_certin import fetch_certin_advisories
        from automation.jobs.fetch_ncsc import fetch_ncsc_advisories
        from automation.jobs.fetch_rbi import fetch_rbi_advisories
        from automation.jobs.fetch_pib import fetch_pib_advisories
        from automation.jobs.fetch_meity import fetch_meity_advisories
        from automation.jobs.fetch_gov_ie import fetch_gov_ie_advisories
        from automation.jobs.fetch_garda import fetch_garda_advisories
        from automation.jobs.fetch_central_bank import fetch_central_bank_advisories
        
        import os
        if os.environ.get('WERKZEUG_RUN_MAIN') == 'true' or not app.debug:
            scheduler = BackgroundScheduler()
            
            def run_jobs():
                with app.app_context():
                    fetch_certin_advisories()
                    fetch_ncsc_advisories()
                    fetch_rbi_advisories()
                    fetch_pib_advisories()
                    fetch_meity_advisories()
                    fetch_gov_ie_advisories()
                    fetch_garda_advisories()
                    fetch_central_bank_advisories()

            # Execute all jobs every 6 hours
            scheduler.add_job(func=run_jobs, trigger="interval", hours=6)

            scheduler.start()
            atexit.register(lambda: scheduler.shutdown())
            print("Background Scheduler initialized for RSS ingestion.")
    except ImportError as e:
        print(f"Skipping scheduler initialization: {e}")

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

    # Boot Scheduler
    start_scheduler(app)

    return app
