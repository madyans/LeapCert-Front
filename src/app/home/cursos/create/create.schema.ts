import { z } from "zod";

export const createSchema = z.object({
    nome: z.string().min(3),
    genero: z.number(),
    descricao: z.string().min(5)
})
