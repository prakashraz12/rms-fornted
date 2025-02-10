import { Outlet } from "react-router-dom";
import SidebarLayout from "./sidebar.layout";
import HeaderLayout from "./header.layout";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background w-full overflow-hidden">
      <div className="flex">
        <SidebarLayout collapsed={collapsed} />
        <div
          className={cn(
            "flex-1 min-h-screen flex flex-col",
            collapsed ? "w-[calc(100%-4rem)]" : "w-[calc(100%-16rem)]"
          )}
        >
          <HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed} />
          <main className="flex-1 p-6 overflow-y-scroll">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
