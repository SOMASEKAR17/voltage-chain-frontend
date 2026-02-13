"use client";

import React from "react";
import {
  User,
  Battery,
  ArrowRightLeft,
  ShoppingCart,
  HelpCircle,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

interface DashboardSidebarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeNav,
  setActiveNav,
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "account", label: "Account Details", icon: User },
    { id: "list-battery", label: "List a Battery", icon: Battery },
    { id: "swap-order", label: "Swap/Order", icon: ArrowRightLeft },
    { id: "my-orders", label: "My Orders", icon: ShoppingCart },
    { id: "contact", label: "Contact Us", icon: HelpCircle },
  ];

  return (
    <div className="w-64 h-[70vh] fixed left-0 top-[50%] -translate-y-[50%] rounded-3xl bg-black/60 backdrop-blur-md border-r border-cyan-400/20 ml-2 flex flex-col shadow">
      <div className="flex-1 px-4 py-8">
        <h2 className="font-avant  text-2xl italic font-semibold mb-8">
          DASHBOARD
        </h2>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-green-400/20 text-green-400 border border-green-400/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-avant">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-4 pb-8 border-t border-cyan-400/20 pt-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-all">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-avant">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
