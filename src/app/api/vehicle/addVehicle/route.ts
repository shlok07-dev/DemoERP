import { db } from "@/db";
import { vehicle } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { ApiError, handleApiError } from "@/lib/utils";
import { eq } from "drizzle-orm";

// POST /api/vehicle/addVehicle - Create a new vehicle
export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest();
    if (!user) throw new Error("Unauthorized");

    // Only allow certain positions to create vehicles
    // if (
    //   !["Admin", "Fleet Manager", "Logistics Manager"].includes(user.position)
    // ) {
    //   throw new ApiError("Unauthorized access", 403);
    // }

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.licensePlate) {
      throw new ApiError("Missing required fields", 400);
    }

    // Check if license plate already exists
    const existingVehicle = await db.query.vehicle.findFirst({
      where: eq(vehicle.licensePlate, body.licensePlate),
    });

    if (existingVehicle) {
      throw new ApiError("License plate already exists", 409);
    }

    // Create new vehicle
    const newVehicle = await db
      .insert(vehicle)
      .values({
        name: body.name,
        type: body.type || null,
        licensePlate: body.licensePlate,
        driverId: body.driverId ? Number.parseInt(body.driverId) : null,
        status: body.status || "active",
        model: body.model || null,
        year: body.year || null,
        vin: body.vin || null,
        insuranceProvider: body.insuranceProvider || null,
        insuranceExpiry: body.insuranceExpiry
          ? new Date(body.insuranceExpiry)
          : null,
        registrationExpiry: body.registrationExpiry
          ? new Date(body.registrationExpiry)
          : null,
        lastMaintenance: body.lastMaintenance
          ? new Date(body.lastMaintenance)
          : null,
        nextMaintenance: body.nextMaintenance
          ? new Date(body.nextMaintenance)
          : null,
        fuelEfficiency: body.fuelEfficiency || null,
        currentOdometer: body.currentOdometer || null,
        notes: body.notes || null,
        createdById: Number.parseInt(user.id),
      })
      .returning();

    return Response.json(newVehicle[0], { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
