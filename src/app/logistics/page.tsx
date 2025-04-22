"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Truck, Package, MapPin, Loader2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

import { useLogisticsStore } from "@/lib/store/useLogisticsStore"
import { VehicleStatusBadge } from "@/components/vehicle-status-badge"
import { DeliveryStatusBadge } from "@/components/delivery-status-badge"
import { MaintenanceStatusBadge } from "@/components/maintenance-status-badge"

export default function LogisticsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValue, setFilterValue] = useState("all")
  const [activeTab, setActiveTab] = useState("vehicles")

  const {
    vehicles,
    deliveries,
    maintenanceSchedules,
    isLoading,
    error,
    fetchVehicles,
    fetchDeliveries,
    fetchMaintenanceSchedules,
  } = useLogisticsStore()

  useEffect(() => {
    fetchVehicles()
    fetchDeliveries()
    fetchMaintenanceSchedules()
  }, [fetchVehicles, fetchDeliveries, fetchMaintenanceSchedules])

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      (vehicle.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (vehicle.type?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (vehicle.licensePlate?.toLowerCase() || "").includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterValue === "all" ||
      (filterValue === "active" && vehicle.status === "active") ||
      (filterValue === "maintenance" && vehicle.status === "maintenance") ||
      (filterValue === "out-of-service" && vehicle.status === "out-of-service")

    return matchesSearch && matchesFilter
  })

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      (delivery.item?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (delivery.origin?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (delivery.destination?.toLowerCase() || "").includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterValue === "all" ||
      (filterValue === "delivered" && delivery.status === "delivered") ||
      (filterValue === "in-transit" && delivery.status === "in-transit") ||
      (filterValue === "scheduled" && delivery.status === "scheduled") ||
      (filterValue === "cancelled" && delivery.status === "cancelled")

    return matchesSearch && matchesFilter
  })

  // Calculate maintenance status for each vehicle
  const maintenanceData = vehicles.map((vehicle) => {
    const today = new Date()
    const nextMaintenance = vehicle.nextMaintenance ? new Date(vehicle.nextMaintenance) : null

    let daysRemaining = 0
    let maintenanceStatus = "upcoming"

    if (nextMaintenance) {
      daysRemaining = Math.ceil((nextMaintenance.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

      if (daysRemaining <= 0) {
        maintenanceStatus = "overdue"
      } else if (daysRemaining <= 30) {
        maintenanceStatus = "due-soon"
      }
    }

    return {
      ...vehicle,
      daysRemaining,
      maintenanceStatus,
    }
  })

  // For demo purposes, if there's no data, show some sample data
  const hasVehicles = vehicles.length > 0
  const hasDeliveries = deliveries.length > 0

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-500">Error</h2>
        <p>{error}</p>
        <Button
          onClick={() => {
            fetchVehicles()
            fetchDeliveries()
            fetchMaintenanceSchedules()
          }}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    )
  }

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
                  <p className="text-2xl font-bold">{hasVehicles ? vehicles.length : 4}</p>
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
                  <p className="text-2xl font-bold">
                    {hasVehicles ? vehicles.filter((v) => v.status === "active").length : 2}
                  </p>
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
                  <p className="text-2xl font-bold">{hasDeliveries ? deliveries.length : 4}</p>
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
                  <p className="text-2xl font-bold">
                    {hasDeliveries ? deliveries.filter((d) => d.status === "in-transit").length : 1}
                  </p>
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="out-of-service">Out of Service</SelectItem>
                  </>
                ) : activeTab === "deliveries" ? (
                  <>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="due-soon">Due Soon</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
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

          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#0089ff]" />
              <span className="ml-2">Loading...</span>
            </div>
          ) : (
            <>
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
                          {filteredVehicles.length === 0
                            ? // Demo data if no vehicles are available
                              [
                                {
                                  id: 1,
                                  name: "Toyota Hilux",
                                  type: "Pickup Truck",
                                  licensePlate: "ABC-123",
                                  driver: { name: "John Doe" },
                                  status: "active",
                                  lastMaintenance: new Date("2023-05-15"),
                                  nextMaintenance: new Date("2023-11-15"),
                                },
                                {
                                  id: 2,
                                  name: "Toyota Sienna",
                                  type: "Minivan",
                                  licensePlate: "DEF-456",
                                  driver: { name: "Jane Smith" },
                                  status: "active",
                                  lastMaintenance: new Date("2023-06-20"),
                                  nextMaintenance: new Date("2023-12-20"),
                                },
                                {
                                  id: 3,
                                  name: "Ford F-150",
                                  type: "Pickup Truck",
                                  licensePlate: "GHI-789",
                                  driver: { name: "Michael Johnson" },
                                  status: "maintenance",
                                  lastMaintenance: new Date("2023-07-10"),
                                  nextMaintenance: new Date("2024-01-10"),
                                },
                                {
                                  id: 4,
                                  name: "Mercedes Sprinter",
                                  type: "Van",
                                  licensePlate: "JKL-012",
                                  driver: { name: "Sarah Williams" },
                                  status: "active",
                                  lastMaintenance: new Date("2023-08-05"),
                                  nextMaintenance: new Date("2024-02-05"),
                                },
                              ].map((vehicle, index, arr) => (
                                <tr key={vehicle.id} className={index !== arr.length - 1 ? "border-b" : ""}>
                                  <td className="py-4 px-4">{vehicle.id}</td>
                                  <td className="py-4 px-4">{vehicle.name}</td>
                                  <td className="py-4 px-4">{vehicle.type}</td>
                                  <td className="py-4 px-4">{vehicle.licensePlate}</td>
                                  <td className="py-4 px-4">{vehicle.driver?.name || "Unassigned"}</td>
                                  <td className="py-4 px-4">
                                    <VehicleStatusBadge status={vehicle.status || ""} />
                                  </td>
                                  <td className="py-4 px-4">
                                    {vehicle.lastMaintenance
                                      ? format(new Date(vehicle.lastMaintenance), "yyyy-MM-dd")
                                      : "N/A"}
                                  </td>
                                  <td className="py-4 px-4">
                                    {vehicle.nextMaintenance
                                      ? format(new Date(vehicle.nextMaintenance), "yyyy-MM-dd")
                                      : "N/A"}
                                  </td>
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
                              ))
                            : filteredVehicles.map((vehicle, index) => (
                                <tr
                                  key={vehicle.id}
                                  className={index !== filteredVehicles.length - 1 ? "border-b" : ""}
                                >
                                  <td className="py-4 px-4">{vehicle.id}</td>
                                  <td className="py-4 px-4">{vehicle.name}</td>
                                  <td className="py-4 px-4">{vehicle.type}</td>
                                  <td className="py-4 px-4">{vehicle.licensePlate}</td>
                                  <td className="py-4 px-4">{vehicle.driver?.name || "Unassigned"}</td>
                                  <td className="py-4 px-4">
                                    <VehicleStatusBadge status={vehicle.status || ""} />
                                  </td>
                                  <td className="py-4 px-4">
                                    {vehicle.lastMaintenance
                                      ? format(new Date(vehicle.lastMaintenance), "yyyy-MM-dd")
                                      : "N/A"}
                                  </td>
                                  <td className="py-4 px-4">
                                    {vehicle.nextMaintenance
                                      ? format(new Date(vehicle.nextMaintenance), "yyyy-MM-dd")
                                      : "N/A"}
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex space-x-2">
                                      <Link href={`/logistics/vehicle/${vehicle.id}`}>
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
                          {filteredDeliveries.length === 0
                            ? // Demo data if no deliveries are available
                              [
                                {
                                  id: 1,
                                  deliveryNo: "D001",
                                  item: "Office Supplies",
                                  origin: "Headquarters",
                                  destination: "Branch Office A",
                                  vehicle: { name: "Toyota Hilux" },
                                  driver: { name: "John Doe" },
                                  departureDate: new Date("2023-10-15"),
                                  estimatedArrival: new Date("2023-10-15"),
                                  status: "delivered",
                                },
                                {
                                  id: 2,
                                  deliveryNo: "D002",
                                  item: "Computer Equipment",
                                  origin: "Supplier Warehouse",
                                  destination: "Headquarters",
                                  vehicle: { name: "Toyota Sienna" },
                                  driver: { name: "Jane Smith" },
                                  departureDate: new Date("2023-10-16"),
                                  estimatedArrival: new Date("2023-10-16"),
                                  status: "in-transit",
                                },
                                {
                                  id: 3,
                                  deliveryNo: "D003",
                                  item: "Furniture",
                                  origin: "Furniture Store",
                                  destination: "Branch Office B",
                                  vehicle: { name: "Ford F-150" },
                                  driver: { name: "Michael Johnson" },
                                  departureDate: new Date("2023-10-17"),
                                  estimatedArrival: new Date("2023-10-17"),
                                  status: "scheduled",
                                },
                                {
                                  id: 4,
                                  deliveryNo: "D004",
                                  item: "Marketing Materials",
                                  origin: "Print Shop",
                                  destination: "Conference Center",
                                  vehicle: { name: "Mercedes Sprinter" },
                                  driver: { name: "Sarah Williams" },
                                  departureDate: new Date("2023-10-18"),
                                  estimatedArrival: new Date("2023-10-18"),
                                  status: "scheduled",
                                },
                              ].map((delivery, index, arr) => (
                                <tr key={delivery.id} className={index !== arr.length - 1 ? "border-b" : ""}>
                                  <td className="py-4 px-4">{delivery.deliveryNo}</td>
                                  <td className="py-4 px-4">{delivery.item}</td>
                                  <td className="py-4 px-4">{delivery.origin}</td>
                                  <td className="py-4 px-4">{delivery.destination}</td>
                                  <td className="py-4 px-4">{delivery.vehicle?.name || "Unassigned"}</td>
                                  <td className="py-4 px-4">{delivery.driver?.name || "Unassigned"}</td>
                                  <td className="py-4 px-4">
                                    {delivery.departureDate
                                      ? format(new Date(delivery.departureDate), "yyyy-MM-dd")
                                      : "N/A"}
                                  </td>
                                  <td className="py-4 px-4">
                                    {delivery.estimatedArrival
                                      ? format(new Date(delivery.estimatedArrival), "yyyy-MM-dd")
                                      : "N/A"}
                                  </td>
                                  <td className="py-4 px-4">
                                    <DeliveryStatusBadge status={delivery.status || ""} />
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
                              ))
                            : filteredDeliveries.map((delivery, index) => (
                                <tr
                                  key={delivery.id}
                                  className={index !== filteredDeliveries.length - 1 ? "border-b" : ""}
                                >
                                  <td className="py-4 px-4">{delivery.deliveryNo}</td>
                                  <td className="py-4 px-4">{delivery.item}</td>
                                  <td className="py-4 px-4">{delivery.origin}</td>
                                  <td className="py-4 px-4">{delivery.destination}</td>
                                  <td className="py-4 px-4">{delivery.vehicle?.name || "Unassigned"}</td>
                                  <td className="py-4 px-4">{delivery.driver?.name || "Unassigned"}</td>
                                  <td className="py-4 px-4">
                                    {delivery.departureDate
                                      ? format(new Date(delivery.departureDate), "yyyy-MM-dd")
                                      : "N/A"}
                                  </td>
                                  <td className="py-4 px-4">
                                    {delivery.estimatedArrival
                                      ? format(new Date(delivery.estimatedArrival), "yyyy-MM-dd")
                                      : "N/A"}
                                  </td>
                                  <td className="py-4 px-4">
                                    <DeliveryStatusBadge status={delivery.status || ""} />
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
                          {maintenanceData.length === 0
                            ? // Demo data if no maintenance data is available
                              [
                                {
                                  id: 1,
                                  name: "Toyota Hilux",
                                  licensePlate: "ABC-123",
                                  lastMaintenance: new Date("2023-05-15"),
                                  nextMaintenance: new Date("2023-11-15"),
                                  daysRemaining: 30,
                                  maintenanceStatus: "upcoming",
                                },
                                {
                                  id: 2,
                                  name: "Toyota Sienna",
                                  licensePlate: "DEF-456",
                                  lastMaintenance: new Date("2023-06-20"),
                                  nextMaintenance: new Date("2023-12-20"),
                                  daysRemaining: 65,
                                  maintenanceStatus: "upcoming",
                                },
                                {
                                  id: 3,
                                  name: "Ford F-150",
                                  licensePlate: "GHI-789",
                                  lastMaintenance: new Date("2023-07-10"),
                                  nextMaintenance: new Date("2023-10-10"),
                                  daysRemaining: -5,
                                  maintenanceStatus: "overdue",
                                },
                                {
                                  id: 4,
                                  name: "Mercedes Sprinter",
                                  licensePlate: "JKL-012",
                                  lastMaintenance: new Date("2023-08-05"),
                                  nextMaintenance: new Date("2023-10-25"),
                                  daysRemaining: 10,
                                  maintenanceStatus: "due-soon",
                                },
                              ].map((vehicle, index, arr) => (
                                <tr key={vehicle.id} className={index !== arr.length - 1 ? "border-b" : ""}>
                                  <td className="py-4 px-4">{vehicle.name}</td>
                                  <td className="py-4 px-4">{vehicle.licensePlate}</td>
                                  <td className="py-4 px-4">
                                    {vehicle.lastMaintenance
                                      ? format(new Date(vehicle.lastMaintenance), "yyyy-MM-dd")
                                      : "N/A"}
                                  </td>
                                  <td className="py-4 px-4">
                                    {vehicle.nextMaintenance
                                      ? format(new Date(vehicle.nextMaintenance), "yyyy-MM-dd")
                                      : "N/A"}
                                  </td>
                                  <td className="py-4 px-4">{vehicle.daysRemaining > 0 ? vehicle.daysRemaining : 0}</td>
                                  <td className="py-4 px-4">
                                    <MaintenanceStatusBadge status={vehicle.maintenanceStatus} />
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
                              ))
                            : maintenanceData.map((vehicle, index) => (
                                <tr key={vehicle.id} className={index !== maintenanceData.length - 1 ? "border-b" : ""}>
                                  <td className="py-4 px-4">{vehicle.name}</td>
                                  <td className="py-4 px-4">{vehicle.licensePlate}</td>
                                  <td className="py-4 px-4">
                                    {vehicle.lastMaintenance
                                      ? format(new Date(vehicle.lastMaintenance), "yyyy-MM-dd")
                                      : "N/A"}
                                  </td>
                                  <td className="py-4 px-4">
                                    {vehicle.nextMaintenance
                                      ? format(new Date(vehicle.nextMaintenance), "yyyy-MM-dd")
                                      : "N/A"}
                                  </td>
                                  <td className="py-4 px-4">{vehicle.daysRemaining > 0 ? vehicle.daysRemaining : 0}</td>
                                  <td className="py-4 px-4">
                                    <MaintenanceStatusBadge status={vehicle.maintenanceStatus} />
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
                              ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2023 UiUxOtor ERP System. All Rights Reserved
        </div>
      </div>
    </div>
  )
}
