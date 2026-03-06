import { Shield, BookOpen, ChevronRight, CheckCircle, AlertTriangle, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const GuidelinesPage = () => {
    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header Section */}
                <header className="space-y-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex p-4 bg-primary/20 rounded-2xl"
                    >
                        <BookOpen className="h-10 w-10 text-primary" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black tracking-tight text-gradient-brown uppercase"
                    >
                        Usage Guidelines
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg font-light text-[var(--legal-font-color)]/80 max-w-2xl mx-auto leading-relaxed"
                    >
                        A comprehensive guide on how to effectively use CyberShield to report incidents and stay updated on global cyber threats.
                    </motion.p>
                </header>

                {/* Content Section */}
                <div className="cyber-card p-8 md:p-12 space-y-12">
                    <section className="space-y-6">
                        <h2 className="text-2xl font-medium text-[var(--legal-font-color)] flex items-center gap-3">
                            <ShieldCheck className="h-8 w-8 text-primary" />
                            How to Report Incident
                        </h2>
                        Broadway                        <div className="grid gap-6">
                            {[
                                { step: "01", title: "Identify Incident Type", desc: "Determine if it's a financial fraud, social media hack, or data breach." },
                                { step: "02", title: "Select Your Region", desc: "Use our region selector to find the correct national reporting portal." },
                                { step: "03", title: "Document Evidence", desc: "Take screenshots of URLs, transaction IDs, and communication logs." },
                                { step: "04", title: "File Official Report", desc: "Click the redirected link to fill the form on the official government portal." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-8 p-8 rounded-3xl border border-primary/5 items-start group hover:border-primary/20 transition-all bg-card/40">
                                    <span className="text-5xl font-black text-primary/20 group-hover:text-primary/40 transition-colors">{item.step}</span>
                                    <div>
                                        <h2 className="font-bold text-foreground text-xl mb-3 tracking-tight">{item.title}</h2>
                                        <p className="text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-medium text-[var(--legal-font-color)]">Usage Dos & Don'ts</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="font-bold text-green-500 flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5" /> The Dos
                                </h3>
                                <ul className="space-y-2 text-sm text-[var(--legal-font-color)]/70 list-disc list-inside font-light">
                                    <li>Use verified links for reporting.</li>
                                    <li>Check advisories daily for new threats.</li>
                                    <li>Share official helplines with those in need.</li>
                                    <li>Use the AI assistant for quick guidance.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-red-500/80 flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5" /> The Don'ts
                                </h3>
                                <ul className="space-y-2 text-sm text-[var(--legal-font-color)]/70 list-disc list-inside font-light">
                                    <li>Don't submit false or prank reports.</li>
                                    <li>Don't share sensitive PII on public forums.</li>
                                    <li>Don't ignore official CERT security alerts.</li>
                                    <li>Don't click on suspicious links from outside sources.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer CTA */}
                <footer className="flex justify-center pt-8">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                    >
                        Back to CyberShield <ChevronRight className="h-5 w-5" />
                    </Link>
                </footer>
            </div>
        </div>
    );
};

export default GuidelinesPage;
