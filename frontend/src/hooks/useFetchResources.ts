import { useQuery } from "@tanstack/react-query";
import { useAppStore, Country } from "@/store/AppContext";
import { filterByCountry } from "@/utils/helpers";

/** Hook to fetch resources with dynamic filtering via React Query */
export function useFetchResources<T extends { country: string }>(
  apiCall: (args?: any) => Promise<{ data: { data: T[] } }>,
  queryKey: string,
  queryArgs?: Record<string, any>
) {
  const { selectedCountry } = useAppStore();

  const effectiveArgs = { country: selectedCountry, ...queryArgs };

  const { data: rawData, isLoading: loading } = useQuery({
    queryKey: [queryKey, effectiveArgs],
    queryFn: async () => {
      const response = await apiCall(effectiveArgs);
      return response.data.data as T[];
    }
  });

  const data = rawData || [];

  // NOTE: If the backend supports country filtering natively (like /api/articles), 
  // 'filtered' is technically redundant, but we maintain the API signature for compatibility.
  const filtered = filterByCountry(data, selectedCountry);

  return { data: filtered, allData: data, loading };
}

/** Hook for country filter selection */
export function useCountryFilter() {
  const { selectedCountry, setSelectedCountry } = useAppStore();
  return { selectedCountry, setSelectedCountry };
}
