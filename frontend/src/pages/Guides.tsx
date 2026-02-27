import PageContainer from "@/components/layout/PageContainer";
import CountrySelector from "@/components/ui/CountrySelector";
import { useFetchResources } from "@/hooks/useFetchResources";
import { guideApi } from "@/api";
import { BookOpen, ChevronRight, Loader2 } from "lucide-react";

/** Guides page — cyber safety step-by-step guides */
const Guides = () => {
  const { data, loading } = useFetchResources(guideApi.getAll, "guides");

  return (
    <PageContainer
      title="Cyber Safety Guides"
      description="Step-by-step guides for handling cyber incidents"
      actions={<CountrySelector />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.map((guide: any) => (
          <div key={guide.id} className="rounded-lg border border-border bg-card p-6 hover:cyber-border transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-md bg-accent p-2 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">{guide.title}</h3>
                <span className="text-xs text-muted-foreground">📍 {guide.country}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{guide.description}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default Guides;
