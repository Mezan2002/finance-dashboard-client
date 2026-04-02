import {
  ArrowLeftRight,
  Brain,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";

export const menuItems = [
  {
    id: 1,
    label: "Menu",
    items: [
      {
        id: 11,
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
      },
      {
        id: 12,
        label: "Transactions",
        icon: ArrowLeftRight,
        href: "/transactions",
      },
      {
        id: 13,
        label: "Insights",
        icon: Brain,
        href: "/insights",
      },
    ],
  },
  {
    id: 2,
    label: "Help & Support",
    items: [
      {
        id: 21,
        label: "Settings",
        icon: Settings,
        href: "/settings",
      },
      {
        id: 22,
        label: "Feedback",
        icon: MessageSquare,
        href: "/feedback",
      },
      {
        id: 23,
        label: "Help center",
        icon: HelpCircle,
        href: "/help-center",
      },
    ],
  },
];
