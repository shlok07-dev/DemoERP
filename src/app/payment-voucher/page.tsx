"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText, DollarSign, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function PaymentVoucherPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValue, setFilterValue] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const vouchers = [
    {
      id: "PV001",
      date: "2023-10-15",
      payee: "Office Supplies Ltd",
      description: "Office supplies for Q4",
      amount: "250,000.00 ₹",
      requestedBy: "John Doe",
      approvedBy: "Sarah Johnson",
      status: "Approved",
    },
    {
      id: "PV002",
      date: "2023-10-16",
      payee: "Tech Solutions Inc",
      description: "IT equipment purchase",
      amount: "1,500,000.00 ₹",
      requestedBy: "Jane Smith",
      approvedBy: "Michael Brown",
      status: "Approved",
    },
    {
      id: "PV003",
      date: "2023-10-17",
      payee: "Maintenance Services",
      description: "Office maintenance",
      amount: "350,000.00 ₹",
      requestedBy: "Robert Wilson",
      approvedBy: "Pending",
      status: "Pending",
    },
    {
      id: "PV004",
      date: "2023-10-18",
      payee: "Training Solutions",
      description: "Staff training program",
      amount: "800,000.00 ₹",
      requestedBy: "Emily Davis",
      approvedBy: "Pending",
      status: "Pending",
    },
    {
      id: "PV005",
      date: "2023-10-19",
      payee: "Catering Services",
      description: "Company event catering",
      amount: "450,000.00 ₹",
      requestedBy: "Michael Johnson",
      approvedBy: "Rejected",
      status: "Rejected",
    },
    {
      id: "PV006",
      date: "2023-10-20",
      payee: "Marketing Agency",
      description: "Q4 marketing campaign",
      amount: "1,200,000.00 ₹",
      requestedBy: "David Wilson",
      approvedBy: "Sarah Johnson",
      status: "Approved",
    },
    {
      id: "PV007",
      date: "2023-10-21",
      payee: "Consulting Group",
      description: "Business strategy consulting",
      amount: "2,000,000.00 ₹",
      requestedBy: "Lisa Anderson",
      approvedBy: "Pending",
      status: "Pending",
    },
    {
      id: "PV008",
      date: "2023-10-22",
      payee: "Utility Company",
      description: "Monthly utility bills",
      amount: "180,000.00 ₹",
      requestedBy: "John Doe",
      approvedBy: "Sarah Johnson",
      status: "Approved",
    },
  ]

  const filteredVouchers = vouchers.filter((voucher) => {
    const matchesSearch =
      voucher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.requestedBy.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterValue === "all" ||
      (filterValue === "approved" && voucher.status === "Approved") ||
      (filterValue === "pending" && voucher.status === "Pending") ||
      (filterValue === "rejected" && voucher.status === "Rejected")

    return matchesSearch && matchesFilter
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredVouchers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVouchers = filteredVouchers.slice(startIndex, startIndex + itemsPerPage)

  // Calculate statistics
  const totalAmount = vouchers.reduce((sum, voucher) => {
    return sum + Number.parseFloat(voucher.amount.replace("₹", "").replace(",", ""))
  }, 0)

  const approvedAmount = vouchers
    .filter((voucher) => voucher.status === "Approved")
    .reduce((sum, voucher) => {
      return sum + Number.parseFloat(voucher.amount.replace("₹", "").replace(",", ""))
    }, 0)

  const pendingAmount = vouchers
    .filter((voucher) => voucher.status === "Pending")
    .reduce((sum, voucher) => {
      return sum + Number.parseFloat(voucher.amount.replace("₹", "").replace(",", ""))
    }, 0)

  return (
    <div>
      <PageHeader title="Payment Voucher">
        <Link href="/payment-voucher/create">
          <Button className="bg-white text-[#0089ff] hover:bg-gray-100">Create Voucher</Button>
        </Link>
      </PageHeader>

      <div className="p-4 sm:p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">Create and manage payment vouchers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">{vouchers.length}</p>
                  <p className="text-sm text-muted-foreground">Total Vouchers</p>
                </div>
                <div className="p-2 rounded-full bg-[#e8f5ff]">
                  <FileText className="h-6 w-6 text-[#0089ff]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">{totalAmount.toLocaleString()} ₹</p>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                </div>
                <div className="p-2 rounded-full bg-[#f9efff]">
                  <DollarSign className="h-6 w-6 text-[#a601ff]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">{approvedAmount.toLocaleString()} ₹</p>
                  <p className="text-sm text-muted-foreground">Approved Amount</p>
                </div>
                <div className="p-2 rounded-full bg-[#ecfff2]">
                  <CheckCircle className="h-6 w-6 text-[#10a142]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">{pendingAmount.toLocaleString()} ₹</p>
                  <p className="text-sm text-muted-foreground">Pending Amount</p>
                </div>
                <div className="p-2 rounded-full bg-[#fff8df]">
                  <Clock className="h-6 w-6 text-[#fdcc1c]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-[300px]">
              <Input
                placeholder="Search vouchers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <Select value={filterValue} onValueChange={setFilterValue}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vouchers</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number.parseInt(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">per page</span>
          </div>
        </div>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-xl font-bold mb-4">Payment Vouchers</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-medium text-muted-foreground border-b">
                    <th className="text-left py-3 px-4">Voucher ID</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Payee</th>
                    <th className="text-left py-3 px-4">Description</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Requested By</th>
                    <th className="text-left py-3 px-4">Approved By</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedVouchers.map((voucher, index) => (
                    <tr key={voucher.id} className={index !== paginatedVouchers.length - 1 ? "border-b" : ""}>
                      <td className="py-4 px-4">{voucher.id}</td>
                      <td className="py-4 px-4">{voucher.date}</td>
                      <td className="py-4 px-4">{voucher.payee}</td>
                      <td className="py-4 px-4">{voucher.description}</td>
                      <td className="py-4 px-4">{voucher.amount}</td>
                      <td className="py-4 px-4">{voucher.requestedBy}</td>
                      <td className="py-4 px-4">{voucher.approvedBy}</td>
                      <td className="py-4 px-4">
                        <Badge
                          variant="outline"
                          className={
                            voucher.status === "Approved"
                              ? "bg-[#ecfff2] text-[#10a142] border-[#10a142]"
                              : voucher.status === "Pending"
                                ? "bg-[#fff8df] text-[#fdcc1c] border-[#fdcc1c]"
                                : "bg-[#ffe4e4] text-[#ed3237] border-[#ed3237]"
                          }
                        >
                          {voucher.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Link href={`/payment-voucher/${voucher.id}`}>
                            <Button variant="link" className="h-auto p-0 text-[#0089ff]">
                              View
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                  >
                    &lt;
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber = i + 1
                    if (totalPages > 5) {
                      if (currentPage > 3) {
                        pageNumber = currentPage - 3 + i
                      }
                      if (pageNumber > totalPages) {
                        pageNumber = totalPages - (4 - i)
                      }
                    }
                    return (
                      <Button
                        key={i}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNumber)}
                        className="h-8 w-8 p-0"
                      >
                        {pageNumber}
                      </Button>
                    )
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                  >
                    &gt;
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2023 UiUxOtor ERP System. All Rights Reserved
        </div>
      </div>
    </div>
  )
}
