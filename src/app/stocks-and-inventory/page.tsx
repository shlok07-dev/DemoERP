"use client";

import { useEffect, useState } from "react";
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
          description: error || "Failed to delete item",
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

  const inventoryCategoryData = [
    { name: "Office Equipment", value: 35 },
    { name: "Electronics", value: 25 },
    { name: "Furniture", value: 20 },
    { name: "Automobiles", value: 15 },
    { name: "Others", value: 5 },
  ];

  const inventoryValueData = [
    { name: "Jan", value: 200000 },
    { name: "Feb", value: 220000 },
    { name: "Mar", value: 240000 },
    { name: "Apr", value: 260000 },
    { name: "May", value: 280000 },
    { name: "Jun", value: 300000 },
  ];

  const COLORS = ["#0089ff", "#00C49F", "#FFBB28", "#FF8042", "#a601ff"];

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
                  <p className="text-3xl font-bold">300</p>
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
                  <p className="text-3xl font-bold">₹250M</p>
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
                  <p className="text-3xl font-bold">20</p>
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
                    data={inventoryValueData}
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
                      data={inventoryCategoryData}
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
                      {inventoryCategoryData.map((entry, index) => (
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
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search input with button */}
            <div className="relative flex w-full md:w-80">
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
                onClick={() => {}} // The search is already reactive with the input change
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
              Export CSV
            </Button>

            <Link href="/stocks-and-inventory/update-inventory">
              <Button className="bg-[#0089ff] hover:bg-[#248cd8] w-full sm:w-auto">
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
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <div
              className="overflow-x-auto"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 z-10">
                    <tr className="text-xs font-medium text-muted-foreground border-b bg-gray-50">
                      <th className="text-left py-3 px-4 whitespace-nowrap">
                        S/N
                      </th>
                      <th className="text-left py-3 px-4 whitespace-nowrap">
                        Product Name
                      </th>
                      <th className="text-left py-3 px-4 whitespace-nowrap">
                        Product ID
                      </th>
                      <th className="text-left py-3 px-4 whitespace-nowrap">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 whitespace-nowrap">
                        QTY
                      </th>
                      <th className="text-left py-3 px-4 whitespace-nowrap">
                        Unit Price
                      </th>
                      <th className="text-left py-3 px-4 whitespace-nowrap">
                        Total
                      </th>
                      <th className="text-left py-3 px-4 whitespace-nowrap">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 whitespace-nowrap">
                        In Stock
                      </th>
                      <th className="text-left py-3 px-4 whitespace-nowrap">
                        Supplier
                      </th>
                      <th className="text-left py-3 px-4 whitespace-nowrap">
                        Location
                      </th>
                      <th className="text-left py-3 px-4 whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item, index) => (
                      <tr
                        key={`${item.productId || index}`}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-4 px-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {item.name || "—"}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {item.productId || "—"}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {item.category || "—"}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {item.qtyPurchased || "—"}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {item.unitPrice || "—"}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {item.totalAmount || "—"}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {item.status || "—"}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {item.inStock ?? 0}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {item.supplier || "—"}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {item.location || "—"}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <Popover
                            open={openPopoverId === item.id}
                            onOpenChange={(open) => {
                              if (open) {
                                setOpenPopoverId(item.id || null);
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
                                  href={`/stocks-and-inventory/update-inventory?id=${
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
        )}

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2022 Delta Infosoft. All Rights Reserved
        </div>
      </div>
    </div>
  );
}
