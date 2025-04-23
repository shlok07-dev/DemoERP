import { db } from "@/db";
import { inventory, deletedInventory } from "@/db/schema";
import { createAuditLog } from "@/db/schema/auditLog"; 
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

    // Get request metadata for audit log
    const requestHeaders = request.headers;
    const ipAddress =
      requestHeaders.get("x-forwarded-for") ||
      requestHeaders.get("x-real-ip") ||
      "unknown";
    const userAgent = requestHeaders.get("user-agent") || "unknown";

    // Soft delete inside a transaction
    await db.transaction(async (tx) => {
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

      // 1. Insert into deletedInventory
      await tx.insert(deletedInventory).values(archivedItem);

      // 2. Delete from inventory
      await tx.delete(inventory).where(eq(inventory.id, itemId));

      // 3. Create audit log
      await createAuditLog(
        tx,
        Number.parseInt(user.id),
        "delete",
        "inventory",
        itemId,
        existingItem, // old data
        null, // no new data after delete
        {
          ipAddress: ipAddress as string,
          userAgent: userAgent as string,
          requestId: crypto.randomUUID(),
        }
      );
    });

    return Response.json({ message: "Item moved to recycle bin", status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
