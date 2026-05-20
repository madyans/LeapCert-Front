import api from "@/src/services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface ForumTopicPayload {
    titulo: string
    resumo: string
}

async function createCourseForumTopic(courseId: number, dto: ForumTopicPayload) {
    const response = await api.post(`class/${courseId}/forum-topics`, dto)

    if (!response.data.flag) {
        toast.error("Erro ao criar discussão", {
            description: response.data.message,
            duration: 5000,
            closeButton: true,
        })
        return false
    }

    return response.data.data
}

export default function useMutateCourseForumTopic(courseId: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["courseForumTopic", courseId, "create"],
        mutationFn: (dto: ForumTopicPayload) => createCourseForumTopic(courseId, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["class", courseId] })
        },
    })
}
