import { Button } from "@/src/components/ui/button"
import { ChevronLeft, ChevronRight, ClockIcon, SearchIcon } from "lucide-react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { categories, courses, CourseType } from "../constants"

interface iProps {
    router: AppRouterInstance
    searchTerm: string
    setSearchTerm: (id: string) => void
    selectedCategory: string
    setSelectedCategory: (id: string) => void
    filteredCourses: CourseType[],

}

export const Main = ({ router, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, filteredCourses }: iProps) => {
    const heroCourses = useMemo(
        () => courses.filter((course) => course.featured),
        []
    )

    const [currentIndex, setCurrentIndex] = useState(0)

    const hasHeroCourses = heroCourses.length > 0
    const totalHero = heroCourses.length

    const getCourseAt = (offset: number) => {
        if (!hasHeroCourses) return null
        const index = (currentIndex + offset + totalHero) % totalHero
        return heroCourses[index]
    }

    const centralCourse = getCourseAt(0)
    const leftCourse = getCourseAt(-1)
    const rightCourse = getCourseAt(1)

    const handlePrev = () => {
        if (!hasHeroCourses) return
        setCurrentIndex((prev) => (prev - 1 + totalHero) % totalHero)
    }

    const handleNext = () => {
        if (!hasHeroCourses) return
        setCurrentIndex((prev) => (prev + 1) % totalHero)
    }

    return (
        <main className="flex-1 w-full bg-gradient-to-b from-emerald-900 via-emerald-800/95 to-emerald-50">
            <section
                id="featured"
                className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 flex justify-center"
            >
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 items-center">
                    <div className="text-white space-y-5 sm:space-y-6">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight drop-shadow-lg">
                            Dê um <span className="text-green-300">salto</span> na sua
                            <br className="hidden sm:block" />
                            jornada de conhecimento.
                        </h1>
                        <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 max-w-xl">
                            Encontre cursos pensados para impulsionar o seu aprendizado e acelerar sua carreira,
                            em uma plataforma intuitiva e fácil de navegar.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            <Button
                                onClick={() => {
                                    const section = document.getElementById("courses")
                                    if (section) {
                                        section.scrollIntoView({ behavior: "smooth" })
                                    }
                                }}
                                className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold rounded-full px-6 sm:px-8 py-2.5 shadow-lg shadow-emerald-500/40"
                            >
                                Ver cursos disponíveis
                            </Button>
                            <Link
                                href="/cadastro"
                                className="text-emerald-50/90 hover:text-green-200 text-sm sm:text-base underline-offset-4 hover:underline"
                            >
                                Criar conta gratuitamente
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-emerald-100/80">
                            <span className="inline-flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                Certificados reconhecidos
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                Aulas atualizadas
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                Aprendizado no seu ritmo
                            </span>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-6 bg-emerald-700/50 blur-3xl rounded-[40px] opacity-70" />
                        <div className="relative rounded-[32px] bg-gradient-to-b from-emerald-50/95 to-emerald-100/95 shadow-2xl border border-emerald-100/80 px-4 sm:px-6 py-6 sm:py-7 flex flex-col gap-4 sm:gap-5 items-center">
                            {hasHeroCourses && centralCourse ? (
                                <>
                                    <div className="flex items-center justify-center gap-2 sm:gap-4 w-full">
                                        {leftCourse && (
                                            <div className="hidden sm:block flex-1 max-w-[140px] opacity-40 scale-90 rotate-[-1.5deg] transition-all duration-300">
                                                <HeroCourseCard
                                                    course={leftCourse}
                                                    size="sm"
                                                    muted
                                                />
                                            </div>
                                        )}

                                        <div className="flex-1 max-w-[260px] sm:max-w-[280px] lg:max-w-[320px] z-10">
                                            <HeroCourseCard course={centralCourse} size="lg" />
                                        </div>

                                        {rightCourse && (
                                            <div className="hidden sm:block flex-1 max-w-[140px] opacity-40 scale-90 rotate-[1.5deg] transition-all duration-300">
                                                <HeroCourseCard
                                                    course={rightCourse}
                                                    size="sm"
                                                    muted
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-2 sm:mt-3 flex items-center justify-between w-full gap-4">
                                        <div className="flex items-center gap-2 text-xs text-emerald-700/80">
                                            <ClockIcon className="h-4 w-4" />
                                            <span>{centralCourse.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={handlePrev}
                                                className="h-8 w-8 rounded-full bg-white shadow-sm border border-emerald-100 flex items-center justify-center text-emerald-700 hover:bg-emerald-50 transition-colors"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                className="h-8 w-8 rounded-full bg-white shadow-sm border border-emerald-100 flex items-center justify-center text-emerald-700 hover:bg-emerald-50 transition-colors"
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-emerald-800/80 gap-3">
                                    <SearchIcon className="h-10 w-10 text-emerald-500" />
                                    <p className="text-sm text-center max-w-xs">
                                        Em breve você verá aqui os cursos em destaque da plataforma.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="about"
                className="bg-emerald-50/95 border-y border-emerald-100/70"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-zinc-700">
                        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100/70 p-5 sm:p-6">
                            <h3 className="font-semibold text-emerald-800 mb-2 text-lg">
                                Plataforma intuitiva
                            </h3>
                            <p className="text-sm text-zinc-600">
                                Organize seus estudos com uma interface pensada para facilitar o seu dia a dia.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100/70 p-5 sm:p-6">
                            <h3 className="font-semibold text-emerald-800 mb-2 text-lg">
                                Conteúdos atualizados
                            </h3>
                            <p className="text-sm text-zinc-600">
                                Acompanhe materiais alinhados às necessidades atuais do mercado e das instituições.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100/70 p-5 sm:p-6">
                            <h3 className="font-semibold text-emerald-800 mb-2 text-lg">
                                Acompanhamento constante
                            </h3>
                            <p className="text-sm text-zinc-600">
                                Monitore seu progresso e avance no seu ritmo, com clareza sobre cada etapa.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="courses"
                className="w-full bg-emerald-50/95"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                    <div className="w-full mb-8 space-y-5">
                        <div className="flex flex-wrap justify-between items-center gap-4">
                            <h2 className="text-2xl sm:text-3xl text-zinc-800 font-bold tracking-wide">
                                Todos os <span className="text-emerald-700">Cursos</span>
                            </h2>

                            <div className="w-full sm:w-auto">
                                <div className="flex items-center gap-2 rounded-full bg-white shadow-sm border border-emerald-100 px-3 py-1.5 max-w-md sm:max-w-xs md:max-w-sm">
                                    <SearchIcon className="h-4 w-4 text-emerald-500" />
                                    <input
                                        type="text"
                                        placeholder="Buscar cursos por nome ou descrição..."
                                        className="bg-transparent border-none outline-none text-xs sm:text-sm placeholder-zinc-400 text-zinc-800 w-full"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-full text-xs sm:text-sm border transition-colors duration-200 ${selectedCategory === category.id
                                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                                        : "bg-white text-emerald-700 border-emerald-100 hover:bg-emerald-50"
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="group bg-white rounded-3xl shadow-sm overflow-hidden border border-emerald-100 flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                                >
                                    <div className="relative h-40 bg-gradient-to-br from-emerald-50 to-emerald-100/80 overflow-hidden">
                                        <Image
                                            src={course.image || "/placeholder.svg"}
                                            alt={course.title}
                                            fill
                                            className="object-contain p-3 group-hover:scale-105 transition-transform duration-200"
                                        />
                                        <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                                            {course.level}
                                        </div>
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="text-lg font-bold text-emerald-800 mb-1.5 line-clamp-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-zinc-600 mb-4 text-sm flex-1 line-clamp-3">
                                            {course.description}
                                        </p>
                                        <div className="flex justify-between items-center mt-auto pt-1">
                                            <span className="text-xs text-zinc-500 flex items-center">
                                                <ClockIcon className="h-3 w-3 mr-1" />
                                                {course.duration}
                                            </span>
                                            <Link
                                                href={`/cursos/${course.id}`}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-3 rounded-full text-xs sm:text-sm transition-colors duration-200 shadow-sm"
                                            >
                                                Ver curso
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="inline-flex justify-center items-center p-4 bg-emerald-100 rounded-full mb-4">
                                <SearchIcon className="h-8 w-8 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-700 mb-2">Nenhum curso encontrado</h3>
                            <p className="text-zinc-600">Tente ajustar seus filtros ou termos de busca</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}

interface HeroCourseCardProps {
    course: CourseType
    size: "sm" | "lg"
    muted?: boolean
}

const HeroCourseCard = ({ course, size, muted }: HeroCourseCardProps) => {
    const isLarge = size === "lg"

    return (
        <div
            className={`rounded-[24px] bg-white shadow-lg border border-emerald-100 overflow-hidden flex flex-col ${isLarge ? "h-[260px] sm:h-[280px]" : "h-[190px] text-xs"
                } ${muted ? "opacity-70" : ""}`}
        >
            <div className={`relative ${isLarge ? "h-32 sm:h-36" : "h-24"} bg-emerald-50`}>
                <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-contain p-3"
                />
                <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                    {course.level}
                </div>
            </div>
            <div className={`flex-1 px-3 sm:px-4 ${isLarge ? "py-3.5" : "py-2.5"}`}>
                <h3
                    className={`font-semibold text-emerald-900 ${isLarge ? "text-sm sm:text-base mb-1.5 line-clamp-2" : "text-xs mb-1 line-clamp-2"
                        }`}
                >
                    {course.title}
                </h3>
                <p
                    className={`text-emerald-800/80 ${isLarge ? "text-xs sm:text-sm line-clamp-3" : "text-[10px] line-clamp-2"
                        }`}
                >
                    {course.description}
                </p>
            </div>
        </div>
    )
}