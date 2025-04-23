import { db } from "@/db";
import { inventory, deletedInventory } from "@/db/schema";
import { createAuditLog } from "@/db/schema/auditLog";
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

    const requestHeaders = request.headers;
    const ipAddress =
      requestHeaders.get("x-forwarded-for") ||
      requestHeaders.get("x-real-ip") ||
      "unknown";
    const userAgent = requestHeaders.get("user-agent") || "unknown";

    const result = await db.transaction(async (tx) => {
      const deletedItem = await tx.query.deletedInventory.findFirst({
        where: eq(deletedInventory.originalId, deletedId),
      });

      if (!deletedItem) {
        throw new ApiError("Item not found in recycle bin", 404);
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

      const restoredItem = await tx
        .insert(inventory)
        .values(restoredData)
        .returning();

      await tx
        .delete(deletedInventory)
        .where(eq(deletedInventory.originalId, deletedId));

      await createAuditLog(
        tx,
        Number.parseInt(user.id),
        "restore",
        "inventory",
        restoredItem[0].id,
        deletedItem, // old (from deleted)
        restoredItem[0], // new (restored)
        {
          ipAddress: ipAddress as string,
          userAgent: userAgent as string,
          requestId: crypto.randomUUID(),
        }
      );

      return restoredItem[0];
    });

    return Response.json({
      message: "Item restored successfully",
      item: result,
      status: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
