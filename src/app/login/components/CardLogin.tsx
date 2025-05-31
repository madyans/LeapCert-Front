import { Button } from "@/src/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { formSchema } from "../login.schema"

interface iProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    onSubmit: (values: z.infer<typeof formSchema>) => void
    setShowPassword: (e: boolean) => void
    showPassword: boolean
    isPending: boolean
}

export const CardLogin = ({ form, onSubmit, setShowPassword, showPassword, isPending }: iProps) => {
    return (
        <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8 space-y-6 border border-green-400/30 mt-16">
            <h1 className="text-3xl font-bold text-white text-center">Bem-vindo!</h1>
            <p className="text-green-100 text-center">Entre para acessar o sistema</p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="usuario"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-green-100">Usuário</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Digite seu usuário"
                                            {...field}
                                            className="bg-white/10 text-white border-green-400/30 focus-visible:ring-green-400 pl-10"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                            <UserIcon className="h-5 w-5 text-green-600" />
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-yellow-200" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="senha"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-green-100">Senha</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Digite sua senha"
                                            {...field}
                                            className="bg-white/10 text-white border-green-400/30 focus-visible:ring-green-400 pl-10 pr-10"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                            <LockIcon className="h-5 w-5 text-green-600" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-300 hover:text-green-100"
                                        >
                                            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-yellow-200" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/30"
                    >
                        {isPending ? (
                            <div className="flex items-center justify-center gap-2">
                                <LoadingIcon className="animate-spin h-5 w-5" /> Entrando...
                            </div>
                        ) : (
                            "Entrar"
                        )}
                    </Button>
                </form>
            </Form>

            <div className="text-center">
                <a href="#" className="text-green-200 hover:text-white text-sm transition-colors">
                    Esqueceu sua senha?
                </a>
            </div>
        </div>
    )

    function LoadingIcon(props: React.SVGProps<SVGSVGElement>) {
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