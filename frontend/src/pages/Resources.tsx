import { useRef } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { useFetchResources } from "@/hooks/useFetchResources";
import { helplineApi, Helpline, Portal } from "@/api";
import { Phone, Globe, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useAppStore } from "@/store/AppContext";

/** Hard-coded official portals data as per requirements */
const OFFICIAL_PORTALS: Record<string, Portal[]> = {
    "India": [
        { id: "p1", name: "National Cyber Crime Reporting Portal", url: "https://cybercrime.gov.in/", description: "Official portal to report all types of cyber crimes in India.", country: "India" },
        { id: "p2", name: "CERT-In", url: "https://www.cert-in.org.in/", description: "Indian Computer Emergency Response Team handling cybersecurity incidents.", country: "India" },
        { id: "p3", name: "Reserve Bank of India Cyber Portal", url: "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11906", description: "RBI's guidelines and alerts on financial cybersecurity and digital fraud.", country: "India" },
        { id: "p4", name: "PIB Cybersecurity Updates", url: "https://pib.gov.in/", description: "Official news and updates on cybersecurity from the Press Information Bureau.", country: "India" },
        { id: "p5", name: "MeitY Cybersecurity", url: "https://www.meity.gov.in/", description: "Ministry of Electronics and Information Technology's cyber initiatives.", country: "India" },
    ],
    "Ireland": [
        { id: "p6", name: "NCSC Ireland", url: "https://www.ncsc.gov.ie/news/", description: "Ireland's National Cyber Security Centre for guidance and incident response.", country: "Ireland" },
        { id: "p7", name: "Government of Ireland Cybersecurity Portal", url: "https://www.gov.ie/en/publication/cybersecurity-notices/", description: "Official cybersecurity notices and publications from the Irish Government.", country: "Ireland" },
        { id: "p8", name: "An Garda Síochána Public Warnings", url: "https://www.garda.ie/en/", description: "Public warnings and reporting guidance from Ireland's national police.", country: "Ireland" },
        { id: "p9", name: "Central Bank Ireland Cyber Alerts", url: "https://www.centralbank.ie/news/article", description: "Cybersecurity alerts and news for the Irish financial sector.", country: "Ireland" },
        { id: "p10", name: "CERT-IE", url: "https://www.cert.IE/", description: "Ireland's Computer Emergency Response Team for public and private sectors.", country: "Ireland" },
    ]
};

const Resources = () => {
    const { selectedCountry } = useAppStore();
    const { data: helplines, loading } = useFetchResources<Helpline>(helplineApi.getAll, "helplines");
    const portalsRef = useRef<HTMLDivElement>(null);

    // Helper to get portals based on selection
    const getCurrentPortals = () => {
        if (selectedCountry === "All") {
            return [...OFFICIAL_PORTALS["India"], ...OFFICIAL_PORTALS["Ireland"]];
        }
        return OFFICIAL_PORTALS[selectedCountry] || [];
    };

    const currentPortals = getCurrentPortals();

    const scrollPortals = (direction: "left" | "right") => {
        if (portalsRef.current) {
            const scrollAmount = direction === "left" ? -450 : 450;
            portalsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <PageContainer
            title="Cybersecurity Resources"
            description="Official emergency helplines and reporting portals"
        >
            <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[calc(100vh-220px)] lg:min-h-[650px]">
                {/* Left Column: Helplines (30% Width on Desktop) */}
                <div className="w-full lg:w-[30%] flex flex-col h-[500px] lg:h-full cyber-card overflow-hidden shadow-xl ring-1 ring-white/5">
                    <div className="p-5 border-b border-border/50 bg-muted/20 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shadow-inner">
                            <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg tracking-tight">Official Helplines</h2>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Emergency Contacts</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-transparent to-background/20">
                        {loading ? (
                            [1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-32 w-full animate-pulse bg-muted/30 rounded-xl border border-border/30" />
                            ))
                        ) : helplines.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60">
                                <div className="h-12 w-12 rounded-full border border-dashed border-muted-foreground/30 flex items-center justify-center mb-4">
                                    <User className="h-6 w-6 text-muted-foreground/50" />
                                </div>
                                <p className="text-sm font-medium">No helplines found</p>
                                <p className="text-xs text-muted-foreground mt-1">Try changing your region selection.</p>
                            </div>
                        ) : (
                            helplines.map((h) => (
                                <div key={h.id} className="p-5 rounded-xl border border-border/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group bg-card/40">
                                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">{h.name}</h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{h.description}</p>

                                    <div className="flex flex-col gap-2 pt-1 border-t border-border/30">
                                        {h.phone && (
                                            <a
                                                href={`tel:${h.phone}`}
                                                className="flex items-center gap-2 text-xs font-semibold p-2.5 rounded-lg bg-secondary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all group/link"
                                            >
                                                <Phone className="h-3.5 w-3.5 group-hover/link:animate-swing" />
                                                <span>{h.phone}</span>
                                                <span className="ml-auto opacity-0 group-hover:opacity-40 text-[10px]">Call Now</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column: Official Portals (70% Width on Desktop) */}
                <div className="w-full lg:w-[70%] flex flex-col h-[500px] lg:h-full portal-container overflow-hidden shadow-xl ring-1 ring-white/5">
                    <div className="p-5 border-b border-border/50 bg-muted/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shadow-inner">
                                <Globe className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg tracking-tight">Official Reporting Portals</h2>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Incident Submission</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => scrollPortals("left")}
                                className="h-10 w-10 rounded-xl border border-border/50 bg-background/50 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all shadow-sm group"
                                aria-label="Previous portal"
                            >
                                <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
                            </button>
                            <button
                                onClick={() => scrollPortals("right")}
                                className="h-10 w-10 rounded-xl border border-border/50 bg-background/50 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all shadow-sm group"
                                aria-label="Next portal"
                            >
                                <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden p-8 flex items-center bg-gradient-to-tr from-transparent via-background/5 to-primary/5">
                        <div
                            ref={portalsRef}
                            className="flex gap-8 overflow-x-auto py-8 snap-x snap-mandatory custom-scrollbar h-full items-center px-2"
                        >
                            {currentPortals.map((p) => (
                                <a
                                    key={p.id}
                                    href={p.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="min-w-[320px] md:min-w-[400px] lg:min-w-[450px] h-[380px] flex-shrink-0 snap-center group no-underline"
                                >
                                    <div className="h-full portal-card flex flex-col justify-between hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                                        {/* Decorative background icon */}
                                        <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
                                            <Globe className="h-40 w-40" />
                                        </div>

                                        <div className="space-y-6 relative z-10">
                                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner ring-1 ring-primary/20">
                                                <Globe className="h-8 w-8 text-primary" />
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-[10px] font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10 ring-1 ring-primary/20">
                                                    {p.country}
                                                </span>
                                                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{p.name}</h3>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base line-clamp-3 group-hover:text-foreground/80 transition-colors">{p.description}</p>
                                        </div>

                                        <div className="pt-8 flex items-center gap-3 relative z-10">
                                            <div className="flex items-center justify-center w-full py-4 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                                Visit Official Site <ChevronRight className="h-4 w-4 ml-2" />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Resources;
