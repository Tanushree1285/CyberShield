from models import Article, Helpline, Portal, Guide, Country

class DashboardService:
    @staticmethod
    def get_stats(country_id=None):
        def apply_filter(query):
            if country_id:
                return query.filter_by(country_id=country_id)
            return query

        return {
            "articles": apply_filter(Article.query).count(),
            "helplines": apply_filter(Helpline.query).count(),
            "portals": apply_filter(Portal.query).count(),
            "guides": apply_filter(Guide.query).count()
        }

    @staticmethod
    def get_distribution():
        countries = Country.query.all()
        distribution = []
        
        for country in countries:
            count = (
                Article.query.filter_by(country_id=country.id).count() +
                Helpline.query.filter_by(country_id=country.id).count() +
                Portal.query.filter_by(country_id=country.id).count() +
                Guide.query.filter_by(country_id=country.id).count()
            )
            if count > 0:
                distribution.append({
                    "name": country.name,
                    "value": count
                })
        
        return distribution
