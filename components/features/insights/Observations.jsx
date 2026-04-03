import { AlertCircle, CheckCircle2, Info, PiggyBank } from "lucide-react";

const Observations = () => {
  return (
    <div className="col-span-12 bg-background border border-border-color rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Info className="size-5 text-indigo-500" />
        <h5 className="text-xl font-bold text-foreground">
          Data-Driven Observations
        </h5>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-app-inner-bg/50 rounded-xl border border-border-color hover:bg-app-inner-bg transition-colors cursor-pointer group">
          <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
            <CheckCircle2 className="size-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">
              Savings Goal Progress
            </p>
            <p className="text-sm text-text-base leading-relaxed">
              Excellent work! You are currently on track to reach your
              &quot;Emergency Fund&quot; goal 15 days earlier than projected.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-app-inner-bg/50 rounded-2xl border border-border-color hover:bg-app-inner-bg transition-colors cursor-pointer group">
          <div className="size-10 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 shrink-0">
            <AlertCircle className="size-5 text-rose-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">
              Food Expense Spike
            </p>
            <p className="text-sm text-text-base leading-relaxed">
              Warning: Your spending on Food & Dining has increased by 22% this
              month. Consider reviewing your grocery budget.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-app-inner-bg/50 rounded-2xl border border-border-color hover:bg-app-inner-bg transition-colors cursor-pointer group">
          <div className="size-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shrink-0">
            <PiggyBank className="size-5 text-indigo-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">
              Subscription Optimization
            </p>
            <p className="text-sm text-text-base leading-relaxed">
              We identified 3 recurring subscriptions that have not been
              actively used in the last 60 days. Canceling them could save you
              $45/month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Observations;
