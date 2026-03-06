import { useState, useEffect, useMemo } from "react";
import InteractiveMap from "@/components/dashboard/InteractiveMap";
import LiveIncidentFeed from "@/components/dashboard/LiveIncidentFeed";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Shield, Activity, LineChart as LineIcon, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi, attackApi } from "@/api";
import { useAppStore } from "@/store/AppContext";
import { useNavigate } from "react-router-dom";

export default function MapDashboard() {
    const { selectedCountry } = useAppStore();
    const navigate = useNavigate();

    // Fetch Attacks for Map/Trends
    const { data: attacksData } = useQuery({
        queryKey: ["attacks", selectedCountry],
        queryFn: async () => {
            const res = await attackApi.getAttacks(selectedCountry);
            return res.data.data;
        },
        refetchInterval: 30000,
    });

    // Fetch Threat Level
    const { data: threatLevelData } = useQuery({
        queryKey: ["threat-level", selectedCountry],
        queryFn: async () => {
            const res = await attackApi.getThreatLevel(selectedCountry);
            return res.data.data;
        },
        refetchInterval: 30000,
    });

    const attacks = attacksData || [];

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

        attacks.forEach((a: any) => {
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
        { name: "Critical", value: threatLevelData?.breakdown?.high || 0, color: "#f43f5e" },
        { name: "Medium", value: threatLevelData?.breakdown?.medium || 0, color: "#eab308" },
        { name: "Low", value: threatLevelData?.breakdown?.low || 0, color: "#22c55e" },
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-black animate-in fade-in duration-300 flex flex-col overflow-hidden">
            {/* Top Bar */}
            <div className="h-20 border-b border-white/5 bg-[#060b12] flex items-center justify-between px-8 shrink-0">
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
                            <span className="text-lg font-black text-primary">{threatLevelData?.level || "CALCULATING..."}</span>
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
                        onClick={() => navigate('/dashboard')}
                        className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group"
                    >
                        <X className="h-5 w-5 group-hover:rotate-90 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Top Area: Full Screen Map (70vh) */}
            <div className="w-full relative shrink-0 border-0" style={{ height: '70vh' }}>
                <InteractiveMap
                    country={selectedCountry === "All" ? "India" : selectedCountry}
                    attacks={attacks}
                    isFullscreen={true}
                />
            </div>

            {/* Bottom Area: Live Feed & Threat Stats Split (Remaining 30vh) */}
            <div className="flex-1 flex overflow-hidden bg-[#060b12]">
                {/* Left - Live Feed */}
                <div className="flex-1 overflow-hidden border-r border-white/5 flex flex-col">
                    <LiveIncidentFeed
                        attacks={attacks}
                        className="h-full w-full rounded-none border-0 m-0"
                    />
                </div>

                {/* Right Side - Threat Stats */}
                <div className="w-[450px] p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
                    {/* Severity Trends */}
                    <section className="space-y-4">
                        <h3 className="text-xs font-black uppercase text-white/40 flex items-center gap-2 tracking-widest">
                            <LineIcon className="h-3.5 w-3.5" /> Severity Trends (24H)
                        </h3>
                        <div className="h-[200px] w-full bg-white/5 rounded-2xl p-4 border border-white/5">
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

                    {/* Breakdown */}
                    <section className="space-y-4">
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
            </div>
        </div>
    );
};
