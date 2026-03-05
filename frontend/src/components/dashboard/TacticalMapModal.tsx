import { X, Shield, Activity, List, LineChart as LineIcon, Map as MapIcon, Layers, Zap } from "lucide-react";
import InteractiveMap from "./InteractiveMap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useMemo } from "react";

interface TacticalMapModalProps {
    isOpen: boolean;
    onClose: () => void;
    country: string;
    attacks: any[];
    threatLevel: any;
}

const TacticalMapModal = ({ isOpen, onClose, country, attacks, threatLevel }: TacticalMapModalProps) => {
    if (!isOpen) return null;

    // Calculate 24h trend from attacks for the line chart
    const trendData = useMemo(() => {
        const hours = Array.from({ length: 24 }, (_, i) => {
            const d = new Date();
            d.setHours(d.getHours() - (23 - i), 0, 0, 0);
            return {
                time: d.getHours() + ":00",
                timestamp: d.getTime(),
                Critical: 0,
                Medium: 0,
                Low: 0
            };
        });

        attacks.forEach(a => {
            const aTime = new Date(a.timestamp);
            const hourIndex = hours.findIndex(h => {
                const hTime = new Date(h.timestamp);
                return aTime.getHours() === hTime.getHours() && aTime.getDate() === hTime.getDate();
            });
            if (hourIndex !== -1) {
                if (a.severity === 'critical' || a.severity === 'high') hours[hourIndex].Critical++;
                else if (a.severity === 'medium') hours[hourIndex].Medium++;
                else hours[hourIndex].Low++;
            }
        });

        return hours;
    }, [attacks]);

    const severityBreakdown = [
        { name: "Critical", value: threatLevel?.breakdown?.high || 0, color: "#f43f5e" },
        { name: "Medium", value: threatLevel?.breakdown?.medium || 0, color: "#eab308" },
        { name: "Low", value: threatLevel?.breakdown?.low || 0, color: "#22c55e" },
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 flex flex-col overflow-hidden">
            {/* Top Bar */}
            <div className="h-20 border-b border-white/5 bg-white/5 flex items-center justify-between px-8">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Shield className="h-6 w-6 text-primary" />
                        <span className="text-xl font-black text-gradient-cyber uppercase tracking-tighter">Tactical Command Center</span>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div className="flex gap-8">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active Threats</span>
                            <span className="text-lg font-black text-red-500">{attacks.length}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Threat Level</span>
                            <span className="text-lg font-black text-primary">{threatLevel?.level}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">System Status</span>
                        <p className="text-xs font-bold text-green-500 flex items-center gap-1.5 justify-end">
                            <Activity className="h-3 w-3" /> LIVE FEED ACTIVE
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group"
                    >
                        <X className="h-5 w-5 group-hover:rotate-90 transition-transform" />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Stats & Trends */}
                <div className="w-[350px] border-r border-white/5 bg-black/40 p-6 space-y-8 overflow-y-auto custom-scrollbar">
                    <section className="space-y-4">
                        <h3 className="text-xs font-black uppercase text-white/40 flex items-center gap-2 tracking-widest">
                            <LineIcon className="h-3.5 w-3.5" /> Severity Trends (24H)
                        </h3>
                        <div className="h-[250px] w-full bg-white/5 rounded-2xl p-4 border border-white/5">
                            {trendData.some(d => d.Critical > 0 || d.Medium > 0 || d.Low > 0) ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={trendData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ background: '#000', border: '1px solid #333', fontSize: '10px' }}
                                            itemStyle={{ padding: '2px 0' }}
                                        />
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                        <Line type="monotone" dataKey="Critical" stroke="#f43f5e" strokeWidth={3} dot={{ fill: '#f43f5e', r: 2 }} activeDot={{ r: 4 }} />
                                        <Line type="monotone" dataKey="Medium" stroke="#eab308" strokeWidth={3} dot={{ fill: '#eab308', r: 2 }} activeDot={{ r: 4 }} />
                                        <Line type="monotone" dataKey="Low" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', r: 2 }} activeDot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full w-full flex flex-col items-center justify-center text-center p-4">
                                    <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center mb-2">
                                        <LineIcon className="h-5 w-5 text-white/20" />
                                    </div>
                                    <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">No trend data available for the last 24H</span>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xs font-black uppercase text-white/40 flex items-center gap-2 tracking-widest">
                            <Activity className="h-3.5 w-3.5" /> Severity Breakdown
                        </h3>
                        <div className="space-y-4">
                            {severityBreakdown.map(s => (
                                <div key={s.name} className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                                        <span className="text-white/70">{s.name}</span>
                                        <span style={{ color: s.color }}>{s.value}</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                                            style={{
                                                width: `${attacks.length ? (s.value / attacks.length) * 100 : 0}%`,
                                                backgroundColor: s.color
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Center/Main Area: Map & Feed Below */}
                <div className="flex-1 flex flex-col overflow-hidden bg-slate-950/20">
                    <div className="flex-1 relative p-8">
                        <div className="w-full h-full">
                            <InteractiveMap country={country} attacks={attacks} />
                        </div>

                        {/* Legend / Overlay */}
                        <div className="absolute top-12 left-12 flex flex-col gap-2 z-[1000]">
                            <div className="px-4 py-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-lg text-xs font-bold text-primary flex items-center gap-2">
                                <Layers className="h-4 w-4" /> HEATMAP ENABLED
                            </div>
                            <div className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-xs font-bold text-white/60 flex items-center gap-2">
                                <Zap className="h-4 w-4" /> REAL-TIME OVERLAY
                            </div>
                        </div>
                    </div>

                    {/* Bottom Panel: Live Incident Feed */}
                    <div className="h-[280px] border-t border-white/5 bg-black/40 flex flex-col overflow-hidden">
                        <div className="px-8 py-4 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase text-white/40 flex items-center gap-2 tracking-widest">
                                <List className="h-3.5 w-3.5" /> Live Incident Feed (Active Patterns)
                            </h3>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1.5">
                                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-[10px] text-white/40 font-bold">CRITICAL</span>
                                </div>
                                <div className="flex items-center gap-1.5 ml-4">
                                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                                    <span className="text-[10px] text-white/40 font-bold">MEDIUM</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-x-auto p-6 flex gap-4 custom-scrollbar items-start">
                            {attacks.map((a, i) => (
                                <div key={i} className="min-w-[280px] max-w-[280px] p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group cursor-pointer animate-in slide-in-from-bottom duration-500" style={{ animationDelay: `${i * 80}ms` }}>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${a.severity === 'critical' ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-orange-500 text-orange-500 bg-orange-500/10'}`}>
                                            {a.severity}
                                        </span>
                                        <span className="text-[10px] text-white/30 font-mono italic">{new Date(a.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-1">{a.attack_type} detected</h4>
                                    <p className="text-[11px] text-muted-foreground mt-2">Target located in <span className="text-white/80 font-bold">{a.city}</span></p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex gap-1">
                                            <div className="h-1 w-4 bg-primary/40 rounded-full" />
                                            <div className="h-1 w-2 bg-primary/20 rounded-full" />
                                        </div>
                                        <div className="text-[8px] font-bold text-white/20 tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
                                            INTEL: {a.source || "Unknown"}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {attacks.length === 0 && (
                                <div className="flex-1 flex items-center justify-center text-white/20 text-xs font-bold uppercase tracking-widest italic">
                                    No active incidents detected in this region
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TacticalMapModal;
