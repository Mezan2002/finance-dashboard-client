"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

import ThemeToggler from "@/components/shared/ThemeToggler";
import { Breadcrumb, Button } from "@/components/ui";
import { useRole } from "@/providers/RoleProvider";

const Header = ({ onMenuClick }) => {
  const router = useRouter();
  const { role, setRole } = useRole();

  return (
    <div className="w-full py-4 flex items-center justify-between px-4 md:px-6">
      {/* left section */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="p-2! lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="size-5 text-foreground" />
        </Button>

        <div className="hidden sm:flex items-center gap-1">
          <Button
            variant="outline"
            className="p-1!"
            onClick={() => router.back()}
          >
            <ChevronLeft className="size-4 text-text-base" />
          </Button>
          <Button
            variant="outline"
            className="p-1!"
            onClick={() => router.forward()}
          >
            <ChevronRight className="size-4 text-text-base" />
          </Button>
        </div>
        <div className="hidden md:block">
          <Breadcrumb />
        </div>
      </div>

      {/* right section */}
      <div className="flex items-center gap-2">
        <Button variant="outline" className="p-2!">
          <Bell className="size-5 text-foreground" />
        </Button>
        <ThemeToggler />

        {/* Role Switcher Dropdown */}
        <div className="relative group">
          <div className="py-1 px-2 rounded-lg border border-border-color flex items-center gap-2 cursor-pointer hover:bg-app-inner-bg transition-colors">
            <Image
              src="/images/profile.png"
              alt="profile"
              width={30}
              height={30}
              className="rounded-full"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-[10px] font-bold uppercase tracking-wider">
                {role}
              </p>
            </div>
            <ChevronDown className="size-4 text-text-base group-hover:rotate-180 transition-transform" />
          </div>

          {/* Dropdown Content */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border-color rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden py-1.5 translate-y-1 group-hover:translate-y-0">
            {["admin", "viewer"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`w-full px-4 py-2.5 flex items-center justify-between text-xs font-black uppercase tracking-widest transition-all hover:bg-app-inner-bg ${
                  role === r
                    ? "text-foreground bg-app-inner-bg/50 font-black"
                    : "text-text-light opacity-80"
                }`}
              >
                <span>Set as {r}</span>
                {role === r && (
                  <div className="size-1.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
