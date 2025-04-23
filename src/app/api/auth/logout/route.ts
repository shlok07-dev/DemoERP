// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { createAuditLog } from "@/db/schema/auditLog";
import { db } from "@/db";

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest();

  const response = NextResponse.json({ message: "Logged out", status: 200 });

  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  // Audit log (if user is available)
  if (user) {
    const ipAddress =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      req.ip ||
      "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    await createAuditLog(
      db, // fallback to default db if you export it inside createAuditLog
      Number(user.id),
      "logout",
      "auth",
      user.id,
      null,
      null,
      {
        ipAddress: ipAddress as string,
        userAgent,
        requestId: crypto.randomUUID(),
      }
    );
  }

  return response;
}
