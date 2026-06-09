import api from "@/src/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICourseProgressAlert } from "../../interface/IClass";

async function markCourseProgressAlertSeen(alertId: number): Promise<ICourseProgressAlert | false> {
    const response = await api.post(`class/student/progress-alerts/${alertId}/seen`);

    if (!response.data.flag) {
        return false;
    }

    return response.data.data as ICourseProgressAlert;
}

export default function useMutateCourseProgressAlertSeen() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["courseProgressAlertSeen"],
        mutationFn: markCourseProgressAlertSeen,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["courseProgressAlerts"] });
        },
    });
}
