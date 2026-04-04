"use client";

import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Filter,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui";
import TransactionRow from "./TransactionRow";

const TransactionTable = ({
  transactions,
  isLoading,
  isMutating,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
  role,
  onClearFilters,
}) => {
  return (
    <div className="bg-background rounded-2xl overflow-hidden border border-border-color relative shadow-sm">
      {/* Mutating Overlay */}
      {isMutating && (
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] z-10 flex items-center justify-center animate-fade-in">
          <div className="bg-background p-4 rounded-2xl shadow-xl border border-border-color flex items-center gap-3 animate-scale-in">
            <Loader2 className="size-5 animate-spin text-app-accent" />
            <span className="text-sm font-bold">Updating Data...</span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-app-inner-bg/50 border-b border-border-color">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-light">
                Transaction
              </th>
              <th
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-light cursor-pointer hover:text-foreground transition-colors group/thead"
                onClick={() => onSort("date")}
              >
                <div className="flex items-center gap-1">
                  Date
                  {sortConfig.key === "date" ? (
                    sortConfig.direction === "asc" ? (
                      <ChevronUp className="size-3 text-app-accent" />
                    ) : (
                      <ChevronDown className="size-3 text-app-accent" />
                    )
                  ) : (
                    <ArrowUpDown className="size-3 opacity-30 group-hover/thead:opacity-100 transition-opacity" />
                  )}
                </div>
              </th>
              <th
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-light text-right cursor-pointer hover:text-foreground transition-colors group/thead"
                onClick={() => onSort("amount")}
              >
                <div className="flex items-center justify-end gap-1">
                  Amount
                  {sortConfig.key === "amount" ? (
                    sortConfig.direction === "asc" ? (
                      <ChevronUp className="size-3 text-app-accent" />
                    ) : (
                      <ChevronDown className="size-3 text-app-accent" />
                    )
                  ) : (
                    <ArrowUpDown className="size-3 opacity-30 group-hover/thead:opacity-100 transition-opacity" />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-light text-center">
                Status
              </th>
              {role === "admin" && (
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-light text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color">
            {isLoading
              ? // Initial Loading Skeletons
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={`skeleton-${i}`} className="animate-shimmer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="size-11 rounded-full bg-app-inner-bg" />
                        <div className="space-y-2">
                          <div className="h-4 w-32 bg-app-inner-bg rounded" />
                          <div className="h-3 w-20 bg-app-inner-bg rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-app-inner-bg rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-20 bg-app-inner-bg rounded ml-auto" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 w-20 bg-app-inner-bg rounded-full mx-auto" />
                    </td>
                    {role === "admin" && (
                      <td className="px-6 py-4">
                        <div className="h-8 w-20 bg-app-inner-bg rounded ml-auto" />
                      </td>
                    )}
                  </tr>
                ))
              : transactions.map((tx, index) => (
                  <TransactionRow
                    key={tx.id}
                    transaction={tx}
                    index={index}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    role={role}
                  />
                ))}

            {!isLoading && transactions.length === 0 && (
              <tr>
                <td
                  colSpan={role === "admin" ? 5 : 4}
                  className="px-6 py-20 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="size-16 rounded-full bg-app-inner-bg flex items-center justify-center border border-border-color/50">
                      <Filter className="size-8 text-text-light" />
                    </div>
                    <p className="font-bold text-lg">No transactions found</p>
                    <p className="text-sm text-text-base">
                      Try adjusting your filters or search terms.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2 rounded-full! px-6! font-bold!"
                      onClick={onClearFilters}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
