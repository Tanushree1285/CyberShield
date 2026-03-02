import { ReactNode } from "react";

interface ResourceCardProps {
  title: string;
  description: string;
  country: string;
  icon?: ReactNode;
  actions?: ReactNode;
  tag?: string;
}

/** Reusable card for displaying cyber resources */
const ResourceCard = ({ title, description, country, icon, actions, tag }: ResourceCardProps) => (
  <div className="group rounded-lg border border-border bg-card p-5 hover:cyber-border hover:cyber-glow transition-all duration-300 h-full">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3 flex-1">
        {icon && (
          <div className="mt-0.5 rounded-md bg-accent p-2 text-primary shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-semibold text-foreground line-clamp-2 leading-snug">{title}</h3>
            {tag && (
              <span className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-primary/10 text-primary shrink-0 mt-0.5 whitespace-nowrap">
                {tag}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          <span className="mt-2 inline-block text-xs text-muted-foreground">
            📍 {country}
          </span>
        </div>
      </div>
    </div>
    {actions && <div className="mt-4 flex gap-2">{actions}</div>}
  </div>
);

export default ResourceCard;
