"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useInventoryStore } from "@/lib/store/useInventoryStore";

// Add this after the imports
const noScrollInputStyles = `
  /* Hide the spinner buttons for Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hide the spinner buttons for Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

export default function InventoryItemPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("id");
  const isUpdateMode = !!itemId;

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [assetIdError, setAssetIdError] = useState("");
  const [supplierContactError, setSupplierContactError] = useState("");
  const [assetNameError, setAssetNameError] = useState("");
  const [supplierNameError, setSupplierNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [logs, setLogs] = useState([]);

  // Add a new state for in-stock error after the other error states
  const [inStockError, setInStockError] = useState("");

  const [originalFormData, setOriginalFormData] = useState({});

  const {
    addInventoryItem,
    updateInventoryItem,
    items,
    fetchInventory,
    error,
  } = useInventoryStore();

  const [formData, setFormData] = useState({
    name: "",
    productId: "",
    category: "",
    qtyPurchased: "",
    unitPrice: "",
    totalAmount: "",
    supplier: "",
    status: "",
    notes: "",
    supplierContact: "",
    inStock: "",
    minimumStockLevel: "",
    reorderPoint: "",
    location: "",
  });

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  useEffect(() => {
    if (isUpdateMode && items.length > 0 && itemId) {
      const itemToUpdate = items.find(
        (item) => item.id === Number.parseInt(itemId)
      );
      if (itemToUpdate) {
        const formattedData = {
          name: itemToUpdate.name || "",
          productId: itemToUpdate.productId || "",
          category: itemToUpdate.category || "",
          qtyPurchased: itemToUpdate.qtyPurchased?.toString() || "",
          unitPrice: itemToUpdate.unitPrice?.toString() || "",
          totalAmount: itemToUpdate.totalAmount?.toString() || "",
          supplier: itemToUpdate.supplier || "",
          status: itemToUpdate.status || "",
          notes: itemToUpdate.notes || "",
          supplierContact: itemToUpdate.supplierContact || "",
          inStock: itemToUpdate.inStock?.toString() || "",
          minimumStockLevel: itemToUpdate.minimumStockLevel?.toString() || "",
          reorderPoint: itemToUpdate.reorderPoint?.toString() || "",
          location: itemToUpdate.location || "",
        };
        setFormData(formattedData);
        setOriginalFormData(formattedData); // Store the original data for comparison
      }
    }
  }, [isUpdateMode, items, itemId]);

  useEffect(() => {
    if (formData.qtyPurchased && formData.unitPrice) {
      const qty = Number.parseFloat(formData.qtyPurchased);
      const price = Number.parseFloat(formData.unitPrice);
      if (!isNaN(qty) && !isNaN(price)) {
        setFormData((prev) => ({
          ...prev,
          totalAmount: (qty * price).toFixed(2),
        }));
      }
    }
  }, [formData.qtyPurchased, formData.unitPrice]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleChange = (field: string, value: string) => {
    // Clear errors when fields are changed
    if (field === "productId") {
      setAssetIdError("");
    }
    if (field === "supplierContact") {
      setSupplierContactError("");
    }
    if (field === "name") {
      setAssetNameError("");
    }
    if (field === "supplier") {
      setSupplierNameError("");
    }
    if (field === "location") {
      setLocationError("");
    }
    if (field === "inStock" || field === "qtyPurchased") {
      setInStockError("");
    }

    // Special handling for unit price - allow decimals with max 2 decimal places
    if (field === "unitPrice") {
      // Check if the input is a valid decimal with up to 2 decimal places
      if (/^\d*\.?\d{0,2}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }
      return;
    }

    // For other numeric fields, ensure they only contain digits (0-9)
    if (
      ["qtyPurchased", "inStock", "minimumStockLevel", "reorderPoint"].includes(
        field
      )
    ) {
      // Remove any non-digit characters
      value = value.replace(/[^0-9]/g, "");
    }

    // Enforce character limits
    if (["name", "supplier", "location"].includes(field) && value.length > 50) {
      if (field === "name") {
        setAssetNameError("Asset name must be 50 characters or less");
      } else if (field === "supplier") {
        setSupplierNameError("Supplier name must be 50 characters or less");
      } else if (field === "location") {
        setLocationError("Location must be 50 characters or less");
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow navigation keys
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "Escape" ||
      e.key === "Enter" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Home" ||
      e.key === "End"
    ) {
      return;
    }

    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "a" || e.key === "c" || e.key === "v" || e.key === "x")
    ) {
      return;
    }

    // Prevent if not a digit for numeric fields
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const preventScroll = (e: React.WheelEvent<HTMLInputElement>) => {
    // Prevent the input value from changing on scroll
    e.currentTarget.blur();
  };

  const validateCharacterLimit = (field: string, value: string) => {
    if (value.length > 50) {
      if (field === "name") {
        setAssetNameError("Asset name must be 50 characters or less");
        return false;
      } else if (field === "supplier") {
        setSupplierNameError("Supplier name must be 50 characters or less");
        return false;
      } else if (field === "location") {
        setLocationError("Location must be 50 characters or less");
        return false;
      }
    }
    return true;
  };

  // Assuming your 'logs' should store full audit log entries (not just deleted product ids)
  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await fetch("/api/fetchAuditLog");

        if (!response.ok) {
          throw new Error(`Error fetching audit logs: ${response.statusText}`);
        }

        const data = await response.json();
        // Filter out productIds from the logs with action == 'delete'
        const deletedProductIds = data
          .filter(
            (log: any) => log.action === "delete" && log.oldData?.productId
          )
          .map((log: any) => log.oldData.productId);

        setLogs(data); // Save the full logs here, not just the productIds
      } catch (err) {
        console.error("Failed to fetch audit logs:", err);
        setLogs([]); // Set empty array in case of error
      }
    };

    fetchAuditLogs();
  }, []);

  // Function to check if assetId exists
  const checkAssetIdExists = (productId: string) => {
    // Check in current items for matching productId
    const itemExists = items.some(
      (item) =>
        item.productId.replace(/\s+/g, "").toLowerCase() ===
        productId.replace(/\s+/g, "").toLowerCase()
    );

    // Check in logs for deleted productId
    const deletedExists = logs.some(
      (log) =>
        log.action === "delete" &&
        log.oldData?.productId.replace(/\s+/g, "").toLowerCase() ===
          productId.replace(/\s+/g, "").toLowerCase()
    );

    return itemExists || deletedExists; // Returns true if productId exists in either of the arrays
  };

  const validateAssetId = () => {
    if (!formData.productId.trim()) {
      setAssetIdError("Asset ID cannot be empty or contain only spaces");
      return;
    }

    if (
      !isUpdateMode &&
      formData.productId &&
      checkAssetIdExists(formData.productId)
    ) {
      setAssetIdError(
        "This Asset ID already exists. Please use a different ID."
      );
    } else {
      setAssetIdError("");
    }
  };

  const validateSupplierContact = () => {
    const contactNumber = formData.supplierContact.replace(/\D/g, ""); // Remove non-digit characters
    if (contactNumber.length !== 10 || isNaN(Number(contactNumber))) {
      setSupplierContactError(
        "Supplier contact number must be a 10-digit integer."
      );
    } else {
      setSupplierContactError("");
    }
  };

  // Add this validation function after the validateSupplierContact function
  const validateInStock = () => {
    if (formData.inStock && formData.qtyPurchased) {
      const inStock = Number.parseInt(formData.inStock);
      const qtyPurchased = Number.parseInt(formData.qtyPurchased);

      if (inStock > qtyPurchased) {
        setInStockError("In Stock cannot be greater than QTY purchased");
        return false;
      } else {
        setInStockError("");
        return true;
      }
    }
    setInStockError("");
    return true;
  };

  const hasFormChanged = () => {
    if (!isUpdateMode) return true; // Always enable button in add mode

    // Compare each field in the form with the original data
    return Object.keys(formData).some((key) => {
      return formData[key] !== originalFormData[key];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate character limits before submission
    const isNameValid = validateCharacterLimit("name", formData.name);
    const isSupplierValid = validateCharacterLimit(
      "supplier",
      formData.supplier
    );
    const isLocationValid = formData.location
      ? validateCharacterLimit("location", formData.location)
      : true;
    const isInStockValid = validateInStock();

    if (
      !isNameValid ||
      !isSupplierValid ||
      !isLocationValid ||
      !isInStockValid
    ) {
      return;
    }

    if (!isUpdateMode && checkAssetIdExists(formData.productId)) {
      setAssetIdError(
        "This Asset ID already exists. Please use a different ID."
      );
      document
        .getElementById("product-id")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (supplierContactError) {
      document
        .getElementById("supplier-contact")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);

    try {
      const inventoryItem = {
        ...formData,
        qtyPurchased: formData.qtyPurchased
          ? Number.parseInt(formData.qtyPurchased)
          : undefined,
        unitPrice: formData.unitPrice
          ? Number.parseFloat(formData.unitPrice)
          : undefined,
        totalAmount: formData.totalAmount
          ? Number.parseFloat(formData.totalAmount)
          : undefined,
        inStock: isUpdateMode
          ? formData.inStock
            ? Number.parseInt(formData.inStock)
            : undefined
          : formData.qtyPurchased
          ? Number.parseInt(formData.qtyPurchased)
          : undefined,
        minimumStockLevel: formData.minimumStockLevel
          ? Number.parseInt(formData.minimumStockLevel)
          : undefined,
        reorderPoint: formData.reorderPoint
          ? Number.parseInt(formData.reorderPoint)
          : undefined,
      };

      if (isUpdateMode && itemId) {
        await updateInventoryItem(Number.parseInt(itemId), inventoryItem);
      } else {
        await addInventoryItem(inventoryItem);
      }

      setShowSuccessModal(true);
    } catch (err) {
      toast({
        title: "Error",
        description: isUpdateMode
          ? "Failed to update inventory item"
          : "Failed to add inventory item",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    router.push("/stocks-and-inventory");
  };

  const pageTitle = isUpdateMode
    ? "Update Inventory Asset"
    : "Add Inventory Asset";
  const pageSubtitle = isUpdateMode
    ? "Update existing fixed assets in your inventory management system"
    : "Register new fixed assets in your inventory management system";
  const submitButtonText = loading
    ? isUpdateMode
      ? "Updating..."
      : "Adding..."
    : isUpdateMode
    ? "Update Asset"
    : "Add Asset";
  const successMessage = isUpdateMode
    ? "Your inventory asset has been updated successfully."
    : "Your inventory asset has been added successfully.";

  return (
    <div>
      {/* Add this style tag */}
      <style jsx global>
        {noScrollInputStyles}
      </style>
      <PageHeader title={pageTitle} subtitle={pageSubtitle} />

      <div className="p-6 max-w-7xl mx-auto">
        <Link
          href="/stocks-and-inventory"
          className="flex items-center text-sm text-[#0089ff] mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Inventory
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="asset-name">Asset name</Label>
              <Input
                id="asset-name"
                placeholder="Enter asset name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                maxLength={50}
                onBlur={() => validateCharacterLimit("name", formData.name)}
                required
              />
              {assetNameError && (
                <p className="text-xs text-red-500 mt-1">{assetNameError}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Maximum 50 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-id">Asset ID</Label>
              <Input
                id="product-id"
                placeholder="Enter ID"
                value={formData.productId}
                onChange={(e) => handleChange("productId", e.target.value)}
                onBlur={validateAssetId}
                disabled={isUpdateMode}
                readOnly={isUpdateMode}
                className={isUpdateMode ? "bg-gray-100 cursor-not-allowed" : ""}
                required
              />
              {assetIdError && !isUpdateMode && (
                <p className="text-xs text-red-500 mt-1">{assetIdError}</p>
              )}
              {isUpdateMode && (
                <p className="text-xs text-muted-foreground mt-1">
                  Asset ID cannot be changed during updates
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office-equipment">
                    Office Equipment
                  </SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="automobile">Automobile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">QTY purchased</Label>
              <Input
                id="quantity"
                placeholder="Enter quantity"
                type="number"
                min="1"
                value={formData.qtyPurchased}
                onChange={(e) => handleChange("qtyPurchased", e.target.value)}
                onKeyDown={handleKeyDown}
                onWheel={preventScroll}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit-price">Unit price</Label>
              <Input
                id="unit-price"
                placeholder="Enter amount"
                type="number"
                min="1"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) => handleChange("unitPrice", e.target.value)}
                onKeyDown={(e) => {
                  // Allow: backspace, delete, tab, escape, enter, decimal point, navigation
                  if (
                    e.key === "Backspace" ||
                    e.key === "Delete" ||
                    e.key === "Tab" ||
                    e.key === "Escape" ||
                    e.key === "Enter" ||
                    e.key === "." ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === "Home" ||
                    e.key === "End"
                  ) {
                    // If decimal point, only allow one in the field
                    if (e.key === "." && formData.unitPrice.includes(".")) {
                      e.preventDefault();
                    }
                    return;
                  }

                  // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                  if (
                    (e.ctrlKey || e.metaKey) &&
                    (e.key === "a" ||
                      e.key === "c" ||
                      e.key === "v" ||
                      e.key === "x")
                  ) {
                    return;
                  }

                  // Prevent if not a digit
                  if (!/^[0-9]$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onWheel={preventScroll}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="total-amount">Total amount</Label>
              <Input
                id="total-amount"
                placeholder="Amount"
                value={formData.totalAmount}
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                placeholder="Enter supplier name"
                value={formData.supplier}
                onChange={(e) => handleChange("supplier", e.target.value)}
                maxLength={50}
                onBlur={() =>
                  validateCharacterLimit("supplier", formData.supplier)
                }
                required
              />
              {supplierNameError && (
                <p className="text-xs text-red-500 mt-1">{supplierNameError}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Maximum 50 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier-contact">Supplier Contact</Label>
              <Input
                id="supplier-contact"
                placeholder="Enter supplier contact"
                maxLength={10}
                value={formData.supplierContact}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                  handleChange("supplierContact", value); // Update the value with only digits
                }}
                onBlur={validateSupplierContact}
              />
              {supplierContactError && (
                <p className="text-xs text-red-500 mt-1">
                  {supplierContactError}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
                required
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="functioning">All Functioning</SelectItem>
                  <SelectItem value="partial">Partially Functioning</SelectItem>
                  <SelectItem value="maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                maxLength={50}
                onBlur={() =>
                  validateCharacterLimit("location", formData.location)
                }
              />
              {locationError && (
                <p className="text-xs text-red-500 mt-1">{locationError}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Maximum 50 characters
              </p>
            </div>

            {isUpdateMode && (
              <div className="space-y-2">
                <Label htmlFor="in-stock">In Stock</Label>
                <Input
                  id="in-stock"
                  placeholder="Enter current stock"
                  type="number"
                  onKeyDown={handleKeyDown}
                  onWheel={preventScroll}
                  min="0"
                  max={formData.qtyPurchased || undefined}
                  value={formData.inStock}
                  onChange={(e) => handleChange("inStock", e.target.value)}
                  onBlur={validateInStock}
                  className={inStockError ? "border-red-500" : ""}
                />
                {inStockError && (
                  <p className="text-xs text-red-500 mt-1">{inStockError}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="minimum-stock">Minimum Stock Level</Label>
              <Input
                id="minimum-stock"
                placeholder="Enter minimum stock level"
                type="number"
                onKeyDown={handleKeyDown}
                onWheel={preventScroll}
                min="1"
                value={formData.minimumStockLevel}
                onChange={(e) =>
                  handleChange("minimumStockLevel", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reorder-point">Reorder Point</Label>
              <Input
                id="reorder-point"
                placeholder="Enter reorder point"
                type="number"
                onKeyDown={handleKeyDown}
                onWheel={preventScroll}
                min="1"
                value={formData.reorderPoint}
                onChange={(e) => handleChange("reorderPoint", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter asset description"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={4}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0089ff] hover:bg-[#248cd8]"
            disabled={
              loading ||
              (!isUpdateMode && assetIdError !== "") ||
              supplierContactError !== "" ||
              assetNameError !== "" ||
              supplierNameError !== "" ||
              locationError !== "" ||
              inStockError !== "" ||
              (isUpdateMode && !hasFormChanged()) // Disable if in update mode and no changes made
            }
          >
            {submitButtonText}
          </Button>
        </form>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2022 Delta Infosoft. All Rights Reserved
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative h-24 w-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-green-100 rounded-full"></div>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="z-10"
                >
                  <path
                    d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 4L12 14.01L9 11.01"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Congratulations</h2>
            <p className="text-gray-600 mb-6">
              Your inventory asset has been added successfully.
            </p>

            <Button
              onClick={handleContinue}
              className="w-full h-12 rounded-md bg-[#0089ff] hover:bg-[#248cd8]"
            >
              Ok
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
