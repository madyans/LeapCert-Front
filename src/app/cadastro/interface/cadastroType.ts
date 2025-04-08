"use client"

import { z } from "zod";

export const formSchema = z.object({
    nome: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    usuario: z.string().min(2).max(50),
    senha: z.string().min(2).max(50),
    confirmar_senha: z.string().min(2).max(50)
})
