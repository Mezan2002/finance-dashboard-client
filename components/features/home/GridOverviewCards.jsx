"use client";

import {
  HandCoins,
  TrendingDown,
  TrendingUp,
  WalletCardsIcon,
} from "lucide-react";

import { useTransactions } from "@/providers/TransactionProvider";

const GridOverviewCards = () => {
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalExpense = Math.abs(
    transactions
      .filter((tx) => tx.type === "expense")
      .reduce((acc, tx) => acc + tx.amount, 0),
  );

  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-background p-6 rounded-3xl lg:col-span-5 col-span-12">
      {/* Income card */}
      <div className="bg-foreground text-background rounded-2xl p-4 flex flex-col justify-between min-h-[120px]">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-background flex items-center justify-center">
            <TrendingUp className="size-5 text-text-base" />
          </div>
          <h5 className="text-xl font-bold">Income</h5>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold">${totalIncome.toLocaleString()}</p>
          <p className="text-[10px] uppercase font-bold tracking-wider opacity-60">
            Monthly Earnings
          </p>
        </div>
      </div>

      {/* Expense card */}
      <div className="bg-app-inner-bg rounded-2xl p-4 flex flex-col justify-between min-h-[120px] border border-border-color/50">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-background flex items-center justify-center">
            <TrendingDown className="size-5 text-text-base" />
          </div>
          <h5 className="text-xl font-bold text-text-base">Expense</h5>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-foreground">
            ${totalExpense.toLocaleString()}
          </p>
          <p className="text-[10px] uppercase font-bold tracking-wider text-text-light opacity-70">
            Monthly Spending
          </p>
        </div>
      </div>

      {/* Net card */}
      <div className="bg-app-inner-bg rounded-2xl p-4 flex flex-col justify-between min-h-[120px] border border-border-color/50">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-background flex items-center justify-center border border-border-color/50">
            <WalletCardsIcon className="size-5 text-text-base" />
          </div>
          <h5 className="text-xl font-bold text-text-base">Net</h5>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-foreground">
            {netSavings >= 0 ? "+" : "-"}$
            {Math.abs(netSavings).toLocaleString()}
          </p>
          <p className="text-[10px] uppercase font-bold tracking-wider text-text-light opacity-70">
            Net Savings
          </p>
        </div>
      </div>

      {/* Savings card */}
      <div className="bg-app-inner-bg rounded-2xl p-4 flex flex-col justify-between min-h-[120px] border border-border-color/50">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-background flex items-center justify-center border border-border-color/50">
            <HandCoins className="size-5 text-text-base" />
          </div>
          <h5 className="text-xl font-bold text-text-base">Savings</h5>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-foreground">
            {savingsRate.toFixed(1)}%
          </p>
          <p className="text-[10px] uppercase font-bold tracking-wider text-text-light opacity-70">
            Efficiency Rate
          </p>
        </div>
      </div>
    </div>
  );
};
export default GridOverviewCards;
