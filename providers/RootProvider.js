"use client";

import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { useState } from "react";
import { RoleProvider } from "./RoleProvider";
import ThemeProvider from "./ThemeProvider";
import { TransactionProvider } from "./TransactionProvider";

const RootProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <RoleProvider>
        <TransactionProvider>
          <div className="flex h-screen overflow-hidden bg-app-inner-bg">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 max-h-screen overflow-hidden flex flex-col">
              <Header onMenuClick={() => setIsSidebarOpen(true)} />
              <div className="flex-1 w-full h-full bg-app-inner-bg overflow-y-auto p-4 md:p-6 lg:rounded-l-[32px]">
                {children}
              </div>
            </div>
          </div>
        </TransactionProvider>
      </RoleProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
