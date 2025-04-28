"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  ArrowDown,
  BarChart3,
  Package,
  DollarSign,
  Trash,
  Edit,
  Search,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
} from "recharts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import { useInventoryStore } from "@/lib/store/useInventoryStore";

// Define the type for inventory items
interface InventoryItem {
  id?: number;
  name?: string;
  productId?: string | number;
  category?: string;
  qtyPurchased?: number | string;
  unitPrice?: number | string;
  totalAmount?: number | string;
  status?: string;
  inStock?: number;
  supplier?: string;
  location?: string;
}

export default function InventoryPage() {
  const {
    items,
    fetchInventory,
    loading,
    error,
    deleteInventoryItem,
    restoreInventoryItem,
  } = useInventoryStore();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([]);
  const { toast } = useToast();

  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof InventoryItem;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);

  // Function to handle sorting
  const requestSort = (key: keyof InventoryItem) => {
    let direction: "ascending" | "descending" = "ascending";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  // Function to get sorted items
  const getSortedItems = (items: InventoryItem[]) => {
    if (!sortConfig) return items;

    return [...items].sort((a, b) => {
      if (a[sortConfig.key] === undefined || b[sortConfig.key] === undefined)
        return 0;

      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        if (sortConfig.direction === "ascending") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else {
        const numA = Number(aValue) || 0;
        const numB = Number(bValue) || 0;

        if (sortConfig.direction === "ascending") {
          return numA - numB;
        } else {
          return numB - numA;
        }
      }
    });
  };

  // Function to toggle item selection
  const toggleItemSelection = (id: number) => {
    if (id !== undefined) {
      setSelectedItems((prev) =>
        prev.includes(id)
          ? prev.filter((itemId) => itemId !== id)
          : [...prev, id]
      );
    }
  };

  // Function to select all items
  const selectAllItems = () => {
    if (filteredItems.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const validIds = filteredItems
        .filter((item) => item.id !== undefined)
        .map((item) => item.id as number);
      setSelectedItems(validIds);
    }
  };

  // Function to bulk delete selected items
  const bulkDeleteItems = async () => {
    if (selectedItems.length === 0) return;

    // Animate before deletion
    setIsBulkDeleting(true);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);

      // Delete all selected items
      Promise.all(selectedItems.map((id) => deleteInventoryItem(id)))
        .then(() => {
          toast({
            title: "Bulk Delete Successful",
            description: `${selectedItems.length} items have been deleted`,
            variant: "default",
          });
          setSelectedItems([]);
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: "Failed to delete some items",
            variant: "destructive",
          });
        })
        .finally(() => {
          setIsBulkDeleting(false);
          setIsBulkDeleteDialogOpen(false);
        });
    }, 800);
  };

  // Function to generate a color based on category
  const getCategoryColor = (category?: string): string => {
    if (!category) return "#0089ff"; // Default blue color

    // Map categories to specific colors
    switch (category.toLowerCase()) {
      case "office equipment":
        return "#0089ff"; // Blue
      case "electronics":
        return "#00C49F"; // Teal
      case "furniture":
        return "#FFBB28"; // Yellow/Gold
      case "automobiles":
        return "#FF8042"; // Orange
      default:
        return "#a601ff"; // Purple for other categories
    }
  };

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  // Fetch inventory on component mount
  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // Filter items when search term or items change
  useEffect(() => {
    if (items && items.length > 0) {
      const filtered = items.filter((item: InventoryItem) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
          (item.name && item.name.toLowerCase().includes(searchTermLower)) ||
          (item.productId &&
            item.productId
              .toString()
              .toLowerCase()
              .includes(searchTermLower)) ||
          (item.category &&
            item.category.toLowerCase().includes(searchTermLower)) ||
          (item.supplier &&
            item.supplier.toLowerCase().includes(searchTermLower)) ||
          (item.location &&
            item.location.toLowerCase().includes(searchTermLower))
        );
      });
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [searchTerm, items]);

  // Generate real data for charts based on actual inventory
  const inventoryStats = useMemo(() => {
    if (!items || items.length === 0) {
      return {
        totalCategories: 0,
        totalItems: 0,
        totalCost: 0,
        totalSuppliers: 0,
        categoryData: [],
        monthlyValueData: [],
      };
    }

    // Count unique categories
    const categories = new Set<string>();
    const suppliers = new Set<string>();
    let totalCost = 0;

    items.forEach((item) => {
      if (item.category) categories.add(item.category);
      if (item.supplier) suppliers.add(item.supplier);

      // Calculate total cost
      const itemCost =
        Number(item.totalAmount) ||
        Number(item.unitPrice) * (Number(item.qtyPurchased) || 1) ||
        0;
      totalCost += itemCost;
    });

    // Generate category distribution data
    const categoryMap = new Map<string, number>();
    items.forEach((item) => {
      if (item.category) {
        const count = categoryMap.get(item.category) || 0;
        categoryMap.set(item.category, count + 1);
      }
    });

    const categoryData = Array.from(categoryMap.entries()).map(
      ([name, value]) => ({ name, value })
    );

    // Sort by value descending and limit to top 5
    categoryData.sort((a, b) => b.value - a.value);
    const topCategories = categoryData.slice(0, 5);

    // Generate monthly value data (simulated based on current data)
    const currentMonth = new Date().getMonth();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyValueData = [];
    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth - 5 + i + 12) % 12;
      const monthName = monthNames[monthIndex];

      // Generate a value that increases over time with some randomness
      // Base it on the actual total cost
      const factor = 0.8 + i * 0.05 + Math.random() * 0.1;
      const value = Math.round(totalCost * factor);

      monthlyValueData.push({
        name: monthName,
        value,
      });
    }

    return {
      totalCategories: categories.size,
      totalItems: items.length,
      totalCost,
      totalSuppliers: suppliers.size,
      categoryData: topCategories,
      monthlyValueData,
    };
  }, [items]);

  // Component for countdown display
  const CountdownDisplay = ({ initialTime }: { initialTime: number }) => {
    const [remainingTime, setRemainingTime] = useState(initialTime);

    useEffect(() => {
      const countdownInterval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }, []);

    return <span>{remainingTime}</span>;
  };

  // Handle delete operation
  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      const success = await deleteInventoryItem(id);

      if (success) {
        // Close the popover
        setOpenPopoverId(null);

        // Remove the deleted item from selectedItems array
        setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));

        // Show success toast with undo button and countdown component
        toast({
          title: "Item deleted",
          description: (
            <div>
              This action will be permanent in{" "}
              <CountdownDisplay initialTime={10} /> seconds
            </div>
          ),
          action: (
            <ToastAction
              altText="Undo"
              onClick={async () => {
                const restoreSuccess = await restoreInventoryItem(id);

                if (restoreSuccess) {
                  toast({
                    title: "Success",
                    description: "Item restored successfully",
                    variant: "default",
                  });
                } else {
                  toast({
                    title: "Error",
                    description: error || "Failed to restore item",
                    variant: "destructive",
                  });
                }
              }}
            >
              Undo
            </ToastAction>
          ),
          duration: 10000, // 10 seconds
        });
      } else {
        // Show error toast, using the error from store state
        toast({
          title: "Error",
          description: "Failed to delete the item",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      // Refresh inventory data after delete operation
      fetchInventory();
    }
  };

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
    ];

    // Create CSV content
    let csvContent = headers.join(",") + "\n";

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
      ];

      // Escape commas in fields by wrapping in quotes
      const escapedRow = row.map((field) => {
        const stringField = String(field);
        return stringField.includes(",") ? `"${stringField}"` : stringField;
      });

      csvContent += escapedRow.join(",") + "\n";
    });

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `inventory_export_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: "Inventory data has been exported to CSV",
      variant: "default",
    });
  };

  const COLORS = ["#0089ff", "#00C49F", "#FFBB28", "#FF8042", "#a601ff"];

  return (
    <div>
      <PageHeader
        title="Inventory Management"
        subtitle="Track, manage, and optimize your inventory assets"
      />

      <div className="p-6 max-w-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-3xl font-bold">
                    {inventoryStats.totalCategories || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="h-4 w-4 text-[#10a142] mr-1" />
                    <span className="text-xs text-[#10a142]">
                      2 more than last year
                    </span>
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
                  <p className="text-3xl font-bold">
                    {filteredItems.length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Total items</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="h-4 w-4 text-[#10a142] mr-1" />
                    <span className="text-xs text-[#10a142]">
                      10 more than last year
                    </span>
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
                  <p className="text-3xl font-bold">
                    ₹{(inventoryStats.totalCost / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total item cost
                  </p>
                  <div className="flex items-center mt-2">
                    <ArrowDown className="h-4 w-4 text-[#ed3237] mr-1" />
                    <span className="text-xs text-[#ed3237]">
                      2.5% less than last year
                    </span>
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
                  <p className="text-3xl font-bold">
                    {inventoryStats.totalSuppliers || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total suppliers
                  </p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="h-4 w-4 text-[#10a142] mr-1" />
                    <span className="text-xs text-[#10a142]">
                      2 more than last year
                    </span>
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
                    data={inventoryStats.monthlyValueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        `₹${value.toLocaleString()}`,
                        "Value",
                      ]}
                    />
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
                      data={inventoryStats.categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {inventoryStats.categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} items`, "Quantity"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold">Inventory Table</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-wrap">
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
            <div className="relative flex w-full sm:w-auto sm:flex-1 min-w-[200px]">
              <Input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => {}}
              >
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
              <span className="hidden sm:inline">Export CSV</span>
              <span className="sm:hidden">Export</span>
            </Button>

            {/* Bulk delete button - only show when items are selected */}
            {selectedItems.length > 0 && (
              <AlertDialog
                open={isBulkDeleteDialogOpen}
                onOpenChange={setIsBulkDeleteDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto flex items-center gap-2"
                  >
                    <Trash className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      Delete ({selectedItems.length})
                    </span>
                    <span className="sm:hidden">
                      Delete {selectedItems.length}
                    </span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Bulk Delete</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete {selectedItems.length}{" "}
                      selected items? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={bulkDeleteItems}
                      className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
                      disabled={isBulkDeleting}
                    >
                      {isBulkDeleting
                        ? "Deleting..."
                        : `Delete ${selectedItems.length} items`}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <Link
              href="/stocks-and-inventory/add-update-inventory"
              className="w-full sm:w-auto"
            >
              <Button className="bg-[#0089ff] hover:bg-[#248cd8] w-full">
                Add Inventory
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading inventory...
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            {items && items.length === 0
              ? "No inventory items found."
              : "No items match your search."}
          </div>
        ) : viewMode === "table" ? (
          <div className="border rounded-lg overflow-hidden">
            <div
              className="overflow-x-auto w-full"
              style={{ WebkitOverflowScrolling: "touch", maxWidth: "100%" }}
            >
              <div className="max-h-[calc(100vh-350px)] min-h-[300px] overflow-y-auto">
                <table className="w-full table-auto border-collapse">
                  <thead className="sticky top-0 z-20">
                    <tr className="text-xs font-medium text-muted-foreground border-b bg-gray-50">
                      <th className="text-left py-3 px-2 md:px-4 whitespace-nowrap sticky left-0 bg-gray-50 z-30">
                        <input
                          type="checkbox"
                          checked={
                            filteredItems.length > 0 &&
                            selectedItems.length > 0 &&
                            selectedItems.length ===
                              filteredItems.filter((i) => i.id !== undefined)
                                .length
                          }
                          onChange={selectAllItems}
                          className="rounded"
                          aria-label="Select all items"
                        />
                      </th>
                      <th className="text-left py-3 px-2 md:px-4 whitespace-nowrap sticky left-8 bg-gray-50 z-30">
                        S/N
                      </th>
                      <th
                        className="text-left py-3 px-2 md:px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100 min-w-[150px]"
                        onClick={() => requestSort("name")}
                      >
                        <div className="flex items-center">
                          <span>Product Name</span>
                          {sortConfig?.key === "name" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left py-3 px-2 md:px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100 hidden sm:table-cell"
                        onClick={() => requestSort("productId")}
                      >
                        <div className="flex items-center">
                          <span>Product ID</span>
                          {sortConfig?.key === "productId" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left py-3 px-2 md:px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("category")}
                      >
                        <div className="flex items-center">
                          <span>Category</span>
                          {sortConfig?.key === "category" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left py-3 px-2 md:px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100 hidden md:table-cell"
                        onClick={() => requestSort("qtyPurchased")}
                      >
                        <div className="flex items-center">
                          <span>QTY</span>
                          {sortConfig?.key === "qtyPurchased" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left py-3 px-2 md:px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100 hidden md:table-cell"
                        onClick={() => requestSort("unitPrice")}
                      >
                        <div className="flex items-center">
                          <span>Unit Price</span>
                          {sortConfig?.key === "unitPrice" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left py-3 px-2 md:px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100 hidden lg:table-cell"
                        onClick={() => requestSort("totalAmount")}
                      >
                        <div className="flex items-center">
                          <span>Total</span>
                          {sortConfig?.key === "totalAmount" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left py-3 px-2 md:px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("status")}
                      >
                        <div className="flex items-center">
                          <span>Status</span>
                          {sortConfig?.key === "status" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left py-3 px-2 md:px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100 hidden sm:table-cell"
                        onClick={() => requestSort("inStock")}
                      >
                        <div className="flex items-center">
                          <span>In Stock</span>
                          {sortConfig?.key === "inStock" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left py-3 px-2 md:px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100 hidden lg:table-cell"
                        onClick={() => requestSort("supplier")}
                      >
                        <div className="flex items-center">
                          <span>Supplier</span>
                          {sortConfig?.key === "supplier" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left py-3 px-2 md:px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100 hidden lg:table-cell"
                        onClick={() => requestSort("location")}
                      >
                        <div className="flex items-center">
                          <span>Location</span>
                          {sortConfig?.key === "location" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="text-left py-3 px-2 md:px-4 whitespace-nowrap sticky right-0 bg-gray-50 z-30">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSortedItems(filteredItems).map((item, index) => (
                      <tr
                        key={`${item.productId || index}`}
                        className={`border-b hover:bg-gray-50 ${
                          item.id !== undefined &&
                          selectedItems.includes(item.id)
                            ? "bg-blue-50"
                            : ""
                        } ${
                          item.id !== undefined &&
                          isAnimating &&
                          selectedItems.includes(item.id)
                            ? "opacity-50 animate-pulse"
                            : ""
                        }`}
                      >
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap sticky left-0 bg-white z-10">
                          {item.id !== undefined && (
                            <input
                              type="checkbox"
                              checked={
                                item.id !== undefined &&
                                selectedItems.includes(item.id)
                              }
                              onChange={() =>
                                item.id !== undefined &&
                                toggleItemSelection(item.id)
                              }
                              className="rounded"
                              checked={
                                item.id !== undefined &&
                                selectedItems.includes(item.id)
                              }
                              onChange={() =>
                                item.id !== undefined &&
                                toggleItemSelection(item.id)
                              }
                              className="rounded"
                              aria-label={`Select ${item.name || "item"}`}
                            />
                          )}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap sticky left-8 bg-white z-10">
                          {index + 1}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <div className="truncate max-w-[120px] md:max-w-[200px] lg:max-w-[250px]">
                            {item.name || "-"}
                          </div>
                          <div className="text-xs text-muted-foreground sm:hidden mt-1">
                            ID: {item.productId || "-"}
                          </div>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap hidden sm:table-cell">
                          {item.productId || "-"}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">
                          <span
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${getCategoryColor(
                                item.category
                              )}20`,
                              color: getCategoryColor(item.category),
                            }}
                          >
                            {item.category || "-"}
                          </span>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap hidden md:table-cell">
                          {item.qtyPurchased || "-"}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap hidden md:table-cell">
                          ₹{item.unitPrice || "0"}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap hidden lg:table-cell">
                          ₹{item.totalAmount || "0"}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">
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
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap hidden sm:table-cell">
                          {item.inStock ?? 0}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap hidden lg:table-cell">
                          {item.supplier || "-"}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap hidden lg:table-cell">
                          {item.location || "-"}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap sticky right-0 bg-white z-10">
                          <Popover
                            open={openPopoverId === item.id}
                            onOpenChange={(open) => {
                              if (open) {
                                setOpenPopoverId(
                                  item.id !== undefined ? item.id : null
                                );
                              } else {
                                setOpenPopoverId(null);
                              }
                            }}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-2">
                              <div className="flex flex-col space-y-1">
                                <Link
                                  href={`/stocks-and-inventory/add-update-inventory?id=${
                                    item.id || ""
                                  }`}
                                >
                                  <Button
                                    variant="ghost"
                                    className="w-full justify-start text-left"
                                  >
                                    <Edit className="h-4 w-4 mr-2 text-blue-500" />
                                    <span>Update</span>
                                  </Button>
                                </Link>

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      className="w-full justify-start text-left text-red-500 hover:text-red-500 hover:bg-red-50"
                                    >
                                      <Trash className="h-4 w-4 mr-2" />
                                      <span>Delete</span>
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you sure?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action will delete{" "}
                                        <strong>
                                          {item.name || "this item"}
                                        </strong>{" "}
                                        from inventory. You can undo this action
                                        within 10 seconds.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          item.id !== undefined &&
                                          handleDelete(item.id)
                                        }
                                        className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
                                        disabled={isDeleting}
                                      >
                                        {isDeleting ? "Deleting..." : "Delete"}
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </PopoverContent>
                          </Popover>
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
                    : "hover:ring-1"
                } ${
                  item.id !== undefined &&
                  isAnimating &&
                  selectedItems.includes(item.id)
                    ? "opacity-50 animate-pulse"
                    : ""
                }`}
                onClick={() =>
                  item.id !== undefined && toggleItemSelection(item.id)
                }
              >
                <div
                  className="h-2 transition-all duration-300 group-hover:h-3"
                  style={{ backgroundColor: getCategoryColor(item.category) }}
                ></div>
                <CardContent className="p-4 relative hover:bg-blue-50/30 overflow-hidden">
                  {/* Animated background overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex justify-between items-start mb-4 relative">
                    <div className="flex-1">
                      <h3 className="font-medium truncate text-gray-800 group-hover:text-blue-500 transition-colors duration-300">
                        {item.name || "Unnamed Product"}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        ID: {item.productId || "-"}
                      </p>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => e.stopPropagation()} // Prevent card selection when clicking dropdown
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-48 p-2"
                        align="end"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex flex-col space-y-1">
                          <Link
                            href={`/stocks-and-inventory/add-update-inventory?id=${
                              item.id || ""
                            }`}
                          >
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-left"
                            >
                              <Edit className="h-4 w-4 mr-2 text-blue-500" />
                              <span>Update</span>
                            </Button>
                          </Link>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-left text-red-500 hover:text-red-500 hover:bg-red-50"
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                <span>Delete</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action will delete{" "}
                                  <strong>{item.name || "this item"}</strong>{" "}
                                  from inventory. You can undo this action
                                  within 10 seconds.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    item.id !== undefined &&
                                    handleDelete(item.id)
                                  }
                                  className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
                                  disabled={isDeleting}
                                >
                                  {isDeleting ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4 relative">
                    <div className="bg-gray-50 p-2 rounded group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                      <p className="text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        Category
                      </p>
                      <p className="font-medium truncate">
                        {item.category || "-"}
                      </p>
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
                      <p className="font-medium truncate max-w-[120px]">
                        {item.supplier || "-"}
                      </p>
                    </div>
                    <div className="text-right transition-transform duration-300 group-hover:-translate-x-1">
                      <p className="text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        Location
                      </p>
                      <p className="font-medium truncate max-w-[120px]">
                        {item.location || "-"}
                      </p>
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
  );
}
