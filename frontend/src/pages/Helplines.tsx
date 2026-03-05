import PageContainer from "@/components/layout/PageContainer";
import ResourceCard from "@/components/ui/ResourceCard";
import CountrySelector from "@/components/ui/CountrySelector";
import { useFetchResources } from "@/hooks/useFetchResources";
import { helplineApi, Helpline } from "@/api";
import { Phone, Loader2 } from "lucide-react";

/** Helplines page — emergency cybercrime contacts */
const Helplines = () => {
  const { data, loading } = useFetchResources<Helpline>(helplineApi.getAll, "helplines");

  return (
    <PageContainer
      title="Helplines"
      description="Emergency cybercrime contacts and helpline numbers"
      actions={<CountrySelector />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((h: Helpline) => (
          <ResourceCard
            key={h.id}
            title={h.name}
            description={h.description}
            country={h.country}
            icon={<Phone className="h-4 w-4" />}
            tag={h.phone}
          />
        ))}
      </div>
    </PageContainer>
  );
};

export default Helplines;
