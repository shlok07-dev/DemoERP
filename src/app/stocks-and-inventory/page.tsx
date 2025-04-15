"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, BarChart3, Package, DollarSign, AlertTriangle } from "lucide-react"
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

export default function StocksAndInventoryPage() {
  const [activeTab, setActiveTab] = useState("stocks")

  // Stock category data for pie chart
  const stockCategoryData = [
    { name: "Stationaries", value: 45 },
    { name: "Detergents", value: 20 },
    { name: "Electronics", value: 15 },
    { name: "Furniture", value: 10 },
    { name: "Others", value: 10 },
  ]

  // Stock status data for bar chart
  const stockStatusData = [
    { name: "In Stock", value: 350, fill: "#10a142" },
    { name: "Low Stock", value: 200, fill: "#fdcc1c" },
    { name: "Out of Stock", value: 50, fill: "#ed3237" },
  ]

  // Inventory category data for pie chart
  const inventoryCategoryData = [
    { name: "Office Equipment", value: 35 },
    { name: "Electronics", value: 25 },
    { name: "Furniture", value: 20 },
    { name: "Automobiles", value: 15 },
    { name: "Others", value: 5 },
  ]

  // Monthly inventory value data
  const inventoryValueData = [
    { name: "Jan", value: 200000 },
    { name: "Feb", value: 220000 },
    { name: "Mar", value: 240000 },
    { name: "Apr", value: 260000 },
    { name: "May", value: 280000 },
    { name: "Jun", value: 300000 },
  ]

  // Colors for pie charts
  const COLORS = ["#0089ff", "#00C49F", "#FFBB28", "#FF8042", "#a601ff"]

  const stockItems = [
    {
      id: "01",
      image: "/placeholder.svg?height=40&width=40",
      name: "Pen",
      productId: "45656787",
      category: "Stationaries",
      qtyPurchased: "50pcs",
      unitPrice: "₦100.00",
      totalAmount: "₦5,000.00",
      inStock: "40pcs",
      supplier: "Big Ben's Store",
      status: "In stock",
    },
    {
      id: "02",
      image: "/placeholder.svg?height=40&width=40",
      name: "A4 Paper",
      productId: "69956787",
      category: "Stationaries",
      qtyPurchased: "20pcs",
      unitPrice: "₦3,000.00",
      totalAmount: "₦60,000.00",
      inStock: "0pcs",
      supplier: "Big Ben's Store",
      status: "Out of Stock",
    },
    {
      id: "03",
      image: "/placeholder.svg?height=40&width=40",
      name: "Liquid wash",
      productId: "36426787",
      category: "Detergent",
      qtyPurchased: "35pcs",
      unitPrice: "₦5000.00",
      totalAmount: "₦175,000.00",
      inStock: "10pcs",
      supplier: "Quality wash",
      status: "Low in stock",
    },
    {
      id: "04",
      image: "/placeholder.svg?height=40&width=40",
      name: "Paper clips",
      productId: "45656787",
      category: "Stationaries",
      qtyPurchased: "45pcs",
      unitPrice: "₦200.00",
      totalAmount: "₦9,000.00",
      inStock: "10pcs",
      supplier: "Big Ben's Store",
      status: "Low in Stock",
    },
    {
      id: "05",
      image: "/placeholder.svg?height=40&width=40",
      name: "Notepads",
      productId: "36426787",
      category: "Stationaries",
      qtyPurchased: "100pcs",
      unitPrice: "₦2,000.00",
      totalAmount: "₦200,000.00",
      inStock: "45pcs",
      supplier: "Big Ben's Store",
      status: "In Stock",
    },
    {
      id: "06",
      image: "/placeholder.svg?height=40&width=40",
      name: "Air freshner",
      productId: "36420021",
      category: "Detergent",
      qtyPurchased: "10pcs",
      unitPrice: "₦1,000.00",
      totalAmount: "₦10,000.00",
      inStock: "0pcs",
      supplier: "Quality wash",
      status: "Out of Stock",
    },
  ]

  const inventoryItems = [
    {
      id: "01",
      image: "/placeholder.svg?height=40&width=40",
      name: "1.5 Air conditioner",
      productId: "45656787",
      category: "Office equipments",
      qtyPurchased: "5pcs",
      unitPrice: "₦90,000.00",
      totalAmount: "₦450,000.00",
      inStock: "All functioning",
      supplier: "Big Ben's Store",
    },
    {
      id: "02",
      image: "/placeholder.svg?height=40&width=40",
      name: "Toyota Sienta Bus",
      productId: "67136787",
      category: "Automobile",
      qtyPurchased: "2pcs",
      unitPrice: "₦1,500,000.00",
      totalAmount: "₦3,000,000.00",
      inStock: "All functioning",
      supplier: "Innoson Vehicles",
    },
    {
      id: "03",
      image: "/placeholder.svg?height=40&width=40",
      name: "50inch Hisense TV",
      productId: "328422AA",
      category: "Electronics",
      qtyPurchased: "3pcs",
      unitPrice: "₦150,000.00",
      totalAmount: "₦450,000.00",
      inStock: "2 functioning",
      supplier: "Big Ben's Store",
    },
    {
      id: "04",
      image: "/placeholder.svg?height=40&width=40",
      name: "Office Chairs",
      productId: "45656787",
      category: "Furniture",
      qtyPurchased: "15pcs",
      unitPrice: "₦100,000.00",
      totalAmount: "₦1,500,000.00",
      inStock: "All functioning",
      supplier: "Goodwill NG",
    },
    {
      id: "05",
      image: "/placeholder.svg?height=40&width=40",
      name: "HP 15inch Desktops",
      productId: "00247791",
      category: "Electronics",
      qtyPurchased: "25pcs",
      unitPrice: "₦90,000.00",
      totalAmount: "₦1,250,000.00",
      inStock: "20 functioning",
      supplier: "HP Abuja Stores",
    },
    {
      id: "06",
      image: "/placeholder.svg?height=40&width=40",
      name: "Laser Jet Printers",
      productId: "45656787",
      category: "Office equipments",
      qtyPurchased: "5pcs",
      unitPrice: "₦90,000.00",
      totalAmount: "₦450,000.00",
      inStock: "All functioning",
      supplier: "Big Ben's Store",
    },
  ]

  return (
    <div>
      <PageHeader title="Inventory Management" subtitle="Track, manage, and optimize your stock and inventory assets" />

      <div className="p-6">
        <div className="border-b mb-6">
          <div className="flex">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "stocks" ? "text-[#0089ff] border-b-2 border-[#0089ff]" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("stocks")}
            >
              Stocks
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "inventory" ? "text-[#0089ff] border-b-2 border-[#0089ff]" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("inventory")}
            >
              Inventory
            </button>
          </div>
        </div>

        {activeTab === "stocks" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-3xl font-bold">15</p>
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
                      <p className="text-3xl font-bold">800</p>
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
                      <p className="text-3xl font-bold">₦5M</p>
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
                      <p className="text-3xl font-bold">200</p>
                      <p className="text-sm text-muted-foreground">Items low in stock</p>
                      <div className="flex items-center mt-2">
                        <ArrowUp className="h-4 w-4 text-[#10a142] mr-1" />
                        <span className="text-xs text-[#10a142]">20 more than last week</span>
                      </div>
                    </div>
                    <div className="p-2 rounded-full bg-[#fff8df]">
                      <AlertTriangle className="h-6 w-6 text-[#fdcc1c]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Stock Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={stockStatusData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Items" fill="#0089ff">
                          {stockStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Stock Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stockCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {stockCategoryData.map((entry, index) => (
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
              <h2 className="text-xl font-bold">Stock List</h2>
              <Link href="/stocks-and-inventory/update">
                <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Update Stock</Button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-medium text-muted-foreground border-b">
                    <th className="text-left py-3 px-4">S/N</th>
                    <th className="text-left py-3 px-4">Image</th>
                    <th className="text-left py-3 px-4">Product Name</th>
                    <th className="text-left py-3 px-4">Product ID</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">QTY Purchased</th>
                    <th className="text-left py-3 px-4">Unit Price</th>
                    <th className="text-left py-3 px-4">Total Amount</th>
                    <th className="text-left py-3 px-4">In-Stock</th>
                    <th className="text-left py-3 px-4">Supplier</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stockItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-4 px-4">{item.id}</td>
                      <td className="py-4 px-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </td>
                      <td className="py-4 px-4">{item.name}</td>
                      <td className="py-4 px-4">{item.productId}</td>
                      <td className="py-4 px-4">{item.category}</td>
                      <td className="py-4 px-4">{item.qtyPurchased}</td>
                      <td className="py-4 px-4">{item.unitPrice}</td>
                      <td className="py-4 px-4">{item.totalAmount}</td>
                      <td className="py-4 px-4">{item.inStock}</td>
                      <td className="py-4 px-4">{item.supplier}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.status === "In stock"
                              ? "bg-[#ecfff2] text-[#10a142]"
                              : item.status === "Low in stock"
                                ? "bg-[#fff8df] text-[#fdcc1c]"
                                : "bg-[#ffe4e4] text-[#ed3237]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
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
                      <p className="text-3xl font-bold">₦250M</p>
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
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, "Value"]} />
                        <Legend />
                        <Bar dataKey="value" name="Value (₦)" fill="#0089ff" />
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
                <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Update Inventory</Button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-medium text-muted-foreground border-b">
                    <th className="text-left py-3 px-4">S/N</th>
                    <th className="text-left py-3 px-4">Image</th>
                    <th className="text-left py-3 px-4">Product Name</th>
                    <th className="text-left py-3 px-4">Product ID</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">QTY Purchased</th>
                    <th className="text-left py-3 px-4">Unit Price</th>
                    <th className="text-left py-3 px-4">Total Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-4 px-4">{item.id}</td>
                      <td className="py-4 px-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </td>
                      <td className="py-4 px-4">{item.name}</td>
                      <td className="py-4 px-4">{item.productId}</td>
                      <td className="py-4 px-4">{item.category}</td>
                      <td className="py-4 px-4">{item.qtyPurchased}</td>
                      <td className="py-4 px-4">{item.unitPrice}</td>
                      <td className="py-4 px-4">{item.totalAmount}</td>
                      <td className="py-4 px-4">{item.inStock}</td>
                      <td className="py-4 px-4">{item.supplier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2022 Relia Energy. All Rights Reserved
        </div>
      </div>
    </div>
  )
}
