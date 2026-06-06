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
import { Plus, Search, Download, Mail, Printer, Eye } from "lucide-react";

interface Invoice {
  id: string;
  vendorName: string;
  invoiceDate: string;
  dueDate: string;
  amount: string;
  status: "draft" | "sent" | "paid" | "overdue" | "disputed";
  poNumber: string;
  description: string;
}

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const invoices: Invoice[] = [
    {
      id: "INV-2024-001",
      vendorName: "TechCorp Supplies",
      invoiceDate: "2024-06-01",
      dueDate: "2024-07-01",
      amount: "$12,500",
      status: "paid",
      poNumber: "PO-2024-001",
      description: "IT Equipment and Accessories",
    },
    {
      id: "INV-2024-002",
      vendorName: "Global Trade Ltd",
      invoiceDate: "2024-06-02",
      dueDate: "2024-07-02",
      amount: "$8,750",
      status: "sent",
      poNumber: "PO-2024-002",
      description: "General Supplies",
    },
    {
      id: "INV-2024-003",
      vendorName: "ProSupply Solutions",
      invoiceDate: "2024-05-28",
      dueDate: "2024-06-28",
      amount: "$6,200",
      status: "paid",
      poNumber: "PO-2024-003",
      description: "Office Equipment",
    },
    {
      id: "INV-2024-004",
      vendorName: "FastLogistics Inc",
      invoiceDate: "2024-05-20",
      dueDate: "2024-06-20",
      amount: "$15,800",
      status: "overdue",
      poNumber: "PO-2024-004",
      description: "Logistics Services",
    },
    {
      id: "INV-2024-005",
      vendorName: "EcoGreen Packaging",
      invoiceDate: "2024-06-03",
      dueDate: "2024-07-03",
      amount: "$4,500",
      status: "paid",
      poNumber: "PO-2024-005",
      description: "Packaging Materials",
    },
    {
      id: "INV-2024-006",
      vendorName: "Quality First Materials",
      invoiceDate: "2024-06-04",
      dueDate: "2024-07-04",
      amount: "$22,300",
      status: "disputed",
      poNumber: "PO-2024-006",
      description: "Raw Materials",
    },
  ];

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.poNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (
    status: "draft" | "sent" | "paid" | "overdue" | "disputed"
  ) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 dark:bg-gray-900/30 text-muted-foreground border-gray-300 dark:border-gray-800";
      case "sent":
        return "bg-blue-100 dark:bg-blue-900/30 text-primary border-blue-300 dark:border-blue-800";
      case "paid":
        return "bg-green-100 dark:bg-green-900/30 text-success border-green-300 dark:border-green-800";
      case "overdue":
        return "bg-red-100 dark:bg-red-900/30 text-destructive border-red-300 dark:border-red-800";
      case "disputed":
        return "bg-orange-100 dark:bg-orange-900/30 text-warning border-orange-300 dark:border-orange-800";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
            <p className="text-muted-foreground mt-1">
              Manage vendor invoices and payments
            </p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            New Invoice
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-muted-foreground text-sm font-medium">Total Invoices</p>
            <p className="text-2xl font-bold text-foreground mt-2">
              ${invoices.reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[^0-9.]/g, "")), 0).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-muted-foreground text-sm font-medium">Paid</p>
            <p className="text-2xl font-bold text-success mt-2">
              ${invoices
                .filter((inv) => inv.status === "paid")
                .reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[^0-9.]/g, "")), 0)
                .toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-muted-foreground text-sm font-medium">Pending</p>
            <p className="text-2xl font-bold text-primary mt-2">
              ${invoices
                .filter((inv) => inv.status === "sent")
                .reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[^0-9.]/g, "")), 0)
                .toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-muted-foreground text-sm font-medium">Overdue</p>
            <p className="text-2xl font-bold text-destructive mt-2">
              ${invoices
                .filter((inv) => inv.status === "overdue")
                .reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[^0-9.]/g, "")), 0)
                .toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by invoice number, vendor, or PO..."
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
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Invoices Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-foreground">Invoice</TableHead>
                  <TableHead className="text-foreground">Vendor</TableHead>
                  <TableHead className="text-foreground">PO Number</TableHead>
                  <TableHead className="text-foreground">Invoice Date</TableHead>
                  <TableHead className="text-foreground">Due Date</TableHead>
                  <TableHead className="text-foreground">Amount</TableHead>
                  <TableHead className="text-foreground">Status</TableHead>
                  <TableHead className="text-right text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    className="border-border hover:bg-secondary/50 transition-colors"
                  >
                    <TableCell className="font-medium text-primary">
                      {invoice.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{invoice.vendorName}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {invoice.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {invoice.poNumber}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {invoice.invoiceDate}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {invoice.dueDate}
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      {invoice.amount}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(invoice.status)} border capitalize`}
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-secondary"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
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
                          title="Print"
                        >
                          <Printer className="w-4 h-4" />
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
            Showing {filteredInvoices.length} of {invoices.length} invoices
          </div>
        </Card>
      </div>
    </Layout>
  );
}
