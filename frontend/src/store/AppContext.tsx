import React, { createContext, useContext, useState, ReactNode } from "react";

/** Supported countries */
export type Country = "India" | "Ireland" | "All";

interface AppState {
  selectedCountry: Country;
  setSelectedCountry: (c: Country) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

/** Global state provider for CyberShield */
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>("All");

  return (
    <AppContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppStore must be inside AppProvider");
  return ctx;
};
