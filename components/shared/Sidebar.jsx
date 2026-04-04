"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Search, X } from "lucide-react";

import { menuItems } from "@/components/shared/helpers/UiData";
import { Button } from "@/components/ui";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-[2px] z-140 animation-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 z-150 h-screen bg-background border-r border-border-color lg:border-none transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? "left-0 w-64 shadow-2xl" : "-left-64 lg:left-0 w-64 lg:w-60"}
        `}
      >
        {/* Top Section (Fixed) */}
        <div className="pb-4">
          {/* Logo section */}
          <div className="flex items-center justify-between p-4 pb-0">
            <h4 className="text-3xl font-bold tracking-tight">Finzo</h4>
            <Button
              variant="outline"
              className="size-8! p-0! lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>

          <div className="p-4 pt-4">
            {/* search bar */}
            <div className="border border-border-color flex items-center px-3 py-2 rounded-xl gap-2 shadow-sm bg-app-inner-bg/30">
              <Search className="size-4 text-text-light" />
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full outline-none text-xs font-semibold bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Middle Section (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-6 scrollbar-hide">
          {menuItems.map((item) => (
            <div key={item.id} className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light opacity-50 px-3">
                {item.label}
              </span>
              <ul className="space-y-1">
                {item.items.map((subItem) => {
                  const isActive = subItem.href === pathname;
                  return (
                    <li key={subItem.id}>
                      <Link
                        href={subItem.href}
                        onClick={() => {
                          if (window.innerWidth < 1024) setIsOpen(false);
                        }}
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-xl border border-transparent transition-all duration-200 group ${
                          isActive
                            ? "bg-foreground text-background font-bold shadow-lg shadow-foreground/10"
                            : "text-text-base hover:bg-app-inner-bg hover:text-foreground"
                        }`}
                      >
                        <subItem.icon
                          className={`size-4 ${isActive ? "text-background" : "text-text-light group-hover:text-foreground"}`}
                        />
                        <span className="text-sm">{subItem.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section (Fixed) */}
        <div className="p-4 mt-auto border-t lg:border-none border-border-color/50">
          {/* Upgrade card */}
          <div className="bg-foreground text-background p-5 rounded-2xl w-full shadow-xl">
            <h4 className="text-sm font-bold">Upgrade to Pro</h4>
            <p className="text-[10px] mt-1 opacity-70 leading-relaxed font-medium">
              Unlock premium financial analytics and advanced filtering.
            </p>
            <Button className="w-full! mt-4! bg-background! text-foreground! hover:bg-background/90 text-xs font-bold rounded-xl!">
              Get Started
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
