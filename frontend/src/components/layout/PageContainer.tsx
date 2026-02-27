import { ReactNode } from "react";

interface PageContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}

/** Reusable page container with title and description */
const PageContainer = ({ title, description, children, actions }: PageContainerProps) => (
  <div className="container mx-auto px-4 py-8 animate-fade-in">
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1 text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div>{actions}</div>}
    </div>
    {children}
  </div>
);

export default PageContainer;
