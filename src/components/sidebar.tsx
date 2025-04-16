"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Users,
  FileText,
  DollarSign,
  Clipboard,
  FileIcon,
  Wrench,
  Truck,
  Building2,
  Package,
  Bell,
  Menu,
  X,
  User,
  SettingsIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/lib/store/useAuthStore";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useAuthStore();
  console.log("user", user);

  // Define navigation items - simplified with no submenus
  const routes: NavItem[] = [
    {
      label: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Staff Management",
      icon: Users,
      href: "/staff",
      active: pathname.startsWith("/staff"),
    },
    {
      label: "Payment Voucher",
      icon: FileText,
      href: "/payment-voucher",
      active: pathname.startsWith("/payment-voucher"),
    },
    {
      label: "Payroll",
      icon: DollarSign,
      href: "/payroll",
      active: pathname.startsWith("/payroll"),
    },
    {
      label: "Memo",
      icon: Clipboard,
      href: "/memo",
      active: pathname.startsWith("/memo"),
    },
    {
      label: "Circulars",
      icon: FileIcon,
      href: "/circulars",
      active: pathname.startsWith("/circulars"),
    },
    {
      label: "Maintenance",
      icon: Wrench,
      href: "/maintenance",
      active: pathname.startsWith("/maintenance"),
    },
    {
      label: "Logistics",
      icon: Truck,
      href: "/logistics",
      active: pathname.startsWith("/logistics"),
    },
    {
      label: "Office Budget",
      icon: Building2,
      href: "/office-budget",
      active: pathname.startsWith("/office-budget"),
    },
    {
      label: "Stocks and Inventory",
      icon: Package,
      href: "/stocks-and-inventory",
      active: pathname.startsWith("/stocks-and-inventory"),
    },
    {
      label: "Notifications",
      icon: Bell,
      href: "/notifications",
      active: pathname.startsWith("/notifications"),
    },
    {
      label: "Profile",
      icon: User,
      href: "/profile",
      active: pathname.startsWith("/profile"),
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      href: "/settings",
      active: pathname.startsWith("/settings"),
    },
  ];

  const NavItems = () => (
    <>
      <div className="px-4 py-4 flex items-center justify-center">
        <div className="flex flex-col items-center">
        
          <div className="text-xs font-medium mt-2 text-center">
            <div>{user?.name}</div>
            <div>ERP System</div>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all hover:text-[#0089ff] hover:bg-[#e8f5ff]",
                route.active
                  ? "bg-[#e8f5ff] text-[#0089ff] font-medium"
                  : "text-muted-foreground"
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <route.icon
                className={cn("h-4 w-4", route.active ? "text-[#0089ff]" : "")}
              />
              {route.label}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80] bg-white border-r",
          className
        )}
      >
        <div className="flex flex-col flex-1 h-full">
          <NavItems />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div className="flex flex-col h-full">
              <div className="absolute right-4 top-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <NavItems />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
