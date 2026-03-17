"use client"

import CardLoadingClass from "@/src/components/createdComponents/card-loading-class"
import { Badge } from "@/src/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/src/components/ui/card"
import { CLASS_GENDER } from "@/src/constants/CLASS_GENDER"
import { GraduationCap, Star, BookOpen, Clock } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import useQueryGetAllClasses from "../cursos/hooks/useQueryGetAllClass"
import { useUser } from "@/src/context/ContextWrapper"

export function DashboardCourses() {
    const router = useRouter()
    const { data: cursos, isLoading } = useQueryGetAllClasses()
    const { loggedUser } = useUser()
    const cursosArray = Array.isArray(cursos) ? cursos : []

    // For the dashboard, we'll just show the first few courses to simulate "enrolled courses" 
    // or recommended courses if the user has none (since we're mocking)
    const displayCourses = cursosArray.slice(0, 4)

    const getRatingBadgeColor = (rating: string) => {
        const numRating = Number.parseFloat(rating)
        if (numRating >= 4.5) return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
        if (numRating >= 4) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        if (numRating >= 3) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        if (numRating >= 2) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* User welcome section */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        Olá, <span className="text-primary">{loggedUser?.nome || 'Usuário'}</span> 👋
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Aqui está o resumo do seu aprendizado. Continue seu progresso onde parou!
                    </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Cursos</p>
                            <p className="text-xl font-bold text-black dark:text-white">{displayCourses.length}</p>
                        </div>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10 flex items-center gap-3">
                        <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Horas</p>
                            <p className="text-xl font-bold text-black dark:text-white">12h</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Courses section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        Meus Cursos em Andamento
                    </h3>
                    <button 
                        onClick={() => router.push('/home/cursos')}
                        className="text-sm text-primary hover:underline font-medium"
                    >
                        Ver todos
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, idx) => <CardLoadingClass key={idx} idx={idx} />)
                        : cursos != undefined &&
                        displayCourses.map((curso) => (
                            <Card
                                key={curso.codigo}
                                onClick={() => router.push(`/home/cursos/${curso.codigo}`)}
                                className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:-translate-y-1"
                            >
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={`/${CLASS_GENDER[curso.codigo_genero]}`}
                                        alt="Imagem de fundo da categoria"
                                        width={320}
                                        height={140}
                                        className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    <Badge
                                        className={`absolute top-2 right-2 gap-1 ${getRatingBadgeColor(curso.avaliacao)} border-0 shadow-sm`}
                                    >
                                        <Star className="w-3 h-3 fill-current" />
                                        {Number.parseFloat(curso.avaliacao).toFixed(1)}
                                    </Badge>

                                    <Badge
                                        variant="secondary"
                                        className="absolute top-2 left-2 bg-white/90 text-gray-800 border-0 shadow-sm text-xs py-0"
                                    >
                                        {curso.genero}
                                    </Badge>
                                </div>

                                <CardHeader className="p-4 pb-2 space-y-2">
                                    <CardTitle className="text-base font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                        {curso.nome}
                                    </CardTitle>
                                    
                                    {/* Mock progress bar */}
                                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mb-1 mt-2">
                                        <div 
                                            className="bg-primary h-1.5 rounded-full" 
                                            style={{ width: `${Math.floor(Math.random() * 60) + 10}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-muted-foreground w-full">
                                        <span>Progresso</span>
                                        <span>Continuar →</span>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                </div>
                
                {!isLoading && displayCourses.length === 0 && (
                    <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                        <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-20" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Nenhum curso em andamento</h3>
                        <p className="text-muted-foreground text-sm mt-1 max-w-sm mx-auto">
                            Você ainda não está inscrito em nenhum curso. Explore o catálogo para começar a aprender!
                        </p>
                        <button 
                            onClick={() => router.push('/home/cursos')}
                            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors inline-block"
                        >
                            Explorar Catálogo
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
