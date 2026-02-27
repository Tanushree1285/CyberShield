from models import Portal

class PortalService:
    """Service class for handling portal-related business logic."""

    @staticmethod
    def get_portals_by_country(country_id):
        """
        Fetch portals filtered by country.
        """
        query = Portal.query
        if country_id:
            query = query.filter_by(country_id=country_id)
        
        items = query.all()
        return [
            {
                "id": str(item.id),
                "name": item.name,
                "url": item.url,
                "description": item.description,
                "country": item.country.name if item.country else "Global"
            }
            for item in items
        ]

    @staticmethod
    def get_portal_by_id(portal_id):
        """
        Fetch a single portal by ID.
        """
        item = Portal.query.get(portal_id)
        if not item: return None
        return {
            "id": str(item.id),
            "name": item.name,
            "url": item.url,
            "description": item.description,
            "country": item.country.name if item.country else "Global"
        }
