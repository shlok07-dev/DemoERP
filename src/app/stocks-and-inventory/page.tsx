"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, BarChart3, Package, DollarSign, Trash, Edit, Search, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { useInventoryStore } from "@/lib/store/useInventoryStore"

// Define the type for inventory items
interface InventoryItem {
  id?: number
  name?: string
  productId?: string | number
  category?: string
  qtyPurchased?: number | string
  unitPrice?: number | string
  totalAmount?: number | string
  status?: string
  inStock?: number
  supplier?: string
  location?: string
}

export default function InventoryPage() {
  const { items, fetchInventory, loading, error, deleteInventoryItem } = useInventoryStore()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([])
  const { toast } = useToast()

  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof InventoryItem
    direction: "ascending" | "descending"
  } | null>(null)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  // Function to handle sorting
  const requestSort = (key: keyof InventoryItem) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })
  }

  // Function to get sorted items
  const getSortedItems = (items: InventoryItem[]) => {
    if (!sortConfig) return items

    return [...items].sort((a, b) => {
      if (a[sortConfig.key] === undefined || b[sortConfig.key] === undefined) return 0

      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (typeof aValue === "string" && typeof bValue === "string") {
        if (sortConfig.direction === "ascending") {
          return aValue.localeCompare(bValue)
        } else {
          return bValue.localeCompare(aValue)
        }
      } else {
        const numA = Number(aValue) || 0
        const numB = Number(bValue) || 0

        if (sortConfig.direction === "ascending") {
          return numA - numB
        } else {
          return numB - numA
        }
      }
    })
  }

  // Function to toggle item selection
  const toggleItemSelection = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  // Function to select all items
  const selectAllItems = () => {
    if (filteredItems.length === selectedItems.length) {
      setSelectedItems([])
    } else {
      const validIds = filteredItems.filter((item) => item.id !== undefined).map((item) => item.id as number)
      setSelectedItems(validIds)
    }
  }

  // Function to bulk delete selected items
  const bulkDeleteItems = async () => {
    if (selectedItems.length === 0) return

    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedItems.length} items?`)
    if (!confirmDelete) return

    // Animate before deletion
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)

      // Delete all selected items
      Promise.all(selectedItems.map((id) => deleteInventoryItem(id)))
        .then(() => {
          toast({
            title: "Bulk Delete Successful",
            description: `${selectedItems.length} items have been deleted`,
            variant: "default",
          })
          setSelectedItems([])
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: "Failed to delete some items",
            variant: "destructive",
          })
        })
    }, 800)
  }

  // Function to generate a random color based on category
  const getCategoryColor = () => {
    return "#0089ff" // Use a consistent blue color
  }

  useEffect(() => {
    fetchInventory()
  }, [fetchInventory])

  useEffect(() => {
    // Filter items based on search term
    if (items && items.length > 0) {
      const filtered = items.filter((item: InventoryItem) => {
        const searchTermLower = searchTerm.toLowerCase()
        return (
          (item.name && item.name.toLowerCase().includes(searchTermLower)) ||
          (item.productId && item.productId.toString().toLowerCase().includes(searchTermLower)) ||
          (item.category && item.category.toLowerCase().includes(searchTermLower)) ||
          (item.supplier && item.supplier.toLowerCase().includes(searchTermLower)) ||
          (item.location && item.location.toLowerCase().includes(searchTermLower))
        )
      })
      setFilteredItems(filtered)
    } else {
      setFilteredItems([])
    }
  }, [searchTerm, items])

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?")
    if (confirmDelete) {
      try {
        // Add animation before deletion
        setSelectedItems([id])
        setIsAnimating(true)

        setTimeout(async () => {
          try {
            await deleteInventoryItem(id)
            toast({
              title: "Success!",
              description: "Inventory item is successfully deleted.",
              variant: "destructive",
            })
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to delete the item",
              variant: "destructive",
            })
          } finally {
            setIsAnimating(false)
            setSelectedItems([])
          }
        }, 800)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete the item",
          variant: "destructive",
        })
      }
    }
  }

  // Function to export inventory data as CSV
  const exportToCSV = () => {
    // Define the headers for the CSV file
    const headers = [
      "S/N",
      "Product Name",
      "Product ID",
      "Category",
      "QTY",
      "Unit Price",
      "Total",
      "Status",
      "In Stock",
      "Supplier",
      "Location",
    ]

    // Create CSV content
    let csvContent = headers.join(",") + "\n"

    // Add data rows
    filteredItems.forEach((item, index) => {
      const row = [
        index + 1,
        item.name || "",
        item.productId || "",
        item.category || "",
        item.qtyPurchased || "",
        item.unitPrice || "",
        item.totalAmount || "",
        item.status || "",
        item.inStock ?? 0,
        item.supplier || "",
        item.location || "",
      ]

      // Escape commas in fields by wrapping in quotes
      const escapedRow = row.map((field) => {
        const stringField = String(field)
        return stringField.includes(",") ? `"${stringField}"` : stringField
      })

      csvContent += escapedRow.join(",") + "\n"
    })

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `inventory_export_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export Successful",
      description: "Inventory data has been exported to CSV",
      variant: "default",
    })
  }

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
      <PageHeader title="Inventory Management" subtitle="Track, manage, and optimize your inventory assets" />

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
                  <BarChart data={inventoryValueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold">Inventory Table</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* View toggle buttons */}
            <div className="flex rounded-md overflow-hidden border">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("table")}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Table
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("grid")}
              >
                <Package className="h-4 w-4 mr-2" />
                Grid
              </Button>
            </div>

            {/* Search input with button */}
            <div className="relative flex w-full md:w-80">
              <Input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={() => {}}>
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Export button */}
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center gap-2"
              onClick={exportToCSV}
              disabled={filteredItems.length === 0}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>

            {/* Bulk delete button - only show when items are selected */}
            {selectedItems.length > 0 && (
              <Button
                variant="destructive"
                className="w-full sm:w-auto flex items-center gap-2"
                onClick={bulkDeleteItems}
              >
                <Trash className="h-4 w-4" />
                Delete ({selectedItems.length})
              </Button>
            )}

            <Link href="/stocks-and-inventory/update-inventory">
              <Button className="bg-[#0089ff] hover:bg-[#248cd8] w-full sm:w-auto">Add Inventory</Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading inventory...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            {items && items.length === 0 ? "No inventory items found." : "No items match your search."}
          </div>
        ) : viewMode === "table" ? (
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 z-10">
                    <tr className="text-xs font-medium text-muted-foreground border-b bg-gray-50">
                      <th className="text-left py-3 px-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={
                            filteredItems.length > 0 &&
                            selectedItems.length > 0 &&
                            selectedItems.length === filteredItems.filter((i) => i.id !== undefined).length
                          }
                          onChange={selectAllItems}
                          className="rounded"
                          aria-label="Select all items"
                        />
                      </th>
                      <th className="text-left py-3 px-4 whitespace-nowrap">S/N</th>
                      <th
                        className="text-left py-3 px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("name")}
                      >
                        Product Name {sortConfig?.key === "name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left py-3 px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("productId")}
                      >
                        Product ID{" "}
                        {sortConfig?.key === "productId" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left py-3 px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("category")}
                      >
                        Category {sortConfig?.key === "category" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left py-3 px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("qtyPurchased")}
                      >
                        QTY {sortConfig?.key === "qtyPurchased" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left py-3 px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("unitPrice")}
                      >
                        Unit Price{" "}
                        {sortConfig?.key === "unitPrice" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left py-3 px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("totalAmount")}
                      >
                        Total {sortConfig?.key === "totalAmount" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left py-3 px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("status")}
                      >
                        Status {sortConfig?.key === "status" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left py-3 px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("inStock")}
                      >
                        In Stock {sortConfig?.key === "inStock" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left py-3 px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("supplier")}
                      >
                        Supplier {sortConfig?.key === "supplier" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left py-3 px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("location")}
                      >
                        Location {sortConfig?.key === "location" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </th>
                      <th className="text-left py-3 px-4 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSortedItems(filteredItems).map((item, index) => (
                      <tr
                        key={`${item.productId || index}`}
                        className={`border-b hover:bg-gray-50 ${
                          item.id !== undefined && selectedItems.includes(item.id) ? "bg-blue-50" : ""
                        } ${
                          item.id !== undefined && isAnimating && selectedItems.includes(item.id)
                            ? "opacity-50 animate-pulse"
                            : ""
                        }`}
                      >
                        <td className="py-4 px-4 whitespace-nowrap">
                          {item.id !== undefined && (
                            <input
                              type="checkbox"
                              checked={item.id !== undefined && selectedItems.includes(item.id)}
                              onChange={() => item.id !== undefined && toggleItemSelection(item.id)}
                              className="rounded"
                              aria-label={`Select ${item.name || "item"}`}
                            />
                          )}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">{index + 1}</td>
                        <td className="py-4 px-4 whitespace-nowrap">{item.name || "-"}</td>
                        <td className="py-4 px-4 whitespace-nowrap">{item.productId || "-"}</td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${getCategoryColor()}20`,
                              color: getCategoryColor(),
                            }}
                          >
                            {item.category || "-"}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">{item.qtyPurchased || "-"}</td>
                        <td className="py-4 px-4 whitespace-nowrap">₹{item.unitPrice || "0"}</td>
                        <td className="py-4 px-4 whitespace-nowrap">₹{item.totalAmount || "0"} </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : item.status === "Low Stock"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : item.status === "Out of Stock"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.status || "-"}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">{item.inStock ?? 0}</td>
                        <td className="py-4 px-4 whitespace-nowrap">{item.supplier || "-"}</td>
                        <td className="py-4 px-4 whitespace-nowrap">{item.location || "-"}</td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <Link href={`/stocks-and-inventory/update-inventory?id=${item.id || ""}`}>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Edit className="h-4 w-4 mr-2 text-blue-500" />
                                  <span>Update</span>
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="cursor-pointer text-red-500 focus:text-red-500"
                                onClick={() => (item.id !== undefined ? handleDelete(item.id) : null)}
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {getSortedItems(filteredItems).map((item, index) => (
              <Card
                key={`${item.productId || index}`}
                className={`group overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer ${
                  item.id !== undefined && selectedItems.includes(item.id)
                    ? "ring-2 ring-primary"
                    : "hover:ring-1 hover:ring-[#0089ff]"
                } ${
                  item.id !== undefined && isAnimating && selectedItems.includes(item.id)
                    ? "opacity-50 animate-pulse"
                    : ""
                }`}
                onClick={() => item.id !== undefined && toggleItemSelection(item.id)}
              >
                <div
                  className="h-2 transition-all duration-300 group-hover:h-3"
                  style={{ backgroundColor: "#0089ff" }}
                ></div>
                <CardContent className="p-4 relative hover:bg-blue-50/30">
                  {/* Animated background overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex justify-between items-start mb-4 relative">
                    <div className="flex-1">
                      <h3 className="font-medium truncate text-gray-800 group-hover:text-[#0089ff] transition-colors duration-300">
                        {item.name || "Unnamed Product"}
                      </h3>
                      <p className="text-xs text-muted-foreground">ID: {item.productId || "-"}</p>
                    </div>
                    <div className="flex items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                            onClick={(e) => e.stopPropagation()} // Prevent card selection when clicking dropdown
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48" onClick={(e) => e.stopPropagation()}>
                          <Link href={`/stocks-and-inventory/update-inventory?id=${item.id || ""}`}>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="h-4 w-4 mr-2 text-primary" />
                              <span>Update</span>
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer text-red-500 focus:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation()
                              item.id !== undefined && handleDelete(item.id)
                            }}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4 relative">
                    <div className="bg-gray-50 p-2 rounded group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                      <p className="text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        Category
                      </p>
                      <p className="font-medium truncate">{item.category || "-"}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                      <p className="text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        Status
                      </p>
                      <p className="font-medium">{item.status || "-"}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                      <p className="text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        In Stock
                      </p>
                      <p className="font-medium">{item.inStock ?? 0}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                      <p className="text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        Unit Price
                      </p>
                      <p className="font-medium">₹{item.unitPrice || "0"}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs relative">
                    <div className="transition-transform duration-300 group-hover:translate-x-1">
                      <p className="text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        Supplier
                      </p>
                      <p className="font-medium truncate max-w-[120px]">{item.supplier || "-"}</p>
                    </div>
                    <div className="text-right transition-transform duration-300 group-hover:-translate-x-1">
                      <p className="text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        Location
                      </p>
                      <p className="font-medium truncate max-w-[120px]">{item.location || "-"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2022 Delta Infosoft. All Rights Reserved
        </div>
      </div>
    </div>
  )
}
