"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

import { useRole } from "@/providers/RoleProvider";
import ThemeToggler from "@/components/shared/ThemeToggler";
import { Breadcrumb, Button } from "@/components/ui";

const Header = () => {
  const router = useRouter();
  const { role, setRole } = useRole();

  return (
    <div className="w-full py-3 flex items-center justify-between px-4">
      {/* left section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
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
        <Breadcrumb />
      </div>

      {/* right section */}
      <div className="flex items-center gap-2">
        <Button variant="outline" className="p-2!">
          <Bell className="size-5 text-foreground" />
        </Button>
        <ThemeToggler />
        
        {/* Role Switcher Dropdown */}
        <div className="relative group">
          <div className="py-0.5 px-2 rounded-lg border border-border-color flex items-center gap-2 cursor-pointer hover:bg-app-inner-bg transition-colors">
            <Image
              src="/images/profile.png"
              alt="profile"
              width={30}
              height={30}
              className="rounded-full"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 mt-1">
                {role}
              </p>
            </div>
            <ChevronDown className="size-4 text-text-base group-hover:rotate-180 transition-transform" />
          </div>

          {/* Dropdown Content */}
          <div className="absolute right-0 top-full mt-1 w-40 bg-background border border-border-color rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
            <button
              onClick={() => setRole("admin")}
              className={`w-full px-4 py-2 text-left text-xs font-semibold hover:bg-app-inner-bg transition-colors ${
                role === "admin" ? "text-indigo-500 bg-app-inner-bg" : "text-text-base"
              }`}
            >
              Set as Admin
            </button>
            <button
              onClick={() => setRole("viewer")}
              className={`w-full px-4 py-2 text-left text-xs font-semibold hover:bg-app-inner-bg transition-colors ${
                role === "viewer" ? "text-indigo-500 bg-app-inner-bg" : "text-text-base"
              }`}
            >
              Set as Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
