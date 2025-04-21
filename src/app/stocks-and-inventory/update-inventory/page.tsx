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
      const itemToUpdate = items.find((item) => item.id === parseInt(itemId));
      if (itemToUpdate) {
        setFormData({
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
        });
      }
    }
  }, [isUpdateMode, items, itemId]);

  useEffect(() => {
    if (formData.qtyPurchased && formData.unitPrice) {
      const qty = parseFloat(formData.qtyPurchased);
      const price = parseFloat(formData.unitPrice);
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
    if (field === "productId") {
      setAssetIdError("");
    }
    if (field === "supplierContact") {
      setSupplierContactError("");
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const checkAssetIdExists = (productId: string) => {
    return items.some((item) => item.productId === productId.trim());
  };

  const validateAssetId = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
          ? parseInt(formData.qtyPurchased)
          : undefined,
        unitPrice: formData.unitPrice
          ? parseFloat(formData.unitPrice)
          : undefined,
        totalAmount: formData.totalAmount
          ? parseFloat(formData.totalAmount)
          : undefined,
        inStock: isUpdateMode
          ? formData.inStock
            ? parseInt(formData.inStock)
            : undefined
          : formData.qtyPurchased
          ? parseInt(formData.qtyPurchased)
          : undefined,
        minimumStockLevel: formData.minimumStockLevel
          ? parseInt(formData.minimumStockLevel)
          : undefined,
        reorderPoint: formData.reorderPoint
          ? parseInt(formData.reorderPoint)
          : undefined,
      };

      if (isUpdateMode && itemId) {
        await updateInventoryItem(parseInt(itemId), inventoryItem);
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
                required
              />
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
                value={formData.qtyPurchased}
                onChange={(e) => handleChange("qtyPurchased", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit-price">Unit price</Label>
              <Input
                id="unit-price"
                placeholder="Enter amount"
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) => handleChange("unitPrice", e.target.value)}
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
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier-contact">Supplier Contact</Label>
              <Input
                id="supplier-contact"
                placeholder="Enter supplier contact"
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
              />
            </div>

            {isUpdateMode && (
              <div className="space-y-2">
                <Label htmlFor="in-stock">In Stock</Label>
                <Input
                  id="in-stock"
                  placeholder="Enter current stock"
                  type="number"
                  value={formData.inStock}
                  onChange={(e) => handleChange("inStock", e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="minimum-stock">Minimum Stock Level</Label>
              <Input
                id="minimum-stock"
                placeholder="Enter minimum stock level"
                type="number"
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
              supplierContactError !== ""
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
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
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
            <p className="text-gray-600 mb-6">{successMessage}</p>
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
