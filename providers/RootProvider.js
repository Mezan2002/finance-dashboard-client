import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";

export default function RootProvider({ children }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="w-full h-full bg-app-inner-bg">{children}</div>
      </div>
    </div>
  );
}
