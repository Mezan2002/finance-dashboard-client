"use client";

import { ChevronLeft, ChevronRight, CreditCard, Wifi } from "lucide-react";
import { useState } from "react";

const CARDS = [
  {
    id: 1,
    type: "Visa",
    number: "**** **** **** 4589",
    expiry: "12/26",
    holder: "Mezanur Rahman",
    balance: "12,450.00",
    color: "from-[#0f0f0f] to-[#1a1a1a]",
  },
  {
    id: 2,
    type: "Mastercard",
    number: "**** **** **** 8821",
    expiry: "08/25",
    holder: "Mezanur Rahman",
    balance: "3,120.50",
    color: "from-[#1e293b] to-[#0f172a]",
  },
  {
    id: 3,
    type: "Visa",
    number: "**** **** **** 1024",
    expiry: "11/27",
    holder: "Mezanur Rahman",
    balance: "840.00",
    color: "from-[#334155] to-[#1e293b]",
  },
];

const MyCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === CARDS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? CARDS.length - 1 : prev - 1));
  };

  const currentCard = CARDS[activeIndex];

  return (
    <div className="lg:col-span-6 col-span-12 bg-background p-6 rounded-3xl flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h5 className="text-xl font-black italic tracking-tight">
            Active Wallets
          </h5>
          <p className="text-[10px] text-text-light tracking-[0.2em] uppercase opacity-70">
            Premium Card Management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="size-8 rounded-full bg-app-inner-bg border border-border-color/50 flex items-center justify-center hover:bg-light-bg transition-all active:scale-90 shadow-sm"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={handleNext}
            className="size-8 rounded-full bg-app-inner-bg border border-border-color/50 flex items-center justify-center hover:bg-light-bg transition-all active:scale-90 shadow-sm"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="relative h-[250px] flex items-center justify-center perspective-[1000px]">
        <div className="absolute inset-x-0 inset-y-0 opacity-[0.03] pointer-events-none z-30 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div
          key={currentCard.id}
          className={`w-full h-[280px] rounded-3xl bg-linear-to-b ${currentCard.color} p-8 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden transition-all duration-700 ease-out animate-in fade-in zoom-in-95 slide-in-from-right-8 group border border-white/5`}
        >
          <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />

          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-1">
              <p className="text-[9px] uppercase tracking-[0.25em] opacity-60 font-black">
                Total Available
              </p>
              <p className="text-3xl font-black tabular-nums tracking-tighter drop-shadow-lg">
                ${currentCard.balance}
              </p>
            </div>
            <Wifi className="size-6 rotate-90 opacity-40" />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-11 h-8 rounded-md bg-linear-to-br from-amber-200 via-amber-400 to-amber-600 relative overflow-hidden border border-amber-300/30 shadow-inner">
                <div className="absolute top-0 bottom-0 left-1/3 w-px bg-black/20" />
                <div className="absolute top-0 bottom-0 right-1/3 w-px bg-black/20" />
                <div className="absolute left-0 right-0 top-1/2 h-px bg-black/20" />
                <div className="size-4 rounded-full bg-amber-500/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-lg" />
              </div>
              <p className="text-xl font-bold tracking-[0.3em] drop-shadow-xl text-white/90">
                {currentCard.number}
              </p>
            </div>

            <div className="flex justify-between items-end border-t border-white/5 pt-4">
              <div>
                <p className="text-[8px] uppercase tracking-[0.15em] opacity-50 mb-1 font-bold">
                  Card Holder
                </p>
                <p className="text-xs font-black tracking-widest uppercase">
                  {currentCard.holder}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[8px] uppercase tracking-[0.15em] opacity-50 mb-1 font-bold">
                  Expires
                </p>
                <p className="text-xs font-black">{currentCard.expiry}</p>
              </div>
              <div className="relative h-8 leading-none flex items-center italic font-black text-2xl opacity-90 drop-shadow-md">
                {currentCard.type}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation Indicators */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <div className="flex gap-1.5 items-center">
          {CARDS.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${i === activeIndex ? "w-8 bg-foreground" : "w-1.5 bg-border-color hover:bg-text-light"}`}
            />
          ))}
        </div>
        <div className="h-4 w-px bg-border-color mx-2" />
        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-text-light hover:text-foreground transition-all group">
          <CreditCard className="size-3.5 group-hover:scale-110 transition-transform" />
          <span>Add Wallet</span>
        </button>
      </div>
    </div>
  );
};

export default MyCards;
