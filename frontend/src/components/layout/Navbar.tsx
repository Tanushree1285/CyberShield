import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import CountrySelector from "@/components/ui/CountrySelector";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/articles", label: "Articles" },
  { path: "/resources", label: "Resources" },
  { path: "/guides", label: "Guides" },
  { path: "/dashboard", label: "Dashboard" },
];

/** Main navigation bar for CyberShield */
const Navbar = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-navbar">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <img src="/logo.png" alt="CyberShield Logo" className="h-8 w-8 object-contain drop-shadow-md group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">CyberShield</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`text-base font-semibold transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] ${pathname === item.path
                ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                : "text-white/80"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <CountrySelector />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4 animate-fade-in">
          <nav className="flex flex-col gap-1 mt-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-md text-base font-semibold transition-all ${pathname === item.path
                  ? "bg-white/10 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  : "text-white/80 hover:text-white hover:bg-white/5 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-between">
            <CountrySelector />
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-1.5 text-sm rounded-md border border-primary/30 text-primary"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
