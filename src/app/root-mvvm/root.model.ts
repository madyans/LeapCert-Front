import useQueryGetAllClasses from "../home/cursos/hooks/useQueryGetAllClass"
import { useMemo, useState } from "react"

export interface RootCourseType {
    id: number
    title: string
    description: string
    category: string
    rating: string
    codigo_genero?: number | null
}

const ratingValue = (rating: string | null | undefined) => {
    const v = Number.parseFloat(String(rating ?? "0"))
    return Number.isFinite(v) ? v : 0
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
                codigo_genero: course.codigo_genero,
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

    const topRatedCourses = useMemo(
        () =>
            [...allCourses]
                .sort((a, b) => ratingValue(b.rating) - ratingValue(a.rating))
                .slice(0, 4),
        [allCourses],
    )

    return {
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        filteredCourses,
        topRatedCourses,
        categories,
        isLoading,
    }
}