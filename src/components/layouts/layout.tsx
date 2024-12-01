import { Outlet } from "react-router-dom";
import SidebarLayout from "./sidebar.layout";
import HeaderLayout from "./header.layout";
import { useState } from "react";

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <main className="w-full h-screen flex flex-col overflow-hidden">
      <HeaderLayout />
      <div className="flex w-full gap-2 ">
        <SidebarLayout collapsed={collapsed} setCollapsed={handleCollapsed} />
        <div className="overflow-y-auto overflow-x-auto h-screen w-full ">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
