import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MENU_ITEMS } from "@/constant";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useLocation, useParams } from "react-router-dom";

interface SidebarLayoutProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  collapsed,
  setCollapsed,
}) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        " h-screen bg-background border-r transition-all duration-300 ease-in-out relative",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        <div
          className={cn(
            "flex h-16 items-center  px-4",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          <Button
            size="icon"
            className="absolute -right-5 top-2 bg-green-500 hover:bg-green-600 dark:text-white focus-within:bg-green-500 focus-within:border-none"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <nav>
            <ul className="space-y-3 px-2">
              {MENU_ITEMS.map((item, index) => (
                <TooltipProvider key={index} delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <li>
                        <Link to={`${item?.link}`}>
                          <Button
                            size={"lg"}
                            className={cn(
                              "w-full justify-start",
                              collapsed ? "px-2" : "px-4",
                              "flex",
                              collapsed ? "justify-center" : "justify-start",
                              location?.pathname === item?.link
                                ? "bg-green-700 text-white hover:bg-green-800"
                                : "bg-transparent text-foreground hover:bg-green-100",
                              "py-4 shadow-none  outline-none border-none",
                              "focus-within:bg-green-700"
                            )}
                          >
                            <item.icon className="h-10 w-10" />
                            {!collapsed && (
                              <span className="ml-3 text-md ">
                                {item.label}
                              </span>
                            )}
                          </Button>
                        </Link>
                      </li>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              ))}
            </ul>
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default SidebarLayout;
