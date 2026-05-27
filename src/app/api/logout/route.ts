import { NextResponse } from "next/server";

const COOKIE_NAMES = ["accessToken", "UP", "UID", "UU"];

function expireCookie(response: NextResponse, name: string, domain?: string) {
    response.cookies.set({
        name,
        value: "",
        path: "/",
        maxAge: 0,
        expires: new Date(0),
        sameSite: "lax",
        domain,
    });
}

export async function POST() {
    const response = NextResponse.json({ ok: true });

    for (const name of COOKIE_NAMES) {
        expireCookie(response, name);
        expireCookie(response, name, "localhost");
    }

    return response;
}
