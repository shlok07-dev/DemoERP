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
import { ArrowLeft, Camera } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { SuccessModal } from "@/components/success-modal"

export default function AddStaffPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    role: "",
    designation: "",
    staffId: "",
    officialEmail: "",
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
    router.push("/staff")
  }

  return (
    <div>
      <PageHeader title="New Staff" />

      <div className="p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">Create account for a new staff</p>
        </div>

        <Link href="/staff" className="flex items-center text-sm text-[#0089ff] mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Link>

        <h2 className="text-2xl font-bold mb-6">Add a New Staff</h2>

        <div className="flex flex-col md:flex-row gap-8">
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
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)} required>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone-alt">Phone number</Label>
                  <Input
                    id="phone-alt"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => handleChange("role", value)} required>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="it">I.T</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="pm">P.M</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Select
                    value={formData.designation}
                    onValueChange={(value) => handleChange("designation", value)}
                    required
                  >
                    <SelectTrigger id="designation">
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="pm">Project Management</SelectItem>
                      <SelectItem value="cs">Customer Service</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="staff-id">Staff ID</Label>
                  <Input
                    id="staff-id"
                    placeholder="Staff ID"
                    value={formData.staffId}
                    onChange={(e) => handleChange("staffId", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="official-email">Official email</Label>
                  <Input
                    id="official-email"
                    type="email"
                    placeholder="Official Email"
                    value={formData.officialEmail}
                    onChange={(e) => handleChange("officialEmail", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-gradient-to-r from-[#0089ff] to-[#4b6cb7] hover:from-[#0070d8] hover:to-[#3b5998]"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Staff"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2022 Relia Energy. All Rights Reserved
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          title="Congratulations"
          message="You have successfully added a new staff"
          buttonText="Continue"
          onButtonClick={handleContinue}
        />
      )}
    </div>
  )
}
