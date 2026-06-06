import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  FileText,
  Clock,
  DollarSign,
  ShoppingCart,
  FileCheck,
  Plus,
  TrendingUp,
  LogOut,
} from "lucide-react";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    navigate("/login");
  };

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  // Sample data
  const kpiData = [
    { icon: Users, label: "Total Vendors", value: "284", change: "+12%", color: "bg-blue-100 dark:bg-blue-900" },
    { icon: FileText, label: "Active RFQs", value: "47", change: "+8%", color: "bg-purple-100 dark:bg-purple-900" },
    { icon: Clock, label: "Pending Approvals", value: "23", change: "+5%", color: "bg-orange-100 dark:bg-orange-900" },
    { icon: DollarSign, label: "Monthly Spend", value: "$2.4M", change: "-3%", color: "bg-green-100 dark:bg-green-900" },
    { icon: ShoppingCart, label: "Purchase Orders", value: "156", change: "+15%", color: "bg-indigo-100 dark:bg-indigo-900" },
    { icon: FileCheck, label: "Invoices Generated", value: "89", change: "+7%", color: "bg-cyan-100 dark:bg-cyan-900" },
  ];

  const monthlySpendData = [
    { month: "Jan", spend: 1800, budget: 2400 },
    { month: "Feb", spend: 2100, budget: 2400 },
    { month: "Mar", spend: 2200, budget: 2400 },
    { month: "Apr", spend: 2400, budget: 2400 },
    { month: "May", spend: 2600, budget: 2500 },
    { month: "Jun", spend: 2400, budget: 2500 },
  ];

  const vendorPerformanceData = [
    { name: "TechCorp", rating: 4.8, orders: 45 },
    { name: "GlobalTrade", rating: 4.5, orders: 32 },
    { name: "ProSupply", rating: 4.3, orders: 28 },
    { name: "FastLogistics", rating: 4.6, orders: 52 },
    { name: "QualityFirst", rating: 4.2, orders: 19 },
  ];

  const rfqStatusData = [
    { name: "Draft", value: 12, color: "#94a3b8" },
    { name: "Sent", value: 18, color: "#3b82f6" },
    { name: "Closed", value: 12, color: "#22c55e" },
    { name: "Cancelled", value: 5, color: "#ef4444" },
  ];

  const poTrendsData = [
    { week: "W1", orders: 8, amount: 45000 },
    { week: "W2", orders: 12, amount: 68000 },
    { week: "W3", orders: 10, amount: 55000 },
    { week: "W4", orders: 15, amount: 82000 },
  ];

  const recentActivity = [
    { id: 1, type: "RFQ", description: "New RFQ created: Office Supplies Q4", time: "2 hours ago" },
    { id: 2, type: "PO", description: "PO approved: Tech Equipment #2024-456", time: "4 hours ago" },
    { id: 3, type: "Invoice", description: "Invoice received from TechCorp", time: "1 day ago" },
    { id: 4, type: "Vendor", description: "New vendor added: QuickShip Inc.", time: "2 days ago" },
    { id: 5, type: "Approval", description: "Approval pending: Invoice #INV-2024-789", time: "2 days ago" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's your procurement overview</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpiData.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.label} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-muted-foreground text-sm font-medium">{kpi.label}</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                      <span className={`text-xs font-semibold ${kpi.change.startsWith("+") ? "text-success" : "text-destructive"}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${kpi.color}`}>
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Button className="gap-2 bg-primary hover:bg-primary/90 h-10">
            <Plus className="w-4 h-4" />
            Create RFQ
          </Button>
          <Button variant="outline" className="gap-2 h-10">
            <Plus className="w-4 h-4" />
            Add Vendor
          </Button>
          <Button variant="outline" className="gap-2 h-10">
            <FileCheck className="w-4 h-4" />
            Generate Invoice
          </Button>
          <Button variant="outline" className="gap-2 h-10">
            <TrendingUp className="w-4 h-4" />
            View Reports
          </Button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Spend Chart */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Monthly Procurement Spend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySpendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))"
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="spend" stroke="hsl(var(--primary))" strokeWidth={2} name="Actual Spend" />
                <Line type="monotone" dataKey="budget" stroke="hsl(var(--muted))" strokeWidth={2} strokeDasharray="5 5" name="Budget" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* RFQ Status Distribution */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4">RFQ Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={rfqStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {rfqStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Vendor Performance */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Vendor Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendorPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))"
                  }}
                />
                <Legend />
                <Bar dataKey="rating" fill="hsl(var(--primary))" name="Rating" />
                <Bar dataKey="orders" fill="hsl(var(--accent))" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Purchase Order Trends */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Purchase Order Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={poTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))"
                  }}
                />
                <Legend />
                <Bar dataKey="orders" fill="hsl(var(--primary))" name="Orders" />
                <Bar dataKey="amount" fill="hsl(var(--success))" name="Amount" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-3 border-b border-border last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-primary bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                      {activity.type}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
