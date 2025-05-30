import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import useMutateAddUser from "./hooks/mutations/useMutateAddUser"
import { formSchema } from "./interface/cadastroType"

export const useCadastroModel = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const { mutateAsync, isPending } = useMutateAddUser()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            email: "",
            usuario: "",
            senha: "",
            confirmar_senha: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!agreedToTerms) {
            return
        }

        const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(values.nome)
        if (!nomeValido) {
            toast.error("Nome inválido", {
                description: "O nome não pode conter números ou pontuação.",
                duration: 5000,
                closeButton: true,
            })
            return
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
        if (!emailValido) {
            toast.error("E-mail inválido", {
                description: "Informe um e-mail com formato válido.",
                duration: 5000,
                closeButton: true,
            })
            return
        }

        if (values.senha !== values.confirmar_senha) {
            toast.error("Ação não autorizada", {
                description: "Senha e confirmar senha precisam ser as mesmas",
                duration: 5000,
                closeButton: true,
            })
            return
        }

        const userToSend = {
            nome: values.nome,
            email: values.email,
            senha: values.senha,
            usuario: values.usuario,
            perfil: 3,
        }

        toast.promise(mutateAsync(userToSend), {
            loading: "Criando sua conta...",
            success: () => {
                setTimeout(() => {
                    router.push("/login")
                }, 2000)
                return "Conta criada com sucesso! Redirecionando para o login..."
            },
            error: "Erro ao criar conta. Por favor, tente novamente.",
        })
    }

    const nextStep = () => {
        const fieldsToValidate: Array<"nome" | "email" | "usuario" | "senha" | "confirmar_senha"> = [
            "nome",
            "email",
            "usuario"
        ]

        form.trigger(fieldsToValidate).then((isValid) => {
            if (isValid) {
                setCurrentStep(currentStep + 1)
            }
        })
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1)
    }

    return {
        router,
        showConfirmPassword, setShowConfirmPassword,
        agreedToTerms, setAgreedToTerms,
        showPassword, setShowPassword,
        isPending,
        form,
        onSubmit,
        nextStep, prevStep,
        currentStep
    }
}