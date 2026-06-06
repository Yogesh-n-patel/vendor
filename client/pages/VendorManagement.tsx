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
import { Plus, Search, MoreVertical, Eye, Edit, Pause, Trash2, Star } from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  category: string;
  status: "active" | "suspended" | "inactive";
  email: string;
  phone: string;
  gstNumber: string;
  rating: number;
  totalOrders: number;
}

export default function VendorManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const vendors: Vendor[] = [
    {
      id: "V001",
      name: "TechCorp Supplies",
      category: "Technology",
      status: "active",
      email: "contact@techcorp.com",
      phone: "+1-555-0101",
      gstNumber: "GST123456789",
      rating: 4.8,
      totalOrders: 45,
    },
    {
      id: "V002",
      name: "Global Trade Ltd",
      category: "General Supplies",
      status: "active",
      email: "hello@globaltrade.com",
      phone: "+1-555-0102",
      gstNumber: "GST234567890",
      rating: 4.5,
      totalOrders: 32,
    },
    {
      id: "V003",
      name: "ProSupply Solutions",
      category: "Office Equipment",
      status: "active",
      email: "info@prosupply.com",
      phone: "+1-555-0103",
      gstNumber: "GST345678901",
      rating: 4.3,
      totalOrders: 28,
    },
    {
      id: "V004",
      name: "FastLogistics Inc",
      category: "Logistics",
      status: "active",
      email: "logistics@fastlog.com",
      phone: "+1-555-0104",
      gstNumber: "GST456789012",
      rating: 4.6,
      totalOrders: 52,
    },
    {
      id: "V005",
      name: "Quality First Materials",
      category: "Raw Materials",
      status: "suspended",
      email: "sales@qualityfirst.com",
      phone: "+1-555-0105",
      gstNumber: "GST567890123",
      rating: 4.2,
      totalOrders: 19,
    },
    {
      id: "V006",
      name: "EcoGreen Packaging",
      category: "Packaging",
      status: "active",
      email: "contact@ecogreen.com",
      phone: "+1-555-0106",
      gstNumber: "GST678901234",
      rating: 4.4,
      totalOrders: 35,
    },
  ];

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || vendor.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || vendor.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (
    status: "active" | "suspended" | "inactive"
  ) => {
    switch (status) {
      case "active":
        return "bg-green-100 dark:bg-green-900/30 text-success border-green-300 dark:border-green-800";
      case "suspended":
        return "bg-orange-100 dark:bg-orange-900/30 text-warning border-orange-300 dark:border-orange-800";
      case "inactive":
        return "bg-gray-100 dark:bg-gray-900/30 text-muted-foreground border-gray-300 dark:border-gray-800";
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
            <h1 className="text-3xl font-bold text-foreground">
              Vendor Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor all vendors
            </p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Add Vendor
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="General Supplies">General Supplies</SelectItem>
                <SelectItem value="Office Equipment">Office Equipment</SelectItem>
                <SelectItem value="Logistics">Logistics</SelectItem>
                <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                <SelectItem value="Packaging">Packaging</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Vendor Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-foreground">Vendor Name</TableHead>
                  <TableHead className="text-foreground">Category</TableHead>
                  <TableHead className="text-foreground">Email</TableHead>
                  <TableHead className="text-foreground">Phone</TableHead>
                  <TableHead className="text-foreground">GST Number</TableHead>
                  <TableHead className="text-foreground">Rating</TableHead>
                  <TableHead className="text-foreground">Orders</TableHead>
                  <TableHead className="text-foreground">Status</TableHead>
                  <TableHead className="text-right text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow
                    key={vendor.id}
                    className="border-border hover:bg-secondary/50 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">
                      {vendor.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {vendor.category}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {vendor.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {vendor.phone}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {vendor.gstNumber}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span className="text-sm font-medium text-foreground">
                          {vendor.rating}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {vendor.totalOrders}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(
                          vendor.status
                        )} border capitalize`}
                      >
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-secondary"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-secondary"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-secondary"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="px-6 py-4 border-t border-border text-sm text-muted-foreground">
            Showing {filteredVendors.length} of {vendors.length} vendors
          </div>
        </Card>
      </div>
    </Layout>
  );
}
