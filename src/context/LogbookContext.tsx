import { createContext, ReactNode, useContext, useState } from "react";
import { LogbookEntry } from "../types/logbook";

type LogbookContextType = {
  entries: LogbookEntry[];
  addEntry: (entry: LogbookEntry) => void;
  deleteEntry: (id: string) => void;
};

const LogbookContext = createContext<LogbookContextType | undefined>(undefined);

export function LogbookProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<LogbookEntry[]>([]);

  const addEntry = (entry: LogbookEntry) => {
    setEntries((currentEntries) => [entry, ...currentEntries]);
  };

  const deleteEntry = (id: string) => {
    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== id)
    );
  };

  return (
    <LogbookContext.Provider value={{ entries, addEntry, deleteEntry }}>
      {children}
    </LogbookContext.Provider>
  );
}

export function useLogbook() {
  const context = useContext(LogbookContext);

  if (!context) {
    throw new Error("useLogbook must be used inside LogbookProvider");
  }

  return context;
}