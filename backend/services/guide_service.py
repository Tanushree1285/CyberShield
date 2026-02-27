from models import Guide

class GuideService:
    """Service class for handling guide-related business logic."""

    @staticmethod
    def get_guides_by_country(country_id):
        """
        Fetch guides filtered by country.
        """
        query = Guide.query
        if country_id:
            query = query.filter_by(country_id=country_id)
        
        items = query.all()
        return [
            {
                "id": str(item.id),
                "title": item.title,
                "description": item.content,
                "category": item.category,
                "country": item.country.name if item.country else "Global"
            }
            for item in items
        ]

    @staticmethod
    def get_guide_by_id(guide_id):
        """
        Fetch a single guide by ID.
        """
        item = Guide.query.get(guide_id)
        if not item: return None
        return {
            "id": str(item.id),
            "title": item.title,
            "description": item.content,
            "category": item.category,
            "country": item.country.name if item.country else "Global"
        }
