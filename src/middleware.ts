import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login"];
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  const auth_token = request.cookies.get("auth_token");
  const isAuthenticated = !!auth_token;

  // Redirect unauthenticated users trying to access private routes
  if (!isAuthenticated && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Prevent logged-in users from accessing login
  if (isAuthenticated && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
