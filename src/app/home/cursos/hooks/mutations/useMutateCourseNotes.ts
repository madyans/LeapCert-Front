import api from "@/src/services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface NotePayload {
    titulo: string
    conteudo: string
}

async function createCourseNote(courseId: number, dto: NotePayload) {
    const response = await api.post(`class/${courseId}/notes`, dto)

    if (!response.data.flag) {
        toast.error("Erro ao salvar anotação", {
            description: response.data.message,
            duration: 5000,
            closeButton: true,
        })
        return false
    }

    return response.data.data
}

async function updateCourseNote(courseId: number, noteId: number, dto: NotePayload) {
    const response = await api.put(`class/${courseId}/notes/${noteId}`, dto)

    if (!response.data.flag) {
        toast.error("Erro ao editar anotação", {
            description: response.data.message,
            duration: 5000,
            closeButton: true,
        })
        return false
    }

    return response.data.data
}

async function deleteCourseNote(courseId: number, noteId: number) {
    const response = await api.delete(`class/${courseId}/notes/${noteId}`)

    if (!response.data.flag) {
        toast.error("Erro ao remover anotação", {
            description: response.data.message,
            duration: 5000,
            closeButton: true,
        })
        return false
    }

    return response.data.data
}

export function useMutateCreateCourseNote(courseId: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["courseNotes", courseId, "create"],
        mutationFn: (dto: NotePayload) => createCourseNote(courseId, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["class", courseId] })
        },
    })
}

export function useMutateUpdateCourseNote(courseId: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["courseNotes", courseId, "update"],
        mutationFn: ({ noteId, dto }: { noteId: number; dto: NotePayload }) => updateCourseNote(courseId, noteId, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["class", courseId] })
        },
    })
}

export function useMutateDeleteCourseNote(courseId: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["courseNotes", courseId, "delete"],
        mutationFn: (noteId: number) => deleteCourseNote(courseId, noteId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["class", courseId] })
        },
    })
}
