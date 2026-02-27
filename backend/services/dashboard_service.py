from models import Article, Helpline, Portal, Guide

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
