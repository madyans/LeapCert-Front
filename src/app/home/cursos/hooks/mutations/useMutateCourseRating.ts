import api from "@/src/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CourseRatingPayload {
    nota: number;
    comentario?: string;
}

async function submitCourseRating(classId: number, payload: CourseRatingPayload) {
    const response = await api.post(`class/${classId}/rating`, payload);

    if (!response.data.flag) {
        toast.error("Erro ao salvar avaliação", {
            description: response.data.message,
            duration: 5000,
            closeButton: true,
        });
        return false;
    }

    return response.data.data;
}

export default function useMutateCourseRating(classId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["courseRating", classId],
        mutationFn: (payload: CourseRatingPayload) => submitCourseRating(classId, payload),
        onSuccess: async (result) => {
            if (!result) {
                return;
            }

            toast.success("Avaliação salva com sucesso", {
                description: "Sua avaliação do curso foi atualizada.",
                duration: 5000,
                closeButton: true,
            });

            await queryClient.invalidateQueries({ queryKey: ["class", classId] });
            await queryClient.invalidateQueries({ queryKey: ["allClasses"], exact: false });
        },
    });
}
