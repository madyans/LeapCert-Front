import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { Separator } from "@/src/components/ui/separator"
import { Textarea } from "@/src/components/ui/textarea"
import { IGender } from "@/src/interface/general/type-gender"
import { Award, BookOpen, CheckCircle2, FileQuestion, FileText, MessageCircle, Paperclip, Plus, Save, Tag, Trash2, Type, UserRound, Video } from "lucide-react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useFieldArray } from "react-hook-form"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { createSchema } from "../create.schema"

interface iProps {
    form: UseFormReturn<z.infer<typeof createSchema>>
    onSubmit: (values: z.infer<typeof createSchema>) => void
    dataGenders: IGender[] | undefined
    isLoadingGenders: boolean
    router: AppRouterInstance
    isPending: boolean
    videoFile: File | null
    onVideoFileChange: (file: File | null) => void
    learningPathFiles?: Record<number, File | null>
    onLearningPathFileChange?: (index: number, file: File | null) => void
    onLearningPathRemove?: (index: number) => void
    title?: string
    description?: string
    submitLabel?: string
    pendingLabel?: string
    hideVideo?: boolean
}

export const FormCreate = ({
    form,
    onSubmit,
    dataGenders,
    isLoadingGenders,
    router,
    isPending,
    videoFile,
    onVideoFileChange,
    learningPathFiles = {},
    onLearningPathFileChange,
    onLearningPathRemove,
    title = "Informações do Curso",
    description = "Forneça os detalhes essenciais para seu novo curso",
    submitLabel = "Criar Curso",
    pendingLabel,
    hideVideo = false,
}: iProps) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "secoes",
    })
    const learningPath = useFieldArray({
        control: form.control,
        name: "trilha",
    })
    const forumTopics = useFieldArray({
        control: form.control,
        name: "forum_topicos",
    })
    const assessments = useFieldArray({
        control: form.control,
        name: "avaliacoes_itens",
    })
    const certificates = useFieldArray({
        control: form.control,
        name: "certificados",
    })
    const getLearningPathAccept = (type: string | undefined) => {
        if (type === "video") return "video/*,.mp4,.webm,.mov,.mkv"
        if (type === "reading") return "application/pdf,.pdf"
        return "application/pdf,image/*,.zip,.doc,.docx,.ppt,.pptx"
    }

    const getLearningPathHelp = (type: string | undefined) => {
        if (type === "video") return "Anexe o vídeo desta etapa."
        if (type === "reading") return "Anexe o PDF de leitura desta etapa."
        return "Opcional: anexe um material de apoio para esta etapa."
    }

    return (
        <>
            <Card className="shadow-sm border bg-white">
                <CardHeader className="text-center pb-8">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                        <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription className="text-base">{description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                                            <Type className="w-4 h-4 text-primary" />
                                            Nome do Curso
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: Introdução ao React.js, Marketing Digital Avançado..."
                                                className="h-12 text-base"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-sm">
                                            Escolha um nome claro e atrativo que descreva o conteúdo do seu curso
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Separator className="my-8" />

                            <FormField
                                control={form.control}
                                name="genero"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-primary" />
                                            Categoria
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <select
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    className="w-full border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                                    disabled={isLoadingGenders}
                                                >
                                                    <option value="">Selecione a categoria do curso</option>
                                                    {dataGenders && dataGenders.map((item: IGender, idx: number) => (
                                                        <option key={idx} value={item.codigo}>
                                                            {item.nome}
                                                        </option>
                                                    ))}
                                                </select>
                                                {isLoadingGenders && (
                                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormDescription className="text-sm">
                                            Selecione a categoria que melhor representa o tema do seu curso
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Separator className="my-8" />

                            <FormField
                                control={form.control}
                                name="descricao"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-primary" />
                                            Descrição
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Descreva o conteúdo do curso, objetivos de aprendizagem, pré-requisitos e o que os alunos conseguirão fazer após completar o curso..."
                                                className="min-h-32 text-base resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-sm">
                                            Forneça uma descrição detalhada que ajude os alunos a entender o valor do seu curso
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Separator className="my-8" />

                            <div className="space-y-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="text-base font-semibold flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-primary" />
                                            Seções do curso
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Crie os tópicos que serão exibidos na página do curso.
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                        disabled={isPending}
                                        onClick={() => append({ titulo: "", conteudo: "" })}
                                    >
                                        <Plus className="w-4 h-4" />
                                        Adicionar
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {fields.map((section, index) => (
                                        <div key={section.id} className="rounded-md border bg-zinc-50/60 p-4 space-y-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-sm font-medium text-zinc-700">Seção {index + 1}</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-zinc-500 hover:text-red-600"
                                                    disabled={isPending || fields.length === 1}
                                                    onClick={() => remove(index)}
                                                    aria-label={`Remover seção ${index + 1}`}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name={`secoes.${index}.titulo`}
                                                render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel>Título</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Ex: Objetivo do curso"
                                                                className="h-11"
                                                                disabled={isPending}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`secoes.${index}.conteudo`}
                                                render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel>Conteúdo</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Descreva esta seção do curso..."
                                                                className="min-h-28 text-base resize-none"
                                                                disabled={isPending}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator className="my-8" />

                            <div className="space-y-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="text-base font-semibold flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                            Trilha de aprendizado
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Defina os passos que aparecem na aba de trilha.
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                        disabled={isPending}
                                        onClick={() => learningPath.append({ titulo: "", tipo: "reading", concluido_padrao: false, arquivo_nome: null, arquivo_path: null, arquivo_tipo: null })}
                                    >
                                        <Plus className="w-4 h-4" />
                                        Adicionar
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {learningPath.fields.map((item, index) => (
                                        <div key={item.id} className="rounded-md border bg-zinc-50/60 p-4 space-y-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-sm font-medium text-zinc-700">Item {index + 1}</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-zinc-500 hover:text-red-600"
                                                    disabled={isPending || learningPath.fields.length === 1}
                                                    onClick={() => {
                                                        onLearningPathRemove?.(index)
                                                        learningPath.remove(index)
                                                    }}
                                                    aria-label={`Remover item da trilha ${index + 1}`}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
                                                <FormField control={form.control} name={`trilha.${index}.titulo`} render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel>Título</FormLabel>
                                                        <FormControl><Input placeholder="Ex: Introdução ao módulo" disabled={isPending} {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name={`trilha.${index}.tipo`} render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel>Tipo</FormLabel>
                                                        <FormControl>
                                                            <select
                                                                {...field}
                                                                disabled={isPending}
                                                                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                                                                onChange={(e) => {
                                                                    field.onChange(e.target.value)
                                                                    onLearningPathFileChange?.(index, null)
                                                                    form.setValue(`trilha.${index}.arquivo_nome`, null)
                                                                    form.setValue(`trilha.${index}.arquivo_path`, null)
                                                                    form.setValue(`trilha.${index}.arquivo_tipo`, null)
                                                                }}
                                                            >
                                                                <option value="reading">Leitura</option>
                                                                <option value="video">Vídeo</option>
                                                                <option value="quiz">Quiz</option>
                                                                <option value="activity">Atividade</option>
                                                                <option value="exam">Prova</option>
                                                            </select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                            <FormField control={form.control} name={`trilha.${index}.arquivo_nome`} render={({ field }) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel className="flex items-center gap-2">
                                                        <Paperclip className="h-4 w-4 text-primary" />
                                                        Arquivo da etapa
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            key={form.watch(`trilha.${index}.tipo`)}
                                                            type="file"
                                                            accept={getLearningPathAccept(form.watch(`trilha.${index}.tipo`))}
                                                            disabled={isPending}
                                                            className="h-11 cursor-pointer text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0] ?? null
                                                                onLearningPathFileChange?.(index, file)
                                                                field.onChange(file?.name ?? field.value ?? "")
                                                                form.setValue(`trilha.${index}.arquivo_tipo`, file?.type ?? form.getValues(`trilha.${index}.arquivo_tipo`) ?? null)
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-sm">
                                                        {getLearningPathHelp(form.watch(`trilha.${index}.tipo`))}
                                                        {learningPathFiles[index] ? (
                                                            <span className="block mt-1 font-medium text-foreground">
                                                                Selecionado: {learningPathFiles[index]?.name}
                                                            </span>
                                                        ) : field.value ? (
                                                            <span className="block mt-1 font-medium text-foreground">
                                                                Atual: {field.value}
                                                            </span>
                                                        ) : null}
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator className="my-8" />

                            <div className="space-y-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="text-base font-semibold flex items-center gap-2">
                                            <MessageCircle className="w-4 h-4 text-primary" />
                                            Fórum de discussão
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Cadastre tópicos sugeridos para orientar os alunos.
                                        </p>
                                    </div>
                                    <Button type="button" variant="outline" size="sm" className="gap-2" disabled={isPending} onClick={() => forumTopics.append({ autor: "", titulo: "", resumo: "" })}>
                                        <Plus className="w-4 h-4" />
                                        Adicionar
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    {forumTopics.fields.map((topic, index) => (
                                        <div key={topic.id} className="rounded-md border bg-zinc-50/60 p-4 space-y-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-sm font-medium text-zinc-700">Tópico {index + 1}</span>
                                                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-500 hover:text-red-600" disabled={isPending} onClick={() => forumTopics.remove(index)} aria-label={`Remover tópico ${index + 1}`}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <FormField control={form.control} name={`forum_topicos.${index}.titulo`} render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel>Título</FormLabel>
                                                        <FormControl><Input placeholder="Ex: Dúvidas sobre instalação" disabled={isPending} {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name={`forum_topicos.${index}.autor`} render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel>Autor</FormLabel>
                                                        <FormControl><Input placeholder="Professor" disabled={isPending} {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                            <FormField control={form.control} name={`forum_topicos.${index}.resumo`} render={({ field }) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel>Resumo</FormLabel>
                                                    <FormControl><Textarea placeholder="Descreva a discussão sugerida..." className="min-h-20 resize-none" disabled={isPending} {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator className="my-8" />

                            <div className="space-y-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="text-base font-semibold flex items-center gap-2">
                                            <FileQuestion className="w-4 h-4 text-primary" />
                                            Provas e atividades
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Configure avaliações exibidas no curso.
                                        </p>
                                    </div>
                                    <Button type="button" variant="outline" size="sm" className="gap-2" disabled={isPending} onClick={() => assessments.append({ titulo: "", tipo: "activity", quantidade_questoes: undefined, duracao: "", prazo: "" })}>
                                        <Plus className="w-4 h-4" />
                                        Adicionar
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    {assessments.fields.map((item, index) => (
                                        <div key={item.id} className="rounded-md border bg-zinc-50/60 p-4 space-y-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-sm font-medium text-zinc-700">Avaliação {index + 1}</span>
                                                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-500 hover:text-red-600" disabled={isPending} onClick={() => assessments.remove(index)} aria-label={`Remover avaliação ${index + 1}`}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <FormField control={form.control} name={`avaliacoes_itens.${index}.titulo`} render={({ field }) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel>Título</FormLabel>
                                                    <FormControl><Input placeholder="Ex: Quiz do módulo 1" disabled={isPending} {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <div className="grid gap-4 sm:grid-cols-4">
                                                <FormField control={form.control} name={`avaliacoes_itens.${index}.tipo`} render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel>Tipo</FormLabel>
                                                        <FormControl>
                                                            <select {...field} disabled={isPending} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                                                                <option value="quiz">Quiz</option>
                                                                <option value="activity">Atividade</option>
                                                                <option value="exam">Prova</option>
                                                            </select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name={`avaliacoes_itens.${index}.quantidade_questoes`} render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel>Questões</FormLabel>
                                                        <FormControl><Input type="number" min={0} disabled={isPending} {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name={`avaliacoes_itens.${index}.duracao`} render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel>Duração</FormLabel>
                                                        <FormControl><Input placeholder="15 minutos" disabled={isPending} {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name={`avaliacoes_itens.${index}.prazo`} render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel>Prazo</FormLabel>
                                                        <FormControl><Input type="date" disabled={isPending} {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator className="my-8" />

                            <div className="space-y-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="text-base font-semibold flex items-center gap-2">
                                            <Award className="w-4 h-4 text-primary" />
                                            Certificados
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Defina certificados e regras exibidas aos alunos.
                                        </p>
                                    </div>
                                    <Button type="button" variant="outline" size="sm" className="gap-2" disabled={isPending} onClick={() => certificates.append({ titulo: "", descricao: "", status: "Disponível após conclusão do curso", progresso_padrao: 0, disponivel_padrao: false })}>
                                        <Plus className="w-4 h-4" />
                                        Adicionar
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    {certificates.fields.map((certificate, index) => (
                                        <div key={certificate.id} className="rounded-md border bg-zinc-50/60 p-4 space-y-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-sm font-medium text-zinc-700">Certificado {index + 1}</span>
                                                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-500 hover:text-red-600" disabled={isPending} onClick={() => certificates.remove(index)} aria-label={`Remover certificado ${index + 1}`}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <FormField control={form.control} name={`certificados.${index}.titulo`} render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel>Título</FormLabel>
                                                        <FormControl><Input placeholder="Certificado de conclusão" disabled={isPending} {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name={`certificados.${index}.status`} render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel>Status</FormLabel>
                                                        <FormControl><Input placeholder="Disponível após conclusão" disabled={isPending} {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                            <FormField control={form.control} name={`certificados.${index}.descricao`} render={({ field }) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel>Descrição</FormLabel>
                                                    <FormControl><Textarea placeholder="Descreva o certificado..." className="min-h-20 resize-none" disabled={isPending} {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name={`certificados.${index}.progresso_padrao`} render={({ field }) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel>Progresso inicial (%)</FormLabel>
                                                    <FormControl><Input type="number" min={0} max={100} disabled={isPending} {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator className="my-8" />

                            <div className="space-y-5">
                                <div>
                                    <div className="text-base font-semibold flex items-center gap-2">
                                        <UserRound className="w-4 h-4 text-primary" />
                                        Fale com o professor
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Configure o bloco de contato mostrado no curso.
                                    </p>
                                </div>
                                <div className="rounded-md border bg-zinc-50/60 p-4 space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <FormField control={form.control} name="contato_professor.nome_professor" render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel>Nome exibido</FormLabel>
                                                <FormControl><Input placeholder="Nome do professor" disabled={isPending} {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="contato_professor.subtitulo" render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel>Subtítulo</FormLabel>
                                                <FormControl><Input placeholder="Professor do curso" disabled={isPending} {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                    <FormField control={form.control} name="contato_professor.mensagem_orientacao" render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel>Mensagem de orientação</FormLabel>
                                            <FormControl><Textarea placeholder="Envie uma mensagem diretamente para o professor do curso:" className="min-h-20 resize-none" disabled={isPending} {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                            </div>

                            <Separator className="my-8" />

                            {!hideVideo ? (
                            <div className="space-y-3">
                                <div className="text-base font-semibold flex items-center gap-2">
                                    <Video className="w-4 h-4 text-primary" />
                                    Vídeo do curso
                                </div>
                                <Input
                                    type="file"
                                    accept="video/*,.mp4,.webm,.mov,.mkv"
                                    disabled={isPending}
                                    className="h-12 cursor-pointer text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0] ?? null
                                        onVideoFileChange(f)
                                    }}
                                />
                                <p className="text-sm text-muted-foreground">
                                    Opcional: o arquivo é enviado para o armazenamento na pasta do curso após a criação.
                                    {videoFile ? (
                                        <span className="block mt-1 font-medium text-foreground">
                                            Selecionado: {videoFile.name}
                                        </span>
                                    ) : null}
                                </p>
                            </div>
                            ) : null}

                            {!hideVideo ? <Separator className="my-8" /> : null}

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    onClick={() => router.back()}
                                    className="flex-1 h-12"
                                    disabled={isPending}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" size="lg" className="flex-1 h-12 gap-2 shadow-lg" disabled={isPending}>
                                    {isPending ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            {pendingLabel ?? (videoFile ? "Salvando e enviando vídeo..." : "Criando curso...")}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            {submitLabel}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}
