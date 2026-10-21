import { useEffect, useState } from "react";

/**
 * Like useState, but the value is persisted to localStorage.
 * - The initializer runs ONCE on mount (lazy).
 * - Writes back to localStorage whenever the value changes.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return initialValue;
      return JSON.parse(raw);
    } catch (err) {
      console.warn(`Failed to read localStorage[${key}]`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`Failed to write localStorage[${key}]`, err);
    }
  }, [key, value]);

  return [value, setValue];
}