import { useRouter } from "next/navigation"
import { useState } from "react"
import { courses } from "./constants"

export const useRootModel = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const router = useRouter()

    const filteredCourses = courses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return {
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        router,
        filteredCourses
    }
}