import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  FileText,
  ShoppingCart,
  CheckCircle,
  Package,
  FileCheck,
  Clock,
  BarChart3,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Vendors", href: "/vendors", icon: Users },
    {
      label: "Procurement",
      icon: FileText,
      children: [
        { label: "RFQ Management", href: "/rfq", icon: FileText },
        { label: "Quotations", href: "/quotations", icon: ShoppingCart },
        { label: "Purchase Orders", href: "/purchase-orders", icon: Package },
      ],
    },
    { label: "Approvals", href: "/approvals", icon: CheckCircle },
    { label: "Invoices", href: "/invoices", icon: FileCheck },
    { label: "Vendor Portal", href: "/vendor-portal", icon: Users },
    { label: "Activity Logs", href: "/activity-logs", icon: Clock },
    { label: "Reports", href: "/reports", icon: BarChart3 },
  ];

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-sidebar text-sidebar-foreground transition-all duration-300 overflow-hidden flex flex-col border-r border-sidebar-border`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-sidebar-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold truncate">VendorBridge</h1>
            <p className="text-xs text-sidebar-foreground/70">Procurement</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors text-sm font-medium group"
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedItems.includes(item.label) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedItems.includes(item.label) && (
                    <div className="ml-6 mt-1 space-y-1 border-l border-sidebar-border pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href!}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/80 transition-colors text-sm"
                        >
                          {child.icon && <child.icon className="w-4 h-4" />}
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href!}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors text-sm font-medium"
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground text-sm">
            <div className="w-8 h-8 rounded-full bg-sidebar-primary/50" />
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium truncate">Account</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">user@company.com</p>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-foreground"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <svg
                className="w-5 h-5 text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-primary/20 text-primary font-semibold flex items-center justify-center">
              JD
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
