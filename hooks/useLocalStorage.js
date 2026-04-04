/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  // Encryption simulation using btoa/atob
  const encode = (value) => {
    try {
      const jsonString = JSON.stringify(value);
      return btoa(unescape(encodeURIComponent(jsonString)));
    } catch (e) {
      console.error("Error encoding data:", e);
      return "";
    }
  };

  const decode = (encodedValue) => {
    try {
      const decodedString = decodeURIComponent(escape(atob(encodedValue)));
      return JSON.parse(decodedString);
    } catch (e) {
      console.error("Error decoding data:", e);
      return null;
    }
  };

  const [storedValue, setStoredValue] = useState(initialValue);

  // Sync with localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(decode(item));
      }
    } catch (error) {
      console.warn("LocalStorage read error:", error);
    }
  }, [key]);

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, encode(valueToStore));
      }
    } catch (error) {
      console.warn("LocalStorage set error:", error);
    }
  };

  return [storedValue, setValue];
};
