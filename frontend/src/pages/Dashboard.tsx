import PageContainer from "@/components/layout/PageContainer";
import StatsCard from "@/components/ui/StatsCard";
import { ResourceStatsChart, CountryDistributionChart } from "@/components/charts/Charts";
import { Newspaper, Phone, Globe, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/api";

/** Dashboard page — overview of all resources */
const Dashboard = () => {
  const { data: rawStats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await dashboardApi.getStats();
      return res.data.data;
    }
  });

  const { data: distributionData } = useQuery({
    queryKey: ["dashboard-distribution"],
    queryFn: async () => {
      const res = await dashboardApi.getDistribution();
      return res.data.data;
    }
  });

  const stats = [
    { label: "Articles", value: rawStats?.articles || 0, icon: <Newspaper className="h-5 w-5" />, trend: "Latest advisories" },
    { label: "Helplines", value: rawStats?.helplines || 0, icon: <Phone className="h-5 w-5" />, trend: "Emergency contacts" },
    { label: "Portals", value: rawStats?.portals || 0, icon: <Globe className="h-5 w-5" />, trend: "Reporting sites" },
    { label: "Guides", value: rawStats?.guides || 0, icon: <BookOpen className="h-5 w-5" />, trend: "Safety tutorials" },
  ];

  const resourceOverviewData = [
    { name: "Articles", count: rawStats?.articles || 0 },
    { name: "Helplines", count: rawStats?.helplines || 0 },
    { name: "Portals", count: rawStats?.portals || 0 },
    { name: "Guides", count: rawStats?.guides || 0 },
  ];

  return (
    <PageContainer title="Dashboard" description="Overview of cyber resources across regions">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResourceStatsChart data={resourceOverviewData} />
        <CountryDistributionChart data={distributionData} />
      </div>
    </PageContainer>
  );
};

export default Dashboard;
