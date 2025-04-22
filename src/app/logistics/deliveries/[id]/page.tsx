"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, Package, MapPin, Truck, User } from "lucide-react"
import { format } from "date-fns"

import { useLogisticsStore } from "@/lib/store/useLogisticsStore"
import { DeliveryStatusBadge } from "@/components/delivery-status-badge"

export default function DeliveryDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const deliveryId = Number(params.id)

  const { deliveries, vehicles, isLoading, error, fetchDeliveries, fetchVehicles } = useLogisticsStore()

  useEffect(() => {
    fetchDeliveries()
    fetchVehicles()
  }, [fetchDeliveries, fetchVehicles])

  // Find the delivery by ID
  const delivery = deliveries.find((d) => d.id === deliveryId)

  // For demo purposes, if no data is found
  const demoDelivery = {
    id: deliveryId,
    deliveryNo: `D00${deliveryId}`,
    item: "Office Supplies",
    origin: "Headquarters",
    destination: "Branch Office A",
    vehicleId: 1,
    driverId: 1,
    departureDate: new Date("2023-10-15"),
    estimatedArrival: new Date("2023-10-15"),
    actualArrival: new Date("2023-10-15"),
    deliveryNotes: "Delivered on time. All items received in good condition.",
    recipientName: "Robert Johnson",
    recipientContact: "+1 (555) 123-4567",
    deliveryProof: "Signature on file",
    status: "delivered",
    createdById: 1,
    createdAt: new Date("2023-10-10"),
    updatedAt: new Date("2023-10-15"),
    vehicle: { name: "Toyota Hilux", licensePlate: "ABC-123" },
    driver: { name: "John Doe" },
    createdBy: { name: "Admin User" },
  }

  const displayDelivery = delivery || demoDelivery

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-500">Error</h2>
        <p>{error}</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div>
      <PageHeader title={`Delivery Details: ${displayDelivery.deliveryNo}`}>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          {displayDelivery.status === "scheduled" && (
            <Button className="bg-white text-[#0089ff] hover:bg-gray-100">
              <Truck className="mr-2 h-4 w-4" />
              Start Delivery
            </Button>
          )}
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
                    <Package className="mr-2 h-5 w-5 text-[#0089ff]" />
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Item:</dt>
                      <dd>{displayDelivery.item}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Status:</dt>
                      <dd>
                        <DeliveryStatusBadge status={displayDelivery.status || ""} />
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Delivery Number:</dt>
                      <dd>{displayDelivery.deliveryNo}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Created At:</dt>
                      <dd>
                        {displayDelivery.createdAt ? format(new Date(displayDelivery.createdAt), "yyyy-MM-dd") : "N/A"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Created By:</dt>
                      <dd>{displayDelivery.createdBy?.name || "System"}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-[#0089ff]" />
                    Location Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Origin:</dt>
                      <dd>{displayDelivery.origin}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Destination:</dt>
                      <dd>{displayDelivery.destination}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Departure Date:</dt>
                      <dd>
                        {displayDelivery.departureDate
                          ? format(new Date(displayDelivery.departureDate), "yyyy-MM-dd")
                          : "N/A"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Estimated Arrival:</dt>
                      <dd>
                        {displayDelivery.estimatedArrival
                          ? format(new Date(displayDelivery.estimatedArrival), "yyyy-MM-dd")
                          : "N/A"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Actual Arrival:</dt>
                      <dd>
                        {displayDelivery.actualArrival
                          ? format(new Date(displayDelivery.actualArrival), "yyyy-MM-dd")
                          : "N/A"}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <User className="mr-2 h-5 w-5 text-[#0089ff]" />
                    Personnel & Vehicle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Vehicle:</dt>
                      <dd>{displayDelivery.vehicle?.name || "Unassigned"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">License Plate:</dt>
                      <dd>{displayDelivery.vehicle?.licensePlate || "N/A"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Driver:</dt>
                      <dd>{displayDelivery.driver?.name || "Unassigned"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Recipient:</dt>
                      <dd>{displayDelivery.recipientName || "N/A"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Recipient Contact:</dt>
                      <dd>{displayDelivery.recipientContact || "N/A"}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Delivery Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{displayDelivery.deliveryNotes || "No notes available."}</p>
              </CardContent>
            </Card>

            {displayDelivery.status === "delivered" && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Delivery Proof</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {displayDelivery.deliveryProof || "No proof of delivery recorded."}
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}
