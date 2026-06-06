import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import VendorManagement from "./pages/VendorManagement";
import RFQManagement from "./pages/RFQManagement";
import VendorPortal from "./pages/VendorPortal";
import QuotationComparison from "./pages/QuotationComparison";
import ApprovalWorkflow from "./pages/ApprovalWorkflow";
import PurchaseOrders from "./pages/PurchaseOrders";
import Invoices from "./pages/Invoices";
import ActivityLogs from "./pages/ActivityLogs";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendors" element={<VendorManagement />} />
          <Route path="/rfq" element={<RFQManagement />} />
          <Route path="/vendor-portal" element={<VendorPortal />} />
          <Route path="/quotations" element={<QuotationComparison />} />
          <Route path="/approvals" element={<ApprovalWorkflow />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/activity-logs" element={<ActivityLogs />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
