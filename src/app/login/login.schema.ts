import { z } from "zod";

export const formSchema = z.object({
    usuario: z.string().min(2, "Digite ao menos 2 caracteres").max(50),
    senha: z.string().max(50),
})