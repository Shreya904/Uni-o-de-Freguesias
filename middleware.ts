import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_EXACT = new Set([
  "/",
  "/noticias",
  "/contactos",
  "/contactos-uteis",
  "/faq",
  "/institucional/documentacao",
  "/not-found",
]);

const ALLOWED_PREFIX = ["/noticias/"];

const normalizePathname = (pathname: string) =>
  pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

export function middleware(request: NextRequest) {
  const pathname = normalizePathname(request.nextUrl.pathname);

  if (ALLOWED_EXACT.has(pathname) || ALLOWED_PREFIX.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/not-found", request.url));
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
