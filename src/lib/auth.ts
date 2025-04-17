// lib/auth.ts
import jwt from "jsonwebtoken";

export async function getUserFromRequest(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as {
      id: string;
      email: string;
      name: string;
      position: string;
      department: string;
    };
  } catch {
    return null;
  }
}
