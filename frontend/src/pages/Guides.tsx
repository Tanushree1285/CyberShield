import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import CountrySelector from "@/components/ui/CountrySelector";
import { useFetchResources } from "@/hooks/useFetchResources";
import { guideApi, Guide } from "@/api";
import { BookOpen, Shield, AlertTriangle, ShoppingCart, Users, KeyRound, Briefcase, Phone, Car, MessageCircle, Mail, CreditCard, Lock, ShieldAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/* Icon lookup by guide title */
const GUIDE_ICONS: Record<string, React.ReactNode> = {
  "Secure Your UPI Payments": <Shield className="h-5 w-5" />,
  "Avoid Fake Job Scams": <Briefcase className="h-5 w-5" />,
  "Protect Yourself from Digital Arrest Scams": <ShieldAlert className="h-5 w-5" />,
  "Avoid Fake Traffic Challan Links": <Car className="h-5 w-5" />,
  "WhatsApp & Social Media Scam Awareness": <MessageCircle className="h-5 w-5" />,
  "Phishing Email and Text Scam Protection": <Mail className="h-5 w-5" />,
  "Parcel Delivery Scam Awareness": <ShoppingCart className="h-5 w-5" />,
  "Online Banking Fraud Prevention": <CreditCard className="h-5 w-5" />,
  "Phone Impersonation Scam Awareness": <Phone className="h-5 w-5" />,
  "Identify Phishing Emails": <AlertTriangle className="h-5 w-5" />,
  "Strong Password Practices": <Lock className="h-5 w-5" />,
  "Protect Social Media Accounts": <Users className="h-5 w-5" />,
  "Safe Online Shopping": <ShoppingCart className="h-5 w-5" />,
  "What to Do After Cyber Fraud": <KeyRound className="h-5 w-5" />,
};

/** Guides page — cyber safety step-by-step guides */
const Guides = () => {
  const { data } = useFetchResources<Guide>(guideApi.getAll, "guides");
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  return (
    <PageContainer
      title="Cyber Safety Guides"
      description="Step-by-step guides for handling cyber incidents"
      actions={<CountrySelector />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.map((guide: Guide) => (
          <button
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            className="text-left rounded-lg border border-border bg-card p-6 hover:cyber-border hover:cyber-glow transition-all duration-300 cursor-pointer h-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-md bg-accent p-2 text-primary">
                {GUIDE_ICONS[guide.title] || <BookOpen className="h-5 w-5" />}
              </div>
              <div>
                <h3 className="font-semibold">{guide.title}</h3>
                <span className="text-xs text-muted-foreground">📍 {guide.country}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{guide.description}</p>
          </button>
        ))}
      </div>

      {/* Guide Detail Modal — content comes from backend */}
      <Dialog open={!!selectedGuide} onOpenChange={(open) => !open && setSelectedGuide(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              {selectedGuide && (GUIDE_ICONS[selectedGuide.title] || <BookOpen className="h-5 w-5 text-primary" />)}
              {selectedGuide?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedGuide && (
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-2">
              <span className="inline-block text-xs">📍 {selectedGuide.country}</span>
              {selectedGuide.content ? (
                <div
                  className="prose prose-sm prose-invert max-w-none
                    [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-4 [&_h2]:mb-2
                    [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-4 [&_h3]:mb-1
                    [&_p]:text-muted-foreground [&_p]:mb-2
                    [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:space-y-1
                    [&_li]:text-muted-foreground
                    [&_a]:text-primary [&_a]:hover:underline
                    [&_strong]:text-foreground"
                  dangerouslySetInnerHTML={{ __html: selectedGuide.content }}
                />
              ) : (
                <p className="italic">Detailed guide content coming soon.</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Guides;
