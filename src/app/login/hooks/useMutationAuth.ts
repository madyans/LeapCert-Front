import { LoginService } from "@/src/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface LoginSuccessData {
    codigo: number;
    nome: string;
    perfil: number;
    usuario: string;
}

interface LoginResponse {
    flag: boolean;
    data: LoginSuccessData;
    accessToken: string;
    message?: string;
}

async function Login({
    usuario,
    senha,
}: {
    usuario: string;
    senha: string;
}) {
    const response = await LoginService({ usuario, senha });
    const loginResponse: LoginResponse | null = response?.data ?? null;
    console.log("===== raw response ======", response);

    console.log("Login response", loginResponse);

    if (!loginResponse || !loginResponse.flag) {
        console.log("Error!!");
        throw new Error(loginResponse?.message || "Senha ou usuário incorretos");
    }

    console.log("Success!!");

    return loginResponse;
}

export function useMutateLogin() {
    const mutation = useMutation({
        mutationFn: Login,
        onSuccess: () => {
            toast.success("Login feito com sucesso", {
                description: "Tenha um bom trabalho!",
                closeButton: true,
                duration: 5000,
            });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Erro ao fazer login", {
                description: "Senha ou usuário incorretos",
                closeButton: true,
            });
        },
    });

    return mutation;
}

