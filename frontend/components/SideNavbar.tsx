"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import SignOut from "@/components/auth/SignOut";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative flex flex-col items-center justify-between border-r pt-20 transition-all duration-300 ease-in-out lg:px-3">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2"
          >
            <ChevronLeft
              className={`transition-transform duration-300 ease-in-out ${isCollapsed ? "rotate-180" : "rotate-0"}`}
            />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Users",
            href: "/dashboard/users",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Orders",
            href: "/dashboard/orders",
            icon: ShoppingCart,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/dashboard/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />
      <div className="flex flex-col items-center justify-center gap-5">
        <ModeToggle />
        <SignOut />
      </div>
    </div>
  );
}
