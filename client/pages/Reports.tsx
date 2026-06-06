import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
import { Download, FileText, Printer } from "lucide-react";

export default function Reports() {
  const vendorPerformanceData = [
    { name: "TechCorp", rating: 4.8, delivery: 98 },
    { name: "GlobalTrade", rating: 4.5, delivery: 92 },
    { name: "ProSupply", rating: 4.3, delivery: 85 },
    { name: "FastLogistics", rating: 4.6, delivery: 96 },
    { name: "EcoGreen", rating: 4.4, delivery: 88 },
  ];

  const spendingTrendsData = [
    { month: "Jan", spend: 95000, budget: 100000 },
    { month: "Feb", spend: 108000, budget: 100000 },
    { month: "Mar", spend: 87000, budget: 100000 },
    { month: "Apr", spend: 142000, budget: 100000 },
    { month: "May", spend: 124000, budget: 100000 },
    { month: "Jun", spend: 98000, budget: 100000 },
  ];

  const approvalEfficiencyData = [
    { week: "Week 1", approved: 12, rejected: 2, pending: 1 },
    { week: "Week 2", approved: 15, rejected: 1, pending: 2 },
    { week: "Week 3", approved: 18, rejected: 3, pending: 1 },
    { week: "Week 4", approved: 16, rejected: 1, pending: 3 },
  ];

  const procurementByCategory = [
    { name: "Technology", value: 45, color: "#3b82f6" },
    { name: "Supplies", value: 25, color: "#22c55e" },
    { name: "Services", value: 20, color: "#f59e0b" },
    { name: "Materials", value: 10, color: "#ef4444" },
  ];

  const stats = [
    { label: "Total Spend", value: "$654K", change: "+8.2%", color: "text-primary" },
    { label: "Vendors", value: "284", change: "+12%", color: "text-success" },
    { label: "Avg. Approval Time", value: "2.3 days", change: "-15%", color: "text-warning" },
    { label: "On-time Delivery", value: "92.4%", change: "+3.1%", color: "text-cyan-500" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">Advanced analytics and reporting dashboards</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              Print
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4">
              <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <span className="text-xs text-success font-semibold">{stat.change}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Detailed Reports */}
        <Tabs defaultValue="vendor" className="w-full">
          <TabsList className="w-full bg-secondary/50 border border-border rounded-lg p-1">
            <TabsTrigger value="vendor">Vendor Performance</TabsTrigger>
            <TabsTrigger value="spending">Spending Trends</TabsTrigger>
            <TabsTrigger value="approval">Approval Efficiency</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
          </TabsList>

          {/* Vendor Performance Tab */}
          <TabsContent value="vendor" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Vendor Performance Analysis</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={vendorPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="rating" fill="hsl(var(--primary))" name="Rating" />
                  <Bar dataKey="delivery" fill="hsl(var(--success))" name="On-time %" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-semibold text-foreground mb-3">Top Performers</h4>
                <div className="space-y-3">
                  {vendorPerformanceData
                    .sort((a, b) => b.rating - a.rating)
                    .map((vendor) => (
                      <div key={vendor.name} className="flex items-center justify-between pb-2 border-b border-border last:border-0">
                        <p className="text-sm font-medium text-foreground">{vendor.name}</p>
                        <span className="text-sm text-primary font-semibold">{vendor.rating} ★</span>
                      </div>
                    ))}
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-foreground mb-3">Delivery Performance</h4>
                <div className="space-y-3">
                  {vendorPerformanceData
                    .sort((a, b) => b.delivery - a.delivery)
                    .map((vendor) => (
                      <div key={vendor.name} className="flex items-center justify-between pb-2 border-b border-border last:border-0">
                        <p className="text-sm font-medium text-foreground">{vendor.name}</p>
                        <span className="text-sm text-success font-semibold">{vendor.delivery}%</span>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Spending Trends Tab */}
          <TabsContent value="spending" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Spending Trends</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={spendingTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="spend" stroke="hsl(var(--primary))" strokeWidth={2} name="Actual Spend" />
                  <Line type="monotone" dataKey="budget" stroke="hsl(var(--success))" strokeWidth={2} strokeDasharray="5 5" name="Budget" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-primary/10 dark:bg-primary/20 border-primary/30">
                <p className="text-sm text-muted-foreground font-medium">Total Spent</p>
                <p className="text-2xl font-bold text-primary mt-2">$654,000</p>
                <p className="text-xs text-muted-foreground mt-1">+8.2% vs last quarter</p>
              </Card>
              <Card className="p-4 bg-success/10 dark:bg-success/20 border-success/30">
                <p className="text-sm text-muted-foreground font-medium">Budget Remaining</p>
                <p className="text-2xl font-bold text-success mt-2">$346,000</p>
                <p className="text-xs text-muted-foreground mt-1">34.6% of annual budget</p>
              </Card>
              <Card className="p-4 bg-warning/10 dark:bg-warning/20 border-warning/30">
                <p className="text-sm text-muted-foreground font-medium">Avg. Monthly Spend</p>
                <p className="text-2xl font-bold text-warning mt-2">$109,000</p>
                <p className="text-xs text-muted-foreground mt-1">Within budget parameters</p>
              </Card>
            </div>
          </TabsContent>

          {/* Approval Efficiency Tab */}
          <TabsContent value="approval" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Approval Efficiency</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={approvalEfficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="approved" fill="hsl(var(--success))" name="Approved" />
                  <Bar dataKey="rejected" fill="hsl(var(--destructive))" name="Rejected" />
                  <Bar dataKey="pending" fill="hsl(var(--warning))" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground font-medium">Total Approvals</p>
                <p className="text-2xl font-bold text-success mt-2">61</p>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground font-medium">Approval Rate</p>
                <p className="text-2xl font-bold text-primary mt-2">94.2%</p>
                <p className="text-xs text-muted-foreground mt-1">High approval ratio</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground font-medium">Avg. Time</p>
                <p className="text-2xl font-bold text-warning mt-2">2.3 days</p>
                <p className="text-xs text-muted-foreground mt-1">-15% from last month</p>
              </Card>
            </div>
          </TabsContent>

          {/* By Category Tab */}
          <TabsContent value="category" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Procurement by Category</h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={procurementByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {procurementByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {procurementByCategory.map((cat) => (
                <Card key={cat.name} className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <p className="text-sm font-medium text-foreground">{cat.name}</p>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: cat.color }}>
                    {cat.value}%
                  </p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Export Section */}
        <Card className="p-6 bg-secondary/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Export Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="gap-2 justify-start h-auto py-3">
              <FileText className="w-4 h-4" />
              <div className="text-left">
                <p className="font-medium">Export as PDF</p>
                <p className="text-xs text-muted-foreground">High quality PDF format</p>
              </div>
            </Button>
            <Button variant="outline" className="gap-2 justify-start h-auto py-3">
              <FileText className="w-4 h-4" />
              <div className="text-left">
                <p className="font-medium">Export as Excel</p>
                <p className="text-xs text-muted-foreground">Editable spreadsheet</p>
              </div>
            </Button>
            <Button variant="outline" className="gap-2 justify-start h-auto py-3">
              <FileText className="w-4 h-4" />
              <div className="text-left">
                <p className="font-medium">Export as CSV</p>
                <p className="text-xs text-muted-foreground">Data import format</p>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
