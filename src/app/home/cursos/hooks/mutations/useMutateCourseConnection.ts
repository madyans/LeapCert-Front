import api from "@/src/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function connectToCourse(classId: number) {
    const response = await api.post(`class/${classId}/connect`);

    if (!response.data.flag) {
        toast.error("Não foi possível conectar ao curso", {
            description: response.data.message,
            duration: 5000,
            closeButton: true,
        });
        return false;
    }

    return response.data.data;
}

export default function useMutateCourseConnection(classId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["courseConnection", classId],
        mutationFn: () => connectToCourse(classId),
        onSuccess: async (result) => {
            if (!result) return;

            toast.success("Curso conectado", {
                description: "O curso foi adicionado à sua área do aluno.",
                duration: 5000,
                closeButton: true,
            });

            await queryClient.invalidateQueries({ queryKey: ["class", classId] });
            await queryClient.invalidateQueries({ queryKey: ["allClasses"], exact: false });
            await queryClient.invalidateQueries({ queryKey: ["studentCourses"] });
        },
    });
}
