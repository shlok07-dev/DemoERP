import { db } from "@/db";
import { inventory, deletedInventory } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { ApiError, handleApiError } from "@/lib/utils";
import { eq } from "drizzle-orm";

// DELETE /api/inventory/[id]

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest();
    if (!user) throw new Error("Unauthorized");

    const itemId = Number.parseInt(params.id);
    if (isNaN(itemId)) throw new ApiError("Invalid inventory ID", 400);

    const existingItem = await db.query.inventory.findFirst({
      where: eq(inventory.id, itemId),
    });

    if (!existingItem) throw new ApiError("Inventory item not found", 404);

    // Build insert object with correct type
    const archivedItem: typeof deletedInventory.$inferInsert = {
      originalId: existingItem.id,
      name: existingItem.name,
      productId: existingItem.productId,
      category: existingItem.category,
      qtyPurchased: existingItem.qtyPurchased,
      unitPrice: existingItem.unitPrice,
      totalAmount: existingItem.totalAmount,
      inStock: existingItem.inStock,
      supplier: existingItem.supplier,
      supplierContact: existingItem.supplierContact,
      status: existingItem.status,
      minimumStockLevel: existingItem.minimumStockLevel,
      reorderPoint: existingItem.reorderPoint,
      location: existingItem.location,
      notes: existingItem.notes,
      lastCheckedById: existingItem.lastCheckedById,
      lastCheckedDate: existingItem.lastCheckedDate,
      createdAt: existingItem.createdAt,
      updatedAt: existingItem.updatedAt,
      deletedById: Number(user.id),
      deletedAt: new Date(),
    };

    await db.insert(deletedInventory).values(archivedItem);

    // Delete from inventory
    await db.delete(inventory).where(eq(inventory.id, itemId));

    return Response.json({ message: "Item moved to recycle bin", status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
