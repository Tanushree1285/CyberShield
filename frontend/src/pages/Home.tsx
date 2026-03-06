import { Link } from "react-router-dom";
import { Shield, Lock, Bell, Phone, Globe as GlobeIcon, CheckCircle, ChevronRight, HelpCircle, ChevronDown, AlertTriangle, MessageSquare, Bot, ShieldAlert } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const Home = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / 25;
    const y = (clientY - innerHeight / 2) / 25;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Parallax transforms for cards
  const card1X = useTransform(dx, (value) => -value * 1.5);
  const card1Y = useTransform(dy, (value) => -value * 1.5);
  const card2X = useTransform(dx, (value) => -value * 0.8);
  const card2Y = useTransform(dy, (value) => -value * 0.8);
  const card3X = useTransform(dx, (value) => -value * 1.2);
  const card3Y = useTransform(dy, (value) => -value * 1.2);
  const card4X = useTransform(dx, (value) => -value * 2);
  const card4Y = useTransform(dy, (value) => -value * 2);

  // Robot rotation
  const rotateX = useTransform(dy, (value) => -value * 0.5);
  const rotateY = useTransform(dx, (value) => value * 0.5);

  const scrollVariants = {
    hide: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="flex flex-col gap-12 pb-16" onMouseMove={handleMouseMove}>
      {/* Hidden SVG for gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="bronzeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cd7f32" />
            <stop offset="50%" stopColor="#a0522d" />
            <stop offset="100%" stopColor="#8b4513" />
          </linearGradient>
        </defs>
      </svg>
      {/* HERO SECTION */}
      <section className="relative px-6 pt-10 md:pt-12 max-w-7xl mx-auto w-full overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="flex flex-col items-start gap-6 z-10">
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-[1] uppercase">
                Global<br />cyber<br /><span className="text-gradient-brown">resource</span><br />network
              </h1>
              <p className="mt-2 text-lg text-muted-foreground max-w-lg leading-relaxed">
                A centralized intelligence hub for verified cybercrime reporting, official helplines, and government-backed security advisories across multiple global regions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/resources"
                className="px-8 py-4 btn-gold-gradient font-bold rounded-full flex items-center gap-3 text-lg group shadow-lg"
              >
                Explore Resources <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const chatbotToggle = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
                  if (chatbotToggle) chatbotToggle.click();
                }}
                className="px-8 py-4 glass-card font-bold text-foreground hover:bg-foreground/5 transition-all text-lg border border-border/40 flex items-center gap-3 shadow-md"
              >
                <Bot className="h-5 w-5 chatbot-icon-gradient" />
                Ask CyberShield AI
              </motion.button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center items-center min-h-[600px]">
            <motion.div
              className="relative w-full max-w-[600px] aspect-square"
              style={{ rotateX, rotateY }}
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />

              {/* Floating UI Cards */}
              <motion.div
                style={{ x: card1X, y: card1Y }}
                className="hidden md:block absolute top-0 -left-12 glass-card p-5 w-56 shadow-2xl border-border/20 z-20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-foreground">Official Helplines</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">Verified emergency contacts for your selected region.</p>
              </motion.div>

              <motion.div
                style={{ x: card2X, y: card2Y }}
                className="hidden md:block absolute top-1/3 -right-16 glass-card p-5 w-56 shadow-3xl border-border/20 z-20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <span className="text-xs font-bold text-foreground">Report Cybercrime</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">Direct portals for fraud, hacking, and identity theft.</p>
              </motion.div>

              <motion.div
                style={{ x: card3X, y: card3Y }}
                className="hidden md:block absolute bottom-10 -left-8 glass-card p-5 w-56 shadow-2xl border-border/20 z-20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-cyber-glow/20 rounded-lg">
                    <ShieldAlert className="h-5 w-5 text-cyber-glow" />
                  </div>
                  <span className="text-xs font-bold text-foreground">Security Advisories</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">Latest government alerts and official CERT updates.</p>
              </motion.div>

              <motion.div
                style={{ x: card4X, y: card4Y }}
                className="hidden md:block absolute -bottom-10 right-0 glass-card p-5 w-56 shadow-2xl border-border/20 z-20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Bot className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="text-xs font-bold text-foreground">AI Cyber Assistant</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">24/7 interactive guidance through cyber threats.</p>
              </motion.div>
            </motion.div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/15 blur-[150px] rounded-full -z-10" />
          </div>
        </div>
      </section>


      <motion.section
        initial="hide"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollVariants}
        className="px-6 max-w-7xl mx-auto w-full"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Real-Time Cyber Advisories", desc: "Aggregated government cyber alerts and CERT updates.", icon: Bell, color: "text-primary" },
            { title: "Verified Helplines", desc: "Region based official cybercrime emergency contacts.", icon: Phone, color: "text-blue-400" },
            { title: "Official Reporting Portals", desc: "Direct access to trusted government cybercrime reporting platforms.", icon: GlobeIcon, color: "text-purple-400" },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-6 group hover:bg-foreground/5 transition-all cursor-pointer border-border/10 bronze-hue-soft">
              <feature.icon className={`h-8 w-8 ${feature.color} mb-4 transition-transform group-hover:scale-110`} />
              <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">{feature.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <div className="section-divider" />

      {/* ENTERPRISE-GRADE INSIGHTS */}
      <motion.section
        initial="hide"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollVariants}
        className="px-6 max-w-7xl mx-auto w-full flex flex-col items-center gap-12 text-center"
      >
        <div className="flex flex-col gap-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">Enterprise-Grade Insights</h2>
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-light text-[var(--legal-font-color)] italic">
              "Technology is a tool, but security is a mindset. CyberShield bridges the gap."
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {[
            "Real Time Advisory Updates",
            "Fraud Reporting Assistance",
            "Cybercrime Education Guides",
            "Government Portal Directory",
            "Live Cyber Trends Dashboard",
            "AI Chatbot Assistance",
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-4 p-5 feature-card group transition-all">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold text-foreground/90 text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <div className="section-divider" />

      <motion.section
        initial="hide"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollVariants}
        className="px-6 py-12 bg-foreground/[0.01] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-10">
          <div className="flex flex-col gap-8 text-left">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.1] uppercase">
                SMART CYBER<br /><span className="text-gradient-brown">RESOURCE</span><br />PLATFORM
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                A centralized platform that helps users quickly identify the correct cybercrime reporting channel, helpline, or advisory depending on their region.
              </p>
            </div>
            <Link
              to="/guidelines"
              className="w-fit px-8 py-4 btn-gold-gradient font-bold rounded-xl text-lg shadow-2xl flex items-center gap-3 group transition-all"
            >
              Explore Guidelines <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative aspect-square flex items-center justify-center">
            <img src="/img.png" alt="Smart Cyber Resource Platform" className="max-w-[85%] rounded-2xl shadow-2xl animate-float object-contain" />
          </div>
        </div>
      </motion.section>

      <div className="section-divider" />

      {/* PARTNER LOGO SECTION */}
      <motion.section
        initial="hide"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollVariants}
        className="px-6 py-12 flex flex-col items-center gap-10"
      >
        <span className="text-sm font-bold tracking-[0.3em] text-muted-foreground/60 uppercase text-center">In partnership with</span>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-20 gap-y-10 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {[
            "I4C India",
            "CERT-In",
            "GNCCB Ireland",
            "NCSC Ireland",
            "Interpol Cyber"
          ].map((partner, i) => (
            <div key={i} className="text-xl md:text-2xl font-black tracking-tighter text-foreground/80 hover:text-primary transition-colors cursor-default">
              {partner}
            </div>
          ))}
        </div>
      </motion.section>

      <div className="section-divider" />

      {/* PROCESS SECTION */}
      <motion.section
        initial="hide"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollVariants}
        className="px-6 max-w-7xl mx-auto w-full flex flex-col gap-12"
      >
        <div className="grid md:grid-cols-3 gap-8 relative">
          {[
            { step: "01", title: "Select Region", desc: "Choose your country to load region specific cyber resources." },
            { step: "02", title: "Browse Resources", desc: "View articles, advisories, helplines and reporting portals." },
            { step: "03", title: "Report or Get Help", desc: "Use official portals or chatbot assistance to report cybercrime." },
          ].map((proc, i) => (
            <div key={i} className="flex flex-col gap-6 p-7 rounded-2xl border border-primary/5 bronze-hue-soft hover:border-primary/20 transition-all">
              <span className="text-[10px] font-black text-primary tracking-[0.4em] uppercase">Phase {proc.step}</span>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-foreground tracking-tight">{proc.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{proc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* FAQ SECTION */}
      <motion.section
        initial="hide"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollVariants}
        className="px-6 max-w-3xl mx-auto w-full flex flex-col gap-10"
      >
        <div className="flex flex-col gap-6 text-center">
          <HelpCircle className="h-16 w-16 text-primary mx-auto opacity-50" />
          <h2 className="text-5xl font-black text-foreground tracking-tight uppercase">Knowledge Base</h2>
        </div>

        <div className="space-y-6">
          {[
            { q: "How does the platform verify official cybercrime portals?", a: "We strictly aggregate links from government domains (.gov, .nic.in, etc.) and official CERT announcements to ensure all portals are authentic." },
            { q: "Can I report cybercrime directly through the platform?", a: "No, we direct you to the official government reporting portals. This ensures your report is legally valid and handled by the correct authorities." },
            { q: "How frequently are advisories updated?", a: "Advisories are pulled in real-time or updated multiple times daily from official security feeds across different regions." },
            { q: "Which countries are supported?", a: "Currently, we offer full support for India and Ireland, with plans to expand to more regions soon." },
            { q: "How does the chatbot assist cybercrime victims?", a: "Our AI chatbot helps identify the type of cybercrime you've faced and points you to the specific reporting portal or helpline for that incident." },
          ].map((faq, i) => (
            <details key={i} className="glass-card border-primary/5 bronze-hue-soft overflow-hidden group">
              <summary className="px-8 py-8 list-none cursor-pointer flex justify-between items-center text-foreground/90 font-bold hover:bg-primary/5 transition-all text-lg">
                {faq.q}
                <ChevronDown className="h-6 w-6 text-primary transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-8 pb-8 text-muted-foreground leading-relaxed font-light italic">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
