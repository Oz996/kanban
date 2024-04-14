import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === "/") {
    return NextResponse.redirect(
      new URL("/board/65e8cc688ccaa8c82151b6e5", req.url)
    );
  }
}

export const config = {
  matcher: ["/:path*"],
};
