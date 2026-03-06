import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import { AlertTriangle, ShieldCheck, ShieldAlert } from "lucide-react";

/** Threat Level Gauge using Recharts PieChart */
export const ThreatLevelGauge = ({ score = 0, level = "Low" }: { score: number; level: string }) => {
    const data = [
        { name: "Score", value: score },
        { name: "Remaining", value: Math.max(100 - score, 0) },
    ];

    const getColor = () => {
        if (score > 50) return "hsl(0 80% 60%)"; // Severe
        if (score > 20) return "hsl(30 90% 55%)"; // Elevated
        return "hsl(160 84% 39%)"; // Low
    };

    const getIcon = () => {
        if (score > 50) return <ShieldAlert className="h-8 w-8 text-red-500 animate-pulse" />;
        if (score > 20) return <AlertTriangle className="h-8 w-8 text-orange-500" />;
        return <ShieldCheck className="h-8 w-8 text-green-500" />;
    };

    return (
        <div className="cyber-card p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {getIcon()}
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Threat Level Index</h3>

            <div className="relative h-[200px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            startAngle={180}
                            endAngle={0}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                        >
                            <Cell fill={getColor()} />
                            <Cell fill="hsl(222 30% 18%)" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
                    <span className="text-4xl font-black tracking-tight">{score}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-full border ${score > 50 ? 'border-red-500 text-red-500' : score > 20 ? 'border-orange-500 text-orange-500' : 'border-green-500 text-green-500'}`}>
                        {level}
                    </span>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="space-y-1">
                    <p className="text-[10px] font-medium text-muted-foreground uppercase">Low</p>
                    <div className="h-1 w-full bg-green-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-full" />
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-medium text-muted-foreground uppercase">Elevated</p>
                    <div className="h-1 w-full bg-orange-500/20 rounded-full overflow-hidden">
                        {score > 20 && <div className="h-full bg-orange-500 w-full" />}
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-medium text-muted-foreground uppercase">Severe</p>
                    <div className="h-1 w-full bg-red-500/20 rounded-full overflow-hidden">
                        {score > 50 && <div className="h-full bg-red-500 w-full" />}
                    </div>
                </div>
            </div>
        </div>
    );
};

/** Animated line chart for cybercrime trends */
export const CybercrimeTrendsChart = ({ data = [], country = "All" }: { data: any[]; country: string }) => {
    return (
        <div className="cyber-card p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-bold tracking-tight">Cybercrime Trends</h3>
                    <p className="text-xs text-muted-foreground">Attack surface analysis for {country}</p>
                </div>
                <div className="flex gap-1.5">
                    {["24H", "7D", "30D"].map((p) => (
                        <button key={p} className={`px-2.5 py-1 text-[10px] font-bold rounded-md border ${p === "24H" ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'}`}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 20% / 0.5)" vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke="hsl(215 20% 55% / 0.5)"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="hsl(215 20% 55% / 0.5)"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                background: "hsl(222 44% 9% / 0.9)",
                                backdropFilter: "blur(8px)",
                                border: "1px solid hsl(187 80% 48% / 0.2)",
                                borderRadius: "12px",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                            }}
                            itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 'bold' }} />
                        <Line type="monotone" dataKey="Phishing" stroke="#06b6d4" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                        <Line type="monotone" dataKey="Malware" stroke="#8b5cf6" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                        <Line type="monotone" dataKey="Ransomware" stroke="#f43f5e" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                        <Line type="monotone" dataKey="DDoS" stroke="#eab308" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
