import { useSearchParams } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import ResourceCard from "@/components/ui/ResourceCard";
import CountrySelector from "@/components/ui/CountrySelector";
import { useFetchResources } from "@/hooks/useFetchResources";
import { articleApi, Article } from "@/api";
import { Newspaper, SearchX } from "lucide-react";

/** Articles page — cybersecurity advisories and news */
const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read from URL or default
  const selectedType = searchParams.get("type") || "all";
  const sortOrder = searchParams.get("sort") || "desc";

  // Feed backend directly with query args so SQL handles filtering and sorting
  const { data, loading } = useFetchResources<Article>(articleApi.getAll, "articles", {
    type: selectedType === "all" ? undefined : selectedType,
    sort: sortOrder,
  });

  // Handlers to update URL
  const handleTypeChange = (type: string) => {
    setSearchParams((prev) => {
      if (type === "all") prev.delete("type");
      else prev.set("type", type);
      return prev;
    });
  };

  const handleSortChange = (order: string) => {
    setSearchParams((prev) => {
      if (order === "desc") prev.delete("sort");
      else prev.set("sort", order);
      return prev;
    });
  };

  const TABS = [
    { label: "All", value: "all" },
    { label: "Cybercrime", value: "cybercrime" },
    { label: "Advisories", value: "advisory" },
    { label: "Awareness", value: "awareness" }
  ];

  return (
    <PageContainer
      title="Advisories & Articles"
      description="Latest cybersecurity advisories and news"
      actions={<CountrySelector />}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Type Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTypeChange(tab.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${selectedType === tab.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="sort-order" className="text-sm text-muted-foreground whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
            className="h-9 px-3 pr-8 py-1 rounded-md border border-input bg-background text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="desc">Latest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-5 h-[180px] animate-pulse">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-md bg-muted shrink-0"></div>
                <div className="space-y-3 flex-1">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
                  <div className="space-y-2 mt-4">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-lg border border-dashed border-border/60 bg-card/30">
          <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-4 ring-1 ring-border">
            <SearchX className="h-6 w-6 text-muted-foreground/70" />
          </div>
          <h3 className="text-lg font-medium text-foreground">No articles found</h3>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-sm mx-auto">
            No articles match the selected filters. Try changing the category type or resetting your location filter.
          </p>
          <button
            onClick={() => handleTypeChange("all")}
            className="mt-5 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {data.map((article: Article) => (
            <ResourceCard
              key={article.id}
              title={article.title}
              description={article.description}
              country={article.country}
              type={article.type}
              published_date={
                article.published_date
                  ? new Date(article.published_date).toLocaleString()
                  : undefined
              }
              source={article.source}
              url={article.url}
              icon={<Newspaper className="h-4 w-4" />}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export default Articles;
