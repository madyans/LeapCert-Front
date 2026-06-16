import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { AtSignIcon, CheckIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormProvider } from "react-hook-form"
import sapoOi from "../../../public/sapoHi.png"
import { useCadastroModel } from "./cadastro.model"

type CadastroViewProps = ReturnType<typeof useCadastroModel>

export const CadastroView = (props: CadastroViewProps) => {
    const {
        nextStep,
        onSubmit,
        prevStep,
        setAgreedToTerms,
        setShowConfirmPassword,
        setShowPassword,
        agreedToTerms,
        form,
        isPending,
        showConfirmPassword,
        showPassword,
        currentStep
    } = props

    const router = useRouter()
    const totalSteps = 2

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center bg-zinc-50 p-4 sm:p-6">
            <div className="absolute inset-x-0 top-0 h-56 bg-green-900" />
            <div className="pointer-events-none absolute left-8 top-8 hidden h-24 w-24 rounded-full border border-green-300/40 lg:block" />
            <div className="pointer-events-none absolute bottom-8 right-8 hidden h-20 w-20 rounded-full border border-green-200 lg:block" />

            <Card className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-md md:flex-row">
                <div className="relative flex w-full flex-col justify-between overflow-hidden bg-green-900 p-6 md:w-2/5 md:p-8">
                    <div className="relative z-10">
                        <h2 className="mb-4 text-2xl font-semibold text-white">Bem-vindo ao LeapCert</h2>
                        <p className="mb-6 text-sm leading-6 text-green-100">
                            Dê um salto em direção ao conhecimento. Crie sua conta e comece sua jornada de aprendizado conosco.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="rounded-md bg-white/15 p-2">
                                    <CheckIcon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Cursos Exclusivos</h3>
                                    <p className="text-green-100 text-sm">Acesso a conteúdo premium e certificados</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="rounded-md bg-white/15 p-2">
                                    <CheckIcon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Aprenda no seu ritmo</h3>
                                    <p className="text-green-100 text-sm">Estude quando e onde quiser</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="rounded-md bg-white/15 p-2">
                                    <CheckIcon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Comunidade Ativa</h3>
                                    <p className="text-green-100 text-sm">Conecte-se com outros estudantes</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-8">
                        <Image
                            src={sapoOi || "/placeholder.svg"}
                            alt="Sapo Oi"
                            width={200}
                            height={200}
                            className="mx-auto rounded-lg drop-shadow-md"
                        />
                    </div>
                </div>

                <div className="flex w-full flex-col p-6 md:w-3/5 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Criar Conta</h1>
                        <div className="flex items-center space-x-2">
                            <div className="text-sm text-gray-500">Já tem uma conta?</div>
                            <Link href="/login" className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
                                Entrar
                            </Link>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="h-2 w-full rounded-full bg-zinc-200">
                            <div
                                className="h-2 rounded-full bg-green-600 transition-all duration-300"
                                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>Informações Pessoais</span>
                            <span>Credenciais</span>
                        </div>
                    </div>

                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            {currentStep === 1 && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="nome"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-medium flex items-center gap-1">
                                                    Nome completo
                                                    <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            placeholder="Seu nome"
                                                            {...field}
                                                            className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                                                        />
                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                            <UserIcon className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormDescription className="text-gray-500 text-xs">Informe seu nome completo</FormDescription>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-medium flex items-center gap-1">
                                                    E-mail
                                                    <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            placeholder="seuemail@email.com"
                                                            {...field}
                                                            className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                                                            type="email"
                                                        />
                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                            <MailIcon className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormDescription className="text-gray-500 text-xs">
                                                    Usaremos este e-mail para comunicações importantes
                                                </FormDescription>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="usuario"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-medium flex items-center gap-1">
                                                    Nome de Usuário
                                                    <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            placeholder="Seu nome de usuário"
                                                            {...field}
                                                            className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                                                        />
                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                            <AtSignIcon className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormDescription className="text-gray-500 text-xs">
                                                    Escolha um nome de usuário único para identificação
                                                </FormDescription>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="text-xs text-gray-500 mt-2">
                                        <span className="text-red-500">*</span> Campos obrigatórios
                                    </div>
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="senha"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-medium flex items-center gap-1">
                                                    Senha
                                                    <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="********"
                                                            {...field}
                                                            className="pl-10 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                                                        />
                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                            <LockIcon className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                        >
                                                            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormDescription className="text-gray-500 text-xs">
                                                    Crie uma senha forte com letras, números e símbolos
                                                </FormDescription>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="confirmar_senha"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-medium flex items-center gap-1">
                                                    Confirmar Senha
                                                    <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            placeholder="********"
                                                            {...field}
                                                            className="pl-10 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                                                        />
                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                            <LockIcon className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOffIcon className="h-5 w-5" />
                                                            ) : (
                                                                <EyeIcon className="h-5 w-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormDescription className="text-gray-500 text-xs">
                                                    Digite a mesma senha novamente para confirmar
                                                </FormDescription>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="pt-4">
                                        <div className="flex items-start mb-1">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="terms"
                                                    type="checkbox"
                                                    checked={agreedToTerms}
                                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                                />
                                            </div>
                                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                                Eu concordo com os{" "}
                                                <a href="#" className="text-green-600 hover:underline">
                                                    Termos de Serviço
                                                </a>{" "}
                                                e{" "}
                                                <a href="#" className="text-green-600 hover:underline">
                                                    Política de Privacidade
                                                </a>
                                                <span className="text-red-500">*</span>
                                            </label>
                                        </div>
                                        {currentStep === totalSteps && !agreedToTerms && form.formState.isSubmitted && (
                                            <p className="text-red-500 text-xs mt-1">Você precisa concordar com os termos para continuar</p>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">
                                        <span className="text-red-500">*</span> Campos obrigatórios
                                    </div>
                                </>
                            )}

                            <div className="flex justify-between gap-4 pt-4">
                                {currentStep > 1 ? (
                                    <Button
                                        type="button"
                                        onClick={prevStep}
                                        className="w-1/2 rounded-md border border-zinc-300 bg-zinc-100 py-2 text-zinc-700 shadow-sm transition-colors hover:bg-zinc-200"
                                        disabled={isPending}
                                    >
                                        Voltar
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        onClick={() => router.push("/")}
                                        className="w-1/2 rounded-md border border-zinc-300 bg-zinc-100 py-2 text-zinc-700 shadow-sm transition-colors hover:bg-zinc-200"
                                        disabled={isPending}
                                    >
                                        Cancelar
                                    </Button>
                                )}

                                {currentStep < totalSteps ? (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="w-1/2 rounded-md bg-green-600 py-2 text-white shadow-sm transition-colors hover:bg-green-700"
                                    >
                                        Próximo
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="w-1/2 rounded-md bg-green-600 py-2 text-white shadow-sm transition-colors hover:bg-green-700"
                                        disabled={isPending || (currentStep === totalSteps && !agreedToTerms)}
                                    >
                                        {isPending ? (
                                            <div className="flex items-center gap-2">
                                                <LoadingIcon className="animate-spin h-4 w-4" /> Criando...
                                            </div>
                                        ) : (
                                            "Criar Conta"
                                        )}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </Card>
        </div>
    )

    function LoadingIcon(props: { className: string }) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
        )
    }
}
