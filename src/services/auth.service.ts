import api from "./api";

export async function LoginService({
    usuario,
    senha,
}: {
    usuario: string;
    senha: string;
}) {
    const data = { usuario: usuario, Senha: senha };

    try {
        const response = await api.post(`/user/authenticate`, data, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });

        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}
