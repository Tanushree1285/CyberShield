from models import Guide

class GuideService:
    """Service class for handling guide-related business logic."""

    @staticmethod
    def get_guides_by_country(country_id=None, page=1, per_page=20):
        """
        Fetch guides filtered by country with pagination.
        """
        query = Guide.query
        if country_id:
            query = query.filter_by(country_id=country_id)
        
        paginated = query.paginate(page=page, per_page=per_page, error_out=False)
        
        items = [
            {
                "id": str(item.id),
                "title": item.title,
                "description": item.description or "",
                "content": item.content,
                "category": item.category,
                "country": item.country.name if item.country else "Global"
            }
            for item in paginated.items
        ]
        
        return {
            "items": items,
            "total": paginated.total,
            "pages": paginated.pages,
            "current_page": paginated.page
        }

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
            "description": item.description or "",
            "content": item.content,
            "category": item.category,
            "country": item.country.name if item.country else "Global"
        }
