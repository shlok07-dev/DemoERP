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

export default function CreatePayslipPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    staffName: "",
    title: "",
    level: "",
    basicSalary: "",
    housingAllowance: "",
    transportAllowance: "",
    utilityAllowance: "",
    productivityAllowance: "",
    communicationAllowance: "",
    inconvenienceAllowance: "",
    grossSalary: "",
    taxPaye: "",
    employeePension: "",
    totalDeduction: "",
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
        description: "Payslip created successfully",
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

        <h2 className="text-2xl font-bold mb-6">Create Payslip</h2>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="staff-name">Staff name</Label>
                  <Select value={formData.staffName} onValueChange={(value) => handleChange("staffName", value)}>
                    <SelectTrigger id="staff-name">
                      <SelectValue placeholder="Select staff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abubakar">Abubakar Alghazali</SelectItem>
                      <SelectItem value="fatima">Fatima Mohammed</SelectItem>
                      <SelectItem value="ibrahim">Ibrahim Bankole</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Select value={formData.title} onValueChange={(value) => handleChange("title", value)}>
                    <SelectTrigger id="title">
                      <SelectValue placeholder="Select title" />
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
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="md-ceo">MD/CEO</SelectItem>
                      <SelectItem value="ed">ED</SelectItem>
                      <SelectItem value="gm">GM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">Salary Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="basic-salary">Basic salary</Label>
                  <Input
                    id="basic-salary"
                    placeholder="Enter amount"
                    value={formData.basicSalary}
                    onChange={(e) => handleChange("basicSalary", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="housing-allowance">Housing allowance</Label>
                  <Input
                    id="housing-allowance"
                    placeholder="Enter amount"
                    value={formData.housingAllowance}
                    onChange={(e) => handleChange("housingAllowance", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transport-allowance">Transport allowance</Label>
                  <Input
                    id="transport-allowance"
                    placeholder="Enter amount"
                    value={formData.transportAllowance}
                    onChange={(e) => handleChange("transportAllowance", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="utility-allowance">Utility allowance</Label>
                  <Input
                    id="utility-allowance"
                    placeholder="Enter amount"
                    value={formData.utilityAllowance}
                    onChange={(e) => handleChange("utilityAllowance", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productivity-allowance">Productivity allowance</Label>
                  <Input
                    id="productivity-allowance"
                    placeholder="Enter amount"
                    value={formData.productivityAllowance}
                    onChange={(e) => handleChange("productivityAllowance", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communication-allowance">Communication allowance</Label>
                  <Input
                    id="communication-allowance"
                    placeholder="Enter amount"
                    value={formData.communicationAllowance}
                    onChange={(e) => handleChange("communicationAllowance", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="inconvenience-allowance">Inconvenience allowance</Label>
                  <Input
                    id="inconvenience-allowance"
                    placeholder="Enter amount"
                    value={formData.inconvenienceAllowance}
                    onChange={(e) => handleChange("inconvenienceAllowance", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gross-salary">Gross Salary</Label>
                  <Input
                    id="gross-salary"
                    placeholder="Amount"
                    value={formData.grossSalary}
                    onChange={(e) => handleChange("grossSalary", e.target.value)}
                    readOnly
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">Deductions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="tax-paye">TAX/PAYE</Label>
                  <Input
                    id="tax-paye"
                    placeholder="Enter amount"
                    value={formData.taxPaye}
                    onChange={(e) => handleChange("taxPaye", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee-pension">Employee pension</Label>
                  <Input
                    id="employee-pension"
                    placeholder="Enter amount"
                    value={formData.employeePension}
                    onChange={(e) => handleChange("employeePension", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total-deduction">Total deduction</Label>
                  <Input
                    id="total-deduction"
                    placeholder="Amount"
                    value={formData.totalDeduction}
                    onChange={(e) => handleChange("totalDeduction", e.target.value)}
                    readOnly
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">Net Salary</h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="net-salary">Net salary</Label>
                  <Input
                    id="net-salary"
                    placeholder="Amount"
                    value={formData.netSalary}
                    onChange={(e) => handleChange("netSalary", e.target.value)}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-gradient-to-r from-[#0089ff] to-[#4b6cb7] hover:from-[#0070d8] hover:to-[#3b5998]"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Payslip"}
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
