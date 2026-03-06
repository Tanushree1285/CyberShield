import { useState, useEffect, useRef, useMemo } from "react";
import { Maximize2, Map as MapIcon, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
    "Jaipur": [26.9124, 75.7873],
    "Ahmedabad": [23.0225, 72.5714],
    "Surat": [21.1702, 72.8311],
    "Lucknow": [26.8467, 80.9462],
    "Kanpur": [26.4499, 80.3319],
    "Nagpur": [21.1458, 79.0882],
    "Indore": [22.7196, 75.8577],
    "Thane": [19.2183, 72.9781],
    "Bhopal": [23.2599, 77.4126],
    "Visakhapatnam": [17.6868, 83.2185],
    "Pimpri-Chinchwad": [18.6298, 73.7997],
    "Patna": [25.5941, 85.1376],
    "Vadodara": [22.3072, 73.1812],
    "Ghaziabad": [28.6692, 77.4538],
    "Ludhiana": [30.9010, 75.8573],
    "Agra": [27.1767, 78.0081],
    "Nashik": [20.0110, 73.7903],
    "Faridabad": [28.4089, 77.3178],
    "Meerut": [28.9845, 77.7064],
    "Rajkot": [22.3039, 70.8022],
    "Kalyan-Dombivli": [19.2403, 73.1305],
    "Vasai-Virar": [19.3919, 72.8397],
    "Varanasi": [25.3176, 82.9739],
    "Srinagar": [34.0837, 74.7973],
    "Aurangabad": [19.8762, 75.3433],
    "Dhanbad": [23.7957, 86.4304],
    "Amritsar": [31.6340, 74.8723],
    "Navi Mumbai": [19.0330, 73.0297],
    "Allahabad": [25.4358, 81.8463],
    "Howrah": [22.5958, 88.3110],
    "Ranchi": [23.3441, 85.3096],
    "Guwahati": [26.1158, 91.7086],
    "Gwalior": [26.2183, 78.1828],
    "Jabalpur": [23.1815, 79.9864],
    "Coimbatore": [11.0168, 76.9558],
    "Vijayawada": [16.5062, 80.6480],
    "Jodhpur": [26.2389, 73.0243],
    "Madurai": [9.9252, 78.1198],
    "Raipur": [21.2514, 81.6296],
    "Kota": [25.2138, 75.8648],
    "Chandigarh": [30.7333, 76.7794],
    "Trivandrum": [8.5241, 76.9366],
    "Kochi": [9.9312, 76.2673],
    "Bhubaneswar": [20.2961, 85.8245],
    "Dehradun": [30.3165, 78.0322],
    "Noida": [28.5355, 77.3910],
    "Gurgaon": [28.4595, 77.0266],
    "Dublin": [53.3498, -6.2603],
    "Cork": [51.8985, -8.4756],
    "Galway": [53.2707, -9.0568],
    "Limerick": [52.6638, -8.6267],
    "Waterford": [52.2593, -7.1101],
    "Drogheda": [53.7145, -6.3483],
    "Dundalk": [53.9979, -6.4059]
};

const InteractiveMap = ({ country, attacks = [], onExpand, isFullscreen = false }: { country: string; attacks?: any[]; onExpand?: () => void; isFullscreen?: boolean }) => {
    const mapRef = useRef<L.Map | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
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

        // Handle expansion / resize safely
        const resizeObserver = new ResizeObserver(() => {
            if (mapRef.current) {
                mapRef.current.invalidateSize();
            }
        });
        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
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
                                fillColor: '#06b6d4',
                                weight: 1.5,
                                opacity: 0.5,
                                color: '#00e5ff',
                                fillOpacity: 0.05
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

        // Calculate attack volume per city to dynamically size markers
        const cityAttacksCount = attacks.reduce((acc, a) => {
            acc[a.city] = (acc[a.city] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        attacks.forEach(a => {
            const coords = CITY_COORDS[a.city] || [
                countryConfig.center[0] + (Math.random() - 0.5) * 5,
                countryConfig.center[1] + (Math.random() - 0.5) * 5
            ];

            const activeAttacks = cityAttacksCount[a.city] || 1;
            // Base scale 1 (12px), max practical scale ~3.5 (42px) for high volume.
            const scaleSize = Math.min(1.2 + (activeAttacks * 0.15), 3.5);

            const color = a.severity === 'critical' ? '#f43f5e' : a.severity === 'high' ? '#f97316' : a.severity === 'medium' ? '#eab308' : '#22c55e';

            const icon = L.divIcon({
                className: 'custom-marker',
                html: `
                    <div class="relative flex items-center justify-center">
                        <div class="threat-marker" style="background-color: ${color}; transform: scale(${scaleSize});"></div>
                    </div>
                `,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            const marker = L.marker(coords as [number, number], { icon });

            const tooltipContent = `
                <div class="p-2 space-y-1 bg-[#060b12]/95 backdrop-blur text-white rounded-md border border-[#00e5ff]/30 shadow-[0_0_10px_rgba(0,229,255,0.1)]" style="min-width: 140px">
                    <div class="flex justify-between items-center gap-4 border-b border-white/10 pb-1 mb-1">
                        <span style="font-size: 11px; font-weight: 900; text-transform: uppercase; color: #00e5ff">${a.city}</span>
                        <span style="font-size: 8px; font-weight: 700; padding: 2px 4px; border-radius: 4px; border: 1px solid ${color}; color: ${color}; background: ${color}10">
                            ${a.severity.toUpperCase()}
                        </span>
                    </div>
                    <div style="font-size: 10px; font-weight: 700; color: #94a3b8">Active Attacks: <span style="color: #fff">${activeAttacks}</span></div>
                    <div style="font-size: 10px; font-weight: 700; color: #94a3b8">Threat: <span style="color: ${color}">${a.attack_type}</span></div>
                    <div style="font-size: 9px; opacity: 0.5; margin-top: 4px; text-align: right">${new Date(a.timestamp).toLocaleTimeString()}</div>
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
        <div className={`${isFullscreen ? 'w-full h-full' : 'map-card w-full group'}`}>
            {/* Glass Map Header */}
            <div className="map-header absolute top-0 inset-x-0 p-3 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2">
                    <MapIcon className="h-4 w-4 text-[#00e5ff]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">Tactical Intel Map: {country}</h3>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        if (onExpand) {
                            onExpand();
                        } else {
                            navigate("/map-dashboard");
                        }
                    }}
                    className={`p-1.5 rounded-md bg-black/50 border border-[#00e5ff]/20 hover:bg-[#00e5ff]/20 hover:text-white transition-all shadow-lg pointer-events-auto text-[#00e5ff] ${isFullscreen ? 'hidden' : ''}`}
                >
                    <Maximize2 className="h-4 w-4" />
                </button>
            </div>

            {/* Tactical Controls Overlay */}
            <div className="overlay-panel flex flex-col gap-2 mt-12 pointer-events-none">
                <div className="text-[10px] font-bold text-[#00e5ff] tracking-widest mb-1 opacity-70">VIEW MODE</div>
                <div className="flex gap-2">
                    <button className="px-2 py-1 text-[9px] font-bold bg-[#00e5ff]/20 border border-[#00e5ff]/40 rounded text-white pointer-events-auto">REAL-TIME</button>
                    <button className="px-2 py-1 text-[9px] font-bold bg-transparent border border-white/10 rounded text-white/50 hover:bg-white/5 pointer-events-auto">HEATMAP</button>
                    <button className="px-2 py-1 text-[9px] font-bold bg-transparent border border-white/10 rounded text-white/50 hover:bg-white/5 pointer-events-auto">INCIDENTS</button>
                </div>
            </div>

            {/* Map Container and Wrapper */}
            <div className={isFullscreen ? "w-full h-full relative" : "map-container"}>
                <div ref={containerRef} className="map-wrapper" />
            </div>

            {loading && (
                <div className="absolute inset-0 z-[1001] flex items-center justify-center bg-[#060b12]/60 backdrop-blur-sm">
                    <RefreshCw className="h-8 w-8 text-[#00e5ff] animate-spin" />
                </div>
            )}

            {/* Radar Sweep Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[500]">
                <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-1/2 -translate-y-1/2 animate-radar-sweep origin-center" />
            </div>

            <div className="absolute bottom-4 left-4 z-[500] p-2 rounded-lg bg-black/80 backdrop-blur-md border border-[#00e5ff]/20 text-[10px] space-y-1.5 pointer-events-none">
                <div className="flex items-center gap-2"><span className="threat-marker" style={{ backgroundColor: '#f43f5e', transform: 'scale(0.6)' }} /> Critical Incident</div>
                <div className="flex items-center gap-2"><span className="threat-marker" style={{ backgroundColor: '#f97316', transform: 'scale(0.6)' }} /> High Threat</div>
                <div className="flex items-center gap-2"><span className="threat-marker" style={{ backgroundColor: '#eab308', transform: 'scale(0.6)' }} /> Medium Alert</div>
                <div className="flex items-center gap-2"><span className="threat-marker" style={{ backgroundColor: '#22c55e', transform: 'scale(0.6)' }} /> Low Priority</div>
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
