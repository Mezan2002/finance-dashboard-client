"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { Search } from "lucide-react";

import { menuItems } from "@/components/shared/helpers/UiData";
import { Button } from "@/components/ui";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-60 h-screen sticky top-0 flex flex-col">
      {/* Top Section (Fixed) */}
      <div className="pb-4">
        {/* Logo section */}
        <div className="flex gap-3 p-4">
          <h4 className="text-center text-3xl font-bold">Finzo</h4>
        </div>

        {/* search bar */}
        <div className="border border-border-color flex items-center mx-4 px-2 py-1 rounded-lg gap-1 shadow-inner">
          <Search className="size-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none text-md font-medium"
          />
        </div>
      </div>

      {/* Middle Section (Scrollable) */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 px-4 pb-4 scrollbar-hide">
        {menuItems.map((item) => (
          <Fragment key={item.id}>
            <span className="text-md text-text-light tracking-widest">
              {item.label}
            </span>
            <ul className="space-y-1 mb-2">
              {item.items.map((item) => {
                const isActive = item.href === pathname;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 py-1.5 px-3 rounded-lg border border-transparent text-text-base ${isActive ? "bg-app-inner-bg border-border-color! text-foreground! font-medium" : ""}`}
                    >
                      <item.icon className="size-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Fragment>
        ))}
      </div>

      {/* Bottom Section (Fixed) */}
      <div className="p-4 mt-auto">
        {/* Upgrade card */}
        <div className="bg-light-bg p-4 rounded-xl w-full">
          <h4 className="text-lg font-semibold">Upgrade to Pro</h4>
          <p className="text-sm text-text-light">
            Get access to premium features
          </p>
          <Button>Upgrade</Button>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
