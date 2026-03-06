import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import CountrySelector from "@/components/ui/CountrySelector";
import { useFetchResources } from "@/hooks/useFetchResources";
import { guideApi, Guide } from "@/api";
import { BookOpen, Shield, AlertTriangle, ShoppingCart, Users, KeyRound, Briefcase, Phone, Car, MessageCircle, Mail, CreditCard, Lock, ShieldAlert } from "lucide-react";

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
  const navigate = useNavigate();

  return (
    <PageContainer
      title={<span className="text-gradient-brown">Cyber Safety Guides</span>}
      description="Step-by-step guides for handling cyber incidents"
      actions={<CountrySelector />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.map((guide: Guide) => (
          <button
            key={guide.id}
            onClick={() => navigate(`/guides/${guide.id}`)}
            className="text-left cyber-card p-6 cursor-pointer h-full"
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
    </PageContainer>
  );
};

export default Guides;
