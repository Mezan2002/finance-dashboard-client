"use client";

import { Button } from "@/components/ui";
import {
  ArrowUpRight,
  ChevronDown,
  DollarSign,
  Plus,
  Wallet,
} from "lucide-react";
import Image from "next/image";

import { useTransactions } from "@/providers/TransactionProvider";

const TotalBalanceCard = () => {
  const { transactions } = useTransactions();
  const totalBalance = transactions.reduce((acc, tx) => acc + tx.amount, 0);

  return (
    <div className="bg-background rounded-3xl p-6 lg:col-span-4 col-span-12 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-xl bg-app-inner-bg flex items-center justify-center border border-border-color/50 shadow-sm">
              <Wallet className="size-5 text-text-base" />
            </div>
            <h5 className="text-xl font-bold italic tracking-tight">
              Total Balance
            </h5>
          </div>
          <Button
            className="rounded-full! gap-1! px-2! py-1! bg-secondary text-secondary-foreground hover:bg-secondary/80 border-none shadow-none"
            variant="ghost"
          >
            <DollarSign className="size-4" />{" "}
            <span className="text-xs font-bold">USD</span>
            <ChevronDown className="size-4 opacity-50" />
          </Button>
        </div>

        <div className="mt-6">
          <p className="text-4xl font-extrabold tracking-tighter">
            $
            {totalBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className="size-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            <p className="text-xs font-bold text-text-light tracking-wide uppercase opacity-70">
              Available Balance
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-app-inner-bg/50 p-4 rounded-2xl border border-border-color/30 space-y-8 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="text-md font-bold leading-none italic">
              Quick Transfers
            </h6>
            <p className="text-[10px] text-text-light font-bold uppercase tracking-widest mt-1.5 opacity-60">
              Recent Recipient
            </p>
          </div>
          <Button className="rounded-full! mt-0! size-8! p-0!">
            <ArrowUpRight className="size-5" />
          </Button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center -space-x-2 border-r border-border-color/50 w-max pr-5">
            <Image
              src="/images/profile.png"
              className="border-2 border-background rounded-full hover:translate-y-[-2px] transition-transform cursor-pointer"
              alt=""
              width={38}
              height={38}
            />
            <Image
              src="/images/profile.png"
              className="border-2 border-background rounded-full hover:translate-y-[-2px] transition-transform cursor-pointer"
              alt=""
              width={38}
              height={38}
            />
            <Image
              src="/images/profile.png"
              className="border-2 border-background rounded-full hover:translate-y-[-2px] transition-transform cursor-pointer"
              alt=""
              width={38}
              height={38}
            />
            <div className="size-10 rounded-full bg-light-bg flex items-center justify-center border-2 border-background shrink-0 hover:translate-y-[-2px] transition-transform cursor-pointer">
              <p className="text-xs font-bold opacity-60">+3</p>
            </div>
          </div>
          <Button className="w-max! mt-0! rounded-full! text-[10px] uppercase font-black tracking-widest bg-foreground text-background">
            <Plus className="size-3.5" />
            Add New
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TotalBalanceCard;
