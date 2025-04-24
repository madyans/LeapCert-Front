import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/home"];

export function middleware(request: NextRequest) {
    const cookie = request.cookies ? request.cookies.get("accessToken") : null;

    const path = request.nextUrl.pathname;
    const isPrivate = privateRoutes.includes(path);

    const completeUrl = request.nextUrl.clone().toString();

    if (
        completeUrl === "https://leapcert.com.br/"
    ) {
        return NextResponse.next();
    }

    if (isPrivate && (!cookie || !cookie.value)) {
        console.log("Desconectado: Sua sessão expirou, faça login novamente");
        return NextResponse.redirect(new URL(`/`, request.nextUrl.origin));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
};
