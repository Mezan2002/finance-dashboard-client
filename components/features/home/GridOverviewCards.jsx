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
      .reduce((acc, tx) => acc + tx.amount, 0)
  );

  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

  return (
    <div className="grid grid-cols-2 gap-3 bg-background p-4 rounded-2xl lg:col-span-5 col-span-12">
      {/* Income card */}
      <div className="bg-foreground rounded-2xl p-3 h-max">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-full bg-background flex items-center justify-center">
            <TrendingUp className="size-5 text-text-base" />
          </div>
          <h5 className="text-xl font-medium text-background">Income</h5>
        </div>
        <div>
          <p className="text-3xl text-background font-semibold mt-2">
            ${totalIncome.toLocaleString()}
          </p>
          <p className="text-sm text-background">Available Balance</p>
        </div>
      </div>
      {/* Expense card */}
      <div className="bg-app-inner-bg rounded-2xl p-3 h-max">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-full bg-background flex items-center justify-center">
            <TrendingDown className="size-5 text-text-base" />
          </div>
          <h5 className="text-xl font-medium text-text-base">Expense</h5>
        </div>
        <div>
          <p className="text-3xl text-text-base font-semibold mt-2">
            ${totalExpense.toLocaleString()}
          </p>
          <p className="text-sm text-text-base">Available Balance</p>
        </div>
      </div>
      {/* Net card */}
      <div className="bg-app-inner-bg rounded-2xl p-3 h-max">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-full bg-background flex items-center justify-center">
            <WalletCardsIcon className="size-5 text-text-base" />
          </div>
          <h5 className="text-xl font-medium text-text-base">Net</h5>
        </div>
        <div>
          <p className="text-3xl text-text-base font-semibold mt-2">
            {netSavings >= 0 ? "+" : "-"}${Math.abs(netSavings).toLocaleString()}
          </p>
          <p className="text-sm text-text-base">Net Incomes</p>
        </div>
      </div>
      {/* Savings card */}
      <div className="bg-app-inner-bg rounded-2xl p-3 h-max">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-full bg-background flex items-center justify-center">
            <HandCoins className="size-5 text-text-base" />
          </div>
          <h5 className="text-xl font-medium text-text-base">Savings</h5>
        </div>
        <div>
          <p className="text-3xl text-text-base font-semibold mt-2">
            {savingsRate.toFixed(1)}%
          </p>
          <p className="text-sm text-text-base">Savings Rate</p>
        </div>
      </div>
    </div>
  );
};
export default GridOverviewCards;
