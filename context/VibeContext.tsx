'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface VibeContextType {
  isAfterHours: boolean;
  setIsAfterHours: (value: boolean) => void;
  toggleVibe: () => void;
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

  const toggleVibe = () => {
    setIsAfterHours((prev) => !prev);
  };

  return (
    <VibeContext.Provider value={{ isAfterHours, setIsAfterHours, toggleVibe }}>
      {children}
    </VibeContext.Provider>
  );
}

export function useVibe(): VibeContextType {
  const context = useContext(VibeContext);
  if (!context) {
    throw new Error('useVibe must be used within a VibeProvider');
  }
  return context;
}
