"use client"

import useQueryGetGenders from "@/src/general-hooks/useQueryGetAllGenders"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { FormCreate } from "../../create/components/Form"
import { createSchema } from "../../create/create.schema"
import useMutateCourseTopics from "../../hooks/mutations/useMutateCourseTopics"
import useMutateSendObject from "../../hooks/mutations/useMutateSendObject"
import useQueryGetClassById from "../../hooks/useQueryGetClassById"

function sanitizeObjectFileName(fileName: string) {
    const safe = fileName.split(/[\\/]/).pop()?.replace(/[<>:"|?*\0]/g, "_").trim()
    return safe || "arquivo.bin"
}

function buildLearningPathFilePath(coursePathOrName: string, index: number) {
    return `${coursePathOrName.replace(/\/+$/, "")}/trilha/item-${index + 1}`
}

export default function EditCourseTopicsPage() {
    const router = useRouter()
    const params = useParams<{ classId: string }>()
    const classId = Number(params.classId)
    const { data: course, isLoading: isLoadingCourse } = useQueryGetClassById(classId)
    const { data: dataGenders, isLoading: isLoadingGenders } = useQueryGetGenders()
    const { mutateAsync, isPending } = useMutateCourseTopics(classId)
    const { mutateAsync: sendObjectAsync, isPending: isUploading } = useMutateSendObject()
    const [learningPathFiles, setLearningPathFiles] = useState<Record<number, File | null>>({})

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            nome: "",
            genero: 0,
            descricao: "",
            secoes: [{ titulo: "", conteudo: "" }],
            trilha: [{ titulo: "", tipo: "reading", concluido_padrao: false, arquivo_nome: null, arquivo_path: null, arquivo_tipo: null }],
            forum_topicos: [],
            avaliacoes_itens: [],
            certificados: [],
            contato_professor: {
                nome_professor: "",
                subtitulo: "Professor do curso",
                mensagem_orientacao: "Envie uma mensagem diretamente para o professor do curso:",
            },
        },
    })

    useEffect(() => {
        if (!course) {
            return
        }

        form.reset({
            nome: course.nome,
            genero: course.codigo_genero ?? 0,
            descricao: course.descricao,
            secoes: course.secoes.length > 0 ? course.secoes.map((section) => ({
                titulo: section.titulo,
                conteudo: section.conteudo,
            })) : [{ titulo: "", conteudo: "" }],
            trilha: course.trilha.length > 0 ? course.trilha.map((item) => ({
                titulo: item.titulo,
                tipo: item.tipo,
                concluido_padrao: item.concluido_padrao,
                arquivo_nome: item.arquivo_nome ?? null,
                arquivo_path: item.arquivo_path ?? null,
                arquivo_tipo: item.arquivo_tipo ?? null,
            })) : [{ titulo: "", tipo: "reading", concluido_padrao: false, arquivo_nome: null, arquivo_path: null, arquivo_tipo: null }],
            forum_topicos: course.forum_topicos.map((topic) => ({
                autor: topic.autor,
                titulo: topic.titulo,
                resumo: topic.resumo,
            })),
            avaliacoes_itens: course.avaliacoes_itens.map((item) => ({
                titulo: item.titulo,
                tipo: item.tipo,
                quantidade_questoes: item.quantidade_questoes ?? undefined,
                duracao: item.duracao ?? "",
                prazo: item.prazo ? item.prazo.slice(0, 10) : "",
            })),
            certificados: course.certificados.map((certificate) => ({
                titulo: certificate.titulo,
                descricao: certificate.descricao,
                status: certificate.status,
                progresso_padrao: certificate.progresso_padrao,
                disponivel_padrao: certificate.disponivel_padrao,
            })),
            contato_professor: {
                nome_professor: course.contato_professor?.nome_professor ?? "",
                subtitulo: course.contato_professor?.subtitulo ?? "Professor do curso",
                mensagem_orientacao: course.contato_professor?.mensagem_orientacao ?? "Envie uma mensagem diretamente para o professor do curso:",
            },
        })
    }, [course, form])

    const onLearningPathFileChange = useCallback((index: number, file: File | null) => {
        setLearningPathFiles((prev) => ({ ...prev, [index]: file }))
    }, [])

    const onLearningPathRemove = useCallback((removedIndex: number) => {
        setLearningPathFiles((prev) => {
            const next: Record<number, File | null> = {}
            Object.entries(prev).forEach(([rawIndex, file]) => {
                const index = Number(rawIndex)
                if (index < removedIndex) {
                    next[index] = file
                }
                if (index > removedIndex) {
                    next[index - 1] = file
                }
            })
            return next
        })
    }, [])

    const isSaving = useMemo(() => isPending || isUploading, [isPending, isUploading])

    const onSubmit = async (values: z.infer<typeof createSchema>) => {
        const courseBasePath = course?.path?.replace(/\/+$/, "") || values.nome.trim()
        const trilha = values.trilha.map((item, index) => {
            const file = learningPathFiles[index]
            return {
                titulo: item.titulo.trim(),
                tipo: item.tipo.trim(),
                concluido_padrao: item.concluido_padrao,
                arquivo_nome: file?.name ?? item.arquivo_nome ?? null,
                arquivo_path: file
                    ? `${buildLearningPathFilePath(courseBasePath, index)}/${sanitizeObjectFileName(file.name)}`
                    : item.arquivo_path ?? null,
                arquivo_tipo: file?.type || item.arquivo_tipo || null,
                ordem: index + 1,
            }
        })

        for (const [rawIndex, file] of Object.entries(learningPathFiles)) {
            if (!file) continue
            const index = Number(rawIndex)
            const uploaded = await sendObjectAsync({
                object: file,
                path: buildLearningPathFilePath(courseBasePath, index),
            })

            if (uploaded === false) {
                toast.error("Não foi possível enviar um arquivo da trilha", {
                    description: `Arquivo: ${file.name}`,
                    duration: 6000,
                    closeButton: true,
                })
                return
            }
        }

        const updated = await mutateAsync({
            secoes: values.secoes.map((section, index) => ({
                titulo: section.titulo.trim(),
                conteudo: section.conteudo.trim(),
                ordem: index + 1,
            })),
            trilha,
            forum_topicos: values.forum_topicos.map((topic, index) => ({
                autor: topic.autor?.trim() || "Professor",
                titulo: topic.titulo.trim(),
                resumo: topic.resumo.trim(),
                ordem: index + 1,
            })),
            avaliacoes_itens: values.avaliacoes_itens.map((item, index) => ({
                titulo: item.titulo.trim(),
                tipo: item.tipo.trim(),
                quantidade_questoes: item.quantidade_questoes ? Number(item.quantidade_questoes) : null,
                duracao: item.duracao?.trim() || null,
                prazo: item.prazo || null,
                ordem: index + 1,
            })),
            certificados: values.certificados.map((certificate, index) => ({
                titulo: certificate.titulo.trim(),
                descricao: certificate.descricao.trim(),
                status: certificate.status.trim(),
                progresso_padrao: Number(certificate.progresso_padrao),
                disponivel_padrao: certificate.disponivel_padrao,
                ordem: index + 1,
            })),
            contato_professor: {
                nome_professor: values.contato_professor.nome_professor?.trim() || "",
                subtitulo: values.contato_professor.subtitulo?.trim() || "Professor do curso",
                mensagem_orientacao: values.contato_professor.mensagem_orientacao?.trim() || "Envie uma mensagem diretamente para o professor do curso:",
            },
        })

        if (updated !== false) {
            toast.success("Alterações salvas")
            router.push(`/home/cursos/${classId}`)
        }
    }

    if (isLoadingCourse || isLoadingGenders) {
        return null
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-zinc-50 p-6">
                <Card className="mx-auto max-w-xl">
                    <CardContent className="pt-6 space-y-4">
                        <p className="text-sm text-zinc-700">Curso não encontrado.</p>
                        <Button onClick={() => router.back()}>Voltar</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-50 p-4">
            <div className="mx-auto max-w-3xl">
                <FormCreate
                    dataGenders={dataGenders}
                    form={form}
                    isLoadingGenders={isLoadingGenders}
                    learningPathFiles={learningPathFiles}
                    onLearningPathFileChange={onLearningPathFileChange}
                    onLearningPathRemove={onLearningPathRemove}
                    onSubmit={onSubmit}
                    onVideoFileChange={() => null}
                    router={router}
                    videoFile={null}
                    title="Editar tópicos do curso"
                    description="Atualize as abas exibidas na página do curso."
                    submitLabel="Salvar alterações"
                    pendingLabel={isUploading ? "Enviando arquivos..." : "Salvando alterações..."}
                    isPending={isSaving}
                    hideVideo
                />
            </div>
        </div>
    )
}
