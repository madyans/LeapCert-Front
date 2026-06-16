"use client"

import CardLoadingClass from "@/src/components/createdComponents/card-loading-class"
import CourseCard from "@/src/components/createdComponents/course-card"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { useUser } from "@/src/context/ContextWrapper"
import { BookOpen, CheckCircle2, GraduationCap, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import type { ComponentType, ReactNode } from "react"
import useQueryGetAllClasses from "../cursos/hooks/useQueryGetAllClass"

function ratingValue(rating: string | null | undefined) {
    const value = Number.parseFloat(String(rating ?? "0"))
    return Number.isFinite(value) ? value : 0
}

export function DashboardCourses() {
    const router = useRouter()
    const { data: cursos, isLoading } = useQueryGetAllClasses()
    const { loggedUser } = useUser()
    const cursosArray = Array.isArray(cursos) ? cursos : []
    const connectedCount = cursosArray.filter((curso) => curso.can_access_content || curso.is_connected || curso.is_owner).length
    const topRatedCourses = [...cursosArray]
        .sort((a, b) => ratingValue(b.avaliacao) - ratingValue(a.avaliacao))
        .slice(0, 4)
    const availableCourses = cursosArray.slice(0, 8)

    return (
        <div className="space-y-8">
            <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-primary">Dashboard</p>
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
                        Olá, {loggedUser?.nome || "usuário"}
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-zinc-600">
                        Acompanhe seus cursos, encontre novos conteúdos e retome sua jornada de aprendizado.
                    </p>
                </div>
                <Button onClick={() => router.push("/home/cursos")} className="w-full md:w-auto">
                    Ver catálogo
                </Button>
            </section>

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <MetricCard
                    icon={BookOpen}
                    label="Cursos no catálogo"
                    value={cursosArray.length}
                />
                <MetricCard
                    icon={CheckCircle2}
                    label="Com acesso liberado"
                    value={connectedCount}
                />
                <MetricCard
                    icon={Star}
                    label="Bem avaliados"
                    value={cursosArray.filter((curso) => ratingValue(curso.avaliacao) >= 4).length}
                />
            </section>

            <CourseSection
                title="Cursos mais bem avaliados"
                description="Cursos com melhor avaliação no catálogo."
                actionLabel="Ver todos"
                onAction={() => router.push("/home/cursos")}
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, idx) => <CardLoadingClass key={`top-${idx}`} idx={idx} compact />)
                        : topRatedCourses.map((curso, index) => (
                            <CourseCard
                                key={`top-${curso.codigo}`}
                                course={curso}
                                variant="ranking"
                                ranking={index + 1}
                                onOpen={(course) => router.push(`/home/cursos/${course.codigo}`)}
                            />
                        ))}
                </div>
            </CourseSection>

            <CourseSection
                title="Cursos disponíveis"
                description="Acesse ou conecte-se aos cursos da plataforma."
                actionLabel="Abrir catálogo"
                onAction={() => router.push("/home/cursos")}
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, idx) => <CardLoadingClass key={idx} idx={idx} compact />)
                        : availableCourses.map((curso) => (
                            <CourseCard
                                key={curso.codigo}
                                course={curso}
                                variant="compact"
                                onOpen={(course) => router.push(`/home/cursos/${course.codigo}`)}
                            />
                        ))}
                </div>

                {!isLoading && availableCourses.length === 0 ? (
                    <EmptyCourses onExplore={() => router.push("/home/cursos")} />
                ) : null}
            </CourseSection>
        </div>
    )
}

function MetricCard({
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

function CourseSection({
    title,
    description,
    actionLabel,
    onAction,
    children,
}: {
    title: string
    description: string
    actionLabel: string
    onAction: () => void
    children: ReactNode
}) {
    return (
        <section className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-950">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        {title}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">{description}</p>
                </div>
                <Button variant="outline" size="sm" onClick={onAction} className="w-full sm:w-auto">
                    {actionLabel}
                </Button>
            </div>
            {children}
        </section>
    )
}

function EmptyCourses({ onExplore }: { onExplore: () => void }) {
    return (
        <div className="rounded-lg border border-dashed border-zinc-200 bg-white p-8 text-center">
            <GraduationCap className="mx-auto mb-3 h-10 w-10 text-zinc-300" />
            <h3 className="text-base font-semibold text-zinc-950">Nenhum curso disponível</h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-zinc-500">
                Quando houver cursos cadastrados, eles aparecerão aqui para acesso rápido.
            </p>
            <Button variant="outline" onClick={onExplore} className="mt-4">
                Explorar catálogo
            </Button>
        </div>
    )
}
