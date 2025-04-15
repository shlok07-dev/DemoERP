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
import { ArrowLeft, Calendar } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function GeneratePayrollPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    paymentName: "",
    designation: "",
    dateGenerated: "",
    paymentMonth: "",
    paymentYear: "",
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
        description: "Payroll generated successfully",
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

        <h2 className="text-2xl font-bold mb-6">Generate Payroll</h2>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="payment-name">Payment name</Label>
                  <Input
                    id="payment-name"
                    placeholder="Enter payment name"
                    value={formData.paymentName}
                    onChange={(e) => handleChange("paymentName", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Select value={formData.designation} onValueChange={(value) => handleChange("designation", value)}>
                    <SelectTrigger id="designation">
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operations">Operations Department</SelectItem>
                      <SelectItem value="accounts">Accounts Department</SelectItem>
                      <SelectItem value="hr">HR Department</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-generated">Date generated</Label>
                  <div className="relative">
                    <Input
                      id="date-generated"
                      type="date"
                      value={formData.dateGenerated}
                      onChange={(e) => handleChange("dateGenerated", e.target.value)}
                      required
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="payment-month">Payment month</Label>
                  <Select value={formData.paymentMonth} onValueChange={(value) => handleChange("paymentMonth", value)}>
                    <SelectTrigger id="payment-month">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="february">February</SelectItem>
                      <SelectItem value="march">March</SelectItem>
                      <SelectItem value="april">April</SelectItem>
                      <SelectItem value="may">May</SelectItem>
                      <SelectItem value="june">June</SelectItem>
                      <SelectItem value="july">July</SelectItem>
                      <SelectItem value="august">August</SelectItem>
                      <SelectItem value="september">September</SelectItem>
                      <SelectItem value="october">October</SelectItem>
                      <SelectItem value="november">November</SelectItem>
                      <SelectItem value="december">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-year">Payment year</Label>
                  <Select value={formData.paymentYear} onValueChange={(value) => handleChange("paymentYear", value)}>
                    <SelectTrigger id="payment-year">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">Staff Details</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-medium text-muted-foreground border-b">
                      <th className="text-left py-3 px-4">S/N</th>
                      <th className="text-left py-3 px-4">Staff Name</th>
                      <th className="text-left py-3 px-4">Title</th>
                      <th className="text-left py-3 px-4">Level</th>
                      <th className="text-left py-3 px-4">Basic Salary</th>
                      <th className="text-left py-3 px-4">Allowances</th>
                      <th className="text-left py-3 px-4">Gross Salary</th>
                      <th className="text-left py-3 px-4">Deduction</th>
                      <th className="text-left py-3 px-4">Net Salary</th>
                      <th className="text-left py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "01",
                        name: "Abubakar Alghazali",
                        title: "Managing Director",
                        level: "MD/CEO",
                        basicSalary: "₦445,331.00",
                        allowances: "₦600,000.00",
                        grossSalary: "₦1,145,331.00",
                        deduction: "₦224,000.00",
                        netSalary: "₦224,000.00",
                      },
                      {
                        id: "01",
                        name: "Fatima Mohammed",
                        title: "Managing Director",
                        level: "MD/CEO",
                        basicSalary: "₦445,331.00",
                        allowances: "₦600,000.00",
                        grossSalary: "₦1,145,331.00",
                        deduction: "₦224,000.00",
                        netSalary: "₦224,000.00",
                      },
                    ].map((item, index) => (
                      <tr key={`${item.id}-${index}`} className={index !== 1 ? "border-b" : ""}>
                        <td className="py-4 px-4">{item.id}</td>
                        <td className="py-4 px-4">{item.name}</td>
                        <td className="py-4 px-4">{item.title}</td>
                        <td className="py-4 px-4">{item.level}</td>
                        <td className="py-4 px-4">{item.basicSalary}</td>
                        <td className="py-4 px-4">{item.allowances}</td>
                        <td className="py-4 px-4">{item.grossSalary}</td>
                        <td className="py-4 px-4">{item.deduction}</td>
                        <td className="py-4 px-4">{item.netSalary}</td>
                        <td className="py-4 px-4">
                          <Button variant="link" className="h-auto p-0 text-[#0089ff]">
                            View more
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-gradient-to-r from-[#0089ff] to-[#4b6cb7] hover:from-[#0070d8] hover:to-[#3b5998]"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
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
