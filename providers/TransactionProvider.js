"use client";

import React, { createContext, useContext, useMemo, useCallback, useState, useEffect } from "react";
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

const ICON_MAP = {
  ShoppingBag,
  Briefcase,
  Utensils,
  Home,
  Gamepad2,
  Zap,
  User,
};

const CATEGORIES = [
  "Shopping",
  "Freelancing",
  "Food",
  "Rent",
  "Entertainment",
  "Subscriptions",
  "Salary",
  "Other",
];

const MERCHANTS_BY_CATEGORY = {
  Shopping: ["Apple Store", "Amazon", "Walmart", "eBay", "Target", "Nike Official"],
  Freelancing: ["Upwork Global", "Fiverr", "Toptal", "Freelance Project A", "Project B"],
  Food: ["FreshMarket", "Whole Foods", "Starbucks", "Uber Eats", "McDonald's", "Local Bistro"],
  Rent: ["Apartment Rental", "Office Lease", "Storage Unit", "HOA Fee"],
  Entertainment: ["Steam Games", "Netlfix", "Cinema City", "Theme Park", "Concert Tickets"],
  Subscriptions: ["Google Cloud", "AWS", "Spotify", "Hulu", "Discord Nitro", "Medium"],
  Salary: ["Design Agency Inc", "Dividends Inc", "Bonus Distribution", "Secondary Income"],
  Other: ["Gym Membership", "Pharmacy", "Insurance Premiums", "Car Wash", "Hardware Store"],
};

// Data Generator Helper
const generateMockData = (count = 100) => {
  const transactions = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const merchants = MERCHANTS_BY_CATEGORY[category] || ["General Merchant"];
    const merchant = merchants[Math.floor(Math.random() * merchants.length)];
    
    // Distribute across last 6 months
    const date = new Date(now);
    date.setDate(now.getDate() - Math.floor(Math.random() * 180));
    
    // Make 1/3 income to keep it healthy
    const type = i % 3 === 0 ? "income" : "expense";
    const amount = type === "income" 
      ? Math.floor(2000 + Math.random() * 6000) 
      : Math.floor(50 + Math.random() * 1000);

    transactions.push({
      id: `TX-${2000 + i}`,
      merchant,
      date: date.toISOString().split("T")[0],
      amount: type === "income" ? amount : -amount,
      category,
      type,
      iconName: getIconForCategory(category),
    });
  }
  return transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
};

const getIconForCategory = (category) => {
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
};

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
      await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate API Delay
      
      let initialData = storedData;
      if (initialData.length === 0) {
        initialData = generateMockData(120);
        setStoredData(initialData);
      }
      setTransactions(initialData);
      setIsLoading(false);
    };
    init();
  }, []);

  const addTransaction = useCallback(async (newTx) => {
    setIsMutating(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const txWithId = {
      ...newTx,
      id: `TX-${Math.floor(10000 + Math.random() * 90000)}`,
      amount: newTx.type === "expense" ? -Math.abs(newTx.amount) : Math.abs(newTx.amount),
      iconName: getIconForCategory(newTx.category),
    };

    setTransactions((prev) => {
      const updated = [txWithId, ...prev];
      setStoredData(updated);
      return updated;
    });
    setIsMutating(false);
  }, [setStoredData]);

  const updateTransaction = useCallback(async (updatedTx) => {
    setIsMutating(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    setTransactions((prev) => {
      const updated = prev.map((tx) =>
        tx.id === updatedTx.id
          ? {
              ...updatedTx,
              amount: updatedTx.type === "expense" ? -Math.abs(updatedTx.amount) : Math.abs(updatedTx.amount),
              iconName: getIconForCategory(updatedTx.category),
            }
          : tx
      );
      setStoredData(updated);
      return updated;
    });
    setIsMutating(false);
  }, [setStoredData]);

  const deleteTransaction = useCallback(async (id) => {
    setIsMutating(true);
    await new Promise(resolve => setTimeout(resolve, 600));

    setTransactions((prev) => {
      const updated = prev.filter((tx) => tx.id !== id);
      setStoredData(updated);
      return updated;
    });
    setIsMutating(false);
  }, [setStoredData]);

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
    [transactions, isLoading, isMutating, filters, setFilters, addTransaction, updateTransaction, deleteTransaction]
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
