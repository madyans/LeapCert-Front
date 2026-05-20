import api from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import IClass from "../interface/IClass";

export class CourseAccessError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "CourseAccessError";
        this.status = status;
    }
}

async function getById(id: number): Promise<IClass | null> {
    try {
        const response = await api.get(`class/${id}`);

        if (!response.data.flag) {
            toast.warning("Erro ao buscar cursos", {
                description: response.data.message,
                duration: 5000,
                closeButton: true,
            })
            return null;
        }

        const modules: IClass = response.data.data
        return modules
    } catch (error: unknown) {
        const response = error as {
            status?: number;
            data?: { message?: string };
        };

        if (response?.status === 403) {
            throw new CourseAccessError(
                response.data?.message ?? "Você precisa ter pelo menos um curso criado para acessar este curso.",
                403,
            );
        }

        throw error;
    }
}

export default function useQueryGetClassById(id: number) {
    return useQuery({
        queryKey: ["class", id],
        queryFn: () => getById(id),
        enabled: Number.isFinite(id) && id > 0,
    });
}
