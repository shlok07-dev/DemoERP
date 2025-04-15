"use client"

import type React from "react"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function CreateBudgetPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div>
        <PageHeader title="Office Budget and Create Budget" />

        <div className="p-6">
          <div className="max-w-md mx-auto mt-8">
            <Card>
              <CardContent className="p-8 flex flex-col items-center">
                <CheckCircle2 className="h-16 w-16 text-[#10a142] mb-4" />
                <h2 className="text-xl font-bold mb-2">Congratulations</h2>
                <p className="text-center text-muted-foreground mb-6">Your budget has been approved</p>
                <Link href="/office-budget">
                  <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Back to Budget</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Office Budget and Create Budget" />

      <div className="p-6">
        <div className="flex items-center mb-6">
          <Link href="/office-budget" className="flex items-center text-sm text-muted-foreground hover:text-[#0089ff]">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Create Budget</h2>
              <p className="text-sm text-muted-foreground mb-6">Kindly fill in the form below to create a budget</p>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget-number">Budget number</Label>
                      <Input id="budget-number" placeholder="Enter S/N" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget-description">Budget description</Label>
                      <Input id="budget-description" placeholder="Enter description" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget-amount">Budget amount</Label>
                      <Input id="budget-amount" placeholder="Enter amount in $" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" placeholder="DD/MM/YYYY" type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="receiving-office">Receiving office</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="it">IT Department</SelectItem>
                        <SelectItem value="finance">Finance Department</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full bg-[#0089ff] hover:bg-[#248cd8]">
                    Create Budget
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Budget Request</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-muted-foreground border-b">
                      <th className="text-left py-3 px-2">S/N</th>
                      <th className="text-left py-3 px-2">Budget No.</th>
                      <th className="text-left py-3 px-2">Budget Description</th>
                      <th className="text-left py-3 px-2">Budget Amount ($)</th>
                      <th className="text-left py-3 px-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-2">01</td>
                      <td className="py-3 px-2">00211235</td>
                      <td className="py-3 px-2">Purchase of 10 units, 2Hp Hisense Air Conditioners</td>
                      <td className="py-3 px-2">1,400,000.00</td>
                      <td className="py-3 px-2">18/11/2022</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-4">
                <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Submit for Approval</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2023 Rota Energy. All Rights Reserved
        </div>
      </div>
    </div>
  )
}
