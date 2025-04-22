"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function ScheduleMaintenancePage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = Number(params.id);

  const { vehicles, isLoading, error, fetchVehicles, addMaintenanceSchedule } =
    useLogisticsStore();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  // Find the vehicle by ID
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  // For demo purposes, if no data is found
  const demoVehicle = {
    id: vehicleId,
    name: "Toyota Hilux",
    licensePlate: "ABC-123",
  };

  const displayVehicle = vehicle || demoVehicle;

  const [formData, setFormData] = useState({
    scheduledDate: format(
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      "yyyy-MM-dd"
    ),
    description: "",
    maintenanceType: "oil-change",
    cost: "",
    vendor: "",
    notes: "",
    status: "scheduled",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addMaintenanceSchedule({
        vehicleId,
        scheduledDate: new Date(formData.scheduledDate),
        description: formData.description,
        maintenanceType: formData.maintenanceType,
        cost: formData.cost ? Number(formData.cost) : null,
        vendor: formData.vendor,
        notes: formData.notes,
        status: formData.status,
        performedById: null, // Will be assigned later
        createdById: 1, // Assuming user ID 1 for demo
      });

      router.push(`/logistics/vehicles/${vehicleId}`);
    } catch (error) {
      console.error("Failed to schedule maintenance:", error);
    }
  };

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
      <PageHeader title={`Schedule Maintenance: ${displayVehicle.name}`}>
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
                    <Label htmlFor="vehicleInfo">Vehicle</Label>
                    <Input
                      id="vehicleInfo"
                      value={`${displayVehicle.name} (${displayVehicle.licensePlate})`}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scheduledDate">Scheduled Date</Label>
                    <Input
                      id="scheduledDate"
                      name="scheduledDate"
                      type="date"
                      value={formData.scheduledDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maintenanceType">Maintenance Type</Label>
                    <Select
                      value={formData.maintenanceType}
                      onValueChange={(value) =>
                        handleSelectChange("maintenanceType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oil-change">Oil Change</SelectItem>
                        <SelectItem value="tire-rotation">
                          Tire Rotation
                        </SelectItem>
                        <SelectItem value="brake-service">
                          Brake Service
                        </SelectItem>
                        <SelectItem value="engine-tune-up">
                          Engine Tune-up
                        </SelectItem>
                        <SelectItem value="fluid-check">Fluid Check</SelectItem>
                        <SelectItem value="inspection">
                          General Inspection
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vendor">Service Provider/Vendor</Label>
                    <Input
                      id="vendor"
                      name="vendor"
                      value={formData.vendor}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cost">Estimated Cost ($)</Label>
                    <Input
                      id="cost"
                      name="cost"
                      type="number"
                      value={formData.cost}
                      onChange={handleChange}
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
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
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
                      "Schedule Maintenance"
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
