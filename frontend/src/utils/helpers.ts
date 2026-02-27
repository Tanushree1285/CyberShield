import { Country } from "@/store/AppContext";

/** Format date string to locale */
export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

/** Filter items by country */
export const filterByCountry = <T extends { country: string }>(
  items: T[],
  country: Country
): T[] => {
  if (country === "All") return items;
  return items.filter((item) => item.country === country);
};

/** Handle API error and return message */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred";
};
