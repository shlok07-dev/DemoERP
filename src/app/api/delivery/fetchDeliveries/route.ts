import { db } from "@/db";
import { delivery } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { ApiError, handleApiError } from "@/lib/utils";
import { desc } from "drizzle-orm";

// GET /api/delivery - Get all deliveries
export async function GET(request: Request) {
  try {
    const user = await getUserFromRequest();
    if (!user) throw new ApiError("Unauthorized", 401);

    const deliveries = await db
      .select()
      .from(delivery)
      .orderBy(desc(delivery.departureDate));

    return Response.json(deliveries);
  } catch (error) {
    return handleApiError(error);
  }
}
