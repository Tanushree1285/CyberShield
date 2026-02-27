import PageContainer from "@/components/layout/PageContainer";
import ResourceCard from "@/components/ui/ResourceCard";
import CountrySelector from "@/components/ui/CountrySelector";
import { useFetchResources } from "@/hooks/useFetchResources";
import { articleApi } from "@/api";
import { Newspaper, ExternalLink } from "lucide-react";

/** Articles page — cybersecurity advisories and news */
const Articles = () => {
  const { data, loading } = useFetchResources(articleApi.getAll, "articles");

  return (
    <PageContainer
      title="Advisories & Articles"
      description="Latest cybersecurity advisories and news"
      actions={<CountrySelector />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((article) => (
          <ResourceCard
            key={article.id}
            title={article.title}
            description={article.description}
            country={article.country}
            icon={<Newspaper className="h-4 w-4" />}
            tag={article.date}
            actions={
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                title={`Read on ${article.source}`}
              >
                Read on {article.source} <ExternalLink className="h-3 w-3" />
              </a>
            }
          />
        ))}
      </div>
    </PageContainer>
  );
};

export default Articles;
