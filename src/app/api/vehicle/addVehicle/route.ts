import { db } from "@/db";
import { vehicle } from "@/db/schema";
import { createAuditLog } from "@/db/schema/auditLog";
import { getUserFromRequest } from "@/lib/auth";
import { ApiError, handleApiError } from "@/lib/utils";
import { eq } from "drizzle-orm";

// POST /api/vehicle/addVehicle
export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest();
    if (!user) throw new Error("Unauthorized");

    const body = await request.json();

    if (!body.name || !body.licensePlate) {
      throw new ApiError("Missing required fields", 400);
    }

    const requestHeaders = request.headers;
    const ipAddress =
      requestHeaders.get("x-forwarded-for") ||
      requestHeaders.get("x-real-ip") ||
      "unknown";
    const userAgent = requestHeaders.get("user-agent") || "unknown";

    const result = await db.transaction(async (tx) => {
      const existingVehicle = await tx.query.vehicle.findFirst({
        where: eq(vehicle.licensePlate, body.licensePlate),
      });

      if (existingVehicle) {
        throw new ApiError("License plate already exists", 409);
      }

      const [newVehicle] = await tx
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

      // ✅ Log the creation of a new vehicle
      await createAuditLog(
        tx,
        Number(user.id),
        "create",
        "vehicle",
        newVehicle.id,
        null,
        newVehicle,
        {
          ipAddress: ipAddress as string,
          userAgent: userAgent as string,
          requestId: crypto.randomUUID(),
        }
      );

      return newVehicle;
    });

    return Response.json(result, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
