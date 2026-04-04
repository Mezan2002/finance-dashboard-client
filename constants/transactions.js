import {
  Briefcase,
  Gamepad2,
  Home,
  ShoppingBag,
  User,
  Utensils,
  Zap,
} from "lucide-react";

export const CATEGORIES = [
  "Shopping",
  "Freelancing",
  "Food",
  "Rent",
  "Entertainment",
  "Subscriptions",
  "Salary",
  "Other",
];

export const ICON_MAP = {
  ShoppingBag,
  Briefcase,
  Utensils,
  Home,
  Gamepad2,
  Zap,
  User,
};

export const getIconForCategory = (category) => {
  const map = {
    Shopping: "ShoppingBag",
    Freelancing: "Briefcase",
    Food: "Utensils",
    Rent: "Home",
    Entertainment: "Gamepad2",
    Subscriptions: "Zap",
    Salary: "User",
  };
  return map[category] || "ShoppingBag";
};

export const MERCHANTS_BY_CATEGORY = {
  Shopping: [
    "Apple Store",
    "Amazon",
    "Walmart",
    "eBay",
    "Target",
    "Nike Official",
  ],
  Freelancing: [
    "Upwork Global",
    "Fiverr",
    "Toptal",
    "Freelance Project A",
    "Project B",
  ],
  Food: [
    "FreshMarket",
    "Whole Foods",
    "Starbucks",
    "Uber Eats",
    "McDonald's",
    "Local Bistro",
  ],
  Rent: ["Apartment Rental", "Office Lease", "Storage Unit", "HOA Fee"],
  Entertainment: [
    "Steam Games",
    "Netlfix",
    "Cinema City",
    "Theme Park",
    "Concert Tickets",
  ],
  Subscriptions: [
    "Google Cloud",
    "AWS",
    "Spotify",
    "Hulu",
    "Discord Nitro",
    "Medium",
  ],
  Salary: [
    "Design Agency Inc",
    "Dividends Inc",
    "Bonus Distribution",
    "Secondary Income",
  ],
  Other: [
    "Gym Membership",
    "Pharmacy",
    "Insurance Premiums",
    "Car Wash",
    "Hardware Store",
  ],
};
