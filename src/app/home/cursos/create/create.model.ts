import useQueryGetGenders from "@/src/general-hooks/useQueryGetAllGenders"
import { zodResolver } from "@hookform/resolvers/zod"
import { getCookie } from "cookies-next"
import { useForm } from "react-hook-form"
import { z } from "zod"
import useMutateCreateClass from "../hooks/mutations/useMutateCreateClass"
import { createSchema } from "./create.schema"

export const useCreateClassModel = () => {
    const cookie = getCookie("UID");
    const userId = cookie ? JSON.parse(atob(cookie as string)) : null;

    const { data: dataGenders, isLoading: isLoadingGenders } = useQueryGetGenders()
    const { mutateAsync, isPending } = useMutateCreateClass()

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            nome: "",
            genero: 0,
            descricao: "",
        },
    })

    function onSubmit(values: z.infer<typeof createSchema>) {
        const classDto = {
            nome: values.nome,
            genero: values.genero,
            descricao: values.descricao,
            created_at: new Date().toISOString(),
            avaliacao: null,
            codigo_professor: Number(userId)
        }
        mutateAsync(classDto)
    }

    const isSubmitting = form.formState.isSubmitting

    return {
        dataGenders, isLoadingGenders,
        form,
        onSubmit, isSubmitting,
        isPending
    }
} 