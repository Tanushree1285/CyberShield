import { Shield } from "lucide-react";

/** Footer component */
const Footer = () => (
  <footer className="border-t border-border bg-card mt-auto">
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-semibold text-gradient-cyber">CyberShield</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 CyberShield. Region-aware cyber resource intelligence platform.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
