"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ScheduleMaintenancePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState({
    itemName: "",
    number: "",
    date: "",
    maintenanceType: "",
    recurringOption: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setShowSuccessModal(true)
    }, 1000)
  }

  const handleContinue = () => {
    setShowSuccessModal(false)
    router.push("/maintenance")
  }

  return (
    <div>
      <PageHeader title="Schedule Maintenance" />

      <div className="p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">Schedule a maintenance for future use.</p>
        </div>

        <Link href="/maintenance" className="flex items-center text-sm text-[#0089ff] mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Link>

        <h2 className="text-xl font-bold mb-6">Schedule Maintenance</h2>
        <p className="text-sm text-muted-foreground mb-6">Kindly fill in the form below to schedule a maintenance.</p>

        <div className="max-w-3xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="item-name">Item name</Label>
                <Select value={formData.itemName} onValueChange={(value) => handleChange("itemName", value)} required>
                  <SelectTrigger id="item-name">
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="air-conditioner">2Hp Hisense Air Condition</SelectItem>
                    <SelectItem value="printer">Laser Jet Printer</SelectItem>
                    <SelectItem value="generator">Generator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="number">Number</Label>
                <Select value={formData.number} onValueChange={(value) => handleChange("number", value)} required>
                  <SelectTrigger id="number">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="relative">
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenance-type">Maintenance type</Label>
                <Select
                  value={formData.maintenanceType}
                  onValueChange={(value) => handleChange("maintenanceType", value)}
                  required
                >
                  <SelectTrigger id="maintenance-type">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recurring">Recurring</SelectItem>
                    <SelectItem value="one-time">One-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="recurring-option">Recurring option</Label>
                <Select
                  value={formData.recurringOption}
                  onValueChange={(value) => handleChange("recurringOption", value)}
                  required
                >
                  <SelectTrigger id="recurring-option">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Every two months</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#0089ff] hover:bg-[#248cd8]" disabled={loading}>
              {loading ? "Scheduling..." : "Schedule Maintenance"}
            </Button>
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
            <p className="text-gray-600 mb-6">Your maintenance have been scheduled successfully.</p>

            <Button onClick={handleContinue} className="w-full h-12 rounded-md bg-[#0089ff] hover:bg-[#248cd8]">
              Ok
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
