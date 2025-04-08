import api from "@/src/services/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserType {
    nome: string,
    email: string,
    usuario: string,
    senha: string,
    perfil: number
}


async function addUser(newUser: UserType) {
    const response = await api.post("user/addUser", newUser);

    if (!response.data.success) {
        toast.error("Erro ao criar usuário", {
            description: response.data.message,
            duration: 5000,
            closeButton: true
        })
        return false;
    }

    return response.data.data;
}

export default function useMutateAddUser() {
    const router = useRouter()

    return useMutation({
        mutationKey: ["addUser"],
        mutationFn: (user: UserType) => addUser(user),
        onSuccess: () => {
            toast.success("Usuário criado com sucesso", {
                description: "Usuário cadastrado e pronto para uso",
                duration: 5000,
                closeButton: true
            })
            router.back()
        }
    })
}