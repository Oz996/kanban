import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token");
  const path = req.nextUrl.pathname;

  // redirect to landing page if unauhtorized user tries to access a board
  if (!token && path.startsWith("/board")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // redirect an authorized user trying to access landing page
  if (token && path === "/") {
    return NextResponse.redirect(
      new URL("/board/65e8cc688ccaa8c82151b6e5", req.url)
    );
  }
}

export const config = {
  matcher: ["/:path*"],
};
