"use client"

import type React from "react"

import { Button } from "@/src/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { useUser } from "@/src/context/ContextWrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutateLogin } from "./hooks/useMutationAuth"

const formSchema = z.object({
    usuario: z.string().min(2, "Digite ao menos 2 caracteres").max(50),
    senha: z.string().max(50),
})

export default function Page() {
    const router = useRouter()
    const { mutateAsync, data, isPending } = useMutateLogin()
    const { setCookieLoggedUser } = useUser()
    const [showPassword, setShowPassword] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const frogRef = useRef<HTMLDivElement>(null)
    const leftEyeRef = useRef<HTMLDivElement>(null)
    const rightEyeRef = useRef<HTMLDivElement>(null)

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    // Update eye positions based on mouse position
    useEffect(() => {
        const updateEyes = () => {
            if (!frogRef.current || !leftEyeRef.current || !rightEyeRef.current) return

            const frogRect = frogRef.current.getBoundingClientRect()
            const leftEyeRect = leftEyeRef.current.getBoundingClientRect()
            const rightEyeRect = rightEyeRef.current.getBoundingClientRect()

            // Calculate center points of each eye
            const leftEyeCenterX = leftEyeRect.left + leftEyeRect.width / 2
            const leftEyeCenterY = leftEyeRect.top + leftEyeRect.height / 2
            const rightEyeCenterX = rightEyeRect.left + rightEyeRect.width / 2
            const rightEyeCenterY = rightEyeRect.top + rightEyeRect.height / 2

            // Calculate angle between mouse and eye centers
            const leftEyeAngle = Math.atan2(mousePosition.y - leftEyeCenterY, mousePosition.x - leftEyeCenterX)
            const rightEyeAngle = Math.atan2(mousePosition.y - rightEyeCenterY, mousePosition.x - rightEyeCenterX)

            // Maximum movement radius (in pixels)
            const maxMovement = 10

            // Calculate new positions for pupils
            const leftPupilX = Math.cos(leftEyeAngle) * maxMovement
            const leftPupilY = Math.sin(leftEyeAngle) * maxMovement
            const rightPupilX = Math.cos(rightEyeAngle) * maxMovement
            const rightPupilY = Math.sin(rightEyeAngle) * maxMovement

            // Apply transformations to pupils
            const leftPupil = leftEyeRef.current.querySelector("div") as HTMLDivElement
            const rightPupil = rightEyeRef.current.querySelector("div") as HTMLDivElement

            if (leftPupil && rightPupil) {
                leftPupil.style.transform = `translate(${leftPupilX}px, ${leftPupilY}px)`
                rightPupil.style.transform = `translate(${rightPupilX}px, ${rightPupilY}px)`
            }
        }

        updateEyes()
    }, [mousePosition])

    useEffect(() => {
        if (data) {
            const results = data.data
            setCookieLoggedUser(results)
            router.push("/home")
        }
    }, [data, router, setCookieLoggedUser])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            usuario: "",
            senha: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutateAsync({ usuario: values.usuario, senha: values.senha })
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-800 via-green-900 to-green-950 p-6 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-300 rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-yellow-400 rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-green-500 rounded-full opacity-15 animate-pulse"></div>

                {/* Lily pads */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-600 rounded-full opacity-30"></div>
                <div className="absolute -bottom-5 left-20 w-32 h-32 bg-green-700 rounded-full opacity-40"></div>
                <div className="absolute -bottom-8 left-40 w-36 h-36 bg-green-800 rounded-full opacity-30"></div>
                <div className="absolute -bottom-12 right-20 w-40 h-40 bg-green-600 rounded-full opacity-30"></div>
                <div className="absolute -bottom-6 right-40 w-32 h-32 bg-green-700 rounded-full opacity-40"></div>
            </div>

            <div className="w-full max-w-md relative">
                {/* Frog illustration */}
                <div
                    ref={frogRef}
                    className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-40 h-40 flex items-center justify-center"
                >
                    <div className="relative">
                        {/* Frog body */}
                        <div className="w-32 h-24 bg-green-500 rounded-full shadow-lg relative z-10 transition-all duration-300 hover:bg-green-400">
                            {/* Add subtle texture to the frog */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-green-400/30 to-transparent"></div>
                        </div>

                        {/* Frog eyes */}
                        <div
                            ref={leftEyeRef}
                            className="absolute top-2 left-4 w-10 h-10 bg-white rounded-full z-20 flex items-center justify-center overflow-hidden"
                        >
                            <div className="w-6 h-6 bg-black rounded-full transition-transform duration-75"></div>
                        </div>
                        <div
                            ref={rightEyeRef}
                            className="absolute top-2 right-4 w-10 h-10 bg-white rounded-full z-20 flex items-center justify-center overflow-hidden"
                        >
                            <div className="w-6 h-6 bg-black rounded-full transition-transform duration-75"></div>
                        </div>

                        {/* Frog mouth */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-green-700 rounded-full z-20">
                            {/* Add smile line */}
                            <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-green-800/50 rounded-t-full"></div>
                        </div>

                        {/* Frog legs */}
                        <div className="absolute -bottom-4 left-2 w-10 h-14 bg-green-600 rounded-full z-0 transform rotate-45"></div>
                        <div className="absolute -bottom-4 right-2 w-10 h-14 bg-green-600 rounded-full z-0 transform -rotate-45"></div>
                    </div>
                </div>

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

                <div className="text-center mt-6 text-green-200 text-sm">© 2025 LeapCert. Todos os direitos reservados.</div>
            </div>
        </div>
    )
}

// Icons
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    )
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}

function EyeOffIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line x1="2" x2="22" y1="2" y2="22" />
        </svg>
    )
}

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
