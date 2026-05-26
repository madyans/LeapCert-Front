"use client";

import useQueryGetAllClasses from "../cursos/hooks/useQueryGetAllClass";
import { useUser } from "@/src/context/ContextWrapper";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { BookOpen, MessageSquare, Star, Trophy } from "lucide-react";
import Link from "next/link";

const parseRating = (rating: string | null | undefined) => {
    const value = Number.parseFloat(String(rating ?? "0"));
    return Number.isFinite(value) ? value : 0;
};

export default function Page() {
    const { data: courses, isLoading } = useQueryGetAllClasses();
    const { loggedUser } = useUser();
    const courseList = Array.isArray(courses) ? courses : [];

    const topRatedCourses = [...courseList]
        .sort((a, b) => parseRating(b.avaliacao) - parseRating(a.avaliacao))
        .slice(0, 5);

    const totalCourses = courseList.length;
    const averageRating =
        totalCourses > 0
            ? courseList.reduce((acc, course) => acc + parseRating(course.avaliacao), 0) / totalCourses
            : 0;
    const availableCertificates = courseList.filter((course) =>
        course.certificados?.some((certificate) => certificate.disponivel_padrao),
    ).length;
    const coursesWithForum = courseList.filter((course) => (course.forum_topicos?.length ?? 0) > 0).length;

    return (
        <div className="p-6 h-full w-full max-w-7xl mx-auto space-y-6">
            <Card className="border-emerald-100 bg-gradient-to-r from-emerald-50 to-white">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Área do aluno {loggedUser?.nome ? `• ${loggedUser.nome}` : ""}
                    </CardTitle>
                    <CardDescription>
                        Acompanhe seus cursos, veja os melhores avaliados e continue de onde parou.
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total de cursos</CardDescription>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-emerald-600" />
                            {isLoading ? "--" : totalCourses}
                        </CardTitle>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Média de avaliação</CardDescription>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Star className="w-5 h-5 text-amber-500" />
                            {isLoading ? "--" : averageRating.toFixed(1)}
                        </CardTitle>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Cursos com certificado</CardDescription>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-violet-600" />
                            {isLoading ? "--" : availableCertificates}
                        </CardTitle>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Fóruns ativos</CardDescription>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-blue-600" />
                            {isLoading ? "--" : coursesWithForum}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Cursos mais bem avaliados</CardTitle>
                        <CardDescription>Ranking com base nas avaliações vindas do back-end.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {isLoading ? (
                            <p className="text-sm text-muted-foreground">Carregando cursos...</p>
                        ) : topRatedCourses.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Nenhum curso disponível no momento.</p>
                        ) : (
                            topRatedCourses.map((course, index) => {
                                const rating = parseRating(course.avaliacao);
                                const progressValue = Math.min((rating / 5) * 100, 100);

                                return (
                                    <div key={course.codigo} className="border rounded-xl p-4 space-y-2">
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="font-semibold">{course.nome}</p>
                                                <p className="text-sm text-muted-foreground line-clamp-1">
                                                    {course.descricao || "Curso disponível para estudo."}
                                                </p>
                                            </div>
                                            <Badge variant="secondary">#{index + 1}</Badge>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Avaliação: {rating.toFixed(1)} / 5.0
                                            </span>
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={`/home/cursos/${course.codigo}`}>Ver curso</Link>
                                            </Button>
                                        </div>

                                        <Progress value={progressValue} className="h-2" />
                                    </div>
                                );
                            })
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Próximos passos</CardTitle>
                        <CardDescription>Ações rápidas para continuar seus estudos.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button className="w-full justify-start" variant="secondary" asChild>
                            <Link href="/home/cursos">Explorar catálogo completo</Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                            <Link href="/home/configuracao/meu_perfil">Atualizar perfil</Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                            <Link href="/home/configuracao">Configurações da conta</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}