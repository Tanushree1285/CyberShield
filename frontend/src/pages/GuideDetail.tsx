import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ShieldCheck, AlertTriangle, Lightbulb, Info } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { motion } from "framer-motion";

/** Dedicated document-style page for guides */
const GuideDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Placeholder data - in a real app, this would be fetched based on 'id'
    const guideData = {
        title: "Advanced Phishing Protection",
        introduction: "Phishing remains the most common entry point for cyberattacks. This guide covers how to identify and prevent sophisticated phishing attempts.",
        sections: [
            {
                title: "Identifying Sophisticated Phishing",
                content: "Modern phishing isn't just about bad grammar. Spearfishing uses detailed personal information captured from social media or data breaches to craft highly convincing emails.",
                icon: <Info className="h-6 w-6 text-primary" />
            },
            {
                title: "Technical Prevention Steps",
                content: "Configure SPF, DKIM, and DMARC on your email domains. Use hardware-based Multi-Factor Authentication (MFA) like YubiKeys which are resistant to proxy-based phishing.",
                icon: <ShieldCheck className="h-6 w-6 text-primary" />
            },
            {
                title: "Prevention Tips",
                content: "Always check the actual sender address, not just the display name. Hover over links to reveal the true destination URL. When in doubt, contact the sender through a known, alternative channel.",
                icon: <Lightbulb className="h-6 w-6 text-primary" />
            }
        ],
        troubleshooting: "If you have already clicked a suspicious link or provided credentials, immediately change your passwords and enable MFA on all affected accounts. Disconnect the device from the network if you suspect malware was downloaded.",
        resources: [
            "National Cyber Security Centre (NCSC)",
            "Anti-Phishing Working Group (APWG)",
            "CyberShield Advisory Portal"
        ]
    };

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
                    className="guide-document space-y-12"
                >
                    <header className="border-b border-border pb-8">
                        <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-6">
                            <BookOpen className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gradient-brown uppercase tracking-tight mb-4">
                            {guideData.title}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed font-light italic">
                            {guideData.introduction}
                        </p>
                    </header>

                    <div className="space-y-10">
                        {guideData.sections.map((section, i) => (
                            <section key={i} className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/5 rounded-lg">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                                </div>
                                <p className="text-lg text-muted-foreground leading-relaxed ml-11">
                                    {section.content}
                                </p>
                            </section>
                        ))}
                    </div>

                    <section className="bg-red-50/50 border border-red-100 p-8 rounded-2xl space-y-4">
                        <div className="flex items-center gap-3 text-red-600 font-bold">
                            <AlertTriangle className="h-6 w-6" />
                            <h2 className="text-xl">What To Do If You Are Affected</h2>
                        </div>
                        <p className="text-red-900/80 leading-relaxed font-medium">
                            {guideData.troubleshooting}
                        </p>
                    </section>

                    <section className="space-y-6 pt-8 border-t border-border">
                        <h2 className="text-2xl font-bold text-foreground">Official Resources</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {guideData.resources.map((resource, i) => (
                                <li key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-colors">
                                    <ShieldCheck className="h-5 w-5 text-primary" />
                                    <span className="font-medium text-foreground/80">{resource}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </motion.div>
            </div>
        </PageContainer>
    );
};

export default GuideDetail;
