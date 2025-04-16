import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import Link from "next/link"

export default function OfficeBudgetPage() {
  return (
    <div>
      <PageHeader title="Office Budget and Create Budget" />

      <div className="p-6">
        <div className="flex items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold">Office Budget</h2>
            <p className="text-sm text-muted-foreground">View and manage budget requests</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">₹23,000,000</p>
                  <p className="text-sm text-muted-foreground">Total annual budget</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-[#10a142]">↑ 1% over than last year</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-[#e8f5ff]">
                  <Lock className="h-6 w-6 text-[#0089ff]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">₹10,000,000</p>
                  <p className="text-sm text-muted-foreground">Amount used YTD</p>
                </div>
                <div className="p-2 rounded-full bg-[#fff4e8]">
                  <Lock className="h-6 w-6 text-[#f29425]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">₹13,000,000</p>
                  <p className="text-sm text-muted-foreground">Total budget balance</p>
                </div>
                <div className="p-2 rounded-full bg-[#f9efff]">
                  <Lock className="h-6 w-6 text-[#a601ff]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">48%</p>
                  <p className="text-sm text-muted-foreground">Budget % used</p>
                </div>
                <div className="p-2 rounded-full bg-[#ecfff2]">
                  <Lock className="h-6 w-6 text-[#10a142]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Create a Budget</h3>
          <div className="flex justify-end mb-4">
            <Link href="/office-budget/create">
              <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Create Budget</Button>
            </Link>
          </div>
        </div>

        <Card className="mt-4">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Budget History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b">
                    <th className="text-left py-3 px-2">S/N</th>
                    <th className="text-left py-3 px-2">Budget No</th>
                    <th className="text-left py-3 px-2">Budget Description</th>
                    <th className="text-left py-3 px-2">Budgeted Amount (₹)</th>
                    <th className="text-left py-3 px-2">Actual Amount (₹)</th>
                    <th className="text-left py-3 px-2">Variance (₹)</th>
                    <th className="text-left py-3 px-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-2">01</td>
                    <td className="py-3 px-2">00211235</td>
                    <td className="py-3 px-2">Purchase of 10 units, 2Hp Hisense Air Conditioners</td>
                    <td className="py-3 px-2">1,400,000.00</td>
                    <td className="py-3 px-2">1,380,000.00</td>
                    <td className="py-3 px-2 text-[#10a142]">+ 20,000.00</td>
                    <td className="py-3 px-2">18/11/2022</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">02</td>
                    <td className="py-3 px-2">30211235</td>
                    <td className="py-3 px-2">Purchase of office equipments</td>
                    <td className="py-3 px-2">400,000.00</td>
                    <td className="py-3 px-2">500,000.00</td>
                    <td className="py-3 px-2 text-[#ed3237]">- 100,000.00</td>
                    <td className="py-3 px-2">20/09/2022</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">03</td>
                    <td className="py-3 px-2">00211235</td>
                    <td className="py-3 px-2">Purchase of 20 units, 2Hp Hisense Air Conditioners</td>
                    <td className="py-3 px-2">2,000,000.00</td>
                    <td className="py-3 px-2">1,800,000.00</td>
                    <td className="py-3 px-2 text-[#10a142]">+ 200,000.00</td>
                    <td className="py-3 px-2">01/09/2022</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2023 Rota Energy. All Rights Reserved
        </div>
      </div>
    </div>
  )
}
