import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromRequest() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

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
