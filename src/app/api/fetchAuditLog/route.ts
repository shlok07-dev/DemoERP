import { db } from "@/db";
import { auditLog } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { handleApiError } from "@/lib/utils";

export async function GET(request: Request) {
  try {
    const user = await getUserFromRequest();
    if (!user) throw new Error("Unauthorized");

    const audits = await db.select().from(auditLog);

    return Response.json(audits);
  } catch (error) {
    return handleApiError(error);
  }
}
