from models import Article, Country

class ArticleService:
    """Service class for handling article-related business logic."""

    @staticmethod
    def get_articles_by_country(country_name=None, article_type=None, sort=None, page=1, per_page=20):
        """
        Fetch articles dynamically filtered by country, type, and publish order natively.
        Uses SQLAlchemy pagination instead of .all() for scalability.
        """
        query = Article.query
        
        if country_name and country_name.lower() != "all":
            query = query.join(Country).filter(Country.name == country_name)
            
        if article_type:
            query = query.filter(Article.type == article_type.lower())
            
        if sort == "desc":
            query = query.order_by(Article.published_date.desc())
        elif sort == "asc":
            query = query.order_by(Article.published_date.asc())
        else:
            # Default sorting
            query = query.order_by(Article.published_date.desc())
        
        paginated_articles = query.paginate(page=page, per_page=per_page, error_out=False)
        
        items = [
            {
                "id": str(article.id),
                "title": article.title,
                "description": article.content,
                "type": getattr(article, "type", "advisory"),
                "country": article.country.name if article.country else "Global",
                "published_date": article.published_date.isoformat() if getattr(article, 'published_date', None) else None,
                "source": article.source,
                "url": article.url
            }
            for article in paginated_articles.items
        ]
        
        return {
            "items": items,
            "total": paginated_articles.total,
            "pages": paginated_articles.pages,
            "current_page": paginated_articles.page
        }

    @staticmethod
    def get_article_by_id(article_id):
        """
        Fetch a single article by ID.
        """
        article = Article.query.get(article_id)
        if not article:
            return None
            
        return {
            "id": str(article.id),
            "title": article.title,
            "description": article.content,
            "type": getattr(article, "type", "advisory"),
            "country": article.country.name if article.country else "Global",
            "published_date": article.published_date.isoformat() if getattr(article, 'published_date', None) else None,
            "source": article.source,
            "url": article.url
        }

