"use client";
import { useTransactions } from "@/providers/TransactionProvider";
import { AlertCircle, CheckCircle2, Info, PiggyBank, TrendingUp } from "lucide-react";
import { useMemo } from "react";

const Observations = () => {
  const { transactions } = useTransactions();

  const observations = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
    const currentMonthTxs = transactions.filter(tx => {
      const d = new Date(tx.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const lastMonthTxs = transactions.filter(tx => {
      const d = new Date(tx.date);
      return d.getMonth() === lastMonthDate.getMonth() && d.getFullYear() === lastMonthDate.getFullYear();
    });

    const currentIncome = currentMonthTxs.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0);
    const currentExpense = Math.abs(currentMonthTxs.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0));
    const lastExpense = Math.abs(lastMonthTxs.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0));

    const obs = [];

    // Observation 1: Savings
    const savings = currentIncome - currentExpense;
    if (savings > 0) {
      obs.push({
        title: "Positive Cash Flow",
        description: `You've saved $${savings.toLocaleString()} so far this month. You're building wealth effectively!`,
        icon: CheckCircle2,
        color: "emerald",
      });
    } else {
      obs.push({
        title: "Budget Alert",
        description: `Your expenses exceed your income by $${Math.abs(savings).toLocaleString()} this month. Time to review your spending.`,
        icon: AlertCircle,
        color: "rose",
      });
    }

    // Observation 2: Speeding Spike
    if (lastExpense > 0) {
      const diff = ((currentExpense - lastExpense) / lastExpense) * 100;
      if (diff > 10) {
        obs.push({
          title: "Spending Spike",
          description: `Your spending is up by ${Math.floor(diff)}% compared to last month. Keep an eye on non-essentials.`,
          icon: TrendingUp,
          color: "amber",
        });
      }
    }

    // Observation 3: Frequent Category
    const catCounts = currentMonthTxs.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + 1;
      return acc;
    }, {});
    const topCat = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0];
    if (topCat) {
      obs.push({
        title: "Category Pattern",
        description: `You've made ${topCat[1]} transactions in ${topCat[0]} this month. Consider if this aligns with your goals.`,
        icon: PiggyBank,
        color: "indigo",
      });
    }

    return obs;
  }, [transactions]);

  return (
    <div className="lg:col-span-12 col-span-12 bg-background border border-border-color rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Info className="size-5 text-indigo-500" />
        <h5 className="text-xl font-bold text-foreground">
          Real-Time Observations
        </h5>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {observations.map((obs, idx) => {
          const Icon = obs.icon;
          const colorClass = 
            obs.color === "emerald" ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" :
            obs.color === "rose" ? "text-rose-500 bg-rose-500/10 border-rose-500/20" :
            obs.color === "amber" ? "text-amber-500 bg-amber-500/10 border-amber-500/20" :
            "text-indigo-500 bg-indigo-500/10 border-indigo-500/20";

          return (
            <div key={idx} className="flex items-start gap-4 p-4 bg-app-inner-bg/50 rounded-2xl border border-border-color hover:bg-app-inner-bg transition-all cursor-pointer">
              <div className={`size-10 rounded-full flex items-center justify-center border shrink-0 ${colorClass}`}>
                <Icon className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{obs.title}</p>
                <p className="text-xs text-text-base leading-relaxed mt-1">{obs.description}</p>
              </div>
            </div>
          );
        })}
        {observations.length === 0 && (
          <p className="col-span-3 text-sm text-text-base text-center py-10">
            Waiting for more data to generate insights...
          </p>
        )}
      </div>
    </div>
  );
};

export default Observations;
