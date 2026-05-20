import useQueryGetGenders from "@/src/general-hooks/useQueryGetAllGenders"
import { zodResolver } from "@hookform/resolvers/zod"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import useMutateCreateClass from "../hooks/mutations/useMutateCreateClass"
import useMutateSendObject from "../hooks/mutations/useMutateSendObject"
import { createSchema } from "./create.schema"

function parseProfessorIdFromCookie(raw: unknown): number | null {
    if (raw == null || raw === "") {
        return null;
    }
    try {
        const decoded = JSON.parse(atob(String(raw)));
        const n = typeof decoded === "number" ? decoded : Number(decoded);
        if (!Number.isFinite(n) || n < 1) {
            return null;
        }
        return n;
    } catch {
        return null;
    }
}

function sanitizeObjectFileName(fileName: string) {
    const safe = fileName.split(/[\\/]/).pop()?.replace(/[<>:"|?*\0]/g, "_").trim()
    return safe || "arquivo.bin"
}

function buildLearningPathFilePath(courseName: string, index: number) {
    return `${courseName}/trilha/item-${index + 1}`
}

export const useCreateClassModel = () => {
    const router = useRouter()
    const professorId = parseProfessorIdFromCookie(getCookie("UID"));

    const { data: dataGenders, isLoading: isLoadingGenders } = useQueryGetGenders()
    const { mutateAsync: createClassAsync, isPending: isCreating } = useMutateCreateClass()
    const { mutateAsync: sendVideoAsync, isPending: isUploading } = useMutateSendObject()
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [learningPathFiles, setLearningPathFiles] = useState<Record<number, File | null>>({})

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            nome: "",
            genero: 0,
            descricao: "",
            secoes: [
                {
                    titulo: "",
                    conteudo: "",
                },
            ],
            trilha: [
                {
                    titulo: "",
                    tipo: "reading",
                    concluido_padrao: false,
                    arquivo_nome: null,
                    arquivo_path: null,
                    arquivo_tipo: null,
                },
            ],
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

    const isPending = useMemo(
        () => isCreating || isUploading,
        [isCreating, isUploading],
    )

    const onVideoFileChange = useCallback((file: File | null) => {
        setVideoFile(file)
    }, [])

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

    const onSubmit = useCallback(
        async (values: z.infer<typeof createSchema>) => {
            if (professorId == null) {
                toast.error("Sessão inválida", {
                    description: "Faça login novamente para identificar o professor.",
                    duration: 6000,
                    closeButton: true,
                });
                return;
            }
            const courseName = values.nome.trim()
            const classDto = {
                nome: values.nome.trim(),
                genero: values.genero,
                descricao: values.descricao,
                created_at: new Date().toISOString(),
                avaliacao: null,
                codigo_professor: professorId,
                secoes: values.secoes.map((section, index) => ({
                    titulo: section.titulo.trim(),
                    conteudo: section.conteudo.trim(),
                    ordem: index + 1,
                })),
                trilha: values.trilha.map((item, index) => ({
                    titulo: item.titulo.trim(),
                    tipo: item.tipo.trim(),
                    concluido_padrao: item.concluido_padrao,
                    arquivo_nome: learningPathFiles[index]?.name ?? item.arquivo_nome ?? null,
                    arquivo_path: learningPathFiles[index]
                        ? `${buildLearningPathFilePath(courseName, index)}/${sanitizeObjectFileName(learningPathFiles[index]!.name)}`
                        : item.arquivo_path ?? null,
                    arquivo_tipo: learningPathFiles[index]?.type || item.arquivo_tipo || null,
                    ordem: index + 1,
                })),
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
            }
            const created = await createClassAsync(classDto)
            if (created === false) {
                return
            }
            for (const [rawIndex, file] of Object.entries(learningPathFiles)) {
                if (!file) continue
                const index = Number(rawIndex)
                const uploaded = await sendVideoAsync({
                    object: file,
                    path: buildLearningPathFilePath(courseName, index),
                })
                if (uploaded === false) {
                    toast.error("Curso criado, mas um arquivo da trilha não foi enviado", {
                        description: `Tente reenviar o arquivo "${file.name}" pela edição do curso.`,
                        duration: 6000,
                        closeButton: true,
                    })
                    router.back()
                    return
                }
            }
            if (videoFile) {
                try {
                    const uploaded = await sendVideoAsync({
                        object: videoFile,
                        path: values.nome.trim(),
                    })
                    if (uploaded === false) {
                        toast.error("Curso criado, mas o vídeo não foi enviado", {
                            description: "Tente enviar o arquivo novamente pela área do curso.",
                            duration: 6000,
                            closeButton: true,
                        })
                        router.back()
                        return
                    }
                } catch {
                    toast.error("Curso criado, mas o vídeo não foi enviado", {
                        description: "Erro de rede ou servidor ao enviar o arquivo.",
                        duration: 6000,
                        closeButton: true,
                    })
                    router.back()
                    return
                }
            }
            router.back()
        },
        [createClassAsync, sendVideoAsync, professorId, videoFile, learningPathFiles, router],
    )

    const isSubmitting = form.formState.isSubmitting

    return {
        dataGenders, isLoadingGenders,
        form,
        onSubmit, isSubmitting,
        isPending,
        videoFile,
        onVideoFileChange,
        learningPathFiles,
        onLearningPathFileChange,
        onLearningPathRemove,
    }
}
