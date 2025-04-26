import { NextRequest, NextResponse } from 'next/server';

const publicRouter = [
    { path: "/leapcert", whenAuthenticated: "next" },
    { path: "/", whenAuthenticated: "next" },
    { path: "/cadastro", whenAuthenticated: "redirect" },
    { path: "/login", whenAuthenticated: "redirect" }
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicRoute = publicRouter.find(route => route.path === path);
    const authToken = request.cookies.get("accessToken")

    if (!authToken && publicRoute)
        return NextResponse.next();

    if (!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

        return NextResponse.redirect(redirectUrl);
    }

    if (authToken && publicRoute && publicRoute.whenAuthenticated == "redirect") {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/home";

        return NextResponse.redirect(redirectUrl);
    }

    // TODO: falta fazer uma função de validar o token
    if (authToken && !publicRoute)
        return NextResponse.next()

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}