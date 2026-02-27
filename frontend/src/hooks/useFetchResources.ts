import { useQuery } from "@tanstack/react-query";
import { useAppStore, Country } from "@/store/AppContext";
import { filterByCountry } from "@/utils/helpers";

/** Hook to fetch resources with country filtering via React Query */
export function useFetchResources<T extends { country: string } = any>(
  apiCall: () => Promise<any>,
  queryKey: string
) {
  const { selectedCountry } = useAppStore();

  const { data: rawData, isLoading: loading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await apiCall();
      return response.data.data as T[];
    }
  });

  const data = rawData || [];
  const filtered = filterByCountry(data, selectedCountry);

  return { data: filtered, allData: data, loading };
}

/** Hook for country filter selection */
export function useCountryFilter() {
  const { selectedCountry, setSelectedCountry } = useAppStore();
  return { selectedCountry, setSelectedCountry };
}
