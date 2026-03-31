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

export const useCreateClassModel = () => {
    const router = useRouter()
    const professorId = parseProfessorIdFromCookie(getCookie("UID"));

    const { data: dataGenders, isLoading: isLoadingGenders } = useQueryGetGenders()
    const { mutateAsync: createClassAsync, isPending: isCreating } = useMutateCreateClass()
    const { mutateAsync: sendVideoAsync, isPending: isUploading } = useMutateSendObject()
    const [videoFile, setVideoFile] = useState<File | null>(null)

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            nome: "",
            genero: 0,
            descricao: "",
        },
    })

    const isPending = useMemo(
        () => isCreating || isUploading,
        [isCreating, isUploading],
    )

    const onVideoFileChange = useCallback((file: File | null) => {
        setVideoFile(file)
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
            const classDto = {
                nome: values.nome.trim(),
                genero: values.genero,
                descricao: values.descricao,
                created_at: new Date().toISOString(),
                avaliacao: null,
                codigo_professor: professorId,
            }
            const created = await createClassAsync(classDto)
            if (created === false) {
                return
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
        [createClassAsync, sendVideoAsync, professorId, videoFile, router],
    )

    const isSubmitting = form.formState.isSubmitting

    return {
        dataGenders, isLoadingGenders,
        form,
        onSubmit, isSubmitting,
        isPending,
        videoFile,
        onVideoFileChange,
    }
} 