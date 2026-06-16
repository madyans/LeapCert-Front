import api from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ICourseProgressAlert } from "../interface/IClass";

async function getCourseProgressAlerts(): Promise<ICourseProgressAlert[]> {
    const response = await api.get("class/student/progress-alerts");

    if (!response.data.flag) {
        toast.warning("Erro ao buscar alertas de curso", {
            description: response.data.message,
            duration: 5000,
            closeButton: true,
        });
        return [];
    }

    const list = response.data.data as ICourseProgressAlert[];
    return Array.isArray(list) ? list : [];
}

export default function useQueryGetCourseProgressAlerts(enabled = true) {
    return useQuery({
        queryKey: ["courseProgressAlerts"],
        queryFn: getCourseProgressAlerts,
        enabled,
        staleTime: 1000 * 30,
        refetchInterval: 1000 * 60 * 5,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
        retry: 2,
    });
}
