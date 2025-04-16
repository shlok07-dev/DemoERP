"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { SuccessModal } from "@/components/success-modal"

export default function CreatePaymentVoucherPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState({
    payee: "",
    payeeAddress: "",
    paymentMethod: "bank-transfer",
    bankName: "",
    accountNumber: "",
    accountName: "",
    amount: "",
    description: "",
    category: "",
    attachments: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, attachments: e.target.files }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success modal
      setShowSuccessModal(true)
    } catch (error) {
      console.error("Error creating payment voucher:", error)
      toast({
        title: "Error",
        description: "Failed to create payment voucher. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    router.push("/payment-voucher")
  }

  return (
    <div>
      <PageHeader title="Create Payment Voucher" />

      <div className="p-4 sm:p-6">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent className="p-4 sm:p-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Payee Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payee">Payee Name</Label>
                    <Input
                      id="payee"
                      name="payee"
                      value={formData.payee}
                      onChange={handleChange}
                      placeholder="Enter payee name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payeeAddress">Payee Address</Label>
                    <Input
                      id="payeeAddress"
                      name="payeeAddress"
                      value={formData.payeeAddress}
                      onChange={handleChange}
                      placeholder="Enter payee address"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold">Payment Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                    >
                      <SelectTrigger id="paymentMethod">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      type="number"
                      required
                    />
                  </div>
                </div>

                {formData.paymentMethod === "bank-transfer" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input
                        id="bankName"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        placeholder="Enter bank name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        placeholder="Enter account number"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountName">Account Name</Label>
                      <Input
                        id="accountName"
                        name="accountName"
                        value={formData.accountName}
                        onChange={handleChange}
                        placeholder="Enter account name"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold">Additional Information</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter payment description"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office-supplies">Office Supplies</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attachments">Attachments</Label>
                    <Input id="attachments" name="attachments" type="file" onChange={handleFileChange} multiple />
                    <p className="text-xs text-muted-foreground">
                      Upload invoices, receipts, or other supporting documents (PDF, JPG, PNG)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4 sm:p-6 border-t">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#0089ff] hover:bg-[#0071d1]" disabled={loading}>
                {loading ? "Creating..." : "Create Payment Voucher"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      {showSuccessModal && (
        <SuccessModal
          title="Payment Voucher Created"
          description="Your payment voucher has been created successfully."
          onClose={handleSuccessModalClose}
        />
      )}
    </div>
  )
}
