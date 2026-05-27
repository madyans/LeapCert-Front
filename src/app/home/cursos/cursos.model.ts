import { useState } from "react";
import useQueryGetAllClasses from "./hooks/useQueryGetAllClass";
import api from "@/src/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCursoModel = () => {
    const { data: cursos, isLoading } = useQueryGetAllClasses();
    const queryClient = useQueryClient();
    const cursosArray = Array.isArray(cursos) ? cursos : [];
    const [searchTerm, setSearchTerm] = useState("")

    const { mutateAsync: connectCourse, isPending: isConnectingCourse } = useMutation({
        mutationKey: ["connectCourseFromCatalog"],
        mutationFn: async (classId: number) => {
            const response = await api.post(`class/${classId}/connect`)
            if (!response.data.flag) {
                toast.error("Não foi possível conectar ao curso", {
                    description: response.data.message,
                    duration: 5000,
                    closeButton: true,
                })
                return false
            }
            return response.data.data
        },
        onSuccess: async (result) => {
            if (!result) return
            toast.success("Curso conectado", {
                description: "Ele já aparece na sua área do aluno.",
                duration: 5000,
                closeButton: true,
            })
            await queryClient.invalidateQueries({ queryKey: ["allClasses"], exact: false })
            await queryClient.invalidateQueries({ queryKey: ["studentCourses"] })
        },
    })

    const filteredCursos = cursosArray.filter(
        (curso) =>
            curso.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (curso.genero ?? "").toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const getRatingColor = (rating: string) => {
        const numRating = Number.parseFloat(rating)
        if (numRating >= 4.5) return "text-emerald-600 dark:text-emerald-400"
        if (numRating >= 4) return "text-blue-600 dark:text-blue-400"
        if (numRating >= 3) return "text-yellow-600 dark:text-yellow-400"
        if (numRating >= 2) return "text-orange-600 dark:text-orange-400"
        return "text-red-600 dark:text-red-400"
    }

    const getRatingBadgeColor = (rating: string) => {
        const numRating = Number.parseFloat(rating)
        if (numRating >= 4.5) return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
        if (numRating >= 4) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        if (numRating >= 3) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        if (numRating >= 2) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    }

    return { cursos, isLoading, cursosArray, searchTerm, setSearchTerm, filteredCursos, getRatingBadgeColor, getRatingColor, connectCourse, isConnectingCourse }
}   
