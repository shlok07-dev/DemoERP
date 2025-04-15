"use client"

import { useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, FileText, DollarSign, Wallet, CreditCard } from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line, Bar } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState("salary-breakdown")

  // Chart data
  const payrollTrendsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Gross Salary",
        data: [
          5100000, 5150000, 5200000, 5180000, 5205350, 5250000, 5300000, 5320000, 5350000, 5400000, 5450000, 5500000,
        ],
        borderColor: "#fdcc1c",
        backgroundColor: "rgba(253, 204, 28, 0.2)",
        tension: 0.3,
      },
      {
        label: "Net Salary",
        data: [
          4500000, 4520000, 4530000, 4540000, 4550350, 4600000, 4650000, 4700000, 4750000, 4800000, 4850000, 4900000,
        ],
        borderColor: "#248cd8",
        backgroundColor: "rgba(36, 140, 216, 0.2)",
        tension: 0.3,
      },
      {
        label: "Tax",
        data: [520000, 530000, 540000, 545000, 550350, 560000, 570000, 580000, 590000, 600000, 610000, 620000],
        borderColor: "#fdcc1c",
        backgroundColor: "rgba(253, 204, 28, 0.2)",
        tension: 0.3,
      },
      {
        label: "Loan",
        data: [140000, 145000, 148000, 149000, 150350, 152000, 154000, 156000, 158000, 160000, 162000, 164000],
        borderColor: "#a601ff",
        backgroundColor: "rgba(166, 1, 255, 0.2)",
        tension: 0.3,
      },
    ],
  }

  const salaryComponentsData = {
    labels: ["Basic Salary", "Housing Allowance", "Transport Allowance", "Medical Allowance", "Other Allowances"],
    datasets: [
      {
        label: "Amount (₦)",
        data: [2500000, 1000000, 800000, 500000, 400000],
        backgroundColor: [
          "rgba(0, 137, 255, 0.7)",
          "rgba(16, 161, 66, 0.7)",
          "rgba(253, 204, 28, 0.7)",
          "rgba(166, 1, 255, 0.7)",
          "rgba(36, 140, 216, 0.7)",
        ],
      },
    ],
  }

  // Chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => "₦" + value.toLocaleString(),
        },
      },
    },
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => "₦" + value.toLocaleString(),
        },
      },
    },
  }

  return (
    <div>
      <PageHeader
        title="Payroll Management Center"
        subtitle="Process payroll, manage salary structures, and track compensation metrics efficiently."
        background="bg-gradient-to-r from-[#0089ff] to-[#248cd8]"
      />

      <div className="p-6">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Generate and send payroll to accounts. Track salary metrics and manage compensation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">₦5,205,350.00</p>
                  <p className="text-sm text-muted-foreground">Gross salary this month</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="h-4 w-4 text-[#10a142] mr-1" />
                    <span className="text-xs text-[#10a142]">2% more than last month</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-[#fff8df]">
                  <DollarSign className="h-6 w-6 text-[#fdcc1c]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">₦4,550,350.00</p>
                  <p className="text-sm text-muted-foreground">Net salary this month</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="h-4 w-4 text-[#10a142] mr-1" />
                    <span className="text-xs text-[#10a142]">2.1% more than last month</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-[#e8f5ff]">
                  <Wallet className="h-6 w-6 text-[#248cd8]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">₦550,350.00</p>
                  <p className="text-sm text-muted-foreground">Total tax this month</p>
                  <div className="flex items-center mt-2">
                    <ArrowDown className="h-4 w-4 text-[#ed3237] mr-1" />
                    <span className="text-xs text-[#ed3237]">2.1% less than last month</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-[#fff8df]">
                  <FileText className="h-6 w-6 text-[#fdcc1c]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">₦150,350.00</p>
                  <p className="text-sm text-muted-foreground">Total loan this month</p>
                  <div className="flex items-center mt-2">
                    <ArrowDown className="h-4 w-4 text-[#ed3237] mr-1" />
                    <span className="text-xs text-[#ed3237]">1.5% less than last month</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-[#f9efff]">
                  <CreditCard className="h-6 w-6 text-[#a601ff]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Annual Payroll Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px]">
                  <Line options={lineOptions} data={payrollTrendsData} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Salary Components</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px]">
                  <Bar options={barOptions} data={salaryComponentsData} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="salary-breakdown" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-muted/60 p-1">
            <TabsTrigger value="salary-breakdown" className="text-sm">
              Salary Breakdown
            </TabsTrigger>
            <TabsTrigger value="tax-definitions" className="text-sm">
              Tax Definitions
            </TabsTrigger>
            <TabsTrigger value="payslips" className="text-sm">
              Payslips
            </TabsTrigger>
            <TabsTrigger value="payroll" className="text-sm">
              Payroll
            </TabsTrigger>
          </TabsList>

          <TabsContent value="salary-breakdown">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Salary Definition</h3>
                  <Link href="/payroll/create-salary-definition">
                    <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Create Salary Definition</Button>
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-medium text-muted-foreground border-b">
                        <th className="text-left py-3 px-4">S/N</th>
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-left py-3 px-4">Level</th>
                        <th className="text-left py-3 px-4">Basic Salary</th>
                        <th className="text-left py-3 px-4">Allowance</th>
                        <th className="text-left py-3 px-4">Gross Salary</th>
                        <th className="text-left py-3 px-4">Deductions</th>
                        <th className="text-left py-3 px-4">Net Salary</th>
                        <th className="text-left py-3 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: "01",
                          title: "Managing Director",
                          level: "MD/CEO",
                          basicSalary: "₦445,331.00",
                          allowance: "₦600,000.00",
                          grossSalary: "₦1,145,331.00",
                          deductions: "₦224,000.00",
                          netSalary: "₦921,331.00",
                        },
                        {
                          id: "02",
                          title: "Executive Director",
                          level: "ED",
                          basicSalary: "₦395,000.00",
                          allowance: "₦197,500.00",
                          grossSalary: "₦592,500.00",
                          deductions: "₦118,500.00",
                          netSalary: "₦474,000.00",
                        },
                        {
                          id: "03",
                          title: "General Manager",
                          level: "GM",
                          basicSalary: "₦345,331.00",
                          allowance: "₦172,665.50",
                          grossSalary: "₦517,996.50",
                          deductions: "₦103,599.30",
                          netSalary: "₦414,397.20",
                        },
                      ].map((item, index) => (
                        <tr key={item.id} className={index !== 2 ? "border-b" : ""}>
                          <td className="py-4 px-4">{item.id}</td>
                          <td className="py-4 px-4">{item.title}</td>
                          <td className="py-4 px-4">{item.level}</td>
                          <td className="py-4 px-4">{item.basicSalary}</td>
                          <td className="py-4 px-4">{item.allowance}</td>
                          <td className="py-4 px-4">{item.grossSalary}</td>
                          <td className="py-4 px-4">{item.deductions}</td>
                          <td className="py-4 px-4">{item.netSalary}</td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Button variant="link" className="h-auto p-0 text-[#0089ff]">
                                Edit
                              </Button>
                              <Button variant="link" className="h-auto p-0 text-[#ed3237]">
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax-definitions">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Tax Definitions</h3>
                  <Link href="/payroll/create-tax-definition">
                    <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Create Tax Definition</Button>
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-medium text-muted-foreground border-b">
                        <th className="text-left py-3 px-4">S/N</th>
                        <th className="text-left py-3 px-4">Tax Type</th>
                        <th className="text-left py-3 px-4">% value</th>
                        <th className="text-left py-3 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: "01", type: "NHIS", value: "2%" },
                        { id: "02", type: "VAT", value: "2.5%" },
                        { id: "03", type: "WHT", value: "5%" },
                      ].map((item, index) => (
                        <tr key={`${item.id}-${index}`} className={index !== 2 ? "border-b" : ""}>
                          <td className="py-4 px-4">{item.id}</td>
                          <td className="py-4 px-4">{item.type}</td>
                          <td className="py-4 px-4">{item.value}</td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Button variant="link" className="h-auto p-0 text-[#0089ff]">
                                Edit
                              </Button>
                              <Button variant="link" className="h-auto p-0 text-[#ed3237]">
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payslips">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Employee Payslip History</h3>
                  <Link href="/payroll/create-payslip">
                    <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Create Payslip</Button>
                  </Link>
                </div>

                <div className="overflow-x-auto">
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
                          netSalary: "₦921,331.00",
                        },
                        {
                          id: "02",
                          name: "Fatima Mohammed",
                          title: "Executive Director",
                          level: "ED",
                          basicSalary: "₦395,000.00",
                          allowances: "₦197,500.00",
                          grossSalary: "₦592,500.00",
                          deduction: "₦118,500.00",
                          netSalary: "₦474,000.00",
                        },
                        {
                          id: "03",
                          name: "Ibrahim Bankole",
                          title: "General Manager",
                          level: "GM",
                          basicSalary: "₦345,331.00",
                          allowances: "₦172,665.50",
                          grossSalary: "₦517,996.50",
                          deduction: "₦103,599.30",
                          netSalary: "₦414,397.20",
                        },
                      ].map((item, index) => (
                        <tr key={`${item.id}-${index}`} className={index !== 2 ? "border-b" : ""}>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Employee Payroll History</h3>
                  <Link href="/payroll/generate">
                    <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Generate Payroll</Button>
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-medium text-muted-foreground border-b">
                        <th className="text-left py-3 px-4">S/N</th>
                        <th className="text-left py-3 px-4">Payment name</th>
                        <th className="text-left py-3 px-4">Designation</th>
                        <th className="text-left py-3 px-4">Date generated</th>
                        <th className="text-left py-3 px-4">Payment month</th>
                        <th className="text-left py-3 px-4">Payment year</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: "01",
                          name: "Monthly salary",
                          designation: "Operations Department",
                          date: "30/01/2023",
                          month: "January",
                          year: "2023",
                          status: "Pending",
                        },
                        {
                          id: "02",
                          name: "Monthly salary",
                          designation: "Accounts Department",
                          date: "30/12/2023",
                          month: "January",
                          year: "2023",
                          status: "Pending",
                        },
                        {
                          id: "03",
                          name: "Monthly salary",
                          designation: "Operations Department",
                          date: "30/11/2022",
                          month: "November",
                          year: "2022",
                          status: "Paid",
                        },
                      ].map((item, index) => (
                        <tr key={`${item.id}-${index}`} className={index !== 2 ? "border-b" : ""}>
                          <td className="py-4 px-4">{item.id}</td>
                          <td className="py-4 px-4">{item.name}</td>
                          <td className="py-4 px-4">{item.designation}</td>
                          <td className="py-4 px-4">{item.date}</td>
                          <td className="py-4 px-4">{item.month}</td>
                          <td className="py-4 px-4">{item.year}</td>
                          <td className="py-4 px-4">
                            <Badge
                              variant="outline"
                              className={
                                item.status === "Paid"
                                  ? "bg-[#ecfff2] text-[#10a142] border-[#10a142]"
                                  : "bg-[#fbf3da] text-[#fdcc1c] border-[#fdcc1c]"
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2023 UiUxOtor ERP System. All Rights Reserved
        </div>
      </div>
    </div>
  )
}
