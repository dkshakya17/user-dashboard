// import { url } from 'inspector';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isExpired, decodeToken } from 'react-jwt';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // const isPublicPath = path === '/signin' || '/signup';
  const token = request.cookies.get('token')?.value || '';
  const userStatus = request.cookies.get('userStatus')?.value || '';

  const myDecodedToken = decodeToken(token);
  const isMyTokenExpired = isExpired(token);
  console.log(isMyTokenExpired, 'isMyTokenExpired');
  if (
    (!isMyTokenExpired && path === '/' && userStatus === 'NEW') ||
    (!isMyTokenExpired && path === '/' && userStatus === 'PENDING_FORM')
  ) {
    return NextResponse.redirect(new URL('/signup', request.url));
  }
  if (
    (!isMyTokenExpired && path === '/' && userStatus === 'IN_REVIEW') ||
    (!isMyTokenExpired && path === '/' && userStatus === 'SHORTLISTED')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (
    (!isMyTokenExpired && path === '/signup' && userStatus === 'NEW') ||
    (!isMyTokenExpired && path === '/signup' && userStatus === 'PENDING_FORM')
  ) {
    return NextResponse.next();
  }
  if (
    (!isMyTokenExpired &&
      path === '/dashboard' &&
      userStatus === 'IN_REVIEW') ||
    (!isMyTokenExpired && path === '/dashboard' && userStatus === 'SHORTLISTED')
  ) {
    return NextResponse.next();
  }
  if (
    (!isMyTokenExpired &&
      path === '/profile/basic-details' &&
      userStatus === 'IN_REVIEW') ||
    (!isMyTokenExpired &&
      path === '/profile/basic-details' &&
      userStatus === 'SHORTLISTED')
  ) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/signin', request.url));
}

export const config = {
  // restricted routes
  matcher: [
    '/',
    // '/signin',
    '/forms/:path*',
    '/profile/:path*',
    '/signup',
    '/dashboard',
  ],
};
