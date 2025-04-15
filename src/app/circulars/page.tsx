"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUp, Search } from "lucide-react"
import Link from "next/link"

export default function CircularsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValue, setFilterValue] = useState("all-memos")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(13)

  const circulars = [
    {
      id: "01",
      title: "HR Circular for Operations Department Staff",
      sentFrom: "Admin, HR",
      sentTo: "Operations Staffs",
      date: "16/11/2022",
      type: "Sent",
    },
    {
      id: "02",
      title: "Management Circular for HR Staffs",
      sentFrom: "Admin, HR",
      sentTo: "HR Staffs",
      date: "16/11/2022",
      type: "Sent",
    },
    {
      id: "03",
      title: "Circular for Time Maintainance in the Office",
      sentFrom: "Management",
      sentTo: "All Staff",
      date: "16/11/2022",
      type: "Received",
    },
    {
      id: "04",
      title: "HR Circular for Operations Department Staff",
      sentFrom: "Admin, HR",
      sentTo: "Operations Staffs",
      date: "16/11/2022",
      type: "Sent",
    },
    {
      id: "05",
      title: "HR Circular for Operations Department Staff",
      sentFrom: "Admin, HR",
      sentTo: "Operations Staffs",
      date: "16/11/2022",
      type: "Received",
    },
    {
      id: "06",
      title: "HR Circular for Operations Department Staff",
      sentFrom: "Admin, HR",
      sentTo: "Operations Staffs",
      date: "16/11/2022",
      type: "Sent",
    },
    {
      id: "07",
      title: "HR Circular for Operations Department Staff",
      sentFrom: "Admin, HR",
      sentTo: "Operations Staffs",
      date: "16/11/2022",
      type: "Sent",
    },
    {
      id: "08",
      title: "HR Circular for Operations Department Staff",
      sentFrom: "Admin, HR",
      sentTo: "Operations Staffs",
      date: "16/11/2022",
      type: "Received",
    },
    {
      id: "09",
      title: "HR Circular for Operations Department Staff",
      sentFrom: "Admin, HR",
      sentTo: "Operations Staffs",
      date: "16/11/2022",
      type: "Received",
    },
    {
      id: "10",
      title: "HR Circular for Operations Department Staff",
      sentFrom: "Admin, HR",
      sentTo: "Operations Staffs",
      date: "16/11/2022",
      type: "Sent",
    },
    {
      id: "11",
      title: "HR Circular for Operations Department Staff",
      sentFrom: "Admin, HR",
      sentTo: "Operations Staffs",
      date: "16/11/2022",
      type: "Sent",
    },
    {
      id: "12",
      title: "HR Circular for Operations Department Staff",
      sentFrom: "Admin, HR",
      sentTo: "Operations Staffs",
      date: "16/11/2022",
      type: "Sent",
    },
    {
      id: "13",
      title: "HR Circular for Operations Department Staff",
      sentFrom: "Admin, HR",
      sentTo: "Operations Staffs",
      date: "16/11/2022",
      type: "Sent",
    },
  ]

  const filteredCirculars = circulars.filter((circular) => {
    const matchesSearch = circular.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterValue === "all-memos" || circular.type.toLowerCase() === filterValue.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const totalPages = Math.ceil(filteredCirculars.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCirculars = filteredCirculars.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div>
      <PageHeader title="Circulars" />

      <div className="p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">Search for, and view all circulars</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-[400px]">
              <p className="text-sm mb-2">Quick search a circular</p>
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
              <p className="text-sm mb-2">Filter circulars</p>
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
              <p className="text-3xl font-bold">150</p>
              <p className="text-sm text-muted-foreground">Total circulars</p>
            </div>
            <Link href="/circulars/create" className="ml-6">
              <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Create Circular</Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6">All Circulars</h2>

            <div className="flex justify-end mb-4">
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
                    <SelectItem value="13">13</SelectItem>
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
                    <th className="text-left py-3 px-4">Circular Title</th>
                    <th className="text-left py-3 px-4">Sent From</th>
                    <th className="text-left py-3 px-4">Sent To</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Circular Type</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCirculars.map((circular, index) => (
                    <tr key={circular.id} className={index !== paginatedCirculars.length - 1 ? "border-b" : ""}>
                      <td className="py-4 px-4">{circular.id}</td>
                      <td className="py-4 px-4">{circular.title}</td>
                      <td className="py-4 px-4">{circular.sentFrom}</td>
                      <td className="py-4 px-4">{circular.sentTo}</td>
                      <td className="py-4 px-4">{circular.date}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          {circular.type === "Sent" ? (
                            <ArrowUp className="h-4 w-4 text-[#0089ff] mr-1" />
                          ) : (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-1"
                            >
                              <path
                                d="M8 12.6667L8 3.33334"
                                stroke="#10A142"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M3.33331 8.00001L7.99998 3.33334L12.6666 8.00001"
                                stroke="#10A142"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {circular.type}
                        </div>
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

            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  1
                </Button>
                {currentPage > 3 && <span>...</span>}
                {currentPage > 2 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="h-8 w-8 p-0"
                  >
                    {currentPage - 1}
                  </Button>
                )}
                {currentPage !== 1 && currentPage !== totalPages && (
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-[#0089ff] text-white" disabled>
                    {currentPage}
                  </Button>
                )}
                {currentPage < totalPages - 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="h-8 w-8 p-0"
                  >
                    {currentPage + 1}
                  </Button>
                )}
                {currentPage < totalPages - 2 && <span>...</span>}
                {totalPages > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                  >
                    {totalPages}
                  </Button>
                )}
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
