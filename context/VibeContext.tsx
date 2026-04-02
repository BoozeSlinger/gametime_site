'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface VibeContextType {
  isAfterHours: boolean;
  setIsAfterHours: (value: boolean) => void;
}

export const VibeContext = createContext<VibeContextType | undefined>(undefined);

export function VibeProvider({ children }: { children: ReactNode }) {
  const [isAfterHours, setIsAfterHours] = useState(false);

  // Determine after hours based on time of day (10 PM - 5 AM)
  useEffect(() => {
    const checkAfterHours = () => {
      const hour = new Date().getHours();
      setIsAfterHours(hour >= 22 || hour < 5);
    };

    checkAfterHours();
    const interval = setInterval(checkAfterHours, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <VibeContext.Provider value={{ isAfterHours, setIsAfterHours }}>
      {children}
    </VibeContext.Provider>
  );
}

export function useVibe() {
  const context = useContext(VibeContext);
  if (context === undefined) {
    throw new Error('useVibe must be used within a VibeProvider');
  }
  return context;
}
