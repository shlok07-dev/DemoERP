"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useInventoryStore } from "@/lib/store/useInventoryStore" // Import the inventory store

export default function UpdateInventoryPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
  // Use the inventory store
  const { addInventoryItem, error } = useInventoryStore()
  
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
    // Added additional fields from the store structure
    supplierContact: "",
    inStock: "",
    minimumStockLevel: "",
    reorderPoint: "",
    location: "",
  })

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
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Convert string values to appropriate types
      const inventoryItem = {
        ...formData,
        qtyPurchased: formData.qtyPurchased ? parseInt(formData.qtyPurchased.toString()) : undefined,
        unitPrice: formData.unitPrice ? parseFloat(formData.unitPrice.toString()) : undefined,
        totalAmount: formData.totalAmount ? parseFloat(formData.totalAmount.toString()) : undefined,
        inStock: formData.qtyPurchased ? parseInt(formData.qtyPurchased.toString()) : undefined, // Initialize inStock with qtyPurchased
        minimumStockLevel: formData.minimumStockLevel ? parseInt(formData.minimumStockLevel.toString()) : undefined,
        reorderPoint: formData.reorderPoint ? parseInt(formData.reorderPoint.toString()) : undefined,
      }

      // Call the store function to add the item
      await addInventoryItem(inventoryItem)
      setShowSuccessModal(true)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add inventory item",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleContinue = () => {
    setShowSuccessModal(false)
    router.push("/stocks-and-inventory")
  }

  return (
    <div>
      <PageHeader
        title="Add Inventory Asset"
        subtitle="Register new fixed assets in your inventory management system"
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
                    required
                  />
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

              <Button type="submit" className="w-full bg-[#0089ff] hover:bg-[#248cd8]" disabled={loading}>
                {loading ? "Adding..." : "Add Asset"}
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
            <p className="text-gray-600 mb-6">Your inventory asset has been added successfully.</p>

            <Button onClick={handleContinue} className="w-full h-12 rounded-md bg-[#0089ff] hover:bg-[#248cd8]">
              Ok
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}