"use client"

import type IClass from "@/src/app/home/cursos/interface/IClass"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Progress } from "@/src/components/ui/progress"
import { CLASS_GENDER } from "@/src/constants/CLASS_GENDER"
import { cn } from "@/lib/utils"
import { BookOpen, CheckCircle2, LinkIcon, PlayCircle, Star, UserRound } from "lucide-react"
import Image from "next/image"

type CourseCardVariant = "compact" | "catalog" | "ranking"

interface CourseCardProps {
    course: IClass
    variant?: CourseCardVariant
    ranking?: number
    actionDisabled?: boolean
    onOpen: (course: IClass) => void
    onAction?: (course: IClass) => void | Promise<void>
}

function ratingValue(rating: string | null | undefined) {
    const value = Number.parseFloat(String(rating ?? "0"))
    return Number.isFinite(value) ? value : 0
}

function getStatus(course: IClass) {
    if (course.is_owner) {
        return {
            label: "Criado por mim",
            actionLabel: "Abrir",
            icon: CheckCircle2,
            tone: "border-emerald-200 bg-emerald-50 text-emerald-700",
        }
    }

    if (course.can_access_content || course.is_connected) {
        return {
            label: "Conectado",
            actionLabel: "Abrir",
            icon: PlayCircle,
            tone: "border-blue-200 bg-blue-50 text-blue-700",
        }
    }

    return {
        label: "Disponível",
        actionLabel: "Conectar",
        icon: LinkIcon,
        tone: "border-zinc-200 bg-zinc-50 text-zinc-700",
    }
}

export default function CourseCard({
    course,
    variant = "catalog",
    ranking,
    actionDisabled = false,
    onOpen,
    onAction,
}: CourseCardProps) {
    const rating = ratingValue(course.avaliacao)
    const status = getStatus(course)
    const StatusIcon = status.icon
    const compact = variant === "compact" || variant === "ranking"
    const imageName = CLASS_GENDER[(course.codigo_genero ?? 1) as keyof typeof CLASS_GENDER] ?? "programacao.png"
    const progress = Math.min(Math.max(course.progresso_usuario ?? 0, 0), 100)
    const actionLabel = onAction ? status.actionLabel : "Abrir"

    return (
        <Card
            role="button"
            tabIndex={0}
            onClick={() => onOpen(course)}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    onOpen(course)
                }
            }}
            className={cn(
                "group h-full overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-colors hover:border-emerald-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                compact ? "min-h-[270px]" : "min-h-[360px]",
            )}
        >
            <div className="relative overflow-hidden border-b border-zinc-100 bg-zinc-100">
                <Image
                    src={`/${imageName}`}
                    alt={`Imagem da categoria ${course.genero || "curso"}`}
                    width={420}
                    height={220}
                    className={cn("w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]", compact ? "h-32" : "h-40")}
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />

                {variant === "ranking" && ranking ? (
                    <Badge className="absolute left-3 top-3 border-0 bg-white text-zinc-800 shadow-sm">
                        #{ranking}
                    </Badge>
                ) : (
                    <Badge variant="secondary" className="absolute left-3 top-3 border-0 bg-white/95 text-zinc-800 shadow-sm">
                        {course.genero || "Curso"}
                    </Badge>
                )}

                <Badge className="absolute right-3 top-3 gap-1 border-0 bg-white/95 text-zinc-800 shadow-sm">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {rating.toFixed(1)}
                </Badge>
            </div>

            <CardContent className={cn("flex h-full flex-col p-4", compact ? "gap-3" : "gap-4")}>
                <div className="min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-zinc-950 transition-colors group-hover:text-primary">
                            {course.nome}
                        </h3>
                        <span className={cn("inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium", status.tone)}>
                            <StatusIcon className="h-3.5 w-3.5" />
                            {status.label}
                        </span>
                    </div>

                    <p className={cn("text-sm leading-6 text-zinc-600", compact ? "line-clamp-2" : "line-clamp-3")}>
                        {course.descricao || "Curso disponível para acesso."}
                    </p>
                </div>

                {!compact && course.nome_professor ? (
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <UserRound className="h-4 w-4" />
                        <span className="truncate">{course.nome_professor}</span>
                    </div>
                ) : null}

                {(course.can_access_content || course.is_connected || course.is_owner) && course.progresso_usuario !== undefined ? (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-medium text-zinc-500">
                            <span>Progresso</span>
                            <span className="text-zinc-700">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2 bg-zinc-100" />
                    </div>
                ) : null}

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-zinc-100 pt-3">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-700">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span>{compact ? "Curso" : course.genero || "Curso"}</span>
                    </div>

                    <Button
                        type="button"
                        size="sm"
                        variant={course.can_access_content || course.is_owner ? "secondary" : "outline"}
                        className="h-8 shrink-0"
                        disabled={actionDisabled}
                        onClick={(event) => {
                            event.stopPropagation()
                            if (onAction) {
                                onAction(course)
                                return
                            }
                            onOpen(course)
                        }}
                    >
                        {actionLabel}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
