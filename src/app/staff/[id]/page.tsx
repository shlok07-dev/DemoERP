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
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { SuccessModal } from "@/components/success-modal"
import Image from "next/image"

export default function EditStaffPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Otor",
    email: "",
    phoneNumber: "",
    phoneNumberAlt: "",
    gender: "",
    staffId: "0221AD",
    officialEmail: "",
    designation: "",
    role: "",
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
      toast({
        title: "Success",
        description: "Staff profile updated successfully",
      })
    }, 1000)
  }

  const handleRoleSubmit = (e: React.FormEvent) => {
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

        <h2 className="text-2xl font-bold mb-6">Edit Staff Profile</h2>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="relative w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4 overflow-hidden">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Staff profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <p className="text-sm text-white text-center">Update Photo</p>
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
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
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
                    value={formData.phoneNumberAlt}
                    onChange={(e) => handleChange("phoneNumberAlt", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="staff-id">Staff ID</Label>
                  <Input id="staff-id" value={formData.staffId} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Select value={formData.designation} onValueChange={(value) => handleChange("designation", value)}>
                    <SelectTrigger id="designation">
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="pm">Project Management</SelectItem>
                      <SelectItem value="cs">Customer Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 mb-6">
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

              <div className="flex justify-end">
                <Button type="submit" className="w-full bg-[#0089ff] hover:bg-[#0070d8]" disabled={loading}>
                  Edit Profile
                </Button>
              </div>
            </form>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Assign Role</h2>

        <div className="max-w-xl mb-12">
          <form onSubmit={handleRoleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="user-id">User ID</Label>
                <Input id="user-id" value="0221AD" disabled />
              </div>

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
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="w-full bg-[#0089ff] hover:bg-[#0070d8]" disabled={loading}>
                Submit
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2022 Relia Energy. All Rights Reserved
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          title="Congratulations"
          message="You have successfully assigned a role to Otor John"
          buttonText="Ok"
          onButtonClick={handleContinue}
        />
      )}
    </div>
  )
}
