import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value ;
  const resetToken = req.cookies.get("resetToken")?.value;
  const resetMailToken = req.cookies.get("resetMailToken")?.value;
  console.log(resetMailToken);
  const url = req.nextUrl.clone();

  // ====== Protected routes ======
  const protectedRoutes = ["/dashboard", "/auth/change-password"];
  if (protectedRoutes.some((path) => url.pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  // ====== Protect reset-password ======
  if (url.pathname.startsWith("/auth/reset-password")) {
    if (!resetToken) {
      return NextResponse.redirect(new URL("/auth/forgot-password", req.url));
    }
  }


  // ===== Protect verify-otp ======
  if (url.pathname.startsWith("/auth/verify-otp")) {
    if (!resetMailToken) {
      return NextResponse.redirect(new URL("/auth/forgot-password", req.url));
    }
  }

  // ====== Redirect logged-in users away from auth pages ======
  const authPages = ["/auth/signin", "/auth/signup"];
  if (authPages.includes(url.pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/change-password",
    "/auth/signin",
    "/auth/signup",
    "/auth/reset-password", // ✅ now protected
    "/auth/verify-otp",
  ],
};
