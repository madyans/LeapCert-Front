"use client"

import CardLoadingClass from "@/src/components/createdComponents/card-loading-class"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip"
import { CLASS_GENDER } from "@/src/constants/CLASS_GENDER"
import { dsp } from "@/src/constants/DEFAULT_STYLE_PAGE"
import { BookOpen, Calendar, Filter, Search, Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { useCursoModel } from "./cursos.model"

type CursosViewType = ReturnType<typeof useCursoModel>

export const CursosView = (props: CursosViewType) => {
    const { cursos, cursosArray, isLoading, filteredCursos, getRatingBadgeColor, getRatingColor, searchTerm, setSearchTerm } = props
    const router = useRouter()

    return (
        <div className={`${dsp} space-y-8`}>
            <div className="space-y-6">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                        <BookOpen className="w-4 h-4" />
                        Catálogo de Cursos
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Descubra Novos
                        <span className="text-primary"> Conhecimentos</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore nossa coleção de cursos cuidadosamente selecionados para impulsionar sua carreira
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            placeholder="Buscar cursos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-11"
                        />
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="w-4 h-4" />
                            Filtros
                        </Button>
                        <Button className="gap-2 shadow-lg" onClick={() => router.push("/home/cursos/create")}>
                            <BookOpen className="w-4 h-4" />
                            Criar Curso
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-xl border">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{cursosArray.length}</div>
                        <div className="text-sm text-muted-foreground">Cursos Disponíveis</div>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 p-4 rounded-xl border">
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {cursosArray.filter((c) => Number.parseFloat(c.avaliacao) >= 4).length}
                        </div>
                        <div className="text-sm text-muted-foreground">Bem Avaliados</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-xl border">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {new Set(cursosArray.map((c) => c.genero)).size}
                        </div>
                        <div className="text-sm text-muted-foreground">Categorias</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading
                    ? Array.from({ length: 8 }).map((_, idx) => <CardLoadingClass key={idx} idx={idx} />)
                    : cursos != undefined &&
                    filteredCursos.map((curso) => (
                        <TooltipProvider key={curso.codigo}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Card
                                        onClick={() => router.push(`/home/cursos/${curso.codigo}`)}
                                        className="group relative overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:scale-[1.02] hover:-translate-y-1"
                                    >
                                        <div className="relative overflow-hidden">
                                            <Image
                                                src={`/${CLASS_GENDER[curso.codigo_genero]}`}
                                                alt="Imagem de fundo da categoria"
                                                width={320}
                                                height={180}
                                                className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            <Badge
                                                className={`absolute top-3 right-3 gap-1 ${getRatingBadgeColor(curso.avaliacao)} border-0 shadow-lg`}
                                            >
                                                <Star className="w-3 h-3 fill-current" />
                                                {Number.parseFloat(curso.avaliacao).toFixed(1)}
                                            </Badge>

                                            <Badge
                                                variant="secondary"
                                                className="absolute top-3 left-3 bg-white/90 text-gray-800 border-0 shadow-lg"
                                            >
                                                {curso.genero}
                                            </Badge>
                                        </div>

                                        <CardHeader className="pb-3 space-y-3">
                                            <CardTitle className="text-lg font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                                {curso.nome}
                                            </CardTitle>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(curso.created_at).toLocaleDateString("pt-BR")}
                                            </div>
                                        </CardHeader>

                                        <CardContent className="pt-0 space-y-4">
                                            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{curso.descricao}</p>

                                            <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                                <div className="flex items-center gap-1">
                                                    <Star className={`w-4 h-4 ${getRatingColor(curso.avaliacao)}`} />
                                                    <span className={`font-semibold text-sm ${getRatingColor(curso.avaliacao)}`}>
                                                        {Number.parseFloat(curso.avaliacao).toFixed(1)}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Clique para acessar →
                                                </div>
                                            </div>
                                        </CardContent>

                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    </Card>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                                    <p className="font-medium">Clique para acessar o curso</p>
                                    <p className="text-xs text-gray-300">
                                        {curso.genero} • ⭐ {Number.parseFloat(curso.avaliacao).toFixed(1)}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
            </div>

            {!isLoading && filteredCursos.length === 0 && (
                <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                        <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">Nenhum curso encontrado</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Tente ajustar sua busca ou explore outras categorias disponíveis
                    </p>
                    <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-4">
                        Limpar Filtros
                    </Button>
                </div>
            )}
        </div>
    )
}
