"use client"

import { z } from "zod";

export const formSchema = z.object({
    nome: z.string().min(3).regex(/^[A-Za-zÀ-ÿ\s]+$/, "Nome não pode conter números ou pontuação"),
    email: z.string().min(2).max(50),
    usuario: z.string().min(2).max(50),
    senha: z.string().min(2).max(50),
    confirmar_senha: z.string().min(2).max(50)
})
