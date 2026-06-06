import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface ActivityLog {
  id: number;
  timestamp: string;
  action: string;
  type: "create" | "update" | "approve" | "reject" | "delete" | "submit" | "deliver";
  user: string;
  entity: string;
  entityId: string;
  details: string;
}

export default function ActivityLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const activities: ActivityLog[] = [
    {
      id: 1,
      timestamp: "2024-06-06 10:30 AM",
      action: "Created",
      type: "create",
      user: "John Smith",
      entity: "Purchase Order",
      entityId: "PO-2024-007",
      details: "New purchase order created for office supplies",
    },
    {
      id: 2,
      timestamp: "2024-06-06 9:15 AM",
      action: "Approved",
      type: "approve",
      user: "Sarah Johnson",
      entity: "Invoice",
      entityId: "INV-2024-005",
      details: "Invoice approved for payment processing",
    },
    {
      id: 3,
      timestamp: "2024-06-05 3:45 PM",
      action: "Submitted",
      type: "submit",
      user: "Mike Brown",
      entity: "Quotation",
      entityId: "QT-2024-003",
      details: "Quotation submitted for RFQ-2024-001",
    },
    {
      id: 4,
      timestamp: "2024-06-05 2:20 PM",
      action: "Updated",
      type: "update",
      user: "Emily Davis",
      entity: "Vendor",
      entityId: "V001",
      details: "Vendor contact information updated",
    },
    {
      id: 5,
      timestamp: "2024-06-05 11:00 AM",
      action: "Delivered",
      type: "deliver",
      user: "System",
      entity: "Purchase Order",
      entityId: "PO-2024-005",
      details: "Goods marked as delivered",
    },
    {
      id: 6,
      timestamp: "2024-06-04 4:30 PM",
      action: "Rejected",
      type: "reject",
      user: "Robert Wilson",
      entity: "Invoice",
      entityId: "INV-2024-004",
      details: "Invoice rejected due to discrepancy in quantities",
    },
    {
      id: 7,
      timestamp: "2024-06-04 3:00 PM",
      action: "Created",
      type: "create",
      user: "John Smith",
      entity: "RFQ",
      entityId: "RFQ-2024-003",
      details: "New RFQ created for facility maintenance",
    },
    {
      id: 8,
      timestamp: "2024-06-03 1:45 PM",
      action: "Approved",
      type: "approve",
      user: "Lisa Anderson",
      entity: "Vendor Registration",
      entityId: "V006",
      details: "New vendor approved and activated",
    },
  ];

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "all" || activity.type === typeFilter;

    const matchesDate = (() => {
      if (dateFilter === "all") return true;
      const actDate = new Date(activity.timestamp);
      const today = new Date();
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      switch (dateFilter) {
        case "today":
          return actDate.toDateString() === today.toDateString();
        case "yesterday":
          return actDate.toDateString() === yesterday.toDateString();
        case "week":
          return actDate >= sevenDaysAgo;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesType && matchesDate;
  });

  const getTypeColor = (type: ActivityLog["type"]) => {
    switch (type) {
      case "create":
        return "bg-blue-100 dark:bg-blue-900/30 text-primary border-blue-300 dark:border-blue-800";
      case "update":
        return "bg-orange-100 dark:bg-orange-900/30 text-warning border-orange-300 dark:border-orange-800";
      case "approve":
        return "bg-green-100 dark:bg-green-900/30 text-success border-green-300 dark:border-green-800";
      case "reject":
        return "bg-red-100 dark:bg-red-900/30 text-destructive border-red-300 dark:border-red-800";
      case "delete":
        return "bg-red-100 dark:bg-red-900/30 text-destructive border-red-300 dark:border-red-800";
      case "submit":
        return "bg-purple-100 dark:bg-purple-900/30 text-primary border-purple-300 dark:border-purple-800";
      case "deliver":
        return "bg-cyan-100 dark:bg-cyan-900/30 text-primary border-cyan-300 dark:border-cyan-800";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activity Logs</h1>
          <p className="text-muted-foreground mt-1">
            Timeline of all system activities and procurement history
          </p>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by user, entity, or action..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">Created</SelectItem>
                <SelectItem value="update">Updated</SelectItem>
                <SelectItem value="approve">Approved</SelectItem>
                <SelectItem value="reject">Rejected</SelectItem>
                <SelectItem value="submit">Submitted</SelectItem>
                <SelectItem value="deliver">Delivered</SelectItem>
                <SelectItem value="delete">Deleted</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Activity Timeline */}
        <Card className="p-6">
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => (
              <div key={activity.id}>
                <div className="flex gap-4">
                  {/* Timeline marker */}
                  <div className="relative pt-1">
                    <div className="w-3 h-3 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {index < filteredActivities.length - 1 && (
                      <div className="absolute top-5 left-1.5 w-0.5 h-12 bg-border" />
                    )}
                  </div>

                  {/* Activity content */}
                  <div className="flex-1 min-w-0 pb-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <Badge
                            className={`${getTypeColor(activity.type)} border text-xs font-semibold capitalize flex-shrink-0`}
                          >
                            {activity.action}
                          </Badge>
                          <p className="text-sm font-semibold text-foreground">
                            {activity.entity} {activity.entityId}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {activity.details}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground flex-shrink-0 text-right whitespace-nowrap">
                        {activity.timestamp}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground pl-3">
                      by <span className="font-medium text-foreground">{activity.user}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {filteredActivities.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No activities found matching your filters</p>
          </Card>
        )}

        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredActivities.length} of {activities.length} activities
        </div>
      </div>
    </Layout>
  );
}
