import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";

export default function RootProvider({ children }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 max-h-screen overflow-hidden">
        <Header />
        <div className="w-full h-full bg-app-inner-bg overflow-y-auto p-4 rounded-l-3xl">
          {children}
        </div>
      </div>
    </div>
  );
}
