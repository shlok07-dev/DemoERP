import { db } from "@/db";
import { delivery, vehicle } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { ApiError, handleApiError } from "@/lib/utils";
import { eq } from "drizzle-orm";

// POST /api/delivery - Create a new delivery
export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest();
    if (!user) throw new ApiError("Unauthorized", 401);

    const body = await request.json();

    const {
      deliveryNo,
      item,
      origin,
      destination,
      vehicleId,
      driverId,
      departureDate,
      estimatedArrival,
      actualArrival,
      deliveryNotes,
      recipientName,
      recipientContact,
      deliveryProof,
      status,
    } = body;

    if (!deliveryNo || !item) {
      throw new ApiError("Missing required fields", 400);
    }

    const existing = await db.query.delivery.findFirst({
      where: eq(delivery.deliveryNo, deliveryNo),
    });

    if (existing) {
      throw new ApiError("Delivery number already exists", 409);
    }

    let parsedVehicleId: number | null = null;
    if (vehicleId) {
      parsedVehicleId = Number(vehicleId);
      if (Number.isNaN(parsedVehicleId)) {
        throw new ApiError("Invalid vehicle ID", 400);
      }

      const vehicleRecord = await db.query.vehicle.findFirst({
        where: eq(vehicle.id, parsedVehicleId),
      });

      if (!vehicleRecord) {
        throw new ApiError("Vehicle not found", 404);
      }

      if (vehicleRecord.status !== "active") {
        throw new ApiError("Vehicle is not active", 400);
      }
    }

    const parsedDriverId = driverId ? Number(driverId) : null;

    const [newDelivery] = await db
      .insert(delivery)
      .values({
        deliveryNo,
        item,
        origin: origin ?? null,
        destination: destination ?? null,
        vehicleId: parsedVehicleId,
        driverId: parsedDriverId,
        departureDate: departureDate ? new Date(departureDate) : null,
        estimatedArrival: estimatedArrival ? new Date(estimatedArrival) : null,
        actualArrival: actualArrival ? new Date(actualArrival) : null,
        deliveryNotes: deliveryNotes ?? null,
        recipientName: recipientName ?? null,
        recipientContact: recipientContact ?? null,
        deliveryProof: deliveryProof ?? null,
        status: status ?? "scheduled",
        createdById: Number(user.id),
      })
      .returning();

    return Response.json(newDelivery, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
