import { useState } from "react";

export default function useLocalStorage<VALUE>(
  key: string,
  initialValue: VALUE
) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return (item && JSON.parse(item)) || initialValue;
    } catch (error) {
      console.error("Failed to get value from localStorage", error);
    }
    return initialValue;
  });

  const setValue = <D extends ((prevState: VALUE) => void) | VALUE>(
    value: D
  ) => {
    setStoredValue((prevState: VALUE) => {
      const nextState =
        typeof value === "function" ? value(prevState) : prevState;
      try {
        localStorage.setItem(key, JSON.stringify(nextState));
      } catch (error) {
        console.error("Failed to update localStorage", error);
      }
      return nextState;
    });
  };

  return [storedValue, setValue];
}
