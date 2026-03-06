import { List } from "lucide-react";

interface LiveIncidentFeedProps {
    attacks: any[];
    className?: string;
}

const LiveIncidentFeed = ({ attacks, className }: LiveIncidentFeedProps) => {
    return (
        <div className={`border border-white/5 bg-black/60 rounded-xl flex flex-col overflow-hidden backdrop-blur-sm ${className || "h-[220px] mt-4"}`}>
            <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-[11px] font-black uppercase text-[#00e5ff] flex items-center gap-2 tracking-widest">
                    <List className="h-4 w-4" /> Live Incident Feed (Active Patterns)
                </h3>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="threat-marker" style={{ backgroundColor: '#f43f5e', transform: 'scale(0.6)' }} />
                        <span className="text-[10px] text-white/40 font-bold">CRITICAL</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="threat-marker" style={{ backgroundColor: '#f97316', transform: 'scale(0.6)' }} />
                        <span className="text-[10px] text-white/40 font-bold">HIGH</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="threat-marker" style={{ backgroundColor: '#eab308', transform: 'scale(0.6)' }} />
                        <span className="text-[10px] text-white/40 font-bold">MEDIUM</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="threat-marker" style={{ backgroundColor: '#22c55e', transform: 'scale(0.6)' }} />
                        <span className="text-[10px] text-white/40 font-bold">LOW</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-x-auto p-4 flex gap-4 custom-scrollbar items-start">
                {attacks.map((a, i) => (
                    <div key={i} className="min-w-[260px] max-w-[260px] p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#00e5ff]/30 transition-all group cursor-pointer animate-in slide-in-from-bottom duration-500" style={{ animationDelay: `${i * 80}ms` }}>
                        <div className="flex items-center justify-between mb-3">
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${a.severity === 'critical' ? 'border-red-500 text-red-500 bg-red-500/10' : a.severity === 'high' ? 'border-orange-500 text-orange-500 bg-orange-500/10' : a.severity === 'medium' ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' : 'border-green-500 text-green-500 bg-green-500/10'}`}>
                                {a.severity}
                            </span>
                            <span className="text-[9px] text-[#00e5ff]/50 font-mono italic">{new Date(a.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white group-hover:text-[#00e5ff] transition-colors line-clamp-1">{a.attack_type} detected</h4>
                        <p className="text-[10px] text-muted-foreground mt-1.5">Target located in <span className="text-white/80 font-bold">{a.city}</span></p>
                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex gap-1">
                                <div className="h-1 w-4 bg-[#00e5ff]/40 rounded-full" />
                                <div className="h-1 w-2 bg-[#00e5ff]/20 rounded-full" />
                            </div>
                            <div className="text-[7px] font-bold text-white/20 tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
                                INTEL: {a.source || "Unknown"}
                            </div>
                        </div>
                    </div>
                ))}
                {attacks.length === 0 && (
                    <div className="flex-1 flex items-center justify-center text-[#00e5ff]/30 text-xs font-bold uppercase tracking-widest italic">
                        No active incidents detected in this region
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveIncidentFeed;
