from models import Article

class ArticleService:
    """Service class for handling article-related business logic."""

    @staticmethod
    def get_articles_by_country(country_id):
        """
        Fetch articles filtered by country.
        """
        query = Article.query
        if country_id:
            query = query.filter_by(country_id=country_id)
        
        articles = query.all()
        return [
            {
                "id": str(article.id),
                "title": article.title,
                "description": article.content,
                "country": article.country.name if article.country else "Global",
                "date": article.published_date.strftime("%Y-%m-%d") if article.published_date else "",
                "source": article.source,
                "url": article.url
            }
            for article in articles
        ]

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
            "country": article.country.name if article.country else "Global",
            "date": article.published_date.strftime("%Y-%m-%d") if article.published_date else "",
            "source": article.source,
            "url": article.url
        }
