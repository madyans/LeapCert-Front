import { cookies } from "next/headers";

export default async function ValidateToken({ token }: { token?: { value: string } }) {
    const cookie = cookies();

    const res = await fetch(`${process.env.API_URL}user/validateToken?token=${token?.value}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-store",
    });

    const data = await res.json();

    if (!data.flag) {
        (await cookie).delete("accessToken");
        (await cookie).delete("UID");
        (await cookie).delete("UP");
        (await cookie).delete("UU");
    }

    return data.flag;
}