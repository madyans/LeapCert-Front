import { z } from "zod";

export const createSchema = z.object({
    nome: z.string().min(3),
    genero: z.number().min(1, "Selecione uma categoria"),
    descricao: z.string().min(5),
})
