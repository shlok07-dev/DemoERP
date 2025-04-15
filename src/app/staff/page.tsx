"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users, UserPlus, UserCheck, UserX } from "lucide-react"
import Link from "next/link"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js"
import { Bar, Pie } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValue, setFilterValue] = useState("all-staff")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [activeTab, setActiveTab] = useState("list")

  const staffList = [
    {
      id: "01",
      firstName: "Sandra",
      lastName: "Williams",
      gender: "Female",
      staffId: "0246AHR",
      phoneNumber: "08130000000",
      role: "Admin",
      designation: "Human Resources",
    },
    {
      id: "02",
      firstName: "Abubakar",
      lastName: "Ibrahim",
      gender: "Male",
      staffId: "0251ITO",
      phoneNumber: "07062000033",
      role: "I.T",
      designation: "Operations",
    },
    {
      id: "03",
      firstName: "Ikechukwu",
      lastName: "Ugbonna",
      gender: "Male",
      staffId: "0340ITO",
      phoneNumber: "08130000000",
      role: "I.T",
      designation: "Operations",
    },
    {
      id: "04",
      firstName: "Joshua",
      lastName: "Adewale",
      gender: "Male",
      staffId: "0146APM",
      phoneNumber: "07038126632",
      role: "Admin",
      designation: "Project Management",
    },
    {
      id: "05",
      firstName: "Fatimah",
      lastName: "Nasir",
      gender: "Female",
      staffId: "0226ACS",
      phoneNumber: "08130000000",
      role: "Admin",
      designation: "Customer Service",
    },
    {
      id: "06",
      firstName: "Hauwa",
      lastName: "Lateef",
      gender: "Female",
      staffId: "0124HR",
      phoneNumber: "08130000000",
      role: "I.T",
      designation: "Human Resources",
    },
    {
      id: "07",
      firstName: "Sandra",
      lastName: "Williams",
      gender: "Female",
      staffId: "0246AH",
      phoneNumber: "08130000000",
      role: "Admin",
      designation: "Human Resources",
    },
    {
      id: "08",
      firstName: "Sandra",
      lastName: "Williams",
      gender: "Female",
      staffId: "0246AH",
      phoneNumber: "08130000000",
      role: "None",
      designation: "Cleaning",
    },
    {
      id: "09",
      firstName: "Sandra",
      lastName: "Williams",
      gender: "Female",
      staffId: "0246PMO",
      phoneNumber: "08130000000",
      role: "P.M",
      designation: "Operations",
    },
    {
      id: "10",
      firstName: "Sunday",
      lastName: "Alison",
      gender: "Male",
      staffId: "0246AH",
      phoneNumber: "08130000000",
      role: "None",
      designation: "Security",
    },
  ]

  const filteredStaff = staffList.filter((staff) => {
    const fullName = `${staff.firstName} ${staff.lastName}`.toLowerCase()
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      staff.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.designation.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterValue === "all-staff" ||
      (filterValue === "admin" && staff.role === "Admin") ||
      (filterValue === "it" && staff.role === "I.T") ||
      (filterValue === "hr" && staff.designation === "Human Resources")

    return matchesSearch && matchesFilter
  })

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStaff = filteredStaff.slice(startIndex, startIndex + itemsPerPage)

  // Staff analytics data
  const departmentDistribution = {
    labels: ["Human Resources", "Operations", "Project Management", "Customer Service", "Security", "Cleaning"],
    datasets: [
      {
        data: [3, 3, 1, 1, 1, 1],
        backgroundColor: [
          "rgba(0, 137, 255, 0.7)",
          "rgba(16, 161, 66, 0.7)",
          "rgba(253, 204, 28, 0.7)",
          "rgba(166, 1, 255, 0.7)",
          "rgba(237, 50, 55, 0.7)",
          "rgba(36, 140, 216, 0.7)",
        ],
        borderColor: [
          "rgba(0, 137, 255, 1)",
          "rgba(16, 161, 66, 1)",
          "rgba(253, 204, 28, 1)",
          "rgba(166, 1, 255, 1)",
          "rgba(237, 50, 55, 1)",
          "rgba(36, 140, 216, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const genderDistribution = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [4, 6],
        backgroundColor: ["rgba(0, 137, 255, 0.7)", "rgba(166, 1, 255, 0.7)"],
        borderColor: ["rgba(0, 137, 255, 1)", "rgba(166, 1, 255, 1)"],
        borderWidth: 1,
      },
    ],
  }

  const roleDistribution = {
    labels: ["Admin", "I.T", "P.M", "None"],
    datasets: [
      {
        label: "Staff Count",
        data: [4, 3, 1, 2],
        backgroundColor: [
          "rgba(0, 137, 255, 0.7)",
          "rgba(16, 161, 66, 0.7)",
          "rgba(253, 204, 28, 0.7)",
          "rgba(166, 1, 255, 0.7)",
        ],
      },
    ],
  }

  // Chart options
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div>
      <PageHeader
        title="Human Resources Hub"
        subtitle="Manage your workforce, track employee data, and analyze staff metrics in one place."
      />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-3xl font-bold">250</p>
                  <p className="text-sm text-muted-foreground">Total Staff</p>
                </div>
                <div className="p-2 rounded-full bg-[#e8f5ff]">
                  <Users className="h-6 w-6 text-[#0089ff]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-3xl font-bold">150</p>
                  <p className="text-sm text-muted-foreground">Active Staff</p>
                </div>
                <div className="p-2 rounded-full bg-[#ecfff2]">
                  <UserCheck className="h-6 w-6 text-[#10a142]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-3xl font-bold">25</p>
                  <p className="text-sm text-muted-foreground">New Hires</p>
                </div>
                <div className="p-2 rounded-full bg-[#fff8df]">
                  <UserPlus className="h-6 w-6 text-[#fdcc1c]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-3xl font-bold">10</p>
                  <p className="text-sm text-muted-foreground">Departures</p>
                </div>
                <div className="p-2 rounded-full bg-[#ffe4e4]">
                  <UserX className="h-6 w-6 text-[#ed3237]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/60 p-1">
            <TabsTrigger value="list" className="text-sm">
              Employee Directory
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm">
              Workforce Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-sm">
              HR Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-[400px]">
                  <p className="text-sm mb-2">Quick search a staff</p>
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
                  <p className="text-sm mb-2">Filter staff</p>
                  <Select value={filterValue} onValueChange={setFilterValue}>
                    <SelectTrigger>
                      <SelectValue placeholder="All staff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-staff">All staff</SelectItem>
                      <SelectItem value="admin">Admin staff</SelectItem>
                      <SelectItem value="it">IT staff</SelectItem>
                      <SelectItem value="hr">Human Resources staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center">
                <Link href="/staff/add" className="ml-6">
                  <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Add New Staff</Button>
                </Link>
              </div>
            </div>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Employee Directory</h2>

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
                        <SelectItem value="12">12</SelectItem>
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
                        <th className="text-left py-3 px-4">First Name</th>
                        <th className="text-left py-3 px-4">Last Name</th>
                        <th className="text-left py-3 px-4">Gender</th>
                        <th className="text-left py-3 px-4">Staff ID</th>
                        <th className="text-left py-3 px-4">Phone Number</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Designation</th>
                        <th className="text-left py-3 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedStaff.map((staff, index) => (
                        <tr
                          key={`${staff.id}-${index}`}
                          className={index !== paginatedStaff.length - 1 ? "border-b" : ""}
                        >
                          <td className="py-4 px-4">{staff.id}</td>
                          <td className="py-4 px-4">{staff.firstName}</td>
                          <td className="py-4 px-4">{staff.lastName}</td>
                          <td className="py-4 px-4">{staff.gender}</td>
                          <td className="py-4 px-4">{staff.staffId}</td>
                          <td className="py-4 px-4">{staff.phoneNumber}</td>
                          <td className="py-4 px-4">{staff.role}</td>
                          <td className="py-4 px-4">{staff.designation}</td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Button variant="link" className="h-auto p-0 text-[#0089ff]">
                                View more
                              </Button>
                              <Link href={`/staff/${staff.id}`}>
                                <Button variant="link" className="h-auto p-0 text-[#0089ff]">
                                  Edit
                                </Button>
                              </Link>
                            </div>
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Department Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <Pie options={pieOptions} data={departmentDistribution} />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Gender Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <Pie options={pieOptions} data={genderDistribution} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Role Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Bar options={barOptions} data={roleDistribution} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Staff Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-medium text-muted-foreground border-b">
                        <th className="text-left py-3 px-4">ID</th>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Gender</th>
                        <th className="text-left py-3 px-4">Staff ID</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Designation</th>
                        <th className="text-left py-3 px-4">Join Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffList.map((staff, index) => (
                        <tr key={`${staff.id}-${index}`} className="border-b">
                          <td className="py-4 px-4">{staff.id}</td>
                          <td className="py-4 px-4">{`${staff.firstName} ${staff.lastName}`}</td>
                          <td className="py-4 px-4">{staff.gender}</td>
                          <td className="py-4 px-4">{staff.staffId}</td>
                          <td className="py-4 px-4">{staff.role}</td>
                          <td className="py-4 px-4">{staff.designation}</td>
                          <td className="py-4 px-4">{`2022-${(index % 12) + 1}-${(index % 28) + 1}`}</td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-[#ecfff2] text-[#10a142]">Active</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2023 UiUxOtor ERP System. All Rights Reserved
        </div>
      </div>
    </div>
  )
}
