"use client";

import { Button } from "@/components/ui";
import { useRole } from "@/providers/RoleProvider";
import { ChevronDown, Plus } from "lucide-react";
import { usePathname } from "next/navigation";

const PageHeader = ({ title, description, onAddClick }) => {
  const { role } = useRole();
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h4 className="text-2xl font-semibold">{title}</h4>
        <span className="text-md text-text-base">{description}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="rounded-full! w-max">
          <span className="text-xs font-semibold">
            01 Jan 2026 - 31 Jun 2026
          </span>
          <ChevronDown className="size-4 ml-1" />
        </Button>

        {role === "admin" && pathname === "/transactions" && (
          <Button
            className="rounded-full! w-max px-6! mt-0!"
            onClick={onAddClick}
          >
            <Plus className="size-4 mr-1" />
            <span className="text-xs font-bold">Add Transaction</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
