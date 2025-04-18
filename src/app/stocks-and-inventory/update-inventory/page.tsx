"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useInventoryStore } from "@/lib/store/useInventoryStore"

export default function InventoryItemPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const itemId = searchParams.get('id')
  const isUpdateMode = !!itemId
  
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [assetIdError, setAssetIdError] = useState("")
  
  // Use the inventory store
  const { 
    addInventoryItem, 
    updateInventoryItem, 
    items, 
    fetchInventory, 
    error, 
    loading: storeLoading 
  } = useInventoryStore()
  
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
  })

  // Fetch inventory data when component mounts to have the latest items for ID validation
  useEffect(() => {
    fetchInventory()
  }, [fetchInventory])

  // Populate form with existing data when in update mode
  useEffect(() => {
    if (isUpdateMode && items.length > 0 && itemId) {
      const itemToUpdate = items.find(item => item.id === parseInt(itemId))
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
        })
      }
    }
  }, [isUpdateMode, items, itemId])

  // Calculate total amount when quantity or unit price changes
  useEffect(() => {
    if (formData.qtyPurchased && formData.unitPrice) {
      const qty = parseFloat(formData.qtyPurchased.toString())
      const price = parseFloat(formData.unitPrice.toString())
      if (!isNaN(qty) && !isNaN(price)) {
        setFormData(prev => ({
          ...prev,
          totalAmount: (qty * price).toFixed(2)
        }))
      }
    }
  }, [formData.qtyPurchased, formData.unitPrice])

  // Show error toast if API call fails
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, toast])

  const handleChange = (field: string, value: string) => {
    // Clear asset ID error when changing the productId field
    if (field === "productId") {
      setAssetIdError("")
    }
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Check if asset ID already exists
  const checkAssetIdExists = (productId: string) => {
    return items.some(item => item.productId === productId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if asset ID already exists (only when adding new item)
    if (!isUpdateMode && checkAssetIdExists(formData.productId)) {
      setAssetIdError("This Asset ID already exists. Please use a different ID.")
      // Scroll to the asset ID field to ensure the error is visible
      document.getElementById("product-id")?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    setLoading(true)

    try {
      // Convert string values to appropriate types
      const inventoryItem = {
        ...formData,
        qtyPurchased: formData.qtyPurchased ? parseInt(formData.qtyPurchased.toString()) : undefined,
        unitPrice: formData.unitPrice ? parseFloat(formData.unitPrice.toString()) : undefined,
        totalAmount: formData.totalAmount ? parseFloat(formData.totalAmount.toString()) : undefined,
        inStock: isUpdateMode 
          ? formData.inStock ? parseInt(formData.inStock.toString()) : undefined
          : formData.qtyPurchased ? parseInt(formData.qtyPurchased.toString()) : undefined, // Initialize inStock with qtyPurchased only when adding
        minimumStockLevel: formData.minimumStockLevel ? parseInt(formData.minimumStockLevel.toString()) : undefined,
        reorderPoint: formData.reorderPoint ? parseInt(formData.reorderPoint.toString()) : undefined,
      }

      if (isUpdateMode && itemId) {
        // Update existing item
        await updateInventoryItem(parseInt(itemId), inventoryItem)
      } else {
        // Add new item
        await addInventoryItem(inventoryItem)
      }
      
      setShowSuccessModal(true)
    } catch (err) {
      toast({
        title: "Error",
        description: isUpdateMode ? "Failed to update inventory item" : "Failed to add inventory item",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Validate asset ID as user types
  const validateAssetId = () => {
    if (!isUpdateMode && formData.productId && checkAssetIdExists(formData.productId)) {
      setAssetIdError("This Asset ID already exists. Please use a different ID.")
    } else {
      setAssetIdError("")
    }
  }

  const handleContinue = () => {
    setShowSuccessModal(false)
    router.push("/stocks-and-inventory")
  }

  const pageTitle = isUpdateMode ? "Update Inventory Asset" : "Add Inventory Asset"
  const pageSubtitle = isUpdateMode 
    ? "Update existing fixed assets in your inventory management system" 
    : "Register new fixed assets in your inventory management system"
  const submitButtonText = loading 
    ? (isUpdateMode ? "Updating..." : "Adding...") 
    : (isUpdateMode ? "Update Asset" : "Add Asset")
  const successMessage = isUpdateMode 
    ? "Your inventory asset has been updated successfully." 
    : "Your inventory asset has been added successfully."

  return (
    <div>
      <PageHeader
        title={pageTitle}
        subtitle={pageSubtitle}
      />

      <div className="p-6">
        <Link href="/stocks-and-inventory" className="flex items-center text-sm text-[#0089ff] mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Inventory
        </Link>

        <div className="max-w-4xl">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="relative w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-gray-400" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xs text-gray-500 text-center">Upload photo</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">Allowed format</p>
              <p className="text-xs text-muted-foreground mb-4">JPG, JPEG, and PNG</p>
              <p className="text-xs text-muted-foreground mb-1">Max file size</p>
              <p className="text-xs text-muted-foreground">2MB</p>
            </div>

            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                    <p className="text-xs text-muted-foreground mt-1">Asset ID cannot be changed during updates</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange("category", value)} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office-equipment">Office Equipment</SelectItem>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                    onChange={(e) => handleChange("supplierContact", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange("status", value)} required>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                    onChange={(e) => handleChange("minimumStockLevel", e.target.value)}
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

              <div className="grid grid-cols-1 gap-6 mb-8">
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
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#0089ff] hover:bg-[#248cd8]" 
                disabled={loading || (!isUpdateMode && assetIdError !== "")}
              >
                {submitButtonText}
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2022 Relia Energy. All Rights Reserved
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
            <p className="text-gray-600 mb-6">{successMessage}</p>

            <Button onClick={handleContinue} className="w-full h-12 rounded-md bg-[#0089ff] hover:bg-[#248cd8]">
              Ok
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}