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
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CreateTaxDefinitionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    taxType: "",
    percentValue: "",
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
        description: "Tax definition created successfully",
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

        <h2 className="text-2xl font-bold mb-6">Create Tax Definition</h2>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="tax-type">Tax type</Label>
                  <Input
                    id="tax-type"
                    placeholder="Enter tax name"
                    value={formData.taxType}
                    onChange={(e) => handleChange("taxType", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="percent-value">% value</Label>
                  <Input
                    id="percent-value"
                    placeholder="Enter % value"
                    value={formData.percentValue}
                    onChange={(e) => handleChange("percentValue", e.target.value)}
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
