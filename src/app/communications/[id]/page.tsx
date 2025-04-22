"use client"

import { useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function MemoDetailPage({ params }: { params: { id: string } }) {
  const [memo] = useState({
    id: params.id,
    title: "Operations Memo",
    date: "21/12/2022",
    from: "Otor John Stephen",
    to: "Ibrahim Algarish",
    cc1: "Fatimah Mohammed",
    cc2: "Sadiq Labewar",
    cc3: "Isma Nweke Jnr",
    attachment: "No",
    message: `Lorem ipsum dolor sit amet consectetur. Aliquot nisl laoreet nunc enim dignissim pulvinar at enim nulla. Lorem eget ultricies est tellus enim proin et. Nunc enim dignissim pulvinar at enim nulla. Lorem eget ultricies est tellus enim proin id.

Fermentum mi ipsum eleifend ultrices metus. Amet praesent convallis vivamus rhoncus. Vulputat ut aliquet elementum facilisi consectetur. Amet rhoncus vitae lacinia et integer. In eu praesent convallis magna vitae porttitor a. Eu nulla viverra ut gravida a proin id ligula. Massa integer in eleifend nec porta duis diam id pellentesque. Sem viverra auctor quisque diam pharetra.`,
  })

  return (
    <div>
      <PageHeader title="Create Memo" />

      <div className="p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">Create and send memos to designated offices.</p>
        </div>

        <Link href="/memo" className="flex items-center text-sm text-[#0089ff] mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Link>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6">{memo.title}</h2>

            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Date:</p>
                  <p className="text-sm">{memo.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">From:</p>
                  <p className="text-sm">{memo.from}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">To:</p>
                <p className="text-sm">{memo.to}</p>
              </div>

              <div>
                <p className="text-sm font-medium">CC1:</p>
                <p className="text-sm">{memo.cc1}</p>
              </div>

              <div>
                <p className="text-sm font-medium">CC2:</p>
                <p className="text-sm">{memo.cc2}</p>
              </div>

              <div>
                <p className="text-sm font-medium">CC3:</p>
                <p className="text-sm">{memo.cc3}</p>
              </div>

              <div>
                <p className="text-sm font-medium">Attachment:</p>
                <p className="text-sm">{memo.attachment}</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium mb-2">Memo Message:</p>
              <div className="whitespace-pre-line">{memo.message}</div>
            </div>

            <div className="border-t pt-8">
              <div className="flex justify-center mb-4">
                <Image
                  src="/placeholder.svg?height=60&width=120"
                  alt="Relia Energy"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Action: Recommended for approval</p>
                </div>
                <div>
                  <p className="text-sm font-medium">By: Fatimah Mohammed</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Signature:</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="w-1/3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approve">Approve</SelectItem>
                      <SelectItem value="reject">Reject</SelectItem>
                      <SelectItem value="review">Request Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-1/3">
                  <Input placeholder="Enter remark" />
                </div>
                <div>
                  <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Submit</Button>
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

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
