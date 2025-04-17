"use client"

import { useEffect } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, BarChart3, Package, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useInventoryStore } from "@/lib/store/useInventoryStore" // Adjust if needed

export default function InventoryPage() {
  const { items, fetchInventory, loading, error } = useInventoryStore()

  useEffect(() => {
    fetchInventory()
  }, [fetchInventory])

  console.log(items)

  const inventoryCategoryData = [
    { name: "Office Equipment", value: 35 },
    { name: "Electronics", value: 25 },
    { name: "Furniture", value: 20 },
    { name: "Automobiles", value: 15 },
    { name: "Others", value: 5 },
  ]

  const inventoryValueData = [
    { name: "Jan", value: 200000 },
    { name: "Feb", value: 220000 },
    { name: "Mar", value: 240000 },
    { name: "Apr", value: 260000 },
    { name: "May", value: 280000 },
    { name: "Jun", value: 300000 },
  ]

  const COLORS = ["#0089ff", "#00C49F", "#FFBB28", "#FF8042", "#a601ff"]

  return (
    <div>
      <PageHeader
        title="Inventory Management"
        subtitle="Track, manage, and optimize your inventory assets"
      />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-3xl font-bold">10</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="h-4 w-4 text-[#10a142] mr-1" />
                    <span className="text-xs text-[#10a142]">2 more than last year</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-[#e8f5ff]">
                  <BarChart3 className="h-6 w-6 text-[#0089ff]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-3xl font-bold">300</p>
                  <p className="text-sm text-muted-foreground">Total items</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="h-4 w-4 text-[#10a142] mr-1" />
                    <span className="text-xs text-[#10a142]">10 more than last year</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-[#fff8df]">
                  <Package className="h-6 w-6 text-[#fdcc1c]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-3xl font-bold">₹250M</p>
                  <p className="text-sm text-muted-foreground">Total item cost</p>
                  <div className="flex items-center mt-2">
                    <ArrowDown className="h-4 w-4 text-[#ed3237] mr-1" />
                    <span className="text-xs text-[#ed3237]">2.5% less than last year</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-[#f9efff]">
                  <DollarSign className="h-6 w-6 text-[#a601ff]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-3xl font-bold">20</p>
                  <p className="text-sm text-muted-foreground">Total suppliers</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="h-4 w-4 text-[#10a142] mr-1" />
                    <span className="text-xs text-[#10a142]">2 more than last year</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-[#fff8df]">
                  <Package className="h-6 w-6 text-[#fdcc1c]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Value Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={inventoryValueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Value"]} />
                    <Legend />
                    <Bar dataKey="value" name="Value (₹)" fill="#0089ff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={inventoryCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {inventoryCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} items`, "Quantity"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Inventory Table</h2>
          <Link href="/stocks-and-inventory/update-inventory">
            <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Add Inventory</Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading inventory...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : items.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No inventory items found.</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-xs font-medium text-muted-foreground border-b">
                  <th className="text-left py-3 px-4">S/N</th>
                  <th className="text-left py-3 px-4">Product Name</th>
                  <th className="text-left py-3 px-4">Product ID</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">QTY Purchased</th>
                  <th className="text-left py-3 px-4">Unit Price</th>
                  <th className="text-left py-3 px-4">Total Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">In Stock</th>
                  <th className="text-left py-3 px-4">Supplier</th>
                  <th className="text-left py-3 px-4">Location</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.productId || index} className="border-b">
                    <td className="py-4 px-4">{index + 1}</td>
                    <td className="py-4 px-4">{item.name}</td>
                    <td className="py-4 px-4">{item.productId}</td>
                    <td className="py-4 px-4">{item.category || "—"}</td>
                    <td className="py-4 px-4">{item.qtyPurchased || "—"}</td>
                    <td className="py-4 px-4">{item.unitPrice || "—"}</td>
                    <td className="py-4 px-4">{item.totalAmount || "—"}</td>
                    <td className="py-4 px-4">{item.status || "?"}</td>
                    <td className="py-4 px-4">{item.inStock ?? 0}</td>
                    <td className="py-4 px-4">{item.supplier || "—"}</td>
                    <td className="py-4 px-4">{item.location || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2022 Relia Energy. All Rights Reserved
        </div>
      </div>
    </div>
  )
}
