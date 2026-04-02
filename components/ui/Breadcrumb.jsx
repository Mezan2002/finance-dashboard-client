import { ChevronRight } from "lucide-react";

const Breadcrumb = () => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-text-base text-xs font-medium">Dashboard</span>
      <ChevronRight className="size-3.5 text-text-base" />
      <span className="text-foreground text-xs font-semibold">
        Transactions
      </span>
    </div>
  );
};
export default Breadcrumb;
