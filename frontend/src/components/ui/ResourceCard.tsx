import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  country: string;
  icon?: ReactNode;
  actions?: ReactNode;
  tag?: string;
  type?: "cybercrime" | "advisory" | "awareness" | string;
  published_date?: string;
  source?: string;
  url?: string;
}

const getTypeColor = (type?: string) => {
  switch (type?.toLowerCase()) {
    case "cybercrime": return "badge-cybercrime";
    case "advisory": return "badge-advisory";
    case "awareness": return "badge-awareness";
    default: return "bg-primary/10 text-primary border-primary/20";
  }
};

const isNew = (dateStr?: string) => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const now = new Date();
  const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  return diffHours >= 0 && diffHours <= 48;
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};

/** Reusable card for displaying cyber resources */
const ResourceCard = ({ title, description, country, icon, actions, tag, type, published_date, source, url }: ResourceCardProps) => {
  const isRecent = isNew(published_date);

  return (
    <div className="group cyber-card p-5 transition-all duration-300 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-4 flex-1">
        <div className="flex items-start gap-3 flex-1">
          {icon && (
            <div className="mt-0.5 rounded-md bg-accent p-2 text-primary shrink-0">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-semibold text-foreground line-clamp-2 leading-snug">
                {title}
                {isRecent && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-yellow-500/10 px-2 py-0.5 text-[10px] font-medium text-yellow-500 ring-1 ring-inset ring-yellow-500/20 align-middle whitespace-nowrap">
                    New
                  </span>
                )}
              </h3>
              <div className="flex flex-col items-end gap-1 shrink-0">
                {type && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium border whitespace-nowrap capitalize ${getTypeColor(type)}`}>
                    {type}
                  </span>
                )}
                {tag && !type && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-primary/10 text-primary shrink-0 mt-0.5 whitespace-nowrap">
                    {tag}
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              {country && (
                <span className="flex items-center gap-1">
                  📍 {country}
                </span>
              )}
              {published_date && (
                <span className="flex items-center gap-1">
                  🕒 {formatDate(published_date)}
                </span>
              )}
              {source && (
                <span className="flex items-center gap-1">
                  🏢 {source}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-border/10 flex items-center gap-2">
        {actions ? (
          <div className="flex gap-2 w-full">{actions}</div>
        ) : url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors w-full"
            title={`Read more${source ? ` on ${source}` : ''}`}
          >
            Read {source ? `on ${source}` : 'Article'} <ExternalLink className="h-3 w-3" />
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default ResourceCard;
