import { useTransactions } from "@/providers/TransactionProvider";
import { ShoppingBag, TrendingUp, AlertCircle } from "lucide-react";
import { useMemo } from "react";

const HighestSpendCategory = () => {
  const { transactions, ICON_MAP } = useTransactions();

  const highestCategory = useMemo(() => {
    const expenses = transactions.filter((tx) => tx.type === "expense");
    if (expenses.length === 0) return null;

    const categoryTotals = expenses.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount);
      return acc;
    }, {});

    const topCategory = Object.entries(categoryTotals).reduce(
      (a, b) => (categoryTotals[a[0]] > categoryTotals[b[0]] ? a : b),
      [null, 0]
    );

    return {
      name: topCategory[0],
      amount: topCategory[1],
      iconName: expenses.find((tx) => tx.category === topCategory[0])?.iconName,
    };
  }, [transactions]);

  if (!highestCategory) {
    return (
      <div className="lg:col-span-4 col-span-12 space-y-3">
        <div className="bg-app-inner-bg/50 border border-border-color rounded-3xl p-6 h-full flex flex-col items-center justify-center text-center">
          <AlertCircle className="size-10 text-text-light mb-2" />
          <p className="text-sm font-medium text-text-base">No expense data yet</p>
        </div>
      </div>
    );
  }

  const Icon = ICON_MAP[highestCategory.iconName] || ShoppingBag;

  return (
    <div className="lg:col-span-4 col-span-12 space-y-3">
      <div className="bg-foreground text-background rounded-3xl p-6 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="size-12 rounded-full bg-background/20 flex items-center justify-center">
            <Icon className="size-6 text-background" />
          </div>
          <span className="bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Highest Spending
          </span>
        </div>
        <div className="mt-8">
          <p className="text-sm font-medium opacity-70">
            {highestCategory.name} Category
          </p>
          <h5 className="text-4xl font-bold mt-2">
            ${highestCategory.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h5>
          <div className="flex items-center gap-1 mt-4 text-sm text-red-400">
            <TrendingUp className="size-4" />
            <span>Primary Expense Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighestSpendCategory;
