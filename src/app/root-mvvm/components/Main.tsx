import { Button } from "@/src/components/ui/button"
import { ClockIcon, SearchIcon } from "lucide-react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Image from "next/image"
import Link from "next/link"
import { categories, courses, CourseType } from "../constants"

interface iProps {
    router: AppRouterInstance
    selectedCategory: string
    setSelectedCategory: (id: string) => void
    filteredCourses: CourseType[],

}

export const Main = ({ router, selectedCategory, setSelectedCategory, filteredCourses }: iProps) => {
    return (
        <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-7xl mx-auto w-full">
            <section className="w-full mb-12">
                <h2 className="text-3xl text-zinc-700 font-bold mb-6 tracking-wide text-center">
                    Cursos <span className="text-emerald-600">em Destaque</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {courses
                        .filter((course) => course.featured)
                        .map((course) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl border border-emerald-100"
                            >
                                <div className="relative h-48 bg-emerald-100">
                                    <Image
                                        src={course.image || "/placeholder.svg"}
                                        alt={course.title}
                                        fill
                                        className="object-contain p-2"
                                    />
                                    <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {course.level}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-emerald-800 mb-2">{course.title}</h3>
                                    <p className="text-zinc-600 mb-4">{course.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-zinc-500 flex items-center">
                                            <ClockIcon className="h-4 w-4 mr-1" />
                                            {course.duration}
                                        </span>
                                        <Button
                                            onClick={() => router.push("/login")}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                                        >
                                            Ver curso
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            <section className="w-full mb-8">
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 rounded-full transition-colors duration-200 ${selectedCategory === category.id
                                ? "bg-emerald-600 text-white"
                                : "bg-white text-emerald-700 hover:bg-emerald-100"
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </section>

            <section className="w-full">
                <h2 className="text-3xl text-zinc-700 font-bold mb-6 tracking-wide text-center">
                    Todos os <span className="text-emerald-600">Cursos</span>
                </h2>

                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden border border-emerald-100 flex flex-col"
                            >
                                <div className="relative h-40 bg-emerald-50">
                                    <Image
                                        src={course.image || "/placeholder.svg"}
                                        alt={course.title}
                                        fill
                                        className="object-contain p-2"
                                    />
                                    <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {course.level}
                                    </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold text-emerald-800 mb-2">{course.title}</h3>
                                    <p className="text-zinc-600 mb-4 text-sm flex-1">{course.description}</p>
                                    <div className="flex justify-between items-center mt-auto">
                                        <span className="text-xs text-zinc-500 flex items-center">
                                            <ClockIcon className="h-3 w-3 mr-1" />
                                            {course.duration}
                                        </span>
                                        <Link
                                            href={`/cursos/${course.id}`}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-3 rounded text-sm transition-colors duration-200"
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
            </section>

            <section className="w-full mt-16 bg-emerald-800 rounded-xl p-8 text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">
                        Pronto para dar o próximo <span className="text-green-300">salto</span>?
                    </h2>
                    <p className="text-emerald-100 mb-6">
                        Cadastre-se hoje e tenha acesso a todos os nossos cursos e recursos exclusivos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/cadastro"
                            className="bg-white text-emerald-800 hover:bg-green-100 py-3 px-6 rounded-full font-bold transition-colors duration-200"
                        >
                            Cadastre-se Gratuitamente
                        </Link>
                        <Link
                            href="/leapcert"
                            className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-3 px-6 rounded-full font-bold transition-colors duration-200"
                        >
                            Saiba Mais
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}