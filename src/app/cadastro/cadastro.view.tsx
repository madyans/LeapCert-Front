import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { AtSignIcon, CheckIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormProvider } from "react-hook-form"
import Fundo from "../../../public/fundoMassaMasTaClaro.png"
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
        <div className="relative w-full bg-background min-h-screen flex items-center justify-center">
            <Image
                src={Fundo || "/placeholder.svg"}
                alt="Background"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="absolute top-0 left-0 w-full h-full z-0"
            />

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-300 rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-yellow-400 rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-green-500 rounded-full opacity-15 animate-pulse"></div>
            </div>

            <Card className="relative z-10 flex flex-col md:flex-row w-[90%] max-w-5xl rounded-2xl shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm border-green-200">
                <div className="w-full md:w-2/5 bg-gradient-to-b from-green-500 to-green-700 p-8 flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-4">Bem-vindo ao LeapCert!</h2>
                        <p className="text-green-100 mb-6">
                            Dê um salto em direção ao conhecimento. Crie sua conta e comece sua jornada de aprendizado conosco.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <CheckIcon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Cursos Exclusivos</h3>
                                    <p className="text-green-100 text-sm">Acesso a conteúdo premium e certificados</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <CheckIcon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Aprenda no seu ritmo</h3>
                                    <p className="text-green-100 text-sm">Estude quando e onde quiser</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <CheckIcon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Comunidade Ativa</h3>
                                    <p className="text-green-100 text-sm">Conecte-se com outros estudantes</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-8 z-10">
                        <Image
                            src={sapoOi || "/placeholder.svg"}
                            alt="Sapo Oi"
                            width={200}
                            height={200}
                            className="mx-auto drop-shadow-xl rounded-lg"
                        />
                    </div>

                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-600/30 rounded-full"></div>
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-600/20 rounded-full"></div>
                </div>

                <div className="w-full md:w-3/5 p-8 flex flex-col">
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
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
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
                                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 w-1/2 py-2 rounded-lg transition-all shadow-sm border border-gray-300"
                                        disabled={isPending}
                                    >
                                        Voltar
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        onClick={() => router.push("/")}
                                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 w-1/2 py-2 rounded-lg transition-all shadow-sm border border-gray-300"
                                        disabled={isPending}
                                    >
                                        Cancelar
                                    </Button>
                                )}

                                {currentStep < totalSteps ? (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="bg-green-600 w-1/2 text-white py-2 rounded-lg hover:bg-green-700 transition-all shadow-md"
                                    >
                                        Próximo
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="bg-green-600 w-1/2 text-white py-2 rounded-lg hover:bg-green-700 transition-all shadow-md"
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