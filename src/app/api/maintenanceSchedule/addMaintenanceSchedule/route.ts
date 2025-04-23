import { db } from "@/db";
import { maintenanceSchedule, vehicle } from "@/db/schema";
import { createAuditLog } from "@/db/schema/auditLog";
import { getUserFromRequest } from "@/lib/auth";
import { ApiError, handleApiError } from "@/lib/utils";
import { eq, InferInsertModel } from "drizzle-orm";

// POST /api/maintenance-schedule
export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest();
    if (!user) throw new Error("Unauthorized");

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

    const requestHeaders = request.headers;
    const ipAddress =
      requestHeaders.get("x-forwarded-for") ||
      requestHeaders.get("x-real-ip") ||
      "unknown";
    const userAgent = requestHeaders.get("user-agent") || "unknown";

    const result = await db.transaction(async (tx) => {
      // Check if vehicle exists
      const vehicleRecord = await tx.query.vehicle.findFirst({
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

      const [newSchedule] = await tx
        .insert(maintenanceSchedule)
        .values(insertData)
        .returning();

      // Audit log for maintenance schedule creation
      await createAuditLog(
        tx,
        Number(user.id),
        "create",
        "maintenanceSchedule",
        newSchedule.id,
        null,
        newSchedule,
        {
          ipAddress: ipAddress as string,
          userAgent: userAgent as string,
          requestId: crypto.randomUUID(),
        }
      );

      // If maintenance marked as completed, update vehicle and audit that
      if (insertData.status === "completed" && insertData.completionDate) {
        await tx
          .update(vehicle)
          .set({
            lastMaintenance: insertData.completionDate,
            updatedAt: new Date(),
          })
          .where(eq(vehicle.id, parsedVehicleId));

        await createAuditLog(
          tx,
          Number(user.id),
          "update",
          "vehicle",
          vehicleRecord.id,
          vehicleRecord,
          {
            ...vehicleRecord,
            lastMaintenance: insertData.completionDate,
            updatedAt: new Date(),
          },
          {
            ipAddress: ipAddress as string,
            userAgent: userAgent as string,
            requestId: crypto.randomUUID(),
          }
        );
      }

      return newSchedule;
    });

    return Response.json(result, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
