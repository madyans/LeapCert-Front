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
    secoes: {
        titulo: string
        conteudo: string
        ordem: number
    }[]
    trilha: {
        titulo: string
        tipo: string
        concluido_padrao: boolean
        arquivo_nome?: string | null
        arquivo_path?: string | null
        arquivo_tipo?: string | null
        ordem: number
    }[]
    forum_topicos: {
        autor: string
        titulo: string
        resumo: string
        ordem: number
    }[]
    avaliacoes_itens: {
        titulo: string
        tipo: string
        quantidade_questoes: number | null
        duracao: string | null
        prazo: string | null
        ordem: number
    }[]
    certificados: {
        titulo: string
        descricao: string
        status: string
        progresso_padrao: number
        disponivel_padrao: boolean
        ordem: number
    }[]
    contato_professor: {
        nome_professor: string
        subtitulo: string
        mensagem_orientacao: string
    }
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
