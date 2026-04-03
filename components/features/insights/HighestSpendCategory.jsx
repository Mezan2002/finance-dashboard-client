import { ShoppingBag, TrendingUp } from "lucide-react";

const HighestSpendCategory = () => {
  return (
    <div className="col-span-4 space-y-3">
      <div className="bg-foreground text-background rounded-3xl p-6 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="size-12 rounded-full bg-background/20 flex items-center justify-center">
            <ShoppingBag className="size-6 text-background" />
          </div>
          <span className="bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Highest Spending
          </span>
        </div>
        <div>
          <p className="text-sm font-medium opacity-70">Shopping Category</p>
          <h5 className="text-4xl font-bold mt-2">$4,250.32</h5>
          <div className="flex items-center gap-1 mt-4 text-sm text-red-600">
            <TrendingUp className="size-4" />
            <span>+12.5% vs Last Period</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighestSpendCategory;
