import api from "@/src/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ClassType {
    codigo_professor: number,
    descricao: string,
    avaliacao: null,
    created_at: string,
    nome: string,
    genero: number
}


async function createClass(dto: ClassType) {
    const response = await api.post("teacher/createClass", dto);

    if (!response.data.flag) {
        toast.error("Erro ao criar curso", {
            description: response.data.message,
            duration: 5000,
            closeButton: true
        })
        return false;
    }

    return response.data.data;
}

export default function useMutateCreateClass() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["createCalss"],
        mutationFn: (dto: ClassType) => createClass(dto),
        onSuccess: () => {
            toast.success("Curso criado com sucesso", {
                description: "Curso cadastrado no sistema",
                duration: 5000,
                closeButton: true,
            });
            queryClient.invalidateQueries({ queryKey: ["allClasses"], exact: false });
        },
    });
}