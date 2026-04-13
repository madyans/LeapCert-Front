import useQueryGetAllClasses from "../home/cursos/hooks/useQueryGetAllClass"
import { useMemo, useState } from "react"

export interface RootCourseType {
    id: number
    title: string
    description: string
    category: string
    rating: string
}

export const useRootModel = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const { data: classes, isLoading } = useQueryGetAllClasses()

    const allCourses = useMemo<RootCourseType[]>(
        () =>
            (classes ?? []).map((course) => ({
                id: course.codigo,
                title: course.nome,
                description: course.descricao,
                category: (course.genero ?? "geral").toLowerCase(),
                rating: course.avaliacao,
            })),
        [classes],
    )

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(allCourses.map((course) => course.category)))
        return [
            { id: "all", name: "Todos" },
            ...uniqueCategories.map((category) => ({
                id: category,
                name: category.charAt(0).toUpperCase() + category.slice(1),
            })),
        ]
    }, [allCourses])

    const filteredCourses = useMemo(
        () =>
            allCourses.filter((course) => {
                const matchesSearch =
                    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.description.toLowerCase().includes(searchTerm.toLowerCase())
                const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
                return matchesSearch && matchesCategory
            }),
        [allCourses, searchTerm, selectedCategory],
    )

    return {
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        filteredCourses,
        categories,
        isLoading,
    }
}