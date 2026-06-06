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
import { Plus, Search, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface RFQ {
  id: string;
  title: string;
  description: string;
  status: "draft" | "sent" | "closed" | "cancelled";
  createdDate: string;
  deadline: string;
  vendorsCount: number;
  quotationsReceived: number;
  budget: string;
}

export default function RFQManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const rfqs: RFQ[] = [
    {
      id: "RFQ-2024-001",
      title: "Office Supplies Q4 2024",
      description: "Annual office supplies procurement",
      status: "sent",
      createdDate: "2024-06-01",
      deadline: "2024-06-20",
      vendorsCount: 5,
      quotationsReceived: 3,
      budget: "$50,000",
    },
    {
      id: "RFQ-2024-002",
      title: "IT Equipment Bundle",
      description: "Laptops and desktop computers",
      status: "sent",
      createdDate: "2024-05-28",
      deadline: "2024-06-15",
      vendorsCount: 8,
      quotationsReceived: 6,
      budget: "$150,000",
    },
    {
      id: "RFQ-2024-003",
      title: "Facility Maintenance Services",
      description: "Quarterly maintenance contract",
      status: "closed",
      createdDate: "2024-05-15",
      deadline: "2024-05-30",
      vendorsCount: 4,
      quotationsReceived: 4,
      budget: "$25,000",
    },
    {
      id: "RFQ-2024-004",
      title: "Raw Materials - Steel",
      description: "Industrial grade steel procurement",
      status: "draft",
      createdDate: "2024-06-03",
      deadline: "2024-06-25",
      vendorsCount: 0,
      quotationsReceived: 0,
      budget: "$200,000",
    },
    {
      id: "RFQ-2024-005",
      title: "Packaging Materials",
      description: "Cardboard boxes and packing materials",
      status: "sent",
      createdDate: "2024-05-20",
      deadline: "2024-06-10",
      vendorsCount: 6,
      quotationsReceived: 4,
      budget: "$35,000",
    },
    {
      id: "RFQ-2024-006",
      title: "Software Licenses",
      description: "Annual software subscription renewal",
      status: "cancelled",
      createdDate: "2024-05-01",
      deadline: "2024-05-15",
      vendorsCount: 3,
      quotationsReceived: 2,
      budget: "$75,000",
    },
  ];

  const filteredRFQs = rfqs.filter((rfq) => {
    const matchesSearch =
      rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rfq.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || rfq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (
    status: "draft" | "sent" | "closed" | "cancelled"
  ) => {
    switch (status) {
      case "draft":
        return <AlertCircle className="w-4 h-4" />;
      case "sent":
        return <Clock className="w-4 h-4" />;
      case "closed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (
    status: "draft" | "sent" | "closed" | "cancelled"
  ) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 dark:bg-gray-900/30 text-muted-foreground border-gray-300 dark:border-gray-800";
      case "sent":
        return "bg-blue-100 dark:bg-blue-900/30 text-primary border-blue-300 dark:border-blue-800";
      case "closed":
        return "bg-green-100 dark:bg-green-900/30 text-success border-green-300 dark:border-green-800";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/30 text-destructive border-red-300 dark:border-red-800";
      default:
        return "";
    }
  };

  const isDeadlineSoon = (deadline: string) => {
    const days = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return days <= 3 && days > 0;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              RFQ Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Create and manage Request for Quotations
            </p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Create RFQ
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search RFQs by title or ID..."
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
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* RFQ List */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-foreground">RFQ ID</TableHead>
                  <TableHead className="text-foreground">Title</TableHead>
                  <TableHead className="text-foreground">Created</TableHead>
                  <TableHead className="text-foreground">Deadline</TableHead>
                  <TableHead className="text-foreground">Budget</TableHead>
                  <TableHead className="text-foreground">Vendors</TableHead>
                  <TableHead className="text-foreground">Quotations</TableHead>
                  <TableHead className="text-foreground">Status</TableHead>
                  <TableHead className="text-right text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRFQs.map((rfq) => (
                  <TableRow
                    key={rfq.id}
                    className="border-border hover:bg-secondary/50 transition-colors"
                  >
                    <TableCell className="font-medium text-primary">
                      {rfq.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{rfq.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {rfq.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {rfq.createdDate}
                    </TableCell>
                    <TableCell className="text-sm">
                      <div
                        className={
                          isDeadlineSoon(rfq.deadline)
                            ? "text-warning font-medium"
                            : "text-muted-foreground"
                        }
                      >
                        {rfq.deadline}
                        {isDeadlineSoon(rfq.deadline) && (
                          <AlertCircle className="w-4 h-4 inline ml-1" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {rfq.budget}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {rfq.vendorsCount}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium text-foreground">
                          {rfq.quotationsReceived}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          of {rfq.vendorsCount}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(rfq.status)} border gap-1 capitalize`}
                      >
                        {getStatusIcon(rfq.status)}
                        {rfq.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-secondary"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="px-6 py-4 border-t border-border text-sm text-muted-foreground">
            Showing {filteredRFQs.length} of {rfqs.length} RFQs
          </div>
        </Card>
      </div>
    </Layout>
  );
}
