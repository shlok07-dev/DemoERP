import { db } from "@/db";
import { maintenanceSchedule, vehicle } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { ApiError, handleApiError } from "@/lib/utils";
import { eq, InferInsertModel } from "drizzle-orm";

// POST /api/maintenance-schedule - Create a new maintenance schedule
export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest();
    if (!user) throw new Error("Unauthorized");

    // Role-based access control
    // const allowedRoles = ["Admin", "Fleet Manager", "Maintenance Manager"];
    // if (!allowedRoles.includes(user.position)) {
    //   throw new ApiError("Unauthorized access", 403);
    // }

    const body = await request.json();

    const {
      vehicleId,
      scheduledDate,
      maintenanceType,
      description,
      cost,
      vendor,
      performedById,
      completionDate,
      notes,
      status,
    } = body;

    if (!vehicleId || !scheduledDate || !maintenanceType || !performedById) {
      throw new ApiError("Missing required fields", 400);
    }

    const parsedVehicleId = Number(vehicleId);
    if (Number.isNaN(parsedVehicleId)) {
      throw new ApiError("Invalid vehicle ID", 400);
    }

    // Ensure vehicle exists
    const vehicleRecord = await db.query.vehicle.findFirst({
      where: eq(vehicle.id, parsedVehicleId),
    });

    if (!vehicleRecord) {
      throw new ApiError("Vehicle not found", 404);
    }

    const insertData: InferInsertModel<typeof maintenanceSchedule> = {
      vehicleId: parsedVehicleId,
      scheduledDate: new Date(scheduledDate),
      maintenanceType,
      description: description ?? null,
      cost: cost ?? null,
      vendor: vendor ?? null,
      performedById: performedById ? Number(performedById) : null,
      completionDate: completionDate ? new Date(completionDate) : null,
      notes: notes ?? null,
      status: status ?? "scheduled",
      createdById: Number(user.id),
    };

    const [newSchedule] = await db
      .insert(maintenanceSchedule)
      .values(insertData)
      .returning();

    // Update vehicle's last maintenance date if marked completed
    if (insertData.status === "completed" && insertData.completionDate) {
      await db
        .update(vehicle)
        .set({
          lastMaintenance: insertData.completionDate,
          updatedAt: new Date(),
        })
        .where(eq(vehicle.id, parsedVehicleId));
    }

    return Response.json(newSchedule, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
