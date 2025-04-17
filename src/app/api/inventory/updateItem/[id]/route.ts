import { db } from "@/db";
import { inventory } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { ApiError, handleApiError } from "@/lib/utils";
import { eq } from "drizzle-orm";

// PATCH /api/inventory/[id] - Update an inventory item
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) throw new Error("Unauthorized");

    // Only allow certain positions to update inventory
    // if (
    //   !["Admin", "Inventory Manager", "Store Keeper"].includes(user.position)
    // ) {
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

    const body = await request.json();

    // Update inventory item
    const updatedItem = await db
      .update(inventory)
      .set({
        name: body.name ?? existingItem.name,
        category: body.category ?? existingItem.category,
        qtyPurchased: body.qtyPurchased ?? existingItem.qtyPurchased,
        unitPrice: body.unitPrice ?? existingItem.unitPrice,
        totalAmount: body.totalAmount ?? existingItem.totalAmount,
        inStock: body.inStock ?? existingItem.inStock,
        supplier: body.supplier ?? existingItem.supplier,
        supplierContact: body.supplierContact ?? existingItem.supplierContact,
        status: body.status ?? existingItem.status,
        minimumStockLevel:
          body.minimumStockLevel ?? existingItem.minimumStockLevel,
        reorderPoint: body.reorderPoint ?? existingItem.reorderPoint,
        location: body.location ?? existingItem.location,
        notes: body.notes ?? existingItem.notes,
        lastCheckedById: Number.parseInt(user.id),
        lastCheckedDate: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(inventory.id, itemId))
      .returning();

    return Response.json({
      message: "Item Updated Successfully",
      item: updatedItem[0],
      status: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
