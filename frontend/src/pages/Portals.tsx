import PageContainer from "@/components/layout/PageContainer";
import ResourceCard from "@/components/ui/ResourceCard";
import CountrySelector from "@/components/ui/CountrySelector";
import { useFetchResources } from "@/hooks/useFetchResources";
import { portalApi, Portal } from "@/api";
import { Globe } from "lucide-react";

/** Reporting portals page */
const Portals = () => {
  const { data, loading } = useFetchResources<Portal>(portalApi.getAll, "portals");

  return (
    <PageContainer
      title="Reporting Portals"
      description="Official cybercrime reporting websites"
      actions={<CountrySelector />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer no-underline h-full"
          >
            <ResourceCard
              title={p.name}
              description={p.description}
              country={p.country}
              icon={<Globe className="h-4 w-4" />}
            />
          </a>
        ))}
      </div>
    </PageContainer>
  );
};

export default Portals;
