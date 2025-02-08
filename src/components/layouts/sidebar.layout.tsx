import React, { useState } from "react";
import { MENU_ITEMS, LOGO_IMAGE, COMPANY_NAME } from "@/constant";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronDown } from "lucide-react";

interface SidebarLayoutProps {
  collapsed: boolean;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ collapsed }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen bg-background border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        <div
          className={cn(
            "flex h-[65px] items-center",
            collapsed ? "justify-center" : "justify-start px-4"
          )}
        >
          {collapsed ? (
            <img
              src={LOGO_IMAGE}
              alt="logo"
              className="w-10 h-10 object-contain"
            />
          ) : (
            <div className="flex items-center gap-2">
              <img
                src={LOGO_IMAGE}
                alt="logo"
                className="w-10 h-10 object-contain"
              />
              <span className="font-semibold text-xl">{COMPANY_NAME}</span>
            </div>
          )}
        </div>
        <ScrollArea className="flex-1">
          <div className="flex items-center space-x-2 p-4 mt-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div>
                <h1 className="text-sm font-medium">Saino restaurant</h1>
                <p className="text-xs text-muted-foreground">
                  rzprakash1@gmail.com
                </p>
              </div>
            )}
          </div>
          <nav className="mt-4">
            {MENU_ITEMS.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-4">
                {!collapsed && (
                  <h2 className="px-3 text-xs font-semibold text-muted-foreground mb-2">
                    {category.category}
                  </h2>
                )}
                <ul className="space-y-1 px-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {"subItems" in item && item.subItems ? (
                        <div>
                          <Button
                            size={"lg"}
                            className={cn(
                              "w-full justify-start",
                              collapsed ? "px-2" : "px-4",
                              "flex",
                              collapsed ? "justify-center" : "justify-between",
                              location?.pathname === item?.link
                                ? "bg-green-700 text-white hover:bg-green-800"
                                : "bg-transparent text-foreground hover:bg-green-100",
                              "py-4 shadow-none outline-none border-none",
                              "focus-within:bg-green-700"
                            )}
                            onClick={() =>
                              !collapsed && toggleExpand(item.label)
                            }
                          >
                            <div className="flex items-center">
                              <item.icon
                                className={cn("h-5 w-5", !collapsed && "mr-2")}
                              />
                              {!collapsed && <span>{item.label}</span>}
                            </div>
                            {!collapsed && (
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  expandedItems.includes(item.label) &&
                                    "transform rotate-180"
                                )}
                              />
                            )}
                          </Button>
                          {!collapsed && expandedItems.includes(item.label) && (
                            <ul className="pl-9 mt-1 space-y-1">
                              {item?.subItems?.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <Link to={subItem?.link}>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className={cn(
                                        "w-full justify-start",
                                        location?.pathname === subItem.link
                                          ? "bg-green-700 text-white hover:bg-green-800"
                                          : "hover:bg-green-100"
                                      )}
                                    >
                                      {subItem.label}
                                    </Button>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link to={item.link}>
                                <Button
                                  size={"lg"}
                                  className={cn(
                                    "w-full justify-start",
                                    collapsed ? "px-2" : "px-4",
                                    "flex",
                                    collapsed
                                      ? "justify-center"
                                      : "justify-start",
                                    location?.pathname === item?.link
                                      ? "bg-green-700 text-white hover:bg-green-800"
                                      : "bg-transparent text-foreground hover:bg-green-100",
                                    "py-4 shadow-none outline-none border-none",
                                    "focus-within:bg-green-700"
                                  )}
                                >
                                  <item.icon
                                    className={cn(
                                      "h-5 w-5",
                                      !collapsed && "mr-2"
                                    )}
                                  />
                                  {!collapsed && <span>{item.label}</span>}
                                </Button>
                              </Link>
                            </TooltipTrigger>
                            {collapsed && (
                              <TooltipContent side="right">
                                {item.label}
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default SidebarLayout;
