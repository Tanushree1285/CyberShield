import { useState, useEffect, useRef, useMemo } from "react";
import { Maximize2, Map as MapIcon, RefreshCw } from "lucide-react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon not showing
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const CITY_COORDS: Record<string, [number, number]> = {
    "Delhi": [28.6139, 77.2090],
    "Mumbai": [19.0760, 72.8777],
    "Bangalore": [12.9716, 77.5946],
    "Hyderabad": [17.3850, 78.4867],
    "Chennai": [13.0827, 80.2707],
    "Pune": [18.5204, 73.8567],
    "Kolkata": [22.5726, 88.3639],
    "Dublin": [53.3498, -6.2603],
    "Cork": [51.8985, -8.4756],
    "Galway": [53.2707, -9.0568],
    "Limerick": [52.6638, -8.6267],
    "Waterford": [52.2593, -7.1101],
    "Drogheda": [53.7145, -6.3483],
    "Dundalk": [53.9979, -6.4059]
};

const InteractiveMap = ({ country, attacks = [], onExpand }: { country: string; attacks?: any[]; onExpand?: () => void }) => {
    const mapRef = useRef<L.Map | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
    const markersLayerRef = useRef<L.LayerGroup | null>(null);
    const [loading, setLoading] = useState(true);

    const countryConfig = useMemo(() => {
        if (country === "Ireland") {
            return {
                center: [53.3498, -7.2603] as [number, number],
                zoom: 7,
                file: "/maps/ireland.geojson"
            };
        }
        return {
            center: [20.5937, 78.9629] as [number, number],
            zoom: 5,
            file: "/maps/india_new.geojson"
        };
    }, [country]);

    // Initialize Map
    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        mapRef.current = L.map(containerRef.current, {
            center: countryConfig.center,
            zoom: countryConfig.zoom,
            zoomControl: false,
            attributionControl: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
        }).addTo(mapRef.current);

        markersLayerRef.current = L.layerGroup().addTo(mapRef.current);

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Update Map View on Country Change
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setView(countryConfig.center, countryConfig.zoom);

            // Re-fetch and update GeoJSON
            setLoading(true);
            fetch(countryConfig.file)
                .then(res => res.json())
                .then(data => {
                    if (geoJsonLayerRef.current && mapRef.current) {
                        mapRef.current.removeLayer(geoJsonLayerRef.current);
                    }
                    if (mapRef.current) {
                        geoJsonLayerRef.current = L.geoJSON(data, {
                            style: {
                                fillColor: 'rgba(6,182,212,0.05)',
                                weight: 1.5,
                                opacity: 1,
                                color: 'rgba(6,182,212,0.3)',
                                fillOpacity: 0.1
                            }
                        }).addTo(mapRef.current);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error loading GeoJSON:", err);
                    setLoading(false);
                });
        }
    }, [countryConfig]);

    // Update Markers
    useEffect(() => {
        if (!mapRef.current || !markersLayerRef.current) return;

        markersLayerRef.current.clearLayers();

        attacks.forEach(a => {
            const coords = CITY_COORDS[a.city] || [
                countryConfig.center[0] + (Math.random() - 0.5) * 5,
                countryConfig.center[1] + (Math.random() - 0.5) * 5
            ];

            const color = a.severity === 'critical' ? '#f43f5e' : a.severity === 'high' ? '#f97316' : a.severity === 'medium' ? '#eab308' : '#22c55e';

            const icon = L.divIcon({
                className: 'custom-marker',
                html: `
                    <div class="relative flex items-center justify-center">
                        <div class="absolute w-8 h-8 rounded-full animate-ping opacity-20" style="background-color: ${color}"></div>
                        <div class="absolute w-4 h-4 rounded-full blur-[2px] opacity-60" style="background-color: ${color}"></div>
                        <div class="w-2.5 h-2.5 rounded-full border-2 border-white" style="background-color: ${color}"></div>
                    </div>
                `,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });

            const marker = L.marker(coords as [number, number], { icon });

            const tooltipContent = `
                <div class="p-2 space-y-1 bg-black/90 text-white rounded-md border border-primary/20" style="min-width: 120px">
                    <div class="flex justify-between items-center gap-4">
                        <span style="font-size: 10px; font-weight: 900; text-transform: uppercase; color: #06b6d4">${a.city}</span>
                        <span style="font-size: 8px; font-weight: 700; padding: 2px 4px; border-radius: 4px; border: 1px solid ${color}; color: ${color}">
                            ${a.severity.toUpperCase()}
                        </span>
                    </div>
                    <div style="font-size: 11px; font-weight: 700">${a.attack_type}</div>
                    <div style="font-size: 9px; opacity: 0.6">${new Date(a.timestamp).toLocaleTimeString()}</div>
                </div>
            `;

            marker.bindTooltip(tooltipContent, {
                direction: 'top',
                offset: [0, -10],
                opacity: 1,
                className: 'cyber-tooltip'
            });

            if (markersLayerRef.current) {
                marker.addTo(markersLayerRef.current);
            }
        });
    }, [attacks, countryConfig]);

    return (
        <div className="rounded-xl border border-border bg-card/50 cyber-border relative overflow-hidden h-[450px] group">
            <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between z-[1000] bg-gradient-to-b from-card to-transparent pointer-events-none">
                <div className="flex items-center gap-2">
                    <MapIcon className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Tactical Intel Map: {country}</h3>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onExpand?.();
                    }}
                    className="p-1.5 rounded-md bg-background/50 border border-border hover:bg-primary hover:text-primary-foreground transition-all shadow-lg pointer-events-auto"
                >
                    <Maximize2 className="h-4 w-4" />
                </button>
            </div>

            <div ref={containerRef} className="w-full h-full bg-[#020617] z-0" />

            {loading && (
                <div className="absolute inset-0 z-[1001] flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                </div>
            )}

            {/* Radar Sweep Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[500]">
                <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-1/2 -translate-y-1/2 animate-radar-sweep origin-center" />
            </div>

            <div className="absolute bottom-4 left-4 z-[500] p-2 rounded-lg bg-background/80 backdrop-blur-md border border-border/50 text-[10px] space-y-1 pointer-events-none">
                <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> Critical Incident</div>
                <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Active Threat</div>
            </div>

            <style>{`
                .leaflet-tooltip.cyber-tooltip {
                    background: transparent;
                    border: none;
                    box-shadow: none;
                    padding: 0;
                }
                .leaflet-tooltip-top.cyber-tooltip:before {
                    border-top-color: rgba(0,0,0,0.9);
                }
            `}</style>
        </div>
    );
};

export default InteractiveMap;
