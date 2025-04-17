import { db } from "@/db";
import { inventory } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { handleApiError } from "@/lib/utils";

export async function GET(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) throw new Error("Unauthorized");

    const items = await db.select().from(inventory);

    return Response.json(items);
  } catch (error) {
    return handleApiError(error);
  }
}
