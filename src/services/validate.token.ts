// ============================================================
// MOCK de validação de token — remova este bloco e descomente
// a implementação real quando o backend estiver disponível.
// ============================================================
const MOCK_VALID_TOKEN = "mock-token-leapcert";

export default async function ValidateToken({ token }: { token?: { value: string } }) {
    // --- MOCK ---
    if (token?.value === MOCK_VALID_TOKEN) {
        return true;
    }
    return false;

    // --- REAL (descomentar quando o backend estiver pronto) ---
    // import { cookies } from "next/headers";
    // const cookie = cookies();
    // const res = await fetch(`${process.env.API_URL}user/validateToken?token=${token?.value}`, {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //     cache: "no-store",
    // });
    // const data = await res.json();
    // if (!data.flag) {
    //     (await cookie).delete("accessToken");
    //     (await cookie).delete("UID");
    //     (await cookie).delete("UP");
    //     (await cookie).delete("UU");
    // }
    // return data.flag;
}