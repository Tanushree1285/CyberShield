import { Shield, Lock, FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
                        <Lock className="h-10 w-10 text-primary" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black tracking-tight text-gradient-brown uppercase"
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg font-light text-[var(--legal-font-color)]/80 max-w-2xl mx-auto leading-relaxed"
                    >
                        At CyberShield, we are committed to protecting your digital footprint and ensuring the highest standards of data privacy.
                    </motion.p>
                </header>

                {/* Content Section */}
                <div className="glass-card p-8 md:p-12 space-y-10 border-primary/10">
                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-[var(--legal-font-color)]">1. Information Collection</h2>
                        <p className="text-[var(--legal-font-color)]/70 leading-relaxed font-light">
                            CyberShield does not collect personally identifiable information (PII) unless explicitly provided by you (e.g., when contacting support). The platform aggregates minimal technical data, such as browser type and anonymized usage patterns, to improve our cyber intelligence services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-[var(--legal-font-color)]">2. Usage of Data</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { title: "Service Optimization", desc: "Understanding how users interact with our global resource network." },
                                { title: "Regional Intelligence", desc: "Providing the most relevant cyber advisories based on generic location data." },
                                { title: "Security Improvements", desc: "Identifying and mitigating potential threats against the platform." },
                                { title: "Public Awareness", desc: "Generating anonymized reports on cybercrime trends for education." }
                            ].map((item, i) => (
                                <div key={i} className="p-6 bronze-hue-soft rounded-2xl border border-primary/5 hover:border-primary/20 transition-all">
                                    <h3 className="font-semibold text-[var(--legal-font-color)] mb-2 text-lg">{item.title}</h3>
                                    <p className="text-sm text-[var(--legal-font-color)]/70 font-light leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-[var(--legal-font-color)]">3. Third-Party Links</h2>
                        <p className="text-[var(--legal-font-color)]/70 leading-relaxed font-light">
                            Our platform contains links to official government cybercrime portals. While we verify these sources, CyberShield is not responsible for the privacy practices or content of these external platforms. Users are encouraged to read the privacy policies of any third-party site they visit.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-[var(--legal-font-color)]">4. Compliance & Security</h2>
                        <p className="text-[var(--legal-font-color)]/70 leading-relaxed font-light">
                            We implement robust security measures to protect the integrity of our platform. However, as no digital transmission is 100% secure, we encourage users to follow best practices in online safety as outlined in our security guides.
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

export default PrivacyPolicy;
