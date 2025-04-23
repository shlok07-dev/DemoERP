import { db } from "@/db";
import { inventory } from "@/db/schema";
import { createAuditLog } from "@/db/schema/auditLog";
import { getUserFromRequest } from "@/lib/auth";
import { ApiError, handleApiError } from "@/lib/utils";
import { eq } from "drizzle-orm";

// PATCH /api/inventory/[id] - Update an inventory item
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest();
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

    // Prepare update data
    const updateData = {
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
    };

    // Get request metadata for audit log
    const requestHeaders = request.headers;
    const ipAddress =
      requestHeaders.get("x-forwarded-for") ||
      requestHeaders.get("x-real-ip") ||
      "unknown";
    const userAgent = requestHeaders.get("user-agent") || "unknown";

    // Update inventory item within a transaction to ensure both operations succeed
    const updatedItem = await db.transaction(async (tx) => {
      // 1. Update the inventory item
      const result = await tx
        .update(inventory)
        .set(updateData)
        .where(eq(inventory.id, itemId))
        .returning();

      // 2. Create audit log entry
      await createAuditLog(
        tx,
        Number.parseInt(user.id),
        "update",
        "inventory",
        itemId,
        existingItem, // old data
        result[0], // new data
        {
          ipAddress: ipAddress as string,
          userAgent: userAgent as string,
          requestId: crypto.randomUUID(), // Generate unique ID for this request
        }
      );

      return result[0];
    });

    return Response.json({
      message: "Item Updated Successfully",
      item: updatedItem,
      status: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
