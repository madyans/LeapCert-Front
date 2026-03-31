import api from "./api";

interface BackendLoginSession {
    codigo: string;
    usuario: string;
    nome: string;
    perfil: number;
    timeStamp: string;
    token: string;
}

interface BackendLoginBody {
    flag: boolean;
    message?: string;
    data?: BackendLoginSession;
}

export async function LoginService({
    usuario,
    senha,
}: {
    usuario: string;
    senha: string;
}) {
    try {
        const response = await api.post<BackendLoginBody>(
            "user/authenticate",
            { usuario, senha },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            },
        );
        const body = response.data;
        if (!body.flag || !body.data) {
            return {
                data: {
                    flag: false as const,
                    message: body.message,
                    data: {
                        codigo: 0,
                        nome: "",
                        perfil: 0,
                        usuario: "",
                    },
                    accessToken: "",
                },
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config,
            };
        }
        const d = body.data;
        const maxAgeSeconds = 60 * 60 * 5;
        if (typeof document !== "undefined" && d.token) {
            document.cookie = `accessToken=${encodeURIComponent(d.token)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
        }
        return {
            data: {
                flag: true as const,
                data: {
                    codigo: Number(d.codigo),
                    nome: d.nome,
                    perfil: d.perfil,
                    usuario: d.usuario,
                },
                accessToken: d.token,
            },
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            config: response.config,
        };
    } catch (err: unknown) {
        const ax = err as { data?: BackendLoginBody; status?: number };
        const body = ax?.data;
        if (body && body.flag === false) {
            return {
                data: {
                    flag: false as const,
                    message: body.message,
                    data: {
                        codigo: 0,
                        nome: "",
                        perfil: 0,
                        usuario: "",
                    },
                    accessToken: "",
                },
                status: ax.status ?? 0,
                statusText: "Error",
                headers: {},
                config: {} as never,
            };
        }
        return null;
    }
}
