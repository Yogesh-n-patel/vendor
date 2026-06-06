import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Check, TrendingUp, Zap, Star } from "lucide-react";

interface Quotation {
  vendorName: string;
  vendorRating: number;
  unitPrice: number;
  quantity: number;
  total: number;
  tax: number;
  finalPrice: number;
  deliveryDays: number;
  paymentTerms: string;
  warranty: string;
  onTimeDelivery: number;
}

export default function QuotationComparison() {
  const [selectedRFQ, setSelectedRFQ] = useState("RFQ-2024-001");

  const quotations: Quotation[] = [
    {
      vendorName: "TechCorp Supplies",
      vendorRating: 4.8,
      unitPrice: 125.5,
      quantity: 100,
      total: 12550,
      tax: 2264,
      finalPrice: 14814,
      deliveryDays: 5,
      paymentTerms: "Net 30",
      warranty: "12 months",
      onTimeDelivery: 98,
    },
    {
      vendorName: "Global Trade Ltd",
      vendorRating: 4.5,
      unitPrice: 118.75,
      quantity: 100,
      total: 11875,
      tax: 2138,
      finalPrice: 14013,
      deliveryDays: 7,
      paymentTerms: "Net 45",
      warranty: "6 months",
      onTimeDelivery: 92,
    },
    {
      vendorName: "ProSupply Solutions",
      vendorRating: 4.3,
      unitPrice: 122.0,
      quantity: 100,
      total: 12200,
      tax: 2196,
      finalPrice: 14396,
      deliveryDays: 10,
      paymentTerms: "Net 30",
      warranty: "12 months",
      onTimeDelivery: 85,
    },
    {
      vendorName: "FastLogistics Inc",
      vendorRating: 4.6,
      unitPrice: 115.25,
      quantity: 100,
      total: 11525,
      tax: 2074,
      finalPrice: 13599,
      deliveryDays: 3,
      paymentTerms: "Net 30",
      warranty: "12 months",
      onTimeDelivery: 96,
    },
  ];

  const sortedByPrice = [...quotations].sort((a, b) => a.finalPrice - b.finalPrice);
  const sortedByDelivery = [...quotations].sort((a, b) => a.deliveryDays - b.deliveryDays);
  const sortedByRating = [...quotations].sort((a, b) => b.vendorRating - a.vendorRating);

  const recommendedVendor = quotations.reduce((best, current) => {
    const bestScore = best.vendorRating * 0.4 + (1000 - best.deliveryDays) * 0.3 + best.onTimeDelivery * 0.3;
    const currentScore = current.vendorRating * 0.4 + (1000 - current.deliveryDays) * 0.3 + current.onTimeDelivery * 0.3;
    return currentScore > bestScore ? current : best;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quotation Comparison</h1>
          <p className="text-muted-foreground mt-1">
            Compare vendor quotations side-by-side
          </p>
        </div>

        {/* RFQ Selector */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <label className="font-medium text-foreground">Select RFQ:</label>
            <Select value={selectedRFQ} onValueChange={setSelectedRFQ}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RFQ-2024-001">RFQ-2024-001: Office Supplies Q4</SelectItem>
                <SelectItem value="RFQ-2024-002">RFQ-2024-002: IT Equipment Bundle</SelectItem>
                <SelectItem value="RFQ-2024-003">RFQ-2024-003: Facility Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* AI Recommendation Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border-primary/30 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">AI Recommended Vendor</h3>
              <div className="bg-white dark:bg-sidebar/50 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-bold text-foreground">{recommendedVendor.vendorName}</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-warning text-warning" />
                    <span className="font-semibold text-foreground">{recommendedVendor.vendorRating}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Final Price</p>
                    <p className="text-lg font-bold text-foreground">${recommendedVendor.finalPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Delivery</p>
                    <p className="text-lg font-bold text-foreground">{recommendedVendor.deliveryDays} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">On-time Rate</p>
                    <p className="text-lg font-bold text-success">{recommendedVendor.onTimeDelivery}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Comparison Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="p-4 text-left font-semibold text-foreground">Criteria</th>
                  {quotations.map((q) => (
                    <th
                      key={q.vendorName}
                      className={`p-4 text-left font-semibold text-foreground ${
                        q.vendorName === recommendedVendor.vendorName
                          ? "bg-primary/10 border-l border-r border-primary/30"
                          : ""
                      }`}
                    >
                      {q.vendorName}
                      {q.vendorName === recommendedVendor.vendorName && (
                        <Badge className="ml-2 bg-primary text-primary-foreground">
                          Recommended
                        </Badge>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Vendor Rating */}
                <tr className="border-b border-border hover:bg-secondary/30">
                  <td className="p-4 font-medium text-foreground">Vendor Rating</td>
                  {quotations.map((q) => (
                    <td
                      key={q.vendorName}
                      className={`p-4 text-foreground font-semibold ${
                        q.vendorName === recommendedVendor.vendorName ? "bg-primary/10" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        {q.vendorRating}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Unit Price */}
                <tr className="border-b border-border hover:bg-secondary/30">
                  <td className="p-4 font-medium text-foreground">Unit Price</td>
                  {sortedByPrice.map((q) => (
                    <td
                      key={q.vendorName}
                      className={`p-4 text-foreground font-semibold ${
                        q.unitPrice === Math.min(...quotations.map((x) => x.unitPrice))
                          ? "bg-success/20 text-success"
                          : ""
                      } ${q.vendorName === recommendedVendor.vendorName ? "bg-primary/10" : ""}`}
                    >
                      ${q.unitPrice.toFixed(2)}
                      {q.unitPrice === Math.min(...quotations.map((x) => x.unitPrice)) && (
                        <Check className="w-4 h-4 inline ml-2" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Total Price */}
                <tr className="border-b border-border hover:bg-secondary/30">
                  <td className="p-4 font-medium text-foreground">Total (excl. tax)</td>
                  {quotations.map((q) => (
                    <td
                      key={q.vendorName}
                      className={`p-4 text-foreground font-semibold ${
                        q.vendorName === recommendedVendor.vendorName ? "bg-primary/10" : ""
                      }`}
                    >
                      ${q.total.toLocaleString()}
                    </td>
                  ))}
                </tr>

                {/* Tax */}
                <tr className="border-b border-border hover:bg-secondary/30">
                  <td className="p-4 font-medium text-foreground">Tax</td>
                  {quotations.map((q) => (
                    <td
                      key={q.vendorName}
                      className={`p-4 text-foreground ${
                        q.vendorName === recommendedVendor.vendorName ? "bg-primary/10" : ""
                      }`}
                    >
                      ${q.tax.toLocaleString()}
                    </td>
                  ))}
                </tr>

                {/* Final Price */}
                <tr className="border-b border-border hover:bg-secondary/30 bg-secondary/30">
                  <td className="p-4 font-bold text-foreground">Final Price</td>
                  {sortedByPrice.map((q) => (
                    <td
                      key={q.vendorName}
                      className={`p-4 font-bold text-lg ${
                        q.finalPrice === Math.min(...quotations.map((x) => x.finalPrice))
                          ? "bg-success/30 text-success"
                          : "text-foreground"
                      } ${q.vendorName === recommendedVendor.vendorName ? "bg-primary/10" : ""}`}
                    >
                      ${q.finalPrice.toLocaleString()}
                      {q.finalPrice === Math.min(...quotations.map((x) => x.finalPrice)) && (
                        <Check className="w-5 h-5 inline ml-2" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Delivery Days */}
                <tr className="border-b border-border hover:bg-secondary/30">
                  <td className="p-4 font-medium text-foreground">Delivery Days</td>
                  {sortedByDelivery.map((q) => (
                    <td
                      key={q.vendorName}
                      className={`p-4 text-foreground font-semibold ${
                        q.deliveryDays === Math.min(...quotations.map((x) => x.deliveryDays))
                          ? "bg-success/20 text-success"
                          : ""
                      } ${q.vendorName === recommendedVendor.vendorName ? "bg-primary/10" : ""}`}
                    >
                      {q.deliveryDays} days
                      {q.deliveryDays === Math.min(...quotations.map((x) => x.deliveryDays)) && (
                        <Check className="w-4 h-4 inline ml-2" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Payment Terms */}
                <tr className="border-b border-border hover:bg-secondary/30">
                  <td className="p-4 font-medium text-foreground">Payment Terms</td>
                  {quotations.map((q) => (
                    <td
                      key={q.vendorName}
                      className={`p-4 text-foreground ${
                        q.vendorName === recommendedVendor.vendorName ? "bg-primary/10" : ""
                      }`}
                    >
                      {q.paymentTerms}
                    </td>
                  ))}
                </tr>

                {/* Warranty */}
                <tr className="border-b border-border hover:bg-secondary/30">
                  <td className="p-4 font-medium text-foreground">Warranty</td>
                  {quotations.map((q) => (
                    <td
                      key={q.vendorName}
                      className={`p-4 text-foreground ${
                        q.vendorName === recommendedVendor.vendorName ? "bg-primary/10" : ""
                      }`}
                    >
                      {q.warranty}
                    </td>
                  ))}
                </tr>

                {/* On-time Delivery */}
                <tr className="border-b border-border hover:bg-secondary/30">
                  <td className="p-4 font-medium text-foreground">On-time Delivery</td>
                  {sortedByRating.map((q) => (
                    <td
                      key={q.vendorName}
                      className={`p-4 text-foreground font-semibold ${
                        q.onTimeDelivery === Math.max(...quotations.map((x) => x.onTimeDelivery))
                          ? "bg-success/20 text-success"
                          : ""
                      } ${q.vendorName === recommendedVendor.vendorName ? "bg-primary/10" : ""}`}
                    >
                      {q.onTimeDelivery}%
                      {q.onTimeDelivery === Math.max(...quotations.map((x) => x.onTimeDelivery)) && (
                        <Check className="w-4 h-4 inline ml-2" />
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button className="bg-primary hover:bg-primary/90">
            Select Recommended Vendor
          </Button>
          <Button variant="outline">Compare with Previous RFQ</Button>
          <Button variant="outline">Export Comparison</Button>
        </div>
      </div>
    </Layout>
  );
}
