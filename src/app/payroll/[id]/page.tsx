"use client"

import { useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PayslipDetailPage({ params }: { params: { id: string } }) {
  const [payslipData] = useState({
    name: "Abubakar Alghazali",
    title: "Managing Director",
    level: "MD/CEO",
    month: "January",
    year: "2023",
    basicSalary: "445,331",
    housingAllowance: "222,666",
    transportAllowance: "89,066",
    utilityAllowance: "44,533",
    productivityAllowance: "89,066",
    communicationAllowance: "66,800",
    inconvenienceAllowance: "66,800",
    grossSalary: "1,024,261",
    taxPaye: "163,696",
    employeePension: "60,565",
    totalDeduction: "224,261",
    netSalary: "800,000",
    netSalaryInWords: "Eight Hundred Thousand Naira Only",
  })

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

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{payslipData.name}</h2>
            <p className="text-muted-foreground">
              {payslipData.title} | {payslipData.level}
            </p>
          </div>
          <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Edit payslip</Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Salary Payslip</h3>
            <p className="mb-6">
              Month: {payslipData.month} &nbsp;&nbsp; Year: {payslipData.year}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold bg-gray-100 p-2 mb-4">Salary Structure</h4>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">Basic Salary</td>
                      <td className="py-3 text-right">{payslipData.basicSalary}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Housing Allowance</td>
                      <td className="py-3 text-right">{payslipData.housingAllowance}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Transport Allowance</td>
                      <td className="py-3 text-right">{payslipData.transportAllowance}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Utility Allowance</td>
                      <td className="py-3 text-right">{payslipData.utilityAllowance}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Productivity Allowance</td>
                      <td className="py-3 text-right">{payslipData.productivityAllowance}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Communication Allowance</td>
                      <td className="py-3 text-right">{payslipData.communicationAllowance}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Inconvenience allowance</td>
                      <td className="py-3 text-right">{payslipData.inconvenienceAllowance}</td>
                    </tr>
                    <tr className="border-b font-semibold">
                      <td className="py-3">Gross Salary</td>
                      <td className="py-3 text-right">{payslipData.grossSalary}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="font-semibold bg-gray-100 p-2 mb-4">Deductions</h4>
                <table className="w-full mb-8">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">Tax/PAYE</td>
                      <td className="py-3 text-right">{payslipData.taxPaye}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Employee Pension</td>
                      <td className="py-3 text-right">{payslipData.employeePension}</td>
                    </tr>
                    <tr className="border-b font-semibold">
                      <td className="py-3">Total Deduction</td>
                      <td className="py-3 text-right">{payslipData.totalDeduction}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="border p-4 rounded-md bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Net Salary</h4>
                    <p className="font-bold text-xl">{payslipData.netSalary}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Net Salary in Words: {payslipData.netSalaryInWords}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2022 Relia Energy. All Rights Reserved
        </div>
      </div>
    </div>
  )
}
