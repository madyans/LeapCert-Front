import { Button } from "@/src/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon } from "lucide-react"
import Link from "next/link"
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
        <div className="space-y-7 rounded-lg border border-zinc-200/80 bg-white p-6 shadow-[0_18px_60px_rgba(20,83,45,0.12)] sm:p-8">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Bem-vindo de volta</h2>
                <p className="text-sm text-zinc-500">Informe seus dados para acessar a plataforma.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="usuario"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-zinc-700">Usuário</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Digite seu usuário"
                                            {...field}
                                            className="h-11 border-zinc-200 bg-zinc-50 pl-11 text-zinc-950 shadow-none placeholder:text-zinc-400 focus-visible:border-green-600 focus-visible:bg-white focus-visible:ring-green-600/20"
                                        />
                                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                                            <UserIcon className="h-5 w-5 text-zinc-400" />
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-600" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="senha"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-zinc-700">Senha</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Digite sua senha"
                                            {...field}
                                            className="h-11 border-zinc-200 bg-zinc-50 pl-11 pr-11 text-zinc-950 shadow-none placeholder:text-zinc-400 focus-visible:border-green-600 focus-visible:bg-white focus-visible:ring-green-600/20"
                                        />
                                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                                            <LockIcon className="h-5 w-5 text-zinc-400" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-600"
                                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                        >
                                            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-600" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="h-11 w-full rounded-md bg-green-700 font-semibold text-white shadow-sm shadow-green-900/10 transition-colors hover:bg-green-800"
                    >
                        {isPending ? (
                            <div className="flex items-center justify-center gap-2">
                                <LoadingIcon className="h-5 w-5 animate-spin" /> Entrando...
                            </div>
                        ) : (
                            "Entrar"
                        )}
                    </Button>
                </form>
            </Form>

            <div className="flex flex-col gap-4 border-t border-zinc-100 pt-1">
                <div className="text-center">
                    <a href="#" className="text-sm font-medium text-green-700 transition-colors hover:text-green-800 hover:underline">
                        Esqueceu sua senha?
                    </a>
                </div>

                <Link href="/cadastro" className="w-full block" tabIndex={-1}>
                    <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full rounded-md border-zinc-200 bg-white font-medium text-zinc-700 shadow-none transition-colors hover:bg-zinc-50 hover:text-zinc-950"
                    >
                        Criar uma conta
                    </Button>
                </Link>
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
