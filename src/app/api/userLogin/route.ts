// /app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const users = await db
      .select()
      .from(user)
      .where(eq(user.email, email.toLowerCase().trim()))
      .limit(1);

    const foundUser = users[0];

    // Check if user exists
    if (!foundUser) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Simple direct password comparison (plain text)
    if (foundUser.password !== password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token with user data (excluding sensitive info)
    const token = sign(
      {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    // Set HTTP-only cookie with the token
    cookies().set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 86400, // 24 hours
    });

    // Return user info (without password)
    const userResponse = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      createdAt: foundUser.createdAt,
      updatedAt: foundUser.updatedAt,
      auth_token: token,
    };

    return NextResponse.json({
      message: "Login successful",
      user: userResponse,
      status: 200, 
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
