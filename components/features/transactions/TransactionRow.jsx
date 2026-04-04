"use client";

import { Edit2, Search, Trash2 } from "lucide-react";
import { useTransactions } from "@/providers/TransactionProvider";

const TransactionRow = ({
  transaction,
  index,
  onEdit,
  onDelete,
  onViewDetail,
  role,
}) => {
  const { ICON_MAP } = useTransactions();
  const Icon = ICON_MAP[transaction.iconName] || Search;

  return (
    <tr
      className="hover:bg-app-inner-bg/30 transition-colors group animate-fade-in-up border-b border-border-color last:border-0"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <td className="px-6 py-4">
        <div
          className="flex items-center gap-4 text-nowrap cursor-pointer hover:translate-x-1 transition-transform"
          onClick={() => onViewDetail(transaction)}
        >
          <div className="size-11 rounded-full bg-app-inner-bg flex items-center justify-center border border-border-color group-hover:border-app-accent/30 transition-all">
            <Icon className="size-5 text-text-base group-hover:text-app-accent transition-colors" />
          </div>
          <div>
            <p className="font-bold text-foreground group-hover:text-app-accent transition-colors">
              {transaction.merchant}
            </p>
            <p className="text-xs text-text-base">{transaction.category}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-text-base text-nowrap">
        {transaction.date}
      </td>
      <td
        className={`px-6 py-4 text-right font-bold text-nowrap ${
          transaction.type === "income" ? "text-green-600" : "text-rose-600"
        }`}
      >
        <div className="flex items-center justify-end gap-1">
          {transaction.type === "income" ? "+" : "-"}$
          {Math.abs(transaction.amount).toLocaleString()}
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="px-3 py-1 rounded-full bg-app-inner-bg text-[10px] font-bold uppercase tracking-wide border border-border-color text-text-base">
          Completed
        </span>
      </td>
      {role === "admin" && (
        <td className="px-6 py-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => onEdit(transaction)}
              className="p-1.5 rounded-lg border border-border-color hover:bg-app-inner-bg text-text-base hover:text-foreground transition-all shadow-sm"
            >
              <Edit2 className="size-4" />
            </button>
            <button
              onClick={() => onDelete(transaction)}
              className="p-1.5 rounded-lg border border-border-color hover:bg-rose-500/10 text-text-base hover:text-rose-500 transition-all shadow-sm"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default TransactionRow;
