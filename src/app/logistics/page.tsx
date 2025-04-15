"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Truck, Package, MapPin } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function LogisticsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValue, setFilterValue] = useState("all")
  const [activeTab, setActiveTab] = useState("vehicles")

  const vehicles = [
    {
      id: "V001",
      name: "Toyota Hilux",
      type: "Pickup Truck",
      licensePlate: "ABC-123",
      driver: "John Doe",
      status: "Available",
      lastMaintenance: "2023-05-15",
      nextMaintenance: "2023-11-15",
    },
    {
      id: "V002",
      name: "Toyota Sienna",
      type: "Minivan",
      licensePlate: "DEF-456",
      driver: "Jane Smith",
      status: "In Use",
      lastMaintenance: "2023-06-20",
      nextMaintenance: "2023-12-20",
    },
    {
      id: "V003",
      name: "Ford F-150",
      type: "Pickup Truck",
      licensePlate: "GHI-789",
      driver: "Michael Johnson",
      status: "Maintenance",
      lastMaintenance: "2023-07-10",
      nextMaintenance: "2024-01-10",
    },
    {
      id: "V004",
      name: "Mercedes Sprinter",
      type: "Van",
      licensePlate: "JKL-012",
      driver: "Sarah Williams",
      status: "Available",
      lastMaintenance: "2023-08-05",
      nextMaintenance: "2024-02-05",
    },
  ]

  const deliveries = [
    {
      id: "D001",
      item: "Office Supplies",
      origin: "Headquarters",
      destination: "Branch Office A",
      vehicle: "Toyota Hilux (ABC-123)",
      driver: "John Doe",
      departureDate: "2023-10-15",
      estimatedArrival: "2023-10-15",
      status: "Delivered",
    },
    {
      id: "D002",
      item: "Computer Equipment",
      origin: "Supplier Warehouse",
      destination: "Headquarters",
      vehicle: "Toyota Sienna (DEF-456)",
      driver: "Jane Smith",
      departureDate: "2023-10-16",
      estimatedArrival: "2023-10-16",
      status: "In Transit",
    },
    {
      id: "D003",
      item: "Furniture",
      origin: "Furniture Store",
      destination: "Branch Office B",
      vehicle: "Ford F-150 (GHI-789)",
      driver: "Michael Johnson",
      departureDate: "2023-10-17",
      estimatedArrival: "2023-10-17",
      status: "Scheduled",
    },
    {
      id: "D004",
      item: "Marketing Materials",
      origin: "Print Shop",
      destination: "Conference Center",
      vehicle: "Mercedes Sprinter (JKL-012)",
      driver: "Sarah Williams",
      departureDate: "2023-10-18",
      estimatedArrival: "2023-10-18",
      status: "Scheduled",
    },
  ]

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterValue === "all" ||
      (filterValue === "available" && vehicle.status === "Available") ||
      (filterValue === "in-use" && vehicle.status === "In Use") ||
      (filterValue === "maintenance" && vehicle.status === "Maintenance")

    return matchesSearch && matchesFilter
  })

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.driver.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterValue === "all" ||
      (filterValue === "delivered" && delivery.status === "Delivered") ||
      (filterValue === "in-transit" && delivery.status === "In Transit") ||
      (filterValue === "scheduled" && delivery.status === "Scheduled")

    return matchesSearch && matchesFilter
  })

  return (
    <div>
      <PageHeader title="Logistics Management">
        <div className="flex gap-2">
          <Link href="/logistics/schedule">
            <Button className="bg-white text-[#0089ff] hover:bg-gray-100">Schedule Delivery</Button>
          </Link>
          <Link href="/logistics/add-vehicle">
            <Button className="bg-white text-[#0089ff] hover:bg-gray-100">Add Vehicle</Button>
          </Link>
        </div>
      </PageHeader>

      <div className="p-4 sm:p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">Manage company vehicles and deliveries</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">{vehicles.length}</p>
                  <p className="text-sm text-muted-foreground">Total Vehicles</p>
                </div>
                <div className="p-2 rounded-full bg-[#e8f5ff]">
                  <Truck className="h-6 w-6 text-[#0089ff]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">{vehicles.filter((v) => v.status === "Available").length}</p>
                  <p className="text-sm text-muted-foreground">Available Vehicles</p>
                </div>
                <div className="p-2 rounded-full bg-[#ecfff2]">
                  <Truck className="h-6 w-6 text-[#10a142]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">{deliveries.length}</p>
                  <p className="text-sm text-muted-foreground">Total Deliveries</p>
                </div>
                <div className="p-2 rounded-full bg-[#fff8df]">
                  <Package className="h-6 w-6 text-[#fdcc1c]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">{deliveries.filter((d) => d.status === "In Transit").length}</p>
                  <p className="text-sm text-muted-foreground">Deliveries In Transit</p>
                </div>
                <div className="p-2 rounded-full bg-[#f9efff]">
                  <MapPin className="h-6 w-6 text-[#a601ff]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-[300px]">
              <Input
                placeholder="Search..."
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
                <SelectItem value="all">All</SelectItem>
                {activeTab === "vehicles" ? (
                  <>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="in-use">In Use</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="vehicles" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="vehicles">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-xl font-bold mb-4">Vehicle Fleet</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-medium text-muted-foreground border-b">
                        <th className="text-left py-3 px-4">ID</th>
                        <th className="text-left py-3 px-4">Vehicle</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">License Plate</th>
                        <th className="text-left py-3 px-4">Driver</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Last Maintenance</th>
                        <th className="text-left py-3 px-4">Next Maintenance</th>
                        <th className="text-left py-3 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVehicles.map((vehicle, index) => (
                        <tr key={vehicle.id} className={index !== filteredVehicles.length - 1 ? "border-b" : ""}>
                          <td className="py-4 px-4">{vehicle.id}</td>
                          <td className="py-4 px-4">{vehicle.name}</td>
                          <td className="py-4 px-4">{vehicle.type}</td>
                          <td className="py-4 px-4">{vehicle.licensePlate}</td>
                          <td className="py-4 px-4">{vehicle.driver}</td>
                          <td className="py-4 px-4">
                            <Badge
                              variant="outline"
                              className={
                                vehicle.status === "Available"
                                  ? "bg-[#ecfff2] text-[#10a142] border-[#10a142]"
                                  : vehicle.status === "In Use"
                                    ? "bg-[#e8f5ff] text-[#0089ff] border-[#0089ff]"
                                    : "bg-[#fff8df] text-[#fdcc1c] border-[#fdcc1c]"
                              }
                            >
                              {vehicle.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">{vehicle.lastMaintenance}</td>
                          <td className="py-4 px-4">{vehicle.nextMaintenance}</td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Link href={`/logistics/vehicles/${vehicle.id}`}>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deliveries">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-xl font-bold mb-4">Delivery Schedule</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-medium text-muted-foreground border-b">
                        <th className="text-left py-3 px-4">ID</th>
                        <th className="text-left py-3 px-4">Item</th>
                        <th className="text-left py-3 px-4">Origin</th>
                        <th className="text-left py-3 px-4">Destination</th>
                        <th className="text-left py-3 px-4">Vehicle</th>
                        <th className="text-left py-3 px-4">Driver</th>
                        <th className="text-left py-3 px-4">Departure</th>
                        <th className="text-left py-3 px-4">ETA</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDeliveries.map((delivery, index) => (
                        <tr key={delivery.id} className={index !== filteredDeliveries.length - 1 ? "border-b" : ""}>
                          <td className="py-4 px-4">{delivery.id}</td>
                          <td className="py-4 px-4">{delivery.item}</td>
                          <td className="py-4 px-4">{delivery.origin}</td>
                          <td className="py-4 px-4">{delivery.destination}</td>
                          <td className="py-4 px-4">{delivery.vehicle}</td>
                          <td className="py-4 px-4">{delivery.driver}</td>
                          <td className="py-4 px-4">{delivery.departureDate}</td>
                          <td className="py-4 px-4">{delivery.estimatedArrival}</td>
                          <td className="py-4 px-4">
                            <Badge
                              variant="outline"
                              className={
                                delivery.status === "Delivered"
                                  ? "bg-[#ecfff2] text-[#10a142] border-[#10a142]"
                                  : delivery.status === "In Transit"
                                    ? "bg-[#e8f5ff] text-[#0089ff] border-[#0089ff]"
                                    : "bg-[#fff8df] text-[#fdcc1c] border-[#fdcc1c]"
                              }
                            >
                              {delivery.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Link href={`/logistics/deliveries/${delivery.id}`}>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-xl font-bold mb-4">Maintenance Schedule</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-medium text-muted-foreground border-b">
                        <th className="text-left py-3 px-4">Vehicle</th>
                        <th className="text-left py-3 px-4">License Plate</th>
                        <th className="text-left py-3 px-4">Last Maintenance</th>
                        <th className="text-left py-3 px-4">Next Maintenance</th>
                        <th className="text-left py-3 px-4">Days Remaining</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.map((vehicle, index) => {
                        const today = new Date()
                        const nextMaintenance = new Date(vehicle.nextMaintenance)
                        const daysRemaining = Math.ceil(
                          (nextMaintenance.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
                        )

                        let maintenanceStatus = "Upcoming"
                        if (daysRemaining <= 0) {
                          maintenanceStatus = "Overdue"
                        } else if (daysRemaining <= 30) {
                          maintenanceStatus = "Due Soon"
                        }

                        return (
                          <tr key={vehicle.id} className={index !== vehicles.length - 1 ? "border-b" : ""}>
                            <td className="py-4 px-4">{vehicle.name}</td>
                            <td className="py-4 px-4">{vehicle.licensePlate}</td>
                            <td className="py-4 px-4">{vehicle.lastMaintenance}</td>
                            <td className="py-4 px-4">{vehicle.nextMaintenance}</td>
                            <td className="py-4 px-4">{daysRemaining > 0 ? daysRemaining : 0}</td>
                            <td className="py-4 px-4">
                              <Badge
                                variant="outline"
                                className={
                                  maintenanceStatus === "Upcoming"
                                    ? "bg-[#ecfff2] text-[#10a142] border-[#10a142]"
                                    : maintenanceStatus === "Due Soon"
                                      ? "bg-[#fff8df] text-[#fdcc1c] border-[#fdcc1c]"
                                      : "bg-[#ffe4e4] text-[#ed3237] border-[#ed3237]"
                                }
                              >
                                {maintenanceStatus}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-2">
                                <Link href={`/logistics/maintenance/${vehicle.id}`}>
                                  <Button variant="link" className="h-auto p-0 text-[#0089ff]">
                                    Schedule
                                  </Button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
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
