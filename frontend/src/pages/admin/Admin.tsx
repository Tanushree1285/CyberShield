import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Newspaper, Phone, Globe, BookOpen } from "lucide-react";

type Tab = "articles" | "helplines" | "portals" | "guides";

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "articles", label: "Articles", icon: <Newspaper className="h-4 w-4" /> },
  { key: "helplines", label: "Helplines", icon: <Phone className="h-4 w-4" /> },
  { key: "portals", label: "Portals", icon: <Globe className="h-4 w-4" /> },
  { key: "guides", label: "Guides", icon: <BookOpen className="h-4 w-4" /> },
];

/** Admin page — placeholder for managing resources */
const Admin = () => {
  const [activeTab, setActiveTab] = useState<Tab>("articles");

  return (
    <PageContainer title="Admin Panel" description="Manage CyberShield resources">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Placeholder form */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-semibold mb-4 capitalize">Add New {activeTab.slice(0, -1)}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1">Title</label>
            <input className="w-full bg-secondary rounded-md border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Enter title..." />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1">Country</label>
            <select className="w-full bg-secondary rounded-md border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
              <option>India</option>
              <option>Ireland</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-muted-foreground block mb-1">Description</label>
            <textarea className="w-full bg-secondary rounded-md border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[100px]" placeholder="Enter description..." />
          </div>
        </div>
        <button className="mt-4 gradient-cyber text-primary-foreground font-medium px-6 py-2 rounded-md hover:opacity-90 transition-opacity text-sm">
          Save {activeTab.slice(0, -1)}
        </button>
      </div>

      {/* Placeholder table */}
      <div className="mt-8 rounded-lg border border-border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold capitalize">Existing {activeTab}</h3>
        </div>
        <div className="p-6 text-center text-muted-foreground text-sm">
          No data available. Connect to backend API to load {activeTab}.
        </div>
      </div>
    </PageContainer>
  );
};

export default Admin;
