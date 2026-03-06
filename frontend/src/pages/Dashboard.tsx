import { useState, useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import StatsCard from "@/components/ui/StatsCard";
// import { ResourceStatsChart } from "@/components/charts/Charts";
import {
  ThreatLevelGauge,
  CybercrimeTrendsChart
} from "@/components/dashboard/DashboardComponents";
import InteractiveMap from "@/components/dashboard/InteractiveMap";
import LiveIncidentFeed from "@/components/dashboard/LiveIncidentFeed";
import { Newspaper, Phone, Globe, BookOpen, ShieldAlert, Activity, RefreshCw } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardApi, attackApi } from "@/api";
import { useAppStore } from "@/store/AppContext";

/** Dashboard page — Region-Aware Cyber Threat Intelligence Dashboard */
const Dashboard = () => {
  const queryClient = useQueryClient();
  const { selectedCountry } = useAppStore();
  const [lastRefreshed, setLastRefreshed] = useState(0);

  // Fetch KPI Stats
  const { data: rawStats, refetch: refetchStats } = useQuery({
    queryKey: ["dashboard-stats", selectedCountry],
    queryFn: async () => {
      const res = await dashboardApi.getStats(selectedCountry);
      return res.data.data;
    }
  });

  // Fetch Attacks for Map/Trends
  const { data: attacksData, refetch: refetchAttacks } = useQuery({
    queryKey: ["attacks", selectedCountry],
    queryFn: async () => {
      const res = await attackApi.getAttacks(selectedCountry);
      return res.data.data;
    }
  });

  // Fetch Threat Level
  const { data: threatLevelData, refetch: refetchThreat } = useQuery({
    queryKey: ["threat-level", selectedCountry],
    queryFn: async () => {
      const res = await attackApi.getThreatLevel(selectedCountry);
      return res.data.data;
    }
  });

  // Fetch Trends
  const { data: trendsData, refetch: refetchTrends } = useQuery({
    queryKey: ["trends", selectedCountry],
    queryFn: async () => {
      const res = await attackApi.getTrends(selectedCountry, "24H");
      return res.data.data;
    }
  });

  // Simulation Mutation
  const simulateMutation = useMutation({
    mutationFn: (country: string) => attackApi.simulate(country),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attacks"] });
      queryClient.invalidateQueries({ queryKey: ["threat-level"] });
      queryClient.invalidateQueries({ queryKey: ["trends"] });
    }
  });

  // Timer for "Last updated X seconds ago"
  useEffect(() => {
    const timer = setInterval(() => {
      setLastRefreshed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const refreshTimer = setInterval(() => {
      refetchStats();
      refetchAttacks();
      refetchThreat();
      refetchTrends();
      setLastRefreshed(0);
    }, 30000);

    // Simulation trigger every 60 seconds
    const simTimer = setInterval(() => {
      if (selectedCountry !== "All") {
        simulateMutation.mutate(selectedCountry);
      } else {
        simulateMutation.mutate("India");
        simulateMutation.mutate("Ireland");
      }
    }, 60000);

    return () => {
      clearInterval(refreshTimer);
      clearInterval(simTimer);
    };
  }, [selectedCountry, refetchStats, refetchAttacks, refetchThreat, refetchTrends]);

  const stats = [
    { label: "Articles", value: rawStats?.articles || 0, icon: <Newspaper className="h-5 w-5" />, trend: { value: 12, isUp: true } },
    { label: "Helplines", value: rawStats?.helplines || 0, icon: <Phone className="h-5 w-5" /> },
    { label: "Portals", value: rawStats?.portals || 0, icon: <Globe className="h-5 w-5" /> },
    { label: "Guides", value: rawStats?.guides || 0, icon: <BookOpen className="h-5 w-5" />, trend: { value: 5, isUp: false } },
    {
      label: "Active Attacks",
      value: attacksData?.length || 0,
      icon: <ShieldAlert className="h-5 w-5" />,
      severity: (threatLevelData?.score > 50 ? "critical" : threatLevelData?.score > 20 ? "high" : "medium") as any,
      trend: { value: 24, isUp: true }
    },
    {
      label: "System Integrity",
      value: 98.4,
      icon: <Activity className="h-5 w-5" />,
      lastUpdated: `${lastRefreshed}s ago`
    },
  ];

  const resourceOverviewData = [
    { name: "Articles", count: rawStats?.articles || 0 },
    { name: "Helplines", count: rawStats?.helplines || 0 },
    { name: "Portals", count: rawStats?.portals || 0 },
    { name: "Guides", count: rawStats?.guides || 0 },
  ];

  return (
    <PageContainer
      title="Cyber Intelligence Dashboard"
      description={`Real-time threat monitoring and resource management for ${selectedCountry}`}
    >
      <div className="absolute top-8 right-8 flex items-center gap-3 text-xs font-bold text-muted-foreground/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
        <RefreshCw className={`h-3 w-3 ${simulateMutation.isPending ? 'animate-spin' : ''}`} />
        <span>Intelligence Feed: LIVE</span>
        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
      </div>



      {/* BOTTOM SECTION: KPI, Gauges, Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* KPI Cards */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((s) => (
            <StatsCard key={s.label} {...s} />
          ))}
        </div>

        {/* Threat Level Index */}
        <div className="lg:col-span-1">
          <ThreatLevelGauge score={threatLevelData?.score} level={threatLevelData?.level} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Trends Chart */}
        <div className="h-full">
          <CybercrimeTrendsChart data={trendsData} country={selectedCountry} />
        </div>

        {/* Interactive Map & Feed */}
        <div className="flex flex-col gap-4 h-full">
          <div className="flex-1 min-h-[400px]">
            <InteractiveMap
              country={selectedCountry === "All" ? "India" : selectedCountry}
              attacks={attacksData}
            />
          </div>
        </div>
      </div>

      {/* Incident Feed below Map */}
      <div className="mb-8 mt-2">
        <LiveIncidentFeed className="border-t border-white/5" attacks={attacksData || []} />
      </div>
    </PageContainer>
  );
};

export default Dashboard;
