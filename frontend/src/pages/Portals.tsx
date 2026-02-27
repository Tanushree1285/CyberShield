import PageContainer from "@/components/layout/PageContainer";
import ResourceCard from "@/components/ui/ResourceCard";
import CountrySelector from "@/components/ui/CountrySelector";
import { useFetchResources } from "@/hooks/useFetchResources";
import { portalApi } from "@/api";
import { Globe, ExternalLink, Loader2 } from "lucide-react";

/** Reporting portals page */
const Portals = () => {
  const { data, loading } = useFetchResources(portalApi.getAll, "portals");

  return (
    <PageContainer
      title="Reporting Portals"
      description="Official cybercrime reporting websites"
      actions={<CountrySelector />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((p) => (
          <ResourceCard
            key={p.id}
            title={p.title}
            description={p.description}
            country={p.country}
            icon={<Globe className="h-4 w-4" />}
            actions={
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                Visit Portal <ExternalLink className="h-3 w-3" />
              </a>
            }
          />
        ))}
      </div>
    </PageContainer>
  );
};

export default Portals;
