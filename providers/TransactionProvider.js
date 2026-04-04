"use client";

import {
  CATEGORIES,
  ICON_MAP,
  getIconForCategory,
} from "@/constants/transactions";
import initialTransactions from "@/data/data.json";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [storedData, setStoredData] = useLocalStorage("FZ_TD", []);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  const [filters, setFilters] = useLocalStorage("FZ_FR", {
    search: "",
    type: "all",
    category: "all",
    dateRange: "all",
  });

  // Mock initial fetch simulation
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate API Delay

      let initialData = storedData;
      if (initialData.length === 0) {
        initialData = initialTransactions;
        setStoredData(initialData);
      }
      setTransactions(initialData);
      setIsLoading(false);
    };
    init();
  }, [setStoredData, storedData]);

  const addTransaction = useCallback(
    async (newTx) => {
      setIsMutating(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const txWithId = {
        ...newTx,
        id: `TX-${Math.floor(10000 + Math.random() * 90000)}`,
        amount:
          newTx.type === "expense"
            ? -Math.abs(newTx.amount)
            : Math.abs(newTx.amount),
        iconName: getIconForCategory(newTx.category),
      };

      setTransactions((prev) => {
        const updated = [txWithId, ...prev];
        setStoredData(updated);
        return updated;
      });
      setIsMutating(false);
    },
    [setStoredData],
  );

  const updateTransaction = useCallback(
    async (updatedTx) => {
      setIsMutating(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

      setTransactions((prev) => {
        const updated = prev.map((tx) =>
          tx.id === updatedTx.id
            ? {
                ...updatedTx,
                amount:
                  updatedTx.type === "expense"
                    ? -Math.abs(updatedTx.amount)
                    : Math.abs(updatedTx.amount),
                iconName: getIconForCategory(updatedTx.category),
              }
            : tx,
        );
        setStoredData(updated);
        return updated;
      });
      setIsMutating(false);
    },
    [setStoredData],
  );

  const deleteTransaction = useCallback(
    async (id) => {
      setIsMutating(true);
      await new Promise((resolve) => setTimeout(resolve, 600));

      setTransactions((prev) => {
        const updated = prev.filter((tx) => tx.id !== id);
        setStoredData(updated);
        return updated;
      });
      setIsMutating(false);
    },
    [setStoredData],
  );

  const value = useMemo(
    () => ({
      transactions,
      isLoading,
      isMutating,
      filters,
      setFilters,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      ICON_MAP,
      CATEGORIES,
    }),
    [
      transactions,
      isLoading,
      isMutating,
      filters,
      setFilters,
      addTransaction,
      updateTransaction,
      deleteTransaction,
    ],
  );

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider",
    );
  }
  return context;
};
