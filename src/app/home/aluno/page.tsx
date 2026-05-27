"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useUser } from "@/src/context/ContextWrapper";
import { Award, BookOpen, CheckCircle2, GraduationCap, LinkIcon, PlayCircle, Star, UserRound } from "lucide-react";
import Link from "next/link";
import useQueryGetStudentCourses from "../cursos/hooks/useQueryGetStudentCourses";
import type IClass from "../cursos/interface/IClass";

const progressValue = (course: IClass) => Math.max(0, Math.min(course.progresso_usuario ?? 0, 100));

function CourseRow({ course, label }: { course: IClass; label: string }) {
    const progress = progressValue(course);

    return (
        <div className="rounded-md border border-zinc-200 bg-white p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-zinc-950 line-clamp-1">{course.nome}</h3>
                        <Badge variant={course.is_owner ? "default" : "secondary"}>{label}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.descricao || "Curso disponível para estudo."}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
                        <span className="inline-flex items-center gap-1">
                            <UserRound className="h-3.5 w-3.5" />
                            {course.nome_professor || "Professor"}
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 text-amber-500" />
                            {Number.parseFloat(course.avaliacao ?? "0").toFixed(1)}
                        </span>
                    </div>
                </div>
                <Button asChild size="sm" className="shrink-0">
                    <Link href={`/home/cursos/${course.codigo}`}>{progress > 0 ? "Continuar" : "Abrir curso"}</Link>
                </Button>
            </div>

            <div className="mt-4 space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progresso</span>
                    <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>
        </div>
    );
}

function LoadingList() {
    return (
        <div className="space-y-3">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
        </div>
    );
}

export default function Page() {
    const { loggedUser } = useUser();
    const { data, isLoading } = useQueryGetStudentCourses();

    const createdCourses = data?.cursos_criados ?? [];
    const connectedCourses = data?.cursos_conectados ?? [];
    const inProgressCourses = data?.cursos_em_andamento ?? [];
    const completedCount = [...createdCourses, ...connectedCourses].filter((course) => progressValue(course) >= 100).length;
    const totalLearningCourses = createdCourses.length + connectedCourses.length;
    const nextCourse = inProgressCourses[0] ?? connectedCourses[0] ?? createdCourses[0];

    return (
        <div className="p-6 h-full w-full max-w-7xl mx-auto space-y-6">
            <Card className="border-emerald-100 bg-gradient-to-r from-emerald-50 to-white">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl">
                        Área do aluno {loggedUser?.nome ? `• ${loggedUser.nome}` : ""}
                    </CardTitle>
                    <CardDescription>
                        Sua jornada agora mostra os cursos criados por você, cursos conectados e progresso real por trilha.
                    </CardDescription>
                </CardHeader>
                {nextCourse ? (
                    <CardContent>
                        <div className="flex flex-col gap-3 rounded-md border border-emerald-200 bg-white/80 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs font-medium uppercase text-emerald-700">Continuar de onde parou</p>
                                <h2 className="mt-1 font-semibold text-zinc-950">{nextCourse.nome}</h2>
                                <p className="text-sm text-muted-foreground">{progressValue(nextCourse)}% concluído</p>
                            </div>
                            <Button asChild>
                                <Link href={`/home/cursos/${nextCourse.codigo}`}>Continuar curso</Link>
                            </Button>
                        </div>
                    </CardContent>
                ) : null}
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Cursos na jornada</CardDescription>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-emerald-600" />
                            {isLoading ? "--" : totalLearningCourses}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Conectados</CardDescription>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <LinkIcon className="w-5 h-5 text-blue-600" />
                            {isLoading ? "--" : connectedCourses.length}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Em andamento</CardDescription>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <PlayCircle className="w-5 h-5 text-amber-600" />
                            {isLoading ? "--" : inProgressCourses.length}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Concluídos</CardDescription>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Award className="w-5 h-5 text-violet-600" />
                            {isLoading ? "--" : completedCount}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Cursos em andamento</CardTitle>
                        <CardDescription>Continue os cursos conectados ou criados por você.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <LoadingList />
                        ) : inProgressCourses.length > 0 ? (
                            <div className="space-y-3">
                                {inProgressCourses.map((course) => <CourseRow key={`progress-${course.codigo}`} course={course} label={course.is_owner ? "Criado por mim" : "Conectado"} />)}
                            </div>
                        ) : (
                            <div className="rounded-md border border-dashed p-6 text-center">
                                <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground/40" />
                                <h3 className="mt-3 font-semibold">Nenhum curso em andamento</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Conecte-se a um curso e marque etapas da trilha como concluídas.</p>
                                <Button asChild variant="outline" className="mt-4">
                                    <Link href="/home/cursos">Explorar catálogo</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Próximos passos</CardTitle>
                        <CardDescription>Ações rápidas para avançar na plataforma.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button className="w-full justify-start" variant="secondary" asChild>
                            <Link href="/home/cursos">Conectar-se a cursos</Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                            <Link href="/home/cursos/create">Criar novo curso</Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                            <Link href="/home/configuracao/meu_perfil">Atualizar perfil</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            Cursos conectados
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <LoadingList /> : connectedCourses.length > 0 ? (
                            <div className="space-y-3">
                                {connectedCourses.map((course) => <CourseRow key={`connected-${course.codigo}`} course={course} label="Conectado" />)}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Você ainda não se conectou a cursos de outros usuários.</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Cursos criados por mim</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <LoadingList /> : createdCourses.length > 0 ? (
                            <div className="space-y-3">
                                {createdCourses.map((course) => <CourseRow key={`created-${course.codigo}`} course={course} label="Criado por mim" />)}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Você ainda não criou cursos.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
