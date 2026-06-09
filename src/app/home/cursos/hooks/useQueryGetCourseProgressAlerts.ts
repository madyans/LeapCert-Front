import api from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";
import type { ICourseProgressAlert } from "../interface/IClass";

async function getCourseProgressAlerts(): Promise<ICourseProgressAlert[]> {
    try {
        const response = await api.get("class/student/progress-alerts");

        if (!response.data.flag) {
            return [];
        }

        return response.data.data as ICourseProgressAlert[];
    } catch {
        return [];
    }
}

export default function useQueryGetCourseProgressAlerts(enabled = true) {
    return useQuery({
        queryKey: ["courseProgressAlerts"],
        queryFn: getCourseProgressAlerts,
        enabled,
        staleTime: 1000 * 60 * 5,
    });
}
