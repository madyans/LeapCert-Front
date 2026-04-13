import api from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import IClass from "../interface/IClass";

async function getClasses(): Promise<IClass[]> {
    try {
        const response = await api.get("class");

        if (!response.data.flag) {
            toast.warning("Erro ao buscar cursos", {
                description: response.data.message,
                duration: 5000,
                closeButton: true,
            });
            return [];
        }

        const list = response.data.data as IClass[];
        return Array.isArray(list) ? list : [];
    } catch {
        try {
            // Some backends expose public catalog under a dedicated endpoint.
            const publicResponse = await api.get("class/public");
            if (!publicResponse.data.flag) {
                return [];
            }
            const list = publicResponse.data.data as IClass[];
            return Array.isArray(list) ? list : [];
        } catch {
            return [];
        }
    }
}

export default function useQueryGetAllClasses() {
    return useQuery({
        queryKey: ["allClasses"],
        queryFn: getClasses,
    });
}
