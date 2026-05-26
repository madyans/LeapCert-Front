import { z } from "zod";

export const meuPerfilSchema = z
  .object({
    nome: z.string().min(3, "Informe seu nome"),
    usuario: z.string().min(3, "Informe um usuário"),
    senha: z.string().optional(),
    confirmar_senha: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const senha = (data.senha ?? "").trim();
    const confirmar = (data.confirmar_senha ?? "").trim();

    if (!senha && !confirmar) return;

    if (senha.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["senha"],
        message: "A senha deve ter no mínimo 6 caracteres",
      });
    }

    if (senha !== confirmar) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmar_senha"],
        message: "As senhas precisam ser iguais",
      });
    }
  });

export type MeuPerfilFormValues = z.infer<typeof meuPerfilSchema>;

