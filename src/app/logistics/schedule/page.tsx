"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

import { useLogisticsStore } from "@/lib/store/useLogisticsStore";

interface DeliveryFormData {
  item: string;
  origin: string;
  destination: string;
  vehicleId: string;
  driverId: string;
  departureDate: string;
  estimatedArrival: string;
  deliveryNotes: string;
  recipientName: string;
  recipientContact: string;
  status: string;
}

export default function ScheduleDeliveryPage() {
  const router = useRouter();
  const { vehicles, isLoading, error, fetchVehicles, addDelivery } =
    useLogisticsStore();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const [formData, setFormData] = useState<DeliveryFormData>({
    item: "",
    origin: "",
    destination: "",
    vehicleId: "unassigned",
    driverId: "unassigned",
    departureDate: format(new Date(), "yyyy-MM-dd"),
    estimatedArrival: format(
      new Date(Date.now() + 24 * 60 * 60 * 1000),
      "yyyy-MM-dd"
    ),
    deliveryNotes: "",
    recipientName: "",
    recipientContact: "",
    status: "scheduled",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Generate a delivery number
      const deliveryNo = `D${Math.floor(1000 + Math.random() * 9000)}`;

      await addDelivery({
        deliveryNo,
        item: formData.item,
        origin: formData.origin,
        destination: formData.destination,
        vehicleId:
          formData.vehicleId !== "unassigned"
            ? Number(formData.vehicleId)
            : null,
        driverId:
          formData.driverId !== "unassigned" ? Number(formData.driverId) : null,
        departureDate: new Date(formData.departureDate),
        estimatedArrival: new Date(formData.estimatedArrival),
        deliveryNotes: formData.deliveryNotes,
        recipientName: formData.recipientName,
        recipientContact: formData.recipientContact,
        status: formData.status,
        createdById: 1, // Assuming user ID 1 for demo
      });

      router.push("/logistics");
    } catch (error) {
      console.error("Failed to schedule delivery:", error);
    }
  };

  // Filter only active vehicles
  const availableVehicles = vehicles.filter((v) => v.status === "active");

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
      <PageHeader title="Schedule Delivery">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </PageHeader>

      <div className="p-4 sm:p-6">
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#0089ff]" />
            <span className="ml-2">Loading...</span>
          </div>
        ) : (
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="item">Item/Package Description</Label>
                    <Input
                      id="item"
                      name="item"
                      value={formData.item}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        handleSelectChange("status", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="in-transit">In Transit</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin</Label>
                    <Input
                      id="origin"
                      name="origin"
                      value={formData.origin}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleId">Vehicle</Label>
                    <Select
                      value={formData.vehicleId}
                      onValueChange={(value) =>
                        handleSelectChange("vehicleId", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        {availableVehicles.length > 0
                          ? availableVehicles.map((vehicle) => (
                              <SelectItem
                                key={vehicle.id}
                                value={vehicle.id.toString()}
                              >
                                {vehicle.name} ({vehicle.licensePlate})
                              </SelectItem>
                            ))
                          : // Demo vehicles if none are available
                            [
                              {
                                id: 1,
                                name: "Toyota Hilux",
                                licensePlate: "ABC-123",
                              },
                              {
                                id: 2,
                                name: "Toyota Sienna",
                                licensePlate: "DEF-456",
                              },
                              {
                                id: 4,
                                name: "Mercedes Sprinter",
                                licensePlate: "JKL-012",
                              },
                            ].map((vehicle) => (
                              <SelectItem
                                key={vehicle.id}
                                value={vehicle.id.toString()}
                              >
                                {vehicle.name} ({vehicle.licensePlate})
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="driverId">Driver</Label>
                    <Select
                      value={formData.driverId}
                      onValueChange={(value) =>
                        handleSelectChange("driverId", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select driver" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        {/* Demo drivers */}
                        <SelectItem value="1">John Doe</SelectItem>
                        <SelectItem value="2">Jane Smith</SelectItem>
                        <SelectItem value="3">Michael Johnson</SelectItem>
                        <SelectItem value="4">Sarah Williams</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="departureDate">Departure Date</Label>
                    <Input
                      id="departureDate"
                      name="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedArrival">Estimated Arrival</Label>
                    <Input
                      id="estimatedArrival"
                      name="estimatedArrival"
                      type="date"
                      value={formData.estimatedArrival}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipientContact">Recipient Contact</Label>
                    <Input
                      id="recipientContact"
                      name="recipientContact"
                      value={formData.recipientContact}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="deliveryNotes">Delivery Notes</Label>
                    <Textarea
                      id="deliveryNotes"
                      name="deliveryNotes"
                      value={formData.deliveryNotes}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Schedule Delivery"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
