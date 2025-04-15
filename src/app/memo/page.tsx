"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowUp, ArrowDown } from "lucide-react"
import Link from "next/link"
import { CreateMemoModal } from "@/components/create-memo-modal"

export default function MemoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValue, setFilterValue] = useState("all-memos")
  const [itemsPerPage, setItemsPerPage] = useState(16)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const memos = [
    {
      id: "01",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "Yes",
      type: "Sent",
    },
    {
      id: "02",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "No",
      type: "Sent",
    },
    {
      id: "03",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "No",
      type: "Sent",
    },
    {
      id: "04",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "Yes",
      type: "Received",
    },
    {
      id: "05",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "Yes",
      type: "Sent",
    },
    {
      id: "06",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "Yes",
      type: "Sent",
    },
    {
      id: "07",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "No",
      type: "Sent",
    },
    {
      id: "08",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "Yes",
      type: "Received",
    },
    {
      id: "09",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "No",
      type: "Sent",
    },
    {
      id: "10",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "Yes",
      type: "Received",
    },
    {
      id: "11",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "Yes",
      type: "Sent",
    },
    {
      id: "12",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "Yes",
      type: "Sent",
    },
    {
      id: "13",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "Yes",
      type: "Sent",
    },
    {
      id: "14",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "Yes",
      type: "Sent",
    },
    {
      id: "15",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "Yes",
      type: "Received",
    },
    {
      id: "16",
      title: "Operations memo",
      sentFrom: "Williams Achegbani",
      sentTo: "Chief Operations Officer",
      date: "16/11/2022",
      attachment: "Yes",
      type: "Sent",
    },
  ]

  const filteredMemos = memos.filter((memo) => {
    const matchesSearch = memo.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterValue === "all-memos" || memo.type.toLowerCase() === filterValue.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const handleCreateMemoSuccess = () => {
    setShowCreateModal(false)
    // In a real app, you would refresh the memo list here
  }

  return (
    <div>
      <PageHeader title="Memo" />

      <div className="p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">Create and send memos to designated offices.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-[400px]">
              <p className="text-sm mb-2">Quick search a memo</p>
              <div className="relative">
                <Input
                  placeholder="Enter search word"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="w-full md:w-[250px]">
              <p className="text-sm mb-2">Filter memo</p>
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger>
                  <SelectValue placeholder="All memos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-memos">All memos</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold">300</p>
              <p className="text-sm text-muted-foreground">Total memo</p>
            </div>
            <Button className="ml-6 bg-[#0089ff] hover:bg-[#248cd8]" onClick={() => setShowCreateModal(true)}>
              Create Memo
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">All Memos</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Showing</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => setItemsPerPage(Number.parseInt(value))}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder={itemsPerPage} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="16">16</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">per page</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-medium text-muted-foreground border-b">
                    <th className="text-left py-3 px-4">S/N</th>
                    <th className="text-left py-3 px-4">Memo Title</th>
                    <th className="text-left py-3 px-4">Sent From</th>
                    <th className="text-left py-3 px-4">Sent To</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Attachment?</th>
                    <th className="text-left py-3 px-4">Memo Type</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMemos.map((memo) => (
                    <tr key={memo.id} className="border-b">
                      <td className="py-4 px-4">{memo.id}</td>
                      <td className="py-4 px-4">{memo.title}</td>
                      <td className="py-4 px-4">{memo.sentFrom}</td>
                      <td className="py-4 px-4">{memo.sentTo}</td>
                      <td className="py-4 px-4">{memo.date}</td>
                      <td className="py-4 px-4">{memo.attachment}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          {memo.type === "Sent" ? (
                            <ArrowUp className="h-4 w-4 text-[#0089ff] mr-1" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-[#10a142] mr-1" />
                          )}
                          {memo.type}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Link href={`/memo/${memo.id}`}>
                          <Button variant="link" className="h-auto p-0 text-[#0089ff]">
                            View more
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-[#0089ff] text-white">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  3
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  4
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  5
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  &gt;&gt;
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2022 Relia Energy. All Rights Reserved
        </div>
      </div>

      {showCreateModal && (
        <CreateMemoModal onClose={() => setShowCreateModal(false)} onSuccess={handleCreateMemoSuccess} />
      )}
    </div>
  )
}
