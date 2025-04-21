import { db } from "@/db";
import { vehicle } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { handleApiError } from "@/lib/utils";

export async function GET(request: Request) {
  try {
    const user = await getUserFromRequest();
    if (!user) throw new Error("Unauthorized");

    const vehicles = await db.select().from(vehicle);

    return Response.json(vehicles);
  } catch (error) {
    return handleApiError(error);
  }
}
