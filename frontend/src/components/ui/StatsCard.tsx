import { ReactNode, useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, RefreshCcw } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
  severity?: "low" | "medium" | "high" | "critical";
  lastUpdated?: string;
}

/** Stats card for cyber dashboard with count-up and status indicators */
const StatsCard = ({ label, value, icon, trend, severity, lastUpdated }: StatsCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalDuration = 1000;
    const increment = end / (totalDuration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  const getSeverityColor = () => {
    switch (severity) {
      case "critical": return "border-red-500/50 text-red-500 bg-red-500/5";
      case "high": return "border-orange-500/50 text-orange-500 bg-orange-500/5";
      case "medium": return "border-yellow-500/50 text-yellow-500 bg-yellow-500/5";
      case "low": return "border-green-500/50 text-green-500 bg-green-500/5";
      default: return "";
    }
  };

  return (
    <div className={`group relative cyber-card p-5 transition-all duration-300 hover:-translate-y-1 ${getSeverityColor()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary shadow-inner">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-0.5 text-xs font-bold ${trend.isUp ? 'text-red-500' : 'text-green-500'}`}>
            {trend.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend.value}%
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-3xl font-black tracking-tight font-mono">
          {displayValue.toLocaleString()}
        </p>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">{label}</p>
      </div>

      {lastUpdated && (
        <div className="mt-4 flex items-center gap-1.5 text-[10px] text-muted-foreground/60 border-t border-border/20 pt-3">
          <RefreshCcw className="h-2.5 w-2.5 animate-spin-slow" />
          <span>Updated {lastUpdated}</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;

