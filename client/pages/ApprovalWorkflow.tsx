import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, X, MessageCircle, User, Calendar } from "lucide-react";

interface ApprovalRequest {
  id: string;
  title: string;
  requestedBy: string;
  amount: string;
  status: "pending" | "approved" | "rejected";
  createdDate: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  approvalChain: ApprovalStep[];
}

interface ApprovalStep {
  name: string;
  role: string;
  status: "pending" | "approved" | "rejected";
  date?: string;
  comment?: string;
}

export default function ApprovalWorkflow() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(
    "APR-2024-001"
  );
  const [showCommentForm, setShowCommentForm] = useState(false);

  const approvalRequests: ApprovalRequest[] = [
    {
      id: "APR-2024-001",
      title: "Purchase Order PO-2024-004",
      requestedBy: "John Smith",
      amount: "$15,800",
      status: "pending",
      createdDate: "2024-06-03",
      dueDate: "2024-06-08",
      priority: "high",
      approvalChain: [
        { name: "Department Head", role: "Manager", status: "approved", date: "2024-06-03 10:30 AM", comment: "Approved as per budget allocation" },
        { name: "Finance Manager", role: "Finance", status: "approved", date: "2024-06-03 2:15 PM", comment: "Budget verified" },
        { name: "Director", role: "Executive", status: "pending", comment: "" },
      ],
    },
    {
      id: "APR-2024-002",
      title: "Invoice INV-2024-006",
      requestedBy: "Sarah Johnson",
      amount: "$22,300",
      status: "pending",
      createdDate: "2024-06-04",
      dueDate: "2024-06-09",
      priority: "medium",
      approvalChain: [
        { name: "Department Head", role: "Manager", status: "approved", date: "2024-06-04 11:00 AM" },
        { name: "Finance Manager", role: "Finance", status: "pending" },
        { name: "Director", role: "Executive", status: "pending" },
      ],
    },
    {
      id: "APR-2024-003",
      title: "Vendor Registration - TechVendor Inc",
      requestedBy: "Mike Brown",
      amount: "N/A",
      status: "approved",
      createdDate: "2024-06-01",
      dueDate: "2024-06-06",
      priority: "low",
      approvalChain: [
        { name: "Department Head", role: "Manager", status: "approved", date: "2024-06-01 9:30 AM" },
        { name: "Finance Manager", role: "Finance", status: "approved", date: "2024-06-02 3:00 PM" },
        { name: "Director", role: "Executive", status: "approved", date: "2024-06-02 4:45 PM", comment: "Good vendor profile" },
      ],
    },
  ];

  const currentRequest = approvalRequests.find((r) => r.id === selectedRequest);

  const getPriorityColor = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "low":
        return "bg-blue-100 dark:bg-blue-900/30 text-primary border-blue-300 dark:border-blue-800";
      case "medium":
        return "bg-orange-100 dark:bg-orange-900/30 text-warning border-orange-300 dark:border-orange-800";
      case "high":
        return "bg-red-100 dark:bg-red-900/30 text-destructive border-red-300 dark:border-red-800";
      default:
        return "";
    }
  };

  const getStatusColor = (status: "pending" | "approved" | "rejected") => {
    switch (status) {
      case "pending":
        return "bg-orange-100 dark:bg-orange-900/30 text-warning border-orange-300 dark:border-orange-800";
      case "approved":
        return "bg-green-100 dark:bg-green-900/30 text-success border-green-300 dark:border-green-800";
      case "rejected":
        return "bg-red-100 dark:bg-red-900/30 text-destructive border-red-300 dark:border-red-800";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Approval Workflow</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track approval requests
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Approval Queue */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="p-4 border-b border-border bg-secondary/50">
                <h2 className="font-semibold text-foreground">Approval Queue</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {approvalRequests.filter((r) => r.status === "pending").length} pending
                </p>
              </div>
              <div className="divide-y divide-border">
                {approvalRequests.map((request) => (
                  <button
                    key={request.id}
                    onClick={() => setSelectedRequest(request.id)}
                    className={`w-full p-4 text-left hover:bg-secondary/50 transition-colors ${
                      selectedRequest === request.id ? "bg-primary/10 border-l-2 border-primary" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-medium text-foreground text-sm truncate">
                        {request.id}
                      </p>
                      <Badge
                        className={`${getPriorityColor(
                          request.priority
                        )} border text-xs capitalize flex-shrink-0`}
                      >
                        {request.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {request.title}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">{request.amount}</p>
                      <Badge
                        className={`${getStatusColor(
                          request.status
                        )} border text-xs capitalize`}
                      >
                        {request.status}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Details & Approval Chain */}
          <div className="lg:col-span-2 space-y-4">
            {currentRequest ? (
              <>
                {/* Request Details */}
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {currentRequest.title}
                      </h2>
                      <p className="text-muted-foreground mt-1">{currentRequest.id}</p>
                    </div>
                    <Badge
                      className={`${getStatusColor(
                        currentRequest.status
                      )} border capitalize`}
                    >
                      {currentRequest.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Requested By</p>
                      <p className="font-semibold text-foreground mt-1">
                        {currentRequest.requestedBy}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-semibold text-foreground mt-1">
                        {currentRequest.amount}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-semibold text-foreground mt-1">
                        {currentRequest.createdDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-semibold text-foreground mt-1">
                        {currentRequest.dueDate}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Approval Chain */}
                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-6">
                    Approval Chain
                  </h3>

                  <div className="space-y-4">
                    {currentRequest.approvalChain.map((step, index) => (
                      <div key={index}>
                        <div className="flex items-start gap-4">
                          <div className="relative pt-1">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                step.status === "approved"
                                  ? "bg-success/20 text-success"
                                  : step.status === "rejected"
                                  ? "bg-destructive/20 text-destructive"
                                  : "bg-orange-100 dark:bg-orange-900/30 text-warning"
                              }`}
                            >
                              {step.status === "approved" ? (
                                <Check className="w-5 h-5" />
                              ) : step.status === "rejected" ? (
                                <X className="w-5 h-5" />
                              ) : (
                                <Clock className="w-5 h-5" />
                              )}
                            </div>
                            {index < currentRequest.approvalChain.length - 1 && (
                              <div className="absolute top-10 left-5 w-0.5 h-12 bg-border" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div>
                                <p className="font-semibold text-foreground">{step.name}</p>
                                <p className="text-sm text-muted-foreground">{step.role}</p>
                              </div>
                              {step.date && (
                                <p className="text-xs text-muted-foreground flex-shrink-0">
                                  {step.date}
                                </p>
                              )}
                            </div>
                            {step.comment && (
                              <p className="text-sm text-muted-foreground bg-secondary/50 p-2 rounded mt-2 border border-border">
                                "{step.comment}"
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Action Buttons */}
                {currentRequest.status === "pending" && (
                  <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-muted-foreground mb-4">
                      Awaiting approval from Director
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <Button className="bg-success hover:bg-success/90 text-white gap-2">
                        <Check className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button variant="destructive" className="gap-2">
                        <X className="w-4 h-4" />
                        Reject
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => setShowCommentForm(!showCommentForm)}
                      >
                        <MessageCircle className="w-4 h-4" />
                        Add Comment
                      </Button>
                    </div>
                    {showCommentForm && (
                      <div className="mt-4 p-4 bg-background rounded-lg border border-border">
                        <textarea
                          className="w-full p-3 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Add your comment..."
                          rows={3}
                        />
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Post Comment
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowCommentForm(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                )}
              </>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">Select a request to view details</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
