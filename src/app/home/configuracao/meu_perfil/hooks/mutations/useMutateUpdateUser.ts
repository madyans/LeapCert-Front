import api from "@/src/services/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface UpdateUserPayload {
  codigo: number;
  nome: string;
  usuario: string;
  senha?: string;
}

async function updateUser(payload: UpdateUserPayload) {
  const endpoints = ["user/updateUser", "user/update", "user/editUser", "user/updateProfile"];

  let lastErr: unknown = null;

  for (const endpoint of endpoints) {
    try {
      const response = await api.put(endpoint, payload);
      if (!response.data?.flag) {
        toast.error("Erro ao atualizar perfil", {
          description: response.data?.message ?? "Não foi possível atualizar seus dados.",
          duration: 5000,
          closeButton: true,
        });
        return false;
      }
      return response.data.data ?? true;
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status;
      lastErr = err;
      // tenta o próximo endpoint quando não encontrado/rota inexistente
      if (status === 404) continue;
      break;
    }
  }

  const status = (lastErr as { status?: number })?.status;
  toast.error("Erro ao atualizar perfil", {
    description:
      status === 404
        ? "Endpoint de atualização não encontrado no back-end."
        : "Falha ao comunicar com o servidor. Tente novamente.",
    duration: 5000,
    closeButton: true,
  });

  return false;
}

export function useMutateUpdateUser() {
  return useMutation({
    mutationKey: ["updateUserProfile"],
    mutationFn: (payload: UpdateUserPayload) => updateUser(payload),
    onSuccess: (ok) => {
      if (!ok) return;
      toast.success("Perfil atualizado", {
        description: "Suas informações foram salvas com sucesso.",
        duration: 4000,
        closeButton: true,
      });
    },
  });
}

