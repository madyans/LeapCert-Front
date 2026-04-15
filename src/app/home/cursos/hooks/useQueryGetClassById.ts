import api from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import IClass from "../interface/IClass";

type AxiosLikeError = { status?: number; data?: { message?: string; flag?: boolean } };

async function getById(id: number): Promise<IClass | null> {
    try {
        const response = await api.get(`class/${id}`);

        if (!response.data.flag) {
            toast.warning("Erro ao buscar cursos", {
                description: response.data.message,
                duration: 5000,
                closeButton: true,
            });
            return null;
        }

        return response.data.data as IClass;
    } catch (err: unknown) {
        const ax = err as AxiosLikeError;
        if (ax.status === 403) {
            const e = new Error(ax.data?.message ?? "Acesso negado") as Error & { status: number };
            e.status = 403;
            throw e;
        }
        if (ax.status === 401) {
            const e = new Error(ax.data?.message ?? "Não autorizado") as Error & { status: number };
            e.status = 401;
            throw e;
        }
        toast.warning("Erro ao buscar cursos", {
            description: typeof ax.data?.message === "string" ? ax.data.message : "Tente novamente.",
            duration: 5000,
            closeButton: true,
        });
        return null;
    }
}

export default function useQueryGetClassById(id: number) {
    return useQuery({
        queryKey: ["class", id],
        queryFn: () => getById(id),
        enabled: Number.isFinite(id) && id > 0,
        retry: (failureCount, error: unknown) => {
            const status = (error as Error & { status?: number })?.status;
            if (status === 403 || status === 401) return false;
            return failureCount < 3;
        },
    });
}