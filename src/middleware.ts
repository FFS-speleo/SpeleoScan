import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME =
  process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME ?? "FFS-QR-CODE-ADMIN-TOKEN";
const JWT_SECRET = process.env.JWT_SECRET!;

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get(COOKIE_NAME)?.value;

  const qrMatch = pathname.match(/^\/api\/resources\/([a-zA-Z0-9-]+)$/);
  if (qrMatch && !req.headers.get("x-from-middleware")) {
    const uuid = qrMatch[1];
    try {
      const res = await fetch(`${req.nextUrl.origin}/api/resources/${uuid}`, {
        headers: { "x-from-middleware": "1" },
      });
      if (!res.ok) throw new Error("UUID not found");
      const { url } = await res.json();
      return NextResponse.redirect(url);
    } catch (err) {
      console.error("QR Code redirection failed:", err);
      return NextResponse.redirect(new URL("/404", req.url));
    }
  }

  if (pathname === "/admin/login" && token) {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    } catch {
      return NextResponse.next();
    }
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*", "/api/resources/:id*"],
};
