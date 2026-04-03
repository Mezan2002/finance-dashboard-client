import {
  HandCoins,
  TrendingDown,
  TrendingUp,
  WalletCardsIcon,
} from "lucide-react";

const GridOverviewCards = () => {
  return (
    <div className="grid grid-cols-2 gap-3 bg-background p-4 rounded-2xl col-span-5">
      {/* Income card */}
      <div className="bg-foreground rounded-2xl p-3 h-max">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-full bg-background flex items-center justify-center">
            <TrendingUp className="size-5 text-text-base" />
          </div>
          <h5 className="text-xl font-medium text-background">Income</h5>
        </div>
        <div>
          <p className="text-3xl text-background font-semibold mt-2">$24,300</p>
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
          <p className="text-3xl text-text-base font-semibold mt-2">$14,300</p>
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
          <p className="text-3xl text-text-base font-semibold mt-2">+$5,000</p>
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
          <p className="text-3xl text-text-base font-semibold mt-2">22.8%</p>
          <p className="text-sm text-text-base">Savings Rate</p>
        </div>
      </div>
    </div>
  );
};
export default GridOverviewCards;
