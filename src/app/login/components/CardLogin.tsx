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
        <div className="mt-16 space-y-6 rounded-xl border border-zinc-200 bg-white p-8 shadow-md">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-semibold text-zinc-950">Bem-vindo</h2>
                <p className="text-sm text-zinc-500">Entre para continuar seus cursos.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="usuario"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-zinc-700">Usuário</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Digite seu usuário"
                                            {...field}
                                            className="border-zinc-300 bg-white pl-10 text-zinc-950 placeholder:text-zinc-400 focus-visible:ring-green-100"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
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
                                <FormLabel className="text-zinc-700">Senha</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Digite sua senha"
                                            {...field}
                                            className="border-zinc-300 bg-white pl-10 pr-10 text-zinc-950 placeholder:text-zinc-400 focus-visible:ring-green-100"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                            <LockIcon className="h-5 w-5 text-zinc-400" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
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
                        className="w-full rounded-md bg-green-600 py-2 font-medium text-white shadow-sm transition-colors hover:bg-green-700"
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

            <div className="flex flex-col gap-5 pt-2">
                <div className="text-center">
                    <a href="#" className="text-sm font-medium text-green-700 transition-colors hover:text-green-800">
                        Esqueceu sua senha?
                    </a>
                </div>

                <Link href="/cadastro" className="w-full block" tabIndex={-1}>
                    <Button
                        type="button"
                        className="w-full rounded-md border border-zinc-200 bg-white py-2 font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-950"
                    >
                        Não tem cadastro? Faça ele aqui.
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
