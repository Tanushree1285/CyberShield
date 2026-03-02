import { Link } from "react-router-dom";
import { Newspaper, Phone, Globe as GlobeIcon, BookOpen, ArrowRight } from "lucide-react";
import CountrySelector from "@/components/ui/CountrySelector";
import InteractiveGlobe from "@/components/ui/Globe";

const quickLinks = [
  { path: "/articles", label: "Advisories & News", icon: Newspaper, desc: "Latest cybersecurity alerts" },
  { path: "/helplines", label: "Helplines", icon: Phone, desc: "Emergency cyber contacts" },
  { path: "/portals", label: "Reporting Portals", icon: GlobeIcon, desc: "Official reporting sites" },
  { path: "/guides", label: "Safety Guides", icon: BookOpen, desc: "Step-by-step cyber guides" },
];

/** Home page — introduction to CyberShield */
const Home = () => (
  <div className="min-h-[calc(100vh-4rem)]">

    {/* HERO SECTION */}
    <section className="relative overflow-hidden border-b border-border min-h-[500px] flex items-center">
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyber-purple/5" />

      <div className="max-w-7xl mx-auto px-6 py-6 relative z-10 w-full">
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">

          {/* TEXT SECTION */}
          <div className="max-w-2xl animate-fade-in text-center lg:text-left flex-1">
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Region-Aware <span className="text-gradient-cyber">Cyber Resource</span> Intelligence
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed mx-auto lg:mx-0">
              Aggregating cybercrime advisories, helplines, reporting portals, and safety guides for India and Ireland.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 gradient-cyber text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                Explore Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>

              <CountrySelector />

            </div>
          </div>

          {/* GLOBE SECTION */}
          <div
            className="w-full lg:w-1/2 flex justify-center animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse" />
              
              <InteractiveGlobe />

            </div>
          </div>

        </div>
      </div>
    </section>

    {/* QUICK LINKS */}
    <section className="max-w-7xl mx-auto px-6 py-16">

      <h2 className="text-2xl font-bold mb-8">Quick Access</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {quickLinks.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="group rounded-lg border border-border bg-card p-5 hover:cyber-border hover:cyber-glow transition-all duration-300"
          >
            <item.icon className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />

            <h3 className="font-semibold">{item.label}</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {item.desc}
            </p>
          </Link>
        ))}

      </div>
    </section>

  </div>
);

export default Home;