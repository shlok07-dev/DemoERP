"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, X, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CreateMemoModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function CreateMemoModal({ onClose, onSuccess }: CreateMemoModalProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    sendTo: "",
    cc1: "",
    cc1Action: "",
    date: new Date().toISOString().split("T")[0],
    body: "",
  })
  const [ccRecipients, setCcRecipients] = useState(1)

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

  if (showSuccessModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative h-24 w-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-green-100 rounded-full"></div>
              <CheckCircle className="h-16 w-16 text-green-500 z-10" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2">Congratulations</h2>
          <p className="text-gray-600 mb-6">Your memo has been created and sent successfully.</p>

          <Button onClick={onSuccess} className="w-full h-12 rounded-md bg-[#0089ff] hover:bg-[#248cd8]">
            Ok
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Create Memo</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="memo-title">Memo title</Label>
              <Input
                id="memo-title"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="send-to">Send to</Label>
              <Select value={formData.sendTo} onValueChange={(value) => handleChange("sendTo", value)} required>
                <SelectTrigger id="send-to">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operations">Operations Staffs</SelectItem>
                  <SelectItem value="hr">HR Staffs</SelectItem>
                  <SelectItem value="all">All Staff</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="cc1">CC1</Label>
              <Select value={formData.cc1} onValueChange={(value) => handleChange("cc1", value)}>
                <SelectTrigger id="cc1">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operations">Operations Staffs</SelectItem>
                  <SelectItem value="hr">HR Staffs</SelectItem>
                  <SelectItem value="all">All Staff</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cc1-action">CC 1 action</Label>
              <Select value={formData.cc1Action} onValueChange={(value) => handleChange("cc1Action", value)}>
                <SelectTrigger id="cc1-action">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="for-info">For Information</SelectItem>
                  <SelectItem value="for-action">For Action</SelectItem>
                  <SelectItem value="for-approval">For Approval</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => setCcRecipients(ccRecipients + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6">
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
          </div>

          <div className="space-y-2 mb-6">
            <Label htmlFor="memo-body">Memo body</Label>
            <Textarea
              id="memo-body"
              placeholder="Enter memo content"
              value={formData.body}
              onChange={(e) => handleChange("body", e.target.value)}
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" className="bg-white border-[#0089ff] text-[#0089ff]">
              Attach Payment Voucher
            </Button>
            <Button type="submit" className="bg-[#0089ff] hover:bg-[#248cd8]" disabled={loading}>
              {loading ? "Sending..." : "Send Memo"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

import { CheckCircle } from "lucide-react"
