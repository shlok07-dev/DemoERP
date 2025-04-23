import { db } from "@/db";
import { inventory } from "@/db/schema";
import { createAuditLog } from "@/db/schema/auditLog"; // ✅ added
import { getUserFromRequest } from "@/lib/auth";
import { ApiError, handleApiError } from "@/lib/utils";
import { eq } from "drizzle-orm";

// POST /api/inventory - Create a new inventory item
export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest();
    if (!user) throw new Error("Unauthorized");

    // Only allow certain positions to create inventory items
    // if (
    //   !["Admin", "Inventory Manager", "Store Keeper"].includes(user.position)
    // ) {
    //   throw new ApiError("Unauthorized access", 403);
    // }

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.productId) {
      throw new ApiError("Missing required fields", 400);
    }

    // Check if product ID already exists
    const existingItem =
      (await db.query.inventory.findFirst({
        where: eq(inventory.productId, body.productId),
      })) ||
      (await db.query.deletedInventory.findFirst({
        where: eq(inventory.productId, body.productId),
      }));

    if (existingItem) {
      throw new ApiError("Product ID already exists", 409);
    }

    // Get request metadata for audit log
    const requestHeaders = request.headers;
    const ipAddress =
      requestHeaders.get("x-forwarded-for") ||
      requestHeaders.get("x-real-ip") ||
      "unknown";
    const userAgent = requestHeaders.get("user-agent") || "unknown";

    // Insert new item and audit log inside transaction
    const newItem = await db.transaction(async (tx) => {
      const result = await tx
        .insert(inventory)
        .values({
          name: body.name,
          productId: body.productId,
          category: body.category || null,
          qtyPurchased: body.qtyPurchased || null,
          unitPrice: body.unitPrice || null,
          totalAmount: body.totalAmount || null,
          inStock: body.inStock || 0,
          supplier: body.supplier || null,
          supplierContact: body.supplierContact || null,
          status: body.status || "?",
          minimumStockLevel: body.minimumStockLevel || null,
          reorderPoint: body.reorderPoint || null,
          location: body.location || null,
          notes: body.notes || null,
          lastCheckedById: Number.parseInt(user.id),
        })
        .returning();

      // Create audit log
      await createAuditLog(
        tx,
        Number.parseInt(user.id),
        "create",
        "inventory",
        result[0].id,
        null, // no old data
        result[0], // new data
        {
          ipAddress: ipAddress as string,
          userAgent: userAgent as string,
          requestId: crypto.randomUUID(),
        }
      );

      return result[0];
    });

    return Response.json({
      message: "Item Added Successfully",
      item: newItem,
      status: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
