import { Button } from "@/src/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

interface iProps {
    router: AppRouterInstance
}

export const Header = ({ router }: iProps) => {
    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2 hover:bg-muted">
                        <ArrowLeft className="w-4 h-4" />
                        Voltar
                    </Button>
                </div>

                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        Novo Curso
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Criar Novo
                        <span className="text-primary"> Curso</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Preencha as informações abaixo para criar seu curso e compartilhar conhecimento
                    </p>
                </div>
            </div>
        </>
    )
}