"use client";

import { useMemo } from "react";

import {
  Calendar,
  Clock,
  CreditCard,
  Download,
  MapPin,
  Search,
  Tag,
} from "lucide-react";

import { useTransactions } from "@/providers/TransactionProvider";

import { Button } from "@/components/ui";
import Modal from "@/components/ui/Modal";

const TransactionDetailModal = ({ isOpen, onClose, transaction }) => {
  const { ICON_MAP } = useTransactions();

  // Hooks must be called before early returns
  const Icon = useMemo(() => {
    return transaction ? ICON_MAP[transaction.iconName] || Search : Search;
  }, [transaction, ICON_MAP]);

  const isIncome = transaction?.type === "income";

  const referenceId = useMemo(() => {
    if (!transaction) return "";
    // Deterministic "random" digits based on ID to keep the render pure
    const seed = transaction.id
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const suffix = 1000 + (seed % 8999);
    return `#${transaction.id.replace("TX-", "")}${suffix}`;
  }, [transaction]);

  if (!transaction) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transaction Details">
      <div className="space-y-8 animate-fade-in py-2">
        {/* Receipt Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="size-20 rounded-3xl bg-app-inner-bg flex items-center justify-center border border-border-color shadow-sm relative group overflow-hidden">
            <div className="absolute inset-0 bg-app-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Icon className="size-10 text-app-accent relative z-10" />
          </div>
          <div>
            <h3 className="text-2xl font-black italic tracking-tight text-foreground">
              {transaction.merchant}
            </h3>
            <p className="text-xs font-bold uppercase tracking-widest text-text-light mt-1 flex items-center justify-center gap-2">
              <span
                className={`size-1.5 rounded-full ${isIncome ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"}`}
              />
              {transaction.category} • Completed
            </p>
          </div>
        </div>

        {/* Amount Display */}
        <div className="bg-app-inner-bg/50 rounded-2xl p-6 border border-border-color/50 text-center relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <CreditCard className="size-12 rotate-[-15deg]" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light mb-1">
            Transaction Amount
          </p>
          <p
            className={`text-4xl font-black italic tracking-tighter ${isIncome ? "text-green-500" : "text-rose-500"}`}
          >
            {isIncome ? "+" : "-"}$
            {Math.abs(transaction.amount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-border-color/40 bg-app-inner-bg/20 space-y-1">
            <div className="flex items-center gap-1.5 text-text-light">
              <Calendar className="size-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Date
              </span>
            </div>
            <p className="text-sm font-bold">{transaction.date}</p>
          </div>
          <div className="p-4 rounded-2xl border border-border-color/40 bg-app-inner-bg/20 space-y-1">
            <div className="flex items-center gap-1.5 text-text-light">
              <Clock className="size-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Time
              </span>
            </div>
            <p className="text-sm font-bold">14:32:05 PM</p>
          </div>
          <div className="p-4 rounded-2xl border border-border-color/40 bg-app-inner-bg/20 space-y-1">
            <div className="flex items-center gap-1.5 text-text-light">
              <Tag className="size-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Reference ID
              </span>
            </div>
            <p className="text-sm font-mono font-bold opacity-70">
              {referenceId}
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-border-color/40 bg-app-inner-bg/20 space-y-1">
            <div className="flex items-center gap-1.5 text-text-light">
              <MapPin className="size-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Method
              </span>
            </div>
            <p className="text-sm font-bold">Digital Wallet/API</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-border-color/50">
          <Button
            variant="outline"
            className="flex-1 rounded-xl! gap-2! h-11! font-bold!"
          >
            <Download className="size-4" /> Receipt
          </Button>
          <Button
            className="flex-1 rounded-xl! h-11! font-bold! mt-0!"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionDetailModal;
