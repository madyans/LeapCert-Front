import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { Separator } from "@/src/components/ui/separator"
import { Textarea } from "@/src/components/ui/textarea"
import { IGender } from "@/src/interface/general/type-gender"
import { BookOpen, FileText, Save, Tag, Type } from "lucide-react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
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
}

export const FormCreate = ({ form, onSubmit, dataGenders, isLoadingGenders, router, isPending }: iProps) => {
    return (
        <>
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
                <CardHeader className="text-center pb-8">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                        <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Informações do Curso</CardTitle>
                    <CardDescription className="text-base">Forneça os detalhes essenciais para seu novo curso</CardDescription>
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
                                            Criando Curso...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Criar Curso
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