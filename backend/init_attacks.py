from app import create_app
from extensions import db
from models import Attack

def init_db():
    app = create_app()
    with app.app_context():
        # This will only create missing tables
        db.create_all()
        print("Database tables initialized (including Attacks).")

if __name__ == "__main__":
    init_db()
