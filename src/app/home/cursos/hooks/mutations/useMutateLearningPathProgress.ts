import api from "@/src/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ICourseProgress } from "../../interface/IClass";

interface ToggleLearningPathPayload {
    itemId: number;
    completed: boolean;
}

async function toggleLearningPathProgress(classId: number, payload: ToggleLearningPathPayload): Promise<ICourseProgress | false> {
    const url = `class/${classId}/learning-path/${payload.itemId}/complete`;
    const response = payload.completed ? await api.post(url) : await api.delete(url);

    if (!response.data.flag) {
        toast.error("Não foi possível atualizar o progresso", {
            description: response.data.message,
            duration: 5000,
            closeButton: true,
        });
        return false;
    }

    return response.data.data as ICourseProgress;
}

export default function useMutateLearningPathProgress(classId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["learningPathProgress", classId],
        mutationFn: (payload: ToggleLearningPathPayload) => toggleLearningPathProgress(classId, payload),
        onSuccess: async (result) => {
            if (!result) return;

            await queryClient.invalidateQueries({ queryKey: ["class", classId] });
            await queryClient.invalidateQueries({ queryKey: ["studentCourses"] });
            await queryClient.invalidateQueries({ queryKey: ["allClasses"], exact: false });
        },
    });
}
