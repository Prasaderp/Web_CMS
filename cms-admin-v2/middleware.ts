/**
 * Next.js Middleware for authentication.
 * Protects dashboard routes from unauthenticated access.
 * 
 * Note: This runs on the Edge runtime, so we can't access localStorage directly.
 * We use cookies for server-side auth checks.
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const PROTECTED_ROUTES = ['/dashboard', '/blogs/new', '/blogs/edit'];

// Routes that should redirect to dashboard if already authenticated
const AUTH_ROUTES = ['/login'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get token from cookie (set by client after login)
    const token = request.cookies.get('auth_token')?.value;

    // Check if route is protected
    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

    // Redirect unauthenticated users to login
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect authenticated users away from login page
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all routes except static files and API routes
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
