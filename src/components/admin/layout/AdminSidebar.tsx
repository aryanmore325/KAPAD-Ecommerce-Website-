import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Box,
  BarChart,
  Settings,
  FolderTree,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Products",
    icon: Package,
    href: "/admin/products",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    href: "/admin/orders",
  },
  {
    title: "Customers",
    icon: Users,
    href: "/admin/customers",
  },
  {
    title: "Categories",
    icon: FolderTree,
    href: "/admin/categories",
  },
  {
    title: "Inventory",
    icon: Box,
    href: "/admin/inventory",
  },
  {
    title: "Analytics",
    icon: BarChart,
    href: "/admin/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-sidebar-background border-r border-border">
      <div className="p-6">
        <h2 className="text-xl font-bold text-sidebar-foreground mb-6">
          Admin Panel
        </h2>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}