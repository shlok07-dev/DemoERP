// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out", status: 200 });

  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, // Immediately expire
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
