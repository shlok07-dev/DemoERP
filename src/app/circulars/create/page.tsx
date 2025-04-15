"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { SuccessModal } from "@/components/success-modal"

export default function CreateCircularPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    sentFrom: "Otor John",
    sentTo: "",
    date: new Date().toISOString().split("T")[0],
    message: "",
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
    router.push("/circulars")
  }

  return (
    <div>
      <PageHeader title="Create Circulars" />

      <div className="p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">Create and send circulars to designated offices.</p>
        </div>

        <Link href="/circulars" className="flex items-center text-sm text-[#0089ff] mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Link>

        <h2 className="text-2xl font-bold mb-6">Create Circular</h2>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="circular-title">Circular title</Label>
                  <Input
                    id="circular-title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sent-from">Sent from</Label>
                  <Input id="sent-from" value={formData.sentFrom} disabled />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="sent-to">Sent to</Label>
                  <Select value={formData.sentTo} onValueChange={(value) => handleChange("sentTo", value)} required>
                    <SelectTrigger id="sent-to">
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
                <Label htmlFor="circular-message">Circular message</Label>
                <Textarea
                  id="circular-message"
                  placeholder="Enter message..."
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="min-h-[200px]"
                  required
                />
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-gradient-to-r from-[#0089ff] to-[#4b6cb7] hover:from-[#0070d8] hover:to-[#3b5998]"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Circular"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2022 Relia Energy. All Rights Reserved
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          title="Congratulations"
          message="Your circular has been sent successfully."
          buttonText="Ok"
          onButtonClick={handleContinue}
        />
      )}
    </div>
  )
}
