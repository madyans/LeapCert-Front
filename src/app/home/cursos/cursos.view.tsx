"use client"

import CardLoadingClass from "@/src/components/createdComponents/card-loading-class"
import CourseCard from "@/src/components/createdComponents/course-card"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { BookOpen, CheckCircle2, GraduationCap, Plus, Search, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import type { ComponentType } from "react"
import type IClass from "./interface/IClass"
import type { useCursoModel } from "./cursos.model"

type CursosViewType = ReturnType<typeof useCursoModel>

function ratingValue(rating: string | null | undefined) {
    const value = Number.parseFloat(String(rating ?? "0"))
    return Number.isFinite(value) ? value : 0
}

export const CursosView = (props: CursosViewType) => {
    const {
        connectCourse,
        cursosArray,
        isConnectingCourse,
        isLoading,
        filteredCursos,
        searchTerm,
        setSearchTerm,
    } = props
    const router = useRouter()

    const handleOpen = (curso: IClass) => {
        router.push(`/home/cursos/${curso.codigo}`)
    }

    const handleAction = async (curso: IClass) => {
        if (curso.can_access_content || curso.is_connected || curso.is_owner) {
            handleOpen(curso)
            return
        }

        await connectCourse(curso.codigo)
    }

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
            <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-primary">Catálogo</p>
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
                        Catálogo de cursos
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-zinc-600">
                        Encontre cursos, acompanhe seu acesso e conecte-se a novos conteúdos da plataforma.
                    </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" onClick={() => router.push("/home")} className="sm:w-auto">
                        Voltar ao dashboard
                    </Button>
                    <Button onClick={() => router.push("/home/cursos/create")} className="gap-2 sm:w-auto">
                        <Plus className="h-4 w-4" />
                        Criar curso
                    </Button>
                </div>
            </section>

            <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <CatalogMetric icon={BookOpen} label="Cursos disponíveis" value={cursosArray.length} />
                <CatalogMetric
                    icon={Star}
                    label="Bem avaliados"
                    value={cursosArray.filter((curso) => ratingValue(curso.avaliacao) >= 4).length}
                />
                <CatalogMetric
                    icon={CheckCircle2}
                    label="Com acesso liberado"
                    value={cursosArray.filter((curso) => curso.can_access_content || curso.is_connected || curso.is_owner).length}
                />
            </section>

            <section className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <Input
                            placeholder="Buscar por nome ou categoria"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-10 pl-9"
                        />
                    </div>
                    <p className="text-sm text-zinc-500">
                        {filteredCursos.length} {filteredCursos.length === 1 ? "curso encontrado" : "cursos encontrados"}
                    </p>
                </div>
            </section>

            <section>
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-950">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            Todos os cursos
                        </h2>
                        <p className="mt-1 text-sm text-zinc-500">Use a busca para filtrar rapidamente a lista.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {isLoading
                        ? Array.from({ length: 8 }).map((_, idx) => <CardLoadingClass key={idx} idx={idx} />)
                        : filteredCursos.map((curso) => (
                            <CourseCard
                                key={curso.codigo}
                                course={curso}
                                variant="catalog"
                                actionDisabled={isConnectingCourse}
                                onOpen={handleOpen}
                                onAction={handleAction}
                            />
                        ))}
                </div>

                {!isLoading && filteredCursos.length === 0 ? (
                    <div className="mt-6 rounded-lg border border-dashed border-zinc-200 bg-white p-10 text-center">
                        <Search className="mx-auto mb-3 h-10 w-10 text-zinc-300" />
                        <h3 className="text-base font-semibold text-zinc-950">Nenhum curso encontrado</h3>
                        <p className="mx-auto mt-1 max-w-md text-sm text-zinc-500">
                            Tente buscar por outro termo ou limpe a busca para ver todos os cursos disponíveis.
                        </p>
                        <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-4">
                            Limpar busca
                        </Button>
                    </div>
                ) : null}
            </section>
        </div>
    )
}

function CatalogMetric({
    icon: Icon,
    label,
    value,
}: {
    icon: ComponentType<{ className?: string }>
    label: string
    value: number
}) {
    return (
        <Card className="rounded-lg border-zinc-200 bg-white shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-2xl font-semibold text-zinc-950">{value}</p>
                    <p className="text-sm text-zinc-500">{label}</p>
                </div>
            </CardContent>
        </Card>
    )
}
