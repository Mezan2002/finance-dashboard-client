"use client";

import { useTransactions } from "@/providers/TransactionProvider";
import { ArrowRight, ChevronRight, LayoutList } from "lucide-react";
import Link from "next/link";

const RecentActivity = () => {
  const { transactions, ICON_MAP } = useTransactions();

  // Get latest 5 transactions
  const recentTransactions = transactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="lg:col-span-6 col-span-12 bg-background p-6 rounded-3xl flex flex-col justify-between min-h-[350px]">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-app-inner-bg flex items-center justify-center border border-border-color">
              <LayoutList className="size-4 text-text-base" />
            </div>
            <h5 className="text-lg font-bold italic">Recent Activity</h5>
          </div>
          <Link
            href="/transactions"
            className="text-xs font-bold text-text-light hover:text-foreground transition-colors flex items-center gap-1 group"
          >
            View All{" "}
            <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="space-y-4">
          {recentTransactions.map((tx) => {
            const Icon = ICON_MAP[tx.iconName] || ICON_MAP.ShoppingBag;
            return (
              <div
                key={tx.id}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-app-inner-bg border border-border-color flex items-center justify-center group-hover:border-foreground/20 transition-colors">
                    <Icon className="size-5 text-text-base" />
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-none">
                      {tx.merchant}
                    </p>
                    <p className="text-[10px] text-text-light font-medium uppercase tracking-wider mt-1">
                      {tx.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-bold ${tx.type === "income" ? "text-emerald-500" : "text-foreground"}`}
                  >
                    {tx.type === "income" ? "+" : "-"}$
                    {Math.abs(tx.amount).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-text-light mt-1 font-medium">
                    {new Date(tx.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Link
        href="/transactions"
        className="mt-6 w-full py-3 bg-app-inner-bg hover:bg-light-bg border border-border-color rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all group"
      >
        <span>Access Full Ledger</span>
        <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export default RecentActivity;
