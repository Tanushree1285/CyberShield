import { useState } from "react";
import { Shield, X, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/** Footer component with legal info modal */
const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold text-gradient-cyber">CyberShield</span>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              © 2026 CyberShield. Region-aware cyber resource intelligence platform.
            </button>
          </div>
        </div>
      </footer>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gradient-cyber flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              CyberShield Legal &amp; License Information
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed mt-2">
            <p className="text-base font-semibold text-foreground">© 2026 CyberShield</p>
            <p>
              CyberShield is a region-aware cyber resource intelligence platform designed to
              aggregate cybersecurity advisories, helplines, reporting portals, and safety guidance
              from official sources for public awareness and accessibility.
            </p>
            <p>
              All content, branding, design, and structure of the CyberShield platform are protected
              under applicable copyright laws unless otherwise stated.
            </p>

            <Section number={1} title="Purpose of the Platform">
              <p>CyberShield is intended to provide users with consolidated cybersecurity resources, including:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Government cybercrime reporting portals</li>
                <li>Emergency cybercrime helplines</li>
                <li>Public cybersecurity advisories and alerts</li>
                <li>Educational safety guides</li>
              </ul>
              <p className="mt-2">
                The platform aggregates publicly available information to make cybersecurity resources easier to access.
              </p>
            </Section>

            <Section number={2} title="Information Accuracy Disclaimer">
              <p>While CyberShield strives to maintain accurate and up-to-date information:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Information may change without notice.</li>
                <li>Users should always verify details directly with official authorities or organizations.</li>
                <li>CyberShield does not guarantee the completeness or accuracy of external resources.</li>
                <li>CyberShield is not an official government platform and does not replace official cybercrime reporting authorities.</li>
              </ul>
            </Section>

            <Section number={3} title="External Links">
              <p>CyberShield may contain links to third-party websites including:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Government cybercrime portals</li>
                <li>Security organizations</li>
                <li>Public cybersecurity advisory sources</li>
              </ul>
              <p className="mt-2">
                CyberShield is not responsible for the content, availability, or policies of external websites.
                Users access external links at their own discretion.
              </p>
            </Section>

            <Section number={4} title="Data Sources">
              <p>CyberShield aggregates information from publicly available sources such as:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>National cybersecurity agencies</li>
                <li>Official government cybercrime reporting portals</li>
                <li>Public cybersecurity advisories and publications</li>
                <li>Law enforcement awareness programs</li>
              </ul>
              <p className="mt-2">
                All referenced organizations retain ownership of their respective content and trademarks.
              </p>
            </Section>

            <Section number={5} title="Privacy Statement">
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>CyberShield does not collect personal information unless explicitly provided by the user.</li>
                <li>The platform may collect minimal technical information such as browser type, device information, and anonymous usage analytics.</li>
                <li>This data is used only to improve platform functionality and user experience.</li>
                <li>CyberShield does not sell or share user data with third parties.</li>
              </ul>
            </Section>

            <Section number={6} title="Limitation of Liability">
              <p>CyberShield is provided for informational and educational purposes only. The platform and its developers are not liable for:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Any loss resulting from reliance on information provided on the platform</li>
                <li>Any actions taken based on external resources or advisories</li>
                <li>Availability or reliability of third-party services</li>
              </ul>
              <p className="mt-2">
                Users should always contact official authorities for legal or emergency cybercrime matters.
              </p>
            </Section>

            <Section number={7} title="Intellectual Property">
              <p>
                All logos, trademarks, and names referenced on CyberShield belong to their respective owners.
                Unauthorized reproduction, modification, or distribution of CyberShield's content or branding
                without permission is prohibited.
              </p>
            </Section>

            <Section number={8} title="Open Source Technologies">
              <p>CyberShield is built using modern open-source technologies including:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>React</li>
                <li>Vite</li>
                <li>Tailwind CSS</li>
                <li>Lucide Icons</li>
                <li>TypeScript</li>
              </ul>
              <p className="mt-2">These technologies are used under their respective open-source licenses.</p>
            </Section>

            <Section number={9} title="Educational Use">
              <p>CyberShield may be used for:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Cybersecurity awareness</li>
                <li>Educational research</li>
                <li>Academic demonstrations</li>
                <li>Public cyber safety initiatives</li>
              </ul>
              <p className="mt-2">Commercial redistribution of CyberShield content without permission is prohibited.</p>
            </Section>

            <Section number={10} title="Contact">
              <p>For questions regarding this platform, partnerships, or corrections to resource information:</p>
              <div className="mt-3 flex items-center gap-2 text-primary font-medium">
                <Mail className="h-4 w-4" />
                <a href="mailto:support@cybershield.org" className="hover:underline">
                  support@cybershield.org
                </a>
              </div>
            </Section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

/** Reusable numbered section heading */
const Section = ({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <h3 className="text-base font-semibold text-foreground">
      {number}. {title}
    </h3>
    {children}
  </div>
);

export default Footer;
