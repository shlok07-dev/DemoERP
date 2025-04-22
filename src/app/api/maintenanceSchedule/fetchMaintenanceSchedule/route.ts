import { db } from "@/db";
import { maintenanceSchedule, vehicle } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { handleApiError } from "@/lib/utils";
import { desc } from "drizzle-orm";

// GET /api/maintenance-schedule - Get all maintenance schedules
export async function GET(request: Request) {
  try {
    const user = await getUserFromRequest();
    if (!user) throw new Error("Unauthorized");

    const schedules = await db
      .select()
      .from(maintenanceSchedule)
      .orderBy(desc(maintenanceSchedule.scheduledDate));

    return Response.json(schedules);
  } catch (error) {
    return handleApiError(error);
  }
}
