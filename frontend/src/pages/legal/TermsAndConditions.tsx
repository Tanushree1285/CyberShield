import { Shield, FileText, ChevronRight, Gavel } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
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
                        <Gavel className="h-10 w-10 text-primary" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black tracking-tight text-gradient-brown uppercase"
                    >
                        Terms & Conditions
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg font-light text-[var(--legal-font-color)]/80 max-w-2xl mx-auto leading-relaxed"
                    >
                        By accessing CyberShield, you agree to comply with our global cybersecurity standards and legal framework.
                    </motion.p>
                </header>

                {/* Content Section */}
                <div className="glass-card p-8 md:p-12 space-y-10 border-primary/10">
                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-[var(--legal-font-color)]">1. User Responsibility</h2>
                        <p className="text-[var(--legal-font-color)]/70 leading-relaxed font-light">
                            Users are responsible for ensuring that any information they report through CyberShield is accurate and submitted in good faith. Misuse of the platform, including the submission of false claims or malicious reporting, may lead to shared information with relevant authorities.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-[var(--legal-font-color)]">2. Limitation of Liability</h2>
                        <p className="text-[var(--legal-font-color)]/70 leading-relaxed font-light">
                            While CyberShield provides links to official government reporting portals and helplines, we do not guarantee the response time or final outcomes of these third-party services. CyberShield serves as a resource aggregator and is not an official government agency.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-[var(--legal-font-color)]">3. Intellectual Property</h2>
                        <div className="p-8 bronze-hue-soft rounded-2xl border border-primary/5 space-y-4">
                            <p className="text-sm text-[var(--legal-font-color)]/70 leading-relaxed font-light">
                                All branding, design elements, and interactive components hosted on the CyberShield platform are the intellectual property of CyberShield and its developers. Unauthorized reproduction of the platform's layout or unique interactive elements is prohibited.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-[var(--legal-font-color)]">4. Platform Availability</h2>
                        <p className="text-[var(--legal-font-color)]/70 leading-relaxed font-light">
                            We strive to ensure continuous availability of our cyber intelligence network. However, we reserve the right to modify, suspend, or discontinue any part of the platform for security updates or infrastructure maintenance without prior notice.
                        </p>
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

export default TermsAndConditions;
