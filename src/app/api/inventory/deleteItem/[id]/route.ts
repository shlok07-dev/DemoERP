import { db } from "@/db";
import { inventory } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { ApiError, handleApiError } from "@/lib/utils";
import { eq } from "drizzle-orm";

// DELETE /api/inventory/[id] - Delete an inventory item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) throw new Error("Unauthorized");

    // Only allow certain positions to delete inventory
    // if (!["Admin", "Inventory Manager"].includes(user.position)) {
    //   throw new ApiError("Unauthorized access", 403);
    // }

    const itemId = Number.parseInt(params.id);

    if (isNaN(itemId)) {
      throw new ApiError("Invalid inventory ID", 400);
    }

    // Check if item exists
    const existingItem = await db.query.inventory.findFirst({
      where: eq(inventory.id, itemId),
    });

    if (!existingItem) {
      throw new ApiError("Inventory item not found", 404);
    }

    // Delete inventory item
    await db.delete(inventory).where(eq(inventory.id, itemId));

    return Response.json({ message: "Item Deleted Successfully", status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
