"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  ArrowLeft,
  Calendar,
  PenToolIcon as Tool,
  FileText,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

import { useLogisticsStore } from "@/lib/store/useLogisticsStore";
import { VehicleStatusBadge } from "@/components/vehicle-status-badge";

export default function VehicleDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = Number(params.id);

  const {
    vehicles,
    deliveries,
    maintenanceSchedules,
    isLoading,
    error,
    fetchVehicles,
    fetchDeliveries,
    fetchMaintenanceSchedules,
  } = useLogisticsStore();

  useEffect(() => {
    fetchVehicles();
    fetchDeliveries();
    fetchMaintenanceSchedules();
  }, [fetchVehicles, fetchDeliveries, fetchMaintenanceSchedules]);

  // Find the vehicle by ID
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  // Find related deliveries and maintenance schedules
  const vehicleDeliveries = deliveries.filter((d) => d.vehicleId === vehicleId);
  const vehicleMaintenanceSchedules = maintenanceSchedules.filter(
    (m) => m.vehicleId === vehicleId
  );

  // For demo purposes, if no data is found
  const demoVehicle = {
    id: vehicleId,
    name: "Toyota Hilux",
    type: "Pickup Truck",
    licensePlate: "ABC-123",
    model: "Hilux SR5",
    year: "2022",
    vin: "1HGCM82633A123456",
    status: "active",
    insuranceProvider: "ABC Insurance",
    insuranceExpiry: new Date("2024-05-15"),
    registrationExpiry: new Date("2024-03-10"),
    lastMaintenance: new Date("2023-05-15"),
    nextMaintenance: new Date("2023-11-15"),
    fuelEfficiency: 22.5,
    currentOdometer: 15000,
    notes: "Regular maintenance performed as scheduled. No issues reported.",
    driver: { name: "John Doe", id: 1 },
    createdBy: { name: "Admin User", id: 1 },
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-09-20"),
  };

  const displayVehicle = vehicle || demoVehicle;

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-500">Error</h2>
        <p>{error}</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={`Vehicle Details: ${displayVehicle.name}`}>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Link href={`/logistics/maintenance/${displayVehicle.id}`}>
            <Button className="bg-white text-[#0089ff] hover:bg-gray-100">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Maintenance
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div className="p-4 sm:p-6">
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#0089ff]" />
            <span className="ml-2">Loading...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Truck className="mr-2 h-5 w-5 text-[#0089ff]" />
                    Vehicle Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Type:
                      </dt>
                      <dd>{displayVehicle.type || "N/A"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        License Plate:
                      </dt>
                      <dd>{displayVehicle.licensePlate}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Model:
                      </dt>
                      <dd>{displayVehicle.model || "N/A"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Year:
                      </dt>
                      <dd>{displayVehicle.year || "N/A"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        VIN:
                      </dt>
                      <dd>{displayVehicle.vin || "N/A"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Status:
                      </dt>
                      <dd>
                        <VehicleStatusBadge
                          status={displayVehicle.status || ""}
                        />
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-[#0089ff]" />
                    Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Insurance Provider:
                      </dt>
                      <dd>{displayVehicle.insuranceProvider || "N/A"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Insurance Expiry:
                      </dt>
                      <dd>
                        {displayVehicle.insuranceExpiry
                          ? format(
                              new Date(displayVehicle.insuranceExpiry),
                              "yyyy-MM-dd"
                            )
                          : "N/A"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Registration Expiry:
                      </dt>
                      <dd>
                        {displayVehicle.registrationExpiry
                          ? format(
                              new Date(displayVehicle.registrationExpiry),
                              "yyyy-MM-dd"
                            )
                          : "N/A"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Fuel Efficiency:
                      </dt>
                      <dd>
                        {displayVehicle.fuelEfficiency
                          ? `${displayVehicle.fuelEfficiency} mpg`
                          : "N/A"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Current Odometer:
                      </dt>
                      <dd>
                        {displayVehicle.currentOdometer
                          ? `${displayVehicle.currentOdometer} miles`
                          : "N/A"}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Tool className="mr-2 h-5 w-5 text-[#0089ff]" />
                    Maintenance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Last Maintenance:
                      </dt>
                      <dd>
                        {displayVehicle.lastMaintenance
                          ? format(
                              new Date(displayVehicle.lastMaintenance),
                              "yyyy-MM-dd"
                            )
                          : "N/A"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Next Maintenance:
                      </dt>
                      <dd>
                        {displayVehicle.nextMaintenance
                          ? format(
                              new Date(displayVehicle.nextMaintenance),
                              "yyyy-MM-dd"
                            )
                          : "N/A"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Driver:
                      </dt>
                      <dd>{displayVehicle.driver?.name || "Unassigned"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Created By:
                      </dt>
                      <dd>{displayVehicle.createdBy?.name || "System"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Created At:
                      </dt>
                      <dd>
                        {displayVehicle.createdAt
                          ? format(
                              new Date(displayVehicle.createdAt),
                              "yyyy-MM-dd"
                            )
                          : "N/A"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Last Updated:
                      </dt>
                      <dd>
                        {displayVehicle.updatedAt
                          ? format(
                              new Date(displayVehicle.updatedAt),
                              "yyyy-MM-dd"
                            )
                          : "N/A"}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {displayVehicle.notes || "No notes available."}
                </p>
              </CardContent>
            </Card>

            <Tabs defaultValue="deliveries" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="deliveries">Delivery History</TabsTrigger>
                <TabsTrigger value="maintenance">
                  Maintenance History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="deliveries">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <h2 className="text-xl font-bold mb-4">Delivery History</h2>
                    {vehicleDeliveries && vehicleDeliveries.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-xs font-medium text-muted-foreground border-b">
                              <th className="text-left py-3 px-4">ID</th>
                              <th className="text-left py-3 px-4">Item</th>
                              <th className="text-left py-3 px-4">Origin</th>
                              <th className="text-left py-3 px-4">
                                Destination
                              </th>
                              <th className="text-left py-3 px-4">Departure</th>
                              <th className="text-left py-3 px-4">ETA</th>
                              <th className="text-left py-3 px-4">Status</th>
                              <th className="text-left py-3 px-4">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vehicleDeliveries.map((delivery, index) => (
                              <tr
                                key={delivery.id}
                                className={
                                  index !== vehicleDeliveries.length - 1
                                    ? "border-b"
                                    : ""
                                }
                              >
                                <td className="py-4 px-4">
                                  {delivery.deliveryNo}
                                </td>
                                <td className="py-4 px-4">{delivery.item}</td>
                                <td className="py-4 px-4">{delivery.origin}</td>
                                <td className="py-4 px-4">
                                  {delivery.destination}
                                </td>
                                <td className="py-4 px-4">
                                  {delivery.departureDate
                                    ? format(
                                        new Date(delivery.departureDate),
                                        "yyyy-MM-dd"
                                      )
                                    : "N/A"}
                                </td>
                                <td className="py-4 px-4">
                                  {delivery.estimatedArrival
                                    ? format(
                                        new Date(delivery.estimatedArrival),
                                        "yyyy-MM-dd"
                                      )
                                    : "N/A"}
                                </td>
                                <td className="py-4 px-4">{delivery.status}</td>
                                <td className="py-4 px-4">
                                  <Link
                                    href={`/logistics/deliveries/${delivery.id}`}
                                  >
                                    <Button
                                      variant="link"
                                      className="h-auto p-0 text-[#0089ff]"
                                    >
                                      View
                                    </Button>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No delivery history available for this vehicle.
                        </p>
                        <Link href="/logistics/schedule">
                          <Button className="mt-4">Schedule a Delivery</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="maintenance">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <h2 className="text-xl font-bold mb-4">
                      Maintenance History
                    </h2>
                    {vehicleMaintenanceSchedules &&
                    vehicleMaintenanceSchedules.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-xs font-medium text-muted-foreground border-b">
                              <th className="text-left py-3 px-4">Date</th>
                              <th className="text-left py-3 px-4">Type</th>
                              <th className="text-left py-3 px-4">
                                Description
                              </th>
                              <th className="text-left py-3 px-4">
                                Performed By
                              </th>
                              <th className="text-left py-3 px-4">Cost</th>
                              <th className="text-left py-3 px-4">Status</th>
                              <th className="text-left py-3 px-4">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vehicleMaintenanceSchedules.map(
                              (maintenance, index) => (
                                <tr
                                  key={maintenance.id}
                                  className={
                                    index !==
                                    vehicleMaintenanceSchedules.length - 1
                                      ? "border-b"
                                      : ""
                                  }
                                >
                                  <td className="py-4 px-4">
                                    {maintenance.scheduledDate
                                      ? format(
                                          new Date(maintenance.scheduledDate),
                                          "yyyy-MM-dd"
                                        )
                                      : "N/A"}
                                  </td>
                                  <td className="py-4 px-4">
                                    {maintenance.maintenanceType}
                                  </td>
                                  <td className="py-4 px-4">
                                    {maintenance.description}
                                  </td>
                                  <td className="py-4 px-4">
                                    {maintenance.performedBy?.name ||
                                      "Unassigned"}
                                  </td>
                                  <td className="py-4 px-4">
                                    {maintenance.cost
                                      ? `$${maintenance.cost}`
                                      : "N/A"}
                                  </td>
                                  <td className="py-4 px-4">
                                    {maintenance.status}
                                  </td>
                                  <td className="py-4 px-4">
                                    <Link
                                      href={`/logistics/maintenance/${displayVehicle.id}/${maintenance.id}`}
                                    >
                                      <Button
                                        variant="link"
                                        className="h-auto p-0 text-[#0089ff]"
                                      >
                                        View
                                      </Button>
                                    </Link>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No maintenance history available for this vehicle.
                        </p>
                        <Link
                          href={`/logistics/maintenance/${displayVehicle.id}`}
                        >
                          <Button className="mt-4">Schedule Maintenance</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
