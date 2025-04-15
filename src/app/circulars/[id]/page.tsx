"use client"

import { useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function CircularDetailPage({ params }: { params: { id: string } }) {
  const [circular] = useState({
    id: params.id,
    title: "HR Circular for Operations Department Staff",
    sentFrom: "Admin, HR",
    sentFromName: "Otor John",
    sentFromEmail: "otorjohn@example.com",
    sentTo: "Operations Staffs",
    date: "16/11/2022",
    time: "10:30 AM",
    type: "Sent",
    message: `Dear Operations Department Staff,

We would like to inform you about the upcoming changes to the office hours and attendance policy. Starting from next month, the office hours will be from 8:00 AM to 5:00 PM, Monday to Friday.

Additionally, we are implementing a new biometric attendance system to track employee attendance more accurately. All employees are required to register their fingerprints with the HR department by the end of this week.

Please note that these changes are being made to improve productivity and ensure a more efficient work environment. If you have any questions or concerns, please feel free to reach out to the HR department.

Thank you for your cooperation.

Best regards,
HR Department`,
  })

  return (
    <div>
      <PageHeader title="Circulars" />

      <div className="p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">Search for, and view all circulars</p>
        </div>

        <Link href="/circulars" className="flex items-center text-sm text-[#0089ff] mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Link>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold">{circular.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {circular.date} at {circular.time}
                </p>
              </div>
              <Badge
                variant="outline"
                className={
                  circular.type === "Sent"
                    ? "bg-[#e8f5ff] text-[#0089ff] border-[#0089ff]"
                    : "bg-[#ecfff2] text-[#10a142] border-[#10a142]"
                }
              >
                {circular.type}
              </Badge>
            </div>

            <div className="flex items-center mb-6">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={circular.sentFromName} />
                <AvatarFallback>
                  {circular.sentFromName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{circular.sentFromName}</p>
                <p className="text-sm text-muted-foreground">{circular.sentFromEmail}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium mb-1">To: {circular.sentTo}</p>
            </div>

            <div className="border-t pt-6">
              <div className="whitespace-pre-line">{circular.message}</div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button variant="outline" className="mr-2">
                Reply
              </Button>
              <Button variant="outline" className="mr-2">
                Forward
              </Button>
              <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Print</Button>
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
