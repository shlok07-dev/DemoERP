import { db } from "@/db";
import { inventory } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { ApiError, handleApiError } from "@/lib/utils";
import { eq } from "drizzle-orm";

// GET /api/inventory/[id] - Get a specific inventory item
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) throw new Error("Unauthorized");

    const itemId = Number.parseInt(params.id);

    if (isNaN(itemId)) {
      throw new ApiError("Invalid inventory ID", 400);
    }

    const item = await db.query.inventory.findFirst({
      where: eq(inventory.id, itemId),
      with: {
        lastCheckedBy: {
          columns: {
            id: true,
            name: true,
            position: true,
          },
        },
        transactions: true,
      },
    });

    if (!item) {
      throw new ApiError("Inventory item not found", 404);
    }

    return Response.json(item);
  } catch (error) {
    return handleApiError(error);
  }
}
