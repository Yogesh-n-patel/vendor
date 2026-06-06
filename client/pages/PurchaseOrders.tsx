import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Download, Mail, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface PO {
  id: string;
  vendorName: string;
  date: string;
  dueDate: string;
  amount: string;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  items: number;
  paymentStatus: "unpaid" | "partial" | "paid";
}

export default function PurchaseOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const pos: PO[] = [
    {
      id: "PO-2024-001",
      vendorName: "TechCorp Supplies",
      date: "2024-06-01",
      dueDate: "2024-06-08",
      amount: "$12,500",
      status: "confirmed",
      items: 24,
      paymentStatus: "paid",
    },
    {
      id: "PO-2024-002",
      vendorName: "Global Trade Ltd",
      date: "2024-06-02",
      dueDate: "2024-06-10",
      amount: "$8,750",
      status: "pending",
      items: 15,
      paymentStatus: "unpaid",
    },
    {
      id: "PO-2024-003",
      vendorName: "ProSupply Solutions",
      date: "2024-05-28",
      dueDate: "2024-06-05",
      amount: "$6,200",
      status: "delivered",
      items: 8,
      paymentStatus: "paid",
    },
    {
      id: "PO-2024-004",
      vendorName: "FastLogistics Inc",
      date: "2024-06-03",
      dueDate: "2024-06-12",
      amount: "$15,800",
      status: "confirmed",
      items: 32,
      paymentStatus: "partial",
    },
    {
      id: "PO-2024-005",
      vendorName: "EcoGreen Packaging",
      date: "2024-05-25",
      dueDate: "2024-06-01",
      amount: "$4,500",
      status: "delivered",
      items: 5,
      paymentStatus: "paid",
    },
    {
      id: "PO-2024-006",
      vendorName: "Quality First Materials",
      date: "2024-06-04",
      dueDate: "2024-06-15",
      amount: "$22,300",
      status: "pending",
      items: 18,
      paymentStatus: "unpaid",
    },
  ];

  const filteredPOs = pos.filter((po) => {
    const matchesSearch =
      po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || po.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: "pending" | "confirmed" | "delivered" | "cancelled") => {
    switch (status) {
      case "pending":
        return "bg-orange-100 dark:bg-orange-900/30 text-warning border-orange-300 dark:border-orange-800";
      case "confirmed":
        return "bg-blue-100 dark:bg-blue-900/30 text-primary border-blue-300 dark:border-blue-800";
      case "delivered":
        return "bg-green-100 dark:bg-green-900/30 text-success border-green-300 dark:border-green-800";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/30 text-destructive border-red-300 dark:border-red-800";
      default:
        return "";
    }
  };

  const getPaymentStatusColor = (status: "unpaid" | "partial" | "paid") => {
    switch (status) {
      case "unpaid":
        return "bg-red-100 dark:bg-red-900/30 text-destructive border-red-300 dark:border-red-800";
      case "partial":
        return "bg-orange-100 dark:bg-orange-900/30 text-warning border-orange-300 dark:border-orange-800";
      case "paid":
        return "bg-green-100 dark:bg-green-900/30 text-success border-green-300 dark:border-green-800";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: "pending" | "confirmed" | "delivered" | "cancelled") => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Purchase Orders
            </h1>
            <p className="text-muted-foreground mt-1">
              Create and manage purchase orders
            </p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            New PO
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by PO number or vendor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* PO Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-foreground">PO Number</TableHead>
                  <TableHead className="text-foreground">Vendor</TableHead>
                  <TableHead className="text-foreground">Date</TableHead>
                  <TableHead className="text-foreground">Due Date</TableHead>
                  <TableHead className="text-foreground">Items</TableHead>
                  <TableHead className="text-foreground">Amount</TableHead>
                  <TableHead className="text-foreground">Status</TableHead>
                  <TableHead className="text-foreground">Payment</TableHead>
                  <TableHead className="text-right text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPOs.map((po) => (
                  <TableRow
                    key={po.id}
                    className="border-border hover:bg-secondary/50 transition-colors"
                  >
                    <TableCell className="font-medium text-primary">
                      {po.id}
                    </TableCell>
                    <TableCell className="text-foreground">{po.vendorName}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {po.date}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {po.dueDate}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {po.items} items
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      {po.amount}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(po.status)} border gap-1 capitalize`}
                      >
                        {getStatusIcon(po.status)}
                        {po.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getPaymentStatusColor(po.paymentStatus)} border capitalize`}
                      >
                        {po.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-secondary"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-secondary"
                          title="Send Email"
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="px-6 py-4 border-t border-border text-sm text-muted-foreground">
            Showing {filteredPOs.length} of {pos.length} purchase orders
          </div>
        </Card>
      </div>
    </Layout>
  );
}
