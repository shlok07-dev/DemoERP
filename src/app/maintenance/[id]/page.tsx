"use client"

import { useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function MaintenanceDetailPage({ params }: { params: { id: string } }) {
  const [maintenance] = useState({
    id: params.id,
    itemName: "2Hp Hisense Air Condition",
    number: "3",
    date: "18/11/2022",
    maintenanceType: "Recurring",
    recurringType: "Every two months",
    status: "Completed",
  })

  return (
    <div>
      <PageHeader title="Schedule Maintenance" />

      <div className="p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">Schedule a maintenance for future use.</p>
        </div>

        <Link href="/maintenance" className="flex items-center text-sm text-[#0089ff] mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Link>

        <h2 className="text-xl font-bold mb-6">Scheduled Maintenance</h2>

        <Card className="max-w-4xl mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
              <div className="col-span-2">
                <p className="text-sm font-medium">Item name</p>
                <p className="text-base">{maintenance.itemName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Number</p>
                <p className="text-base">{maintenance.number}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-base">{maintenance.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Maintenance type</p>
                <p className="text-base">{maintenance.maintenanceType}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Recurring type</p>
                <p className="text-base">{maintenance.recurringType}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Status</p>
                <div className="flex items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1"
                  >
                    <path
                      d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572"
                      stroke="#10a142"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 4L12 14.01L9 11.01"
                      stroke="#10a142"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[#10a142]">{maintenance.status}</span>
                </div>
              </div>
              <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Attach Payment Invoice</Button>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl font-bold mb-6">Maintenance Breakdown</h2>

        <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg mb-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">To Be Designed</h3>
            <div className="text-4xl">😍✨✨😍</div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button className="w-full max-w-md bg-[#0089ff] hover:bg-[#248cd8]">Submit</Button>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2022 Relia Energy. All Rights Reserved
        </div>
      </div>
    </div>
  )
}
