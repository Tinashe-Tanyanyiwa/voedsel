import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("loginFlag")?.value; // Check auth cookie
  const lastActivity = request.cookies.get("lastActivity")?.value; // Get last activity timestamp

  const now = Date.now();
  const inactivityLimit = 20 * 60 * 1000; // 20 minutes in milliseconds

  if (isAuthenticated && lastActivity) {
    const lastActivityTime = parseInt(lastActivity, 10);
    if (now - lastActivityTime > inactivityLimit) {
      // Clear authentication cookie if inactive
      Cookies.remove("loginFlag");
      return NextResponse.redirect(new URL("/", request.url)); // Redirect to login
    }
  }

  // Redirect to the root if not authenticated
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to the login page (root)
  }

  // Allow access to the dashboard if authenticated
  return NextResponse.next();
}

// See "Matching Paths" below to learn xmore
export const config = {
  matcher: "/dashboard/:path*",
};
