interface ValidateTokenApiBody {
    flag?: boolean;
}

export default async function ValidateToken({
    token,
}: {
    token?: { value: string };
}) {
    if (!token?.value) {
        return false;
    }
    const baseUrl = process.env.API_URL;
    if (!baseUrl) {
        return false;
    }
    const url = `${baseUrl}user/validateToken?token=${encodeURIComponent(token.value)}`;
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });
        const data = (await res.json()) as ValidateTokenApiBody;
        return data.flag === true;
    } catch {
        return false;
    }
}
