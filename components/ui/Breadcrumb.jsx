"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav className="flex items-center gap-1">
      <Link href="/" className="text-text-base text-xs font-medium">
        Finzo
      </Link>
      <ChevronRight className="size-3.5 text-text-base" />
      <Link
        href={`/${pathSegments[0] || "/"}`}
        className="text-foreground text-xs font-semibold"
      >
        {pathSegments[0]?.charAt(0).toUpperCase() + pathSegments[0]?.slice(1) ||
          "Dashboard"}
      </Link>
    </nav>
  );
};
export default Breadcrumb;
