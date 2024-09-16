import { NextRequest, NextResponse } from "next/server";

const locales = ["ja", "en"];

function detectLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    // fetch first entry of accept-language
    const preferredLocale = acceptLanguage.split(",")[0].split("-")[0];

    if (locales.includes(preferredLocale)) {
      return preferredLocale;
    }
  }

  return "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // If no locale in the pathname, redirect to default or detected locale
  const locale = detectLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
  ],
};
