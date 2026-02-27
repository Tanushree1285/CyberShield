from models import Helpline

class HelplineService:
    """Service class for handling helpline-related business logic."""

    @staticmethod
    def get_helplines_by_country(country_id):
        """
        Fetch helplines filtered by country.
        """
        query = Helpline.query
        if country_id:
            query = query.filter_by(country_id=country_id)
        
        items = query.all()
        return [
            {
                "id": str(item.id),
                "name": item.name,
                "phone": item.phone_number,
                "description": item.description,
                "country": item.country.name if item.country else "Global"
            }
            for item in items
        ]

    @staticmethod
    def get_helpline_by_id(helpline_id):
        """
        Fetch a single helpline by ID.
        """
        item = Helpline.query.get(helpline_id)
        if not item: return None
        return {
            "id": str(item.id),
            "name": item.name,
            "phone": item.phone_number,
            "description": item.description,
            "country": item.country.name if item.country else "Global"
        }
