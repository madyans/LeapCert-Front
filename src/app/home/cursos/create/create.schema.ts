import { z } from "zod";

export const createSchema = z.object({
    nome: z.string().min(3),
    genero: z.number().min(1, "Selecione uma categoria"),
    descricao: z.string().min(5),
    secoes: z.array(z.object({
        titulo: z.string().trim().min(3, "Informe um título para a seção"),
        conteudo: z.string().trim().min(10, "Descreva o conteúdo da seção"),
    })).min(1, "Adicione pelo menos uma seção ao curso"),
    trilha: z.array(z.object({
        titulo: z.string().trim().min(3, "Informe um título"),
        tipo: z.string().trim().min(2, "Informe o tipo"),
        concluido_padrao: z.boolean(),
        arquivo_nome: z.string().optional().nullable(),
        arquivo_path: z.string().optional().nullable(),
        arquivo_tipo: z.string().optional().nullable(),
    })),
    forum_topicos: z.array(z.object({
        autor: z.string().trim().optional(),
        titulo: z.string().trim().min(3, "Informe um título"),
        resumo: z.string().trim().min(5, "Informe um resumo"),
    })),
    avaliacoes_itens: z.array(z.object({
        titulo: z.string().trim().min(3, "Informe um título"),
        tipo: z.string().trim().min(2, "Informe o tipo"),
        quantidade_questoes: z.coerce.number().optional(),
        duracao: z.string().trim().optional(),
        prazo: z.string().optional(),
    })),
    certificados: z.array(z.object({
        titulo: z.string().trim().min(3, "Informe um título"),
        descricao: z.string().trim().min(5, "Informe uma descrição"),
        status: z.string().trim().min(3, "Informe um status"),
        progresso_padrao: z.coerce.number().min(0).max(100),
        disponivel_padrao: z.boolean(),
    })),
    contato_professor: z.object({
        nome_professor: z.string().trim().optional(),
        subtitulo: z.string().trim().optional(),
        mensagem_orientacao: z.string().trim().optional(),
    }),
})
