import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Shield, AlertTriangle, ShoppingCart, Users, KeyRound, Briefcase, Phone, Car, MessageCircle, Mail, CreditCard, Lock, ShieldAlert } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { guideApi } from "@/api";

/* Icon lookup by guide title to match Guides page */
const GUIDE_ICONS: Record<string, React.ReactNode> = {
  "Secure Your UPI Payments": <Shield className="h-8 w-8 text-primary" />,
  "Avoid Fake Job Scams": <Briefcase className="h-8 w-8 text-primary" />,
  "Protect Yourself from Digital Arrest Scams": <ShieldAlert className="h-8 w-8 text-primary" />,
  "Avoid Fake Traffic Challan Links": <Car className="h-8 w-8 text-primary" />,
  "WhatsApp & Social Media Scam Awareness": <MessageCircle className="h-8 w-8 text-primary" />,
  "Phishing Email and Text Scam Protection": <Mail className="h-8 w-8 text-primary" />,
  "Parcel Delivery Scam Awareness": <ShoppingCart className="h-8 w-8 text-primary" />,
  "Online Banking Fraud Prevention": <CreditCard className="h-8 w-8 text-primary" />,
  "Phone Impersonation Scam Awareness": <Phone className="h-8 w-8 text-primary" />,
  "Identify Phishing Emails": <AlertTriangle className="h-8 w-8 text-primary" />,
  "Strong Password Practices": <Lock className="h-8 w-8 text-primary" />,
  "Protect Social Media Accounts": <Users className="h-8 w-8 text-primary" />,
  "Safe Online Shopping": <ShoppingCart className="h-8 w-8 text-primary" />,
  "What to Do After Cyber Fraud": <KeyRound className="h-8 w-8 text-primary" />,
};

/** Dedicated document-style page for guides */
const GuideDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: response, isLoading, error } = useQuery({
        queryKey: ["guide", id],
        queryFn: () => guideApi.getById(id!),
        enabled: !!id
    });

    const guideData = response?.data?.data;

    // Loading State
    if (isLoading) {
        return (
            <PageContainer title="Loading Guide..." description="Fetching security advisory details">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 font-bold mb-8 transition-colors group"
                    >
                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Guides
                    </button>
                    <div className="guide-document space-y-8 animate-pulse bg-card">
                        <div className="h-8 bg-muted rounded w-1/3"></div>
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                        <div className="space-y-4 pt-8">
                            <div className="h-4 bg-muted rounded w-full"></div>
                            <div className="h-4 bg-muted rounded w-5/6"></div>
                            <div className="h-4 bg-muted rounded w-4/5"></div>
                        </div>
                    </div>
                </div>
            </PageContainer>
        );
    }

    // Error / Not Found State
    if (error || !guideData) {
        return (
            <PageContainer title="Guide Not Found" description="The requested safety guide could not be found">
                <div className="max-w-4xl mx-auto text-center py-16">
                    <h2 className="text-2xl font-bold mb-4">Guide Not Found</h2>
                    <p className="text-muted-foreground mb-8">
                        The safety guide you are looking for may have been removed or is temporarily unavailable.
                    </p>
                    <button
                        onClick={() => navigate("/guides")}
                        className="btn-gold-gradient px-6 py-2.5 rounded-lg font-semibold text-sm shadow-md"
                    >
                        Back to Guides
                    </button>
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer
            title={guideData.title}
            description="Detailed security implementation guide"
        >
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 font-bold mb-8 transition-colors group"
                >
                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Guides
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="guide-document space-y-10"
                >
                    <header className="border-b border-border pb-8">
                        <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-6">
                            {GUIDE_ICONS[guideData.title] || <BookOpen className="h-8 w-8 text-primary" />}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gradient-brown uppercase tracking-tight mb-4">
                            {guideData.title}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed font-light italic">
                            {guideData.description}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-6">
                            <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                                📁 {guideData.category}
                            </span>
                            <span className="text-xs font-semibold px-3 py-1 bg-muted text-muted-foreground rounded-full">
                                📍 {guideData.country}
                            </span>
                        </div>
                    </header>

                    {/* Rich HTML content from the database */}
                    <div 
                        dangerouslySetInnerHTML={{ __html: guideData.content }}
                        className="space-y-6 text-foreground leading-relaxed"
                    />

                    {/* Threat/Action warning alert box */}
                    <section className="bg-red-50/30 dark:bg-red-950/10 border border-red-200/50 dark:border-red-900/30 p-8 rounded-2xl space-y-4">
                        <div className="flex items-center gap-3 text-red-600 dark:text-red-400 font-bold">
                            <AlertTriangle className="h-6 w-6" />
                            <h2 className="text-xl">Have you been affected?</h2>
                        </div>
                        <p className="text-red-900/80 dark:text-red-300/80 leading-relaxed font-medium">
                            If you have already fallen victim to this scam, shared sensitive details, or clicked a suspicious link, follow the primary steps in this guide immediately. Report the incident to your bank, secure your credentials, and file a report with your local cyber safety authorities.
                        </p>
                    </section>
                </motion.div>
            </div>
        </PageContainer>
    );
};

export default GuideDetail;

