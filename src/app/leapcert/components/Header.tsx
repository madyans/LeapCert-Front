import { Button } from "@/src/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Link from "next/link"

interface iProps {
    router: AppRouterInstance
}

export const Header = ({ router }: iProps) => {
    return (
        <header className="mb-12">
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full h-10 w-10"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Voltar</span>
                </Button>
                <nav className="hidden md:flex space-x-4">
                    <Button asChild variant="ghost" className="text-white hover:text-green-200 hover:bg-white/10">
                        <Link href="/">Início</Link>
                    </Button>
                    <Button asChild variant="ghost" className="text-white hover:text-green-200 hover:bg-white/10">
                        <Link href="/cursos">Cursos</Link>
                    </Button>
                    <Button asChild variant="ghost" className="text-white hover:text-green-200 hover:bg-white/10">
                        <Link href="/login">Entrar</Link>
                    </Button>
                    <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
                        <Link href="/cadastro">Cadastre-se</Link>
                    </Button>
                </nav>
            </div>
        </header>
    )
}