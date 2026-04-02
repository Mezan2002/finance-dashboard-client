import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import ThemeProvider from "@/providers/ThemeProvider";

export default function RootProvider({ children }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <ThemeProvider>{children}</ThemeProvider>
      </div>
    </div>
  );
}
