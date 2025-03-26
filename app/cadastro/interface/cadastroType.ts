"use client"

import { z } from "zod"

export const formSchema = z.object({
    email: z.string().min(2).max(50),
    nome_usuario: z.string().min(2).max(50),
    senha: z.string().min(2).max(50),
    confirmar_senha: z.string().min(2).max(50),
})