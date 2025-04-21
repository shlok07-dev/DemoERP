import { db } from "@/db";
import { inventory, deletedInventory } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { ApiError, handleApiError } from "@/lib/utils";
import { eq } from "drizzle-orm";

// POST /api/inventory/restoreItem/[id]

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest();
    if (!user) throw new Error("Unauthorized");

    const deletedId = Number.parseInt(params.id);
    if (isNaN(deletedId)) throw new ApiError("Invalid restore ID", 400);

    const deletedItem = await db.query.deletedInventory.findFirst({
      where: eq(deletedInventory.originalId, deletedId),
    });

    if (!deletedItem) {
      throw new ApiError("Item not found in recycle bin", 404); // or handle as needed
    }

    const restoredData: typeof inventory.$inferInsert = {
      name: deletedItem.name!,
      productId: deletedItem.productId!,
      category: deletedItem.category ?? null,
      qtyPurchased: deletedItem.qtyPurchased ?? null,
      unitPrice: deletedItem.unitPrice ?? null,
      totalAmount: deletedItem.totalAmount ?? null,
      inStock: deletedItem.inStock ?? null,
      supplier: deletedItem.supplier ?? null,
      supplierContact: deletedItem.supplierContact ?? null,
      status: deletedItem.status ?? null,
      minimumStockLevel: deletedItem.minimumStockLevel ?? null,
      reorderPoint: deletedItem.reorderPoint ?? null,
      location: deletedItem.location ?? null,
      notes: deletedItem.notes ?? null,
      lastCheckedById: deletedItem.lastCheckedById ?? null,
      lastCheckedDate: deletedItem.lastCheckedDate ?? null,
      createdAt: deletedItem.createdAt,
      updatedAt: new Date(),
    };

    await db.insert(inventory).values(restoredData);

    return Response.json({
      message: "Item restored successfully",
      status: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
