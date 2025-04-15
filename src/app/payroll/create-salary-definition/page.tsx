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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CreateSalaryDefinitionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    level: "",
    basicSalary: "",
    allowance: "",
    grossSalary: "",
    deductions: "",
    netSalary: "",
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
        description: "Salary definition created successfully",
      })
      router.push("/payroll")
    }, 1000)
  }

  return (
    <div>
      <PageHeader title="Payroll" />

      <div className="p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">Generate and send payroll to account.</p>
        </div>

        <Link href="/payroll" className="flex items-center text-sm text-[#0089ff] mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Link>

        <h2 className="text-2xl font-bold mb-6">Create Salary Definition</h2>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Select value={formData.title} onValueChange={(value) => handleChange("title", value)}>
                    <SelectTrigger id="title">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="managing-director">Managing Director</SelectItem>
                      <SelectItem value="executive-director">Executive Director</SelectItem>
                      <SelectItem value="general-manager">General Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={formData.level} onValueChange={(value) => handleChange("level", value)}>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="md-ceo">MD/CEO</SelectItem>
                      <SelectItem value="ed">ED</SelectItem>
                      <SelectItem value="gm">GM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="basic-salary">Basic salary</Label>
                  <Input
                    id="basic-salary"
                    placeholder="Enter amount in Naira"
                    value={formData.basicSalary}
                    onChange={(e) => handleChange("basicSalary", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="allowance">Allowance</Label>
                  <Input
                    id="allowance"
                    placeholder="Enter amount in Naira"
                    value={formData.allowance}
                    onChange={(e) => handleChange("allowance", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gross-salary">Gross Salary</Label>
                  <Input
                    id="gross-salary"
                    placeholder="Enter amount in Naira"
                    value={formData.grossSalary}
                    onChange={(e) => handleChange("grossSalary", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deductions">Deductions</Label>
                  <Input
                    id="deductions"
                    placeholder="Enter amount in Naira"
                    value={formData.deductions}
                    onChange={(e) => handleChange("deductions", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="net-salary">Net Salary</Label>
                  <Input
                    id="net-salary"
                    placeholder="Enter amount in Naira"
                    value={formData.netSalary}
                    onChange={(e) => handleChange("netSalary", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-[#0089ff] hover:bg-[#248cd8]" disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2022 Relia Energy. All Rights Reserved
        </div>
      </div>
    </div>
  )
}
