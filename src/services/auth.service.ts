// ============================================================
// MOCK de autenticação — remova este bloco e descomente o
// trecho abaixo quando o backend estiver disponível.
// ============================================================
const MOCK_USER = {
    usuario: "admin",
    senha: "123456",
};

const MOCK_RESPONSE = {
    flag: true,
    data: {
        codigo: 1,
        nome: "Administrador",
        perfil: 1,
        usuario: "admin",
    },
    accessToken: "mock-token-leapcert",
};

export async function LoginService({
    usuario,
    senha,
}: {
    usuario: string;
    senha: string;
}) {
    // --- MOCK ---
    await new Promise((res) => setTimeout(res, 400)); // simula latência

    if (usuario === MOCK_USER.usuario && senha === MOCK_USER.senha) {
        // Seta o cookie accessToken manualmente para o middleware reconhecer
        document.cookie = `accessToken=mock-token-leapcert; path=/; max-age=${60 * 60}; SameSite=Strict`;

        return {
            data: MOCK_RESPONSE,
            status: 200,
            statusText: "OK",
            headers: {},
            config: {} as never,
        };
    }

    return null;

    // --- REAL (descomentar quando o backend estiver pronto) ---
    // import api from "./api";
    // const data = { usuario: usuario, Senha: senha };
    // try {
    //     const response = await api.post(`/user/authenticate`, data, {
    //         headers: { "Content-Type": "application/json" },
    //         withCredentials: true,
    //     });
    //     return response;
    // } catch (err) {
    //     console.log(err);
    //     return null;
    // }
}
