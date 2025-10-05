import { NextResponse } from 'next/server';
const COOKIE = 'staging_ok';
const MAX_AGE = 60 * 60 * 8; // 8h

export function middleware(req) {
  if (process.env.GIVANA_ENABLE_STAGING_GATE !== 'true') return NextResponse.next();

  const { pathname, searchParams } = new URL(req.url);
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/public/')
  ) return NextResponse.next();

  if (req.cookies.get(COOKIE)?.value === '1') return NextResponse.next();

  const provided = searchParams.get('secret') || req.headers.get('x-staging-secret');
  const expected = process.env.STAGING_SECRET || '';
  if (expected && provided === expected) {
    const url = new URL(req.url);
    url.searchParams.delete('secret');
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE, '1', { path: '/', httpOnly: true, sameSite: 'Lax', secure: true, maxAge: MAX_AGE });
    return res;
  }
  return new NextResponse('Unauthorized staging site', { status: 401 });
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|public).*)'],
};
