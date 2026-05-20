import api from "@/src/services/api"
import { getCookie } from "cookies-next"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { ContentType, SelectedObject } from "../constants/types"
import useMutateCourseForumTopic from "../hooks/mutations/useMutateCourseForumTopic"
import { useMutateCreateCourseNote } from "../hooks/mutations/useMutateCourseNotes"
import useMutateCourseRating from "../hooks/mutations/useMutateCourseRating"
import useMutateSendObject from "../hooks/mutations/useMutateSendObject"
import useQueryGetAllObjects from "../hooks/useQueryGetAllObjects"
import { CourseAccessError } from "../hooks/useQueryGetClassById"
import useQueryGetClassById from "../hooks/useQueryGetClassById"
import { ICourseLearningPathItem } from "../interface/IClass"
import { ObjectType } from "../interface/ObjectType"
import { FileWithPreview } from "./cursosId.interface"

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

function buildObjectStorageKey(coursePath: string | null | undefined, objectRelativeName: string): string {
    const rel = objectRelativeName.replace(/^\/+/, "");
    const base = (coursePath ?? "").trim().replace(/\/+$/, "");
    return base ? `${base}/${rel}` : rel;
}

export const useCursosIdModel = (classId: number, isAuthenticated: boolean) => {
    const [selectedObject, setSelectedObject] = useState<SelectedObject>(null)
    const [selectedObjectType, setSelectedObjectType] = useState<string | null>(null)
    const [isResolvingMedia, setIsResolvingMedia] = useState(false)
    const [activeTab, setActiveTab] = useState<string>("conteudos")
    const [newNote, setNewNote] = useState<string>("")
    const [newNoteTitle, setNewNoteTitle] = useState<string>("")
    const [newForumTitle, setNewForumTitle] = useState<string>("")
    const [newForumSummary, setNewForumSummary] = useState<string>("")
    const [forumSearch, setForumSearch] = useState<string>("")
    const [control, setControl] = useState<boolean>(false)
    const [isLoggedUserTeacher, setIsLoggedUserTeacher] = useState<boolean>(false)
    const [files, setFiles] = useState<FileWithPreview[]>([])
    const [isDragOver, setIsDragOver] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [ratingValue, setRatingValue] = useState<number>(0)
    const [ratingComment, setRatingComment] = useState<string>("")

    const { mutateAsync } = useMutateSendObject()
    const { mutateAsync: mutateCourseRatingAsync, isPending: isSubmittingRating } = useMutateCourseRating(classId)
    const { mutateAsync: createNoteAsync, isPending: isSavingNote } = useMutateCreateCourseNote(classId)
    const { mutateAsync: createForumTopicAsync, isPending: isSavingForumTopic } = useMutateCourseForumTopic(classId)

    const { data: course, isLoading, isError, error } = useQueryGetClassById(classId)

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const processFiles = (fileList: FileList) => {
        const newFiles: FileWithPreview[] = Array.from(fileList).map((file) => {
            const fileWithPreview = file as FileWithPreview
            fileWithPreview.id = Math.random().toString(36).substr(2, 9)
            fileWithPreview.uploadProgress = 0

            if (file.type.startsWith("image/")) {
                fileWithPreview.preview = URL.createObjectURL(file)
            }

            return fileWithPreview
        })

        setFiles((prev) => [...prev, ...newFiles])
    }

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)

        const droppedFiles = e.dataTransfer.files
        if (droppedFiles.length > 0) {
            processFiles(droppedFiles)
        }
    }, [])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files
        if (selectedFiles && selectedFiles.length > 0) {
            processFiles(selectedFiles)
        }
    }

    const removeFile = (fileId: string) => {
        setFiles((prev) => {
            const fileToRemove = prev.find((f) => f.id === fileId)
            if (fileToRemove?.preview) {
                URL.revokeObjectURL(fileToRemove.preview)
            }
            return prev.filter((f) => f.id !== fileId)
        })
    }

    const simulateUpload = async () => {
        setIsUploading(true);

        for (const file of files) {
            for (let progress = 0; progress <= 90; progress += 10) {
                await new Promise((resolve) => setTimeout(resolve, 50));
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === file.id ? { ...f, uploadProgress: progress } : f
                    )
                );
            }

            try {
                await mutateAsync({
                    path: course?.path?.replace(/\/+$/, "") ?? "",
                    object: file,
                });

                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === file.id ? { ...f, uploadProgress: 100 } : f
                    )
                );

                setControl(!control)
            } catch (err: unknown) {
                const error = err as Error;
                toast.error(`Erro ao enviar o arquivo ${file.name}: ${error.message}`);
            }
        }

        setIsUploading(false);
        setFiles([]);
    };

    const clearAll = () => {
        files.forEach((file) => {
            if (file.preview) {
                URL.revokeObjectURL(file.preview)
            }
        })
        setFiles([])
    }

    const professorId = parseProfessorIdFromCookie(getCookie("UID"))

    useEffect(() => {
        setIsLoggedUserTeacher(
            professorId != null && professorId === course?.codigo_professor,
        )
    }, [course?.codigo_professor, professorId])

    useEffect(() => {
        setRatingValue(Number(course?.minha_nota ?? 0))
        setRatingComment(course?.meu_comentario ?? "")
    }, [course?.minha_nota, course?.meu_comentario])

    const { data: objects, isLoading: isLoadingObjects } = useQueryGetAllObjects(
        course?.path,
        isAuthenticated && !!course?.path,
    )

    const handleClick = useCallback(
        async (obj: ObjectType) => {
            if (!isAuthenticated) {
                toast.warning("Faça login para acessar o conteúdo completo do curso.");
                return;
            }
            if (!course?.path) {
                return;
            }
            setIsResolvingMedia(true);
            try {
                const objectKey = buildObjectStorageKey(course.path, obj.objectName);
                const res = await api.get("minio/objects/getObject", {
                    params: { objectName: objectKey },
                });
                if (!res.data?.flag) {
                    toast.warning("Não foi possível abrir o arquivo", {
                        description: res.data?.message ?? "Tente novamente.",
                        duration: 5000,
                        closeButton: true,
                    });
                    return;
                }
                const url = res.data.data as string;
                setSelectedObject({
                    name: obj.objectName,
                    mimeType: obj.contentType,
                    url,
                });
                setSelectedObjectType(obj.contentType);
            } catch {
                toast.error("Erro ao obter link do arquivo", {
                    duration: 5000,
                    closeButton: true,
                });
            } finally {
                setIsResolvingMedia(false);
            }
        },
        [course?.path, isAuthenticated],
    )

    const handleAddNote = async () => {
        if (newNoteTitle.trim() && newNote.trim()) {
            const created = await createNoteAsync({
                titulo: newNoteTitle.trim(),
                conteudo: newNote.trim(),
            })

            if (created !== false) {
                toast.success("Anotação salva com sucesso")
                setNewNote("")
                setNewNoteTitle("")
            }
        }
    }

    const handleOpenLearningPathItem = useCallback(
        async (item: ICourseLearningPathItem) => {
            if (!item.arquivo_path) {
                return
            }

            setIsResolvingMedia(true)
            try {
                const res = await api.get("minio/objects/getObject", {
                    params: { objectName: item.arquivo_path },
                })

                if (!res.data?.flag) {
                    toast.warning("Não foi possível abrir o arquivo da trilha", {
                        description: res.data?.message ?? "Tente novamente.",
                        duration: 5000,
                        closeButton: true,
                    })
                    return
                }

                setSelectedObject({
                    name: item.arquivo_nome ?? item.titulo,
                    mimeType: item.arquivo_tipo ?? "application/octet-stream",
                    url: res.data.data as string,
                })
                setSelectedObjectType(item.arquivo_tipo ?? "application/octet-stream")
            } catch {
                toast.error("Erro ao obter link do arquivo da trilha", {
                    duration: 5000,
                    closeButton: true,
                })
            } finally {
                setIsResolvingMedia(false)
            }
        },
        [],
    )

    const handleCreateForumTopic = async () => {
        if (!newForumTitle.trim() || !newForumSummary.trim()) {
            toast.warning("Informe título e descrição da discussão.")
            return
        }

        const created = await createForumTopicAsync({
            titulo: newForumTitle.trim(),
            resumo: newForumSummary.trim(),
        })

        if (created !== false) {
            toast.success("Discussão criada com sucesso")
            setNewForumTitle("")
            setNewForumSummary("")
        }
    }

    const handleSubmitRating = useCallback(async () => {
        if (!ratingValue) {
            toast.warning("Selecione uma nota antes de avaliar o curso.")
            return
        }

        try {
            await mutateCourseRatingAsync({
                nota: ratingValue,
                comentario: ratingComment,
            })
        } catch {
            toast.error("Não foi possível salvar sua avaliação.")
        }
    }, [mutateCourseRatingAsync, ratingComment, ratingValue])

    const calculateProgress = () => {
        const items = course?.trilha ?? []
        if (items.length === 0) {
            return 0
        }
        const completedItems = items.filter((item) => item.concluido_padrao).length
        return Math.round((completedItems / items.length) * 100)
    }

    const fileUrl = selectedObject?.url ?? ""

    const getContentType = (mimeType: string): ContentType => {
        if (mimeType.startsWith("image/")) return ContentType.Image
        if (mimeType.startsWith("video/")) return ContentType.Video
        if (mimeType === "application/pdf") return ContentType.PDF
        return ContentType.Unsupported
    }

    const courseAccessMessage = error instanceof CourseAccessError ? error.message : null
    const hasObjects = !!objects?.length
    const courseSections = [...(course?.secoes ?? [])].sort((a, b) => a.ordem - b.ordem)
    const learningPath = [...(course?.trilha ?? [])].sort((a, b) => a.ordem - b.ordem)
    const forumTopics = [...(course?.forum_topicos ?? [])].sort((a, b) => a.ordem - b.ordem)
    const assessmentItems = [...(course?.avaliacoes_itens ?? [])].sort((a, b) => a.ordem - b.ordem)
    const certificates = [...(course?.certificados ?? [])].sort((a, b) => a.ordem - b.ordem)
    const notes = course?.anotacoes ?? []
    const courseDescription = course?.conteudo_descricao?.trim()
        ? course.conteudo_descricao
        : "Este curso ainda não possui uma descrição cadastrada."
    const instructorSummary = course?.instrutor_resumo?.trim()
        ? course.instrutor_resumo
        : "As informações do instrutor ainda não foram cadastradas."

    return {
        selectedObject,
        setSelectedObject,
        selectedObjectType,
        setSelectedObjectType,
        activeTab,
        setActiveTab,
        newNote,
        setNewNote,
        newNoteTitle,
        setNewNoteTitle,
        notes,
        newForumTitle,
        setNewForumTitle,
        newForumSummary,
        setNewForumSummary,
        forumSearch,
        setForumSearch,
        course,
        isLoading,
        isError,
        objects,
        isLoadingObjects,
        isLoadingObjectData: isResolvingMedia,
        handleClick,
        handleAddNote,
        handleOpenLearningPathItem,
        handleCreateForumTopic,
        calculateProgress,
        fileUrl,
        getContentType,
        isLoggedUserTeacher,
        control, setControl,
        courseAccessMessage,
        hasObjects,
        courseSections,
        learningPath,
        forumTopics,
        assessmentItems,
        certificates,
        courseDescription,
        instructorSummary,
        formatFileSize,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleFileSelect,
        removeFile,
        simulateUpload,
        clearAll,
        isDragOver,
        files,
        isUploading,
        ratingValue,
        setRatingValue,
        ratingComment,
        setRatingComment,
        handleSubmitRating,
        isSubmittingRating,
        isSavingNote,
        isSavingForumTopic,
        classId,
        isAuthenticated,
    }
}
