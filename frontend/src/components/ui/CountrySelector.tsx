import { useAppStore, Country } from "@/store/AppContext";
import { Globe } from "lucide-react";

const countries: { value: Country; label: string; flag: string }[] = [
  { value: "All", label: "All Regions", flag: "🌍" },
  { value: "India", label: "India", flag: "🇮🇳" },
  { value: "Ireland", label: "Ireland", flag: "🇮🇪" },
];

/** Country selector dropdown for region filtering */
const CountrySelector = () => {
  const { selectedCountry, setSelectedCountry } = useAppStore();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-primary" />
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value as Country)}
        className="bg-secondary text-secondary-foreground border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {countries.map((c) => (
          <option key={c.value} value={c.value}>
            {c.flag} {c.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
