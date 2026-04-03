"use client";

import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  Briefcase,
  Gamepad2,
  Home,
  ShoppingBag,
  User,
  Utensils,
  Zap,
} from "lucide-react";

const TransactionContext = createContext();

const INITIAL_TRANSACTIONS = [
  {
    id: "TX-1001",
    merchant: "Apple Store",
    date: "2026-05-12",
    amount: -1299.0,
    category: "Shopping",
    type: "expense",
    iconName: "ShoppingBag",
  },
  {
    id: "TX-1002",
    merchant: "Upwork Global",
    date: "2026-05-11",
    amount: 2450.0,
    category: "Freelancing",
    type: "income",
    iconName: "Briefcase",
  },
  {
    id: "TX-1003",
    merchant: "FreshMarket",
    date: "2026-05-10",
    amount: -84.2,
    category: "Food",
    type: "expense",
    iconName: "Utensils",
  },
  {
    id: "TX-1004",
    merchant: "Apartment Rental",
    date: "2026-05-05",
    amount: -1800.0,
    category: "Rent",
    type: "expense",
    iconName: "Home",
  },
  {
    id: "TX-1005",
    merchant: "Steam Games",
    date: "2026-05-04",
    amount: -59.99,
    category: "Entertainment",
    type: "expense",
    iconName: "Gamepad2",
  },
  {
    id: "TX-1006",
    merchant: "Google Cloud",
    date: "2026-05-01",
    amount: -45.0,
    category: "Subscriptions",
    type: "expense",
    iconName: "Zap",
  },
  {
    id: "TX-1007",
    merchant: "Design Agency Inc",
    date: "2026-04-28",
    amount: 4500.0,
    category: "Salary",
    type: "income",
    iconName: "User",
  },
  {
    id: "TX-1008",
    merchant: "Netflix",
    date: "2026-04-25",
    amount: -15.99,
    category: "Subscriptions",
    type: "expense",
    iconName: "Zap",
  },
  {
    id: "TX-1009",
    merchant: "Uber Eats",
    date: "2026-04-22",
    amount: -35.5,
    category: "Food",
    type: "expense",
    iconName: "Utensils",
  },
  {
    id: "TX-1010",
    merchant: "Starbucks",
    date: "2026-04-20",
    amount: -8.75,
    category: "Food",
    type: "expense",
    iconName: "Utensils",
  },
  {
    id: "TX-1011",
    merchant: "Nike Official",
    date: "2026-04-18",
    amount: -120.0,
    category: "Shopping",
    type: "expense",
    iconName: "ShoppingBag",
  },
  {
    id: "TX-1012",
    merchant: "Freelance Project B",
    date: "2026-04-15",
    amount: 1200.0,
    category: "Freelancing",
    type: "income",
    iconName: "Briefcase",
  },
  {
    id: "TX-1013",
    merchant: "Whole Foods",
    date: "2026-04-12",
    amount: -150.2,
    category: "Food",
    type: "expense",
    iconName: "Utensils",
  },
  {
    id: "TX-1014",
    merchant: "Spotify",
    date: "2026-04-10",
    amount: -9.99,
    category: "Subscriptions",
    type: "expense",
    iconName: "Zap",
  },
  {
    id: "TX-1015",
    merchant: "Cinema City",
    date: "2026-04-08",
    amount: -25.0,
    category: "Entertainment",
    type: "expense",
    iconName: "Gamepad2",
  },
  {
    id: "TX-1016",
    merchant: "Gym Membership",
    date: "2026-04-05",
    amount: -45.0,
    category: "Other",
    type: "expense",
    iconName: "User",
  },
  {
    id: "TX-1017",
    merchant: "Dividends Inc",
    date: "2026-04-02",
    amount: 350.0,
    category: "Salary",
    type: "income",
    iconName: "User",
  },
];

const ICON_MAP = {
  ShoppingBag,
  Briefcase,
  Utensils,
  Home,
  Gamepad2,
  Zap,
  User,
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useLocalStorage("FZ_TD", INITIAL_TRANSACTIONS);
  const [filters, setFilters] = useLocalStorage("FZ_FR", {
    search: "",
    type: "all",
  });

  const getIconForCategory = useCallback((category) => {
    const map = {
      Shopping: "ShoppingBag",
      Freelancing: "Briefcase",
      Food: "Utensils",
      Rent: "Home",
      Entertainment: "Gamepad2",
      Subscriptions: "Zap",
      Salary: "User",
    };
    return map[category] || "ShoppingBag";
  }, []);

  const addTransaction = useCallback((newTx) => {
    const txWithId = {
      ...newTx,
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: newTx.type === "expense" ? -Math.abs(newTx.amount) : Math.abs(newTx.amount),
      iconName: getIconForCategory(newTx.category),
    };
    setTransactions((prev) => [txWithId, ...prev]);
  }, [getIconForCategory, setTransactions]);

  const updateTransaction = useCallback((updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === updatedTx.id
          ? {
              ...updatedTx,
              amount:
                updatedTx.type === "expense"
                  ? -Math.abs(updatedTx.amount)
                  : Math.abs(updatedTx.amount),
              iconName: getIconForCategory(updatedTx.category),
            }
          : tx
      )
    );
  }, [getIconForCategory, setTransactions]);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }, [setTransactions]);

  const value = useMemo(
    () => ({
      transactions,
      filters,
      setFilters,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      ICON_MAP,
    }),
    [transactions, filters, setFilters, addTransaction, updateTransaction, deleteTransaction]
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
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
};
