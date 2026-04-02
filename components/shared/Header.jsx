import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

import ThemeToggler from "@/components/shared/ThemeToggler";
import { Breadcrumb, Button } from "@/components/ui";
import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full py-3 flex items-center justify-between px-4">
      {/* left section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Button variant="outline" className="p-1!">
            <ChevronLeft className="size-4 text-text-base" />
          </Button>
          <Button variant="outline" className="p-1!">
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
        <Button variant="outline" className="p-2!">
          <MessageCircle className="size-5 text-foreground" />
        </Button>
        <Button variant="outline" className="p-2!">
          <HelpCircle className="size-5 text-foreground" />
        </Button>
        <ThemeToggler />
        <div className="p-0.5 rounded-lg border border-border-color flex items-center gap-2">
          <Image
            src="/images/profile.png"
            alt="profile"
            width={30}
            height={30}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-text-light">Admin</p>
          </div>
          <ChevronDown className="size-4 text-text-base" />
        </div>
      </div>
    </div>
  );
};
export default Header;
