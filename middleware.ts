import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { HISTORICAL_REDIRECTS } from '@/lib/redirects';

export function middleware(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;
  let target = request.nextUrl.clone();
  let needsRedirect = false;

  // Historical 301s — check before any normalisation
  const fullPath = pathname + search;
  const historicalTarget =
    HISTORICAL_REDIRECTS[fullPath] ?? HISTORICAL_REDIRECTS[pathname];
  if (historicalTarget) {
    target.pathname = historicalTarget;
    target.search = '';
    return NextResponse.redirect(target, 301);
  }

  // Catch-all for legacy ASP.NET and WordPress upload paths not in the map
  if (
    pathname.startsWith('/page.aspx') ||
    pathname.startsWith('/pg.aspx') ||
    pathname.startsWith('/wp-content/')
  ) {
    target.pathname = '/';
    target.search = '';
    return NextResponse.redirect(target, 301);
  }

  // Force bare domain (no www)
  if (hostname.startsWith('www.')) {
    target.hostname = hostname.replace(/^www\./, '');
    needsRedirect = true;
  }

  // Force https in production
  if (
    process.env.NODE_ENV === 'production' &&
    request.nextUrl.protocol === 'http:'
  ) {
    target.protocol = 'https:';
    needsRedirect = true;
  }

  // Lowercase pathname
  if (pathname !== pathname.toLowerCase()) {
    target.pathname = pathname.toLowerCase();
    needsRedirect = true;
  }

  if (needsRedirect) {
    return NextResponse.redirect(target, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/health).*)'],
};
