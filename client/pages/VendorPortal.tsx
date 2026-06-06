import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ShoppingCart, Clock, CheckCircle, Plus } from "lucide-react";

export default function VendorPortal() {
  const vendorName = "TechCorp Supplies";
  const vendorInfo = {
    contactPerson: "James Williams",
    email: "james@techcorp.com",
    phone: "+1-555-0101",
    rating: 4.8,
  };

  const assignedRFQs = [
    {
      id: "RFQ-2024-001",
      title: "Office Supplies Q4 2024",
      status: "sent",
      deadline: "2024-06-20",
      description: "Annual office supplies procurement",
    },
    {
      id: "RFQ-2024-002",
      title: "IT Equipment Bundle",
      status: "sent",
      deadline: "2024-06-15",
      description: "Laptops and desktop computers",
    },
  ];

  const quotations = [
    {
      id: "QT-2024-001",
      rfqId: "RFQ-2024-001",
      amount: "$14,814",
      status: "submitted",
      submittedDate: "2024-06-05",
      deliveryDays: 5,
    },
    {
      id: "QT-2024-002",
      rfqId: "RFQ-2024-002",
      amount: "$48,500",
      status: "draft",
      submittedDate: "2024-06-04",
      deliveryDays: 7,
    },
  ];

  const purchaseOrders = [
    {
      id: "PO-2024-001",
      description: "Office Supplies",
      date: "2024-06-01",
      amount: "$12,500",
      status: "confirmed",
      dueDate: "2024-06-08",
    },
    {
      id: "PO-2024-002",
      description: "Additional Supplies",
      date: "2024-05-28",
      amount: "$8,750",
      status: "delivered",
      dueDate: "2024-06-05",
    },
  ];

  const notifications = [
    { id: 1, type: "RFQ", message: "New RFQ assigned: RFQ-2024-002", date: "2 hours ago" },
    { id: 2, type: "PO", message: "Purchase Order PO-2024-001 confirmed", date: "1 day ago" },
    { id: 3, type: "Invoice", message: "Invoice INV-2024-001 paid", date: "2 days ago" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vendor Portal</h1>
          <p className="text-muted-foreground mt-1">Manage your RFQs and quotations</p>
        </div>

        {/* Vendor Info Card */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border-primary/30">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{vendorName}</h2>
              <div className="mt-3 space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">{vendorInfo.contactPerson}</span> • {vendorInfo.email}
                </p>
                <p className="text-sm text-muted-foreground">{vendorInfo.phone}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{vendorInfo.rating}</div>
              <p className="text-sm text-muted-foreground">Vendor Rating</p>
            </div>
          </div>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-muted-foreground text-sm font-medium">Assigned RFQs</p>
            <p className="text-2xl font-bold text-foreground mt-2">{assignedRFQs.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-muted-foreground text-sm font-medium">Quotations</p>
            <p className="text-2xl font-bold text-foreground mt-2">{quotations.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-muted-foreground text-sm font-medium">Purchase Orders</p>
            <p className="text-2xl font-bold text-foreground mt-2">{purchaseOrders.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-muted-foreground text-sm font-medium">Total Value</p>
            <p className="text-2xl font-bold text-foreground mt-2">$44.75K</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="rfqs" className="w-full">
          <TabsList className="w-full bg-secondary/50 border border-border rounded-lg p-1">
            <TabsTrigger value="rfqs" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Assigned RFQs
            </TabsTrigger>
            <TabsTrigger value="quotations" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Quotations
            </TabsTrigger>
            <TabsTrigger value="pos" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Purchase Orders
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Assigned RFQs Tab */}
          <TabsContent value="rfqs" className="space-y-4">
            {assignedRFQs.map((rfq) => (
              <Card key={rfq.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground text-lg">{rfq.title}</h3>
                      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-primary border-blue-300 dark:border-blue-800 border">
                        {rfq.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{rfq.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <span className="text-muted-foreground">ID: {rfq.id}</span>
                      <span className="text-muted-foreground">Deadline: {rfq.deadline}</span>
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 gap-2 flex-shrink-0">
                    <Plus className="w-4 h-4" />
                    Submit Quote
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Quotations Tab */}
          <TabsContent value="quotations" className="space-y-4">
            {quotations.map((quote) => (
              <Card key={quote.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{quote.id}</h3>
                    <p className="text-muted-foreground text-sm mt-1">For {quote.rfqId}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="text-muted-foreground">
                        Amount: <span className="font-semibold text-foreground">{quote.amount}</span>
                      </span>
                      <span className="text-muted-foreground">
                        Delivery: <span className="font-semibold text-foreground">{quote.deliveryDays} days</span>
                      </span>
                      <span className="text-muted-foreground">
                        Submitted: {quote.submittedDate}
                      </span>
                    </div>
                  </div>
                  <Badge
                    className={`flex-shrink-0 border capitalize ${
                      quote.status === "submitted"
                        ? "bg-green-100 dark:bg-green-900/30 text-success border-green-300 dark:border-green-800"
                        : "bg-orange-100 dark:bg-orange-900/30 text-warning border-orange-300 dark:border-orange-800"
                    }`}
                  >
                    {quote.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Purchase Orders Tab */}
          <TabsContent value="pos" className="space-y-4">
            {purchaseOrders.map((po) => (
              <Card key={po.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{po.id}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{po.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="text-muted-foreground">
                        Date: {po.date}
                      </span>
                      <span className="text-muted-foreground">
                        Due: {po.dueDate}
                      </span>
                      <span className="font-semibold text-foreground">{po.amount}</span>
                    </div>
                  </div>
                  <Badge
                    className={`flex-shrink-0 border capitalize ${
                      po.status === "delivered"
                        ? "bg-green-100 dark:bg-green-900/30 text-success border-green-300 dark:border-green-800"
                        : "bg-blue-100 dark:bg-blue-900/30 text-primary border-blue-300 dark:border-blue-800"
                    }`}
                  >
                    {po.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            {notifications.map((notif) => (
              <Card key={notif.id} className="p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <Badge className="bg-blue-100 dark:bg-blue-900/30 text-primary border border-blue-300 dark:border-blue-800 mb-2 text-xs">
                      {notif.type}
                    </Badge>
                    <p className="text-foreground">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notif.date}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
