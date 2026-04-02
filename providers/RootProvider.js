import ThemeProvider from "@/providers/ThemeProvider";

export default function RootProvider({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
