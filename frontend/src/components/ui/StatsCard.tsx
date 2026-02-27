import { ReactNode } from "react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
}

/** Stats card for dashboard */
const StatsCard = ({ label, value, icon, trend }: StatsCardProps) => (
  <div className="rounded-lg border border-border bg-card p-5 cyber-border">
    <div className="flex items-center justify-between">
      <div className="rounded-md bg-accent p-2 text-primary">{icon}</div>
      {trend && (
        <span className="text-xs font-medium text-cyber-green">{trend}</span>
      )}
    </div>
    <div className="mt-4">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </div>
);

export default StatsCard;
