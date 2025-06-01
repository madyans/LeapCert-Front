import { Card, CardContent } from "@/src/components/ui/card"
import { Skeleton } from "@/src/components/ui/skeleton"
import { BookOpen, Home, Info, Settings, User, Users } from "lucide-react"
import IClass from "../../interface/IClass"

interface iProps {
    isLoading: boolean
    isError: boolean
    course: IClass | null | undefined
}

export const FunctionsComponents = ({ course, isError, isLoading }: iProps) => {

    if (isLoading) {
        return (
            <div className="w-full h-screen flex">
                <div className="w-[200px] bg-zinc-900 p-4 flex-shrink-0">
                    <Skeleton className="h-8 w-full mb-6" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                </div>
                <div className="flex-1 p-6">
                    <Skeleton className="h-12 w-3/4 mb-4" />
                    <Skeleton className="h-40 w-full mb-6" />
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2">
                            <Skeleton className="h-8 w-full mb-4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full mt-2" />
                            <Skeleton className="h-4 w-3/4 mt-2" />
                        </div>
                        <div>
                            <Skeleton className="h-8 w-full mb-4" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full mt-2" />
                            <Skeleton className="h-8 w-full mt-2" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (isError || !course) {
        return (
            <div className="w-full h-screen flex">
                <div className="w-[200px] bg-zinc-900 p-4 flex-shrink-0">
                    <div className="text-white font-bold mb-6">Visualização do curso</div>
                    <div className="space-y-2">
                        <div className="text-gray-400 flex items-center gap-2 p-2">
                            <Home className="h-4 w-4" /> Home
                        </div>
                        <div className="text-gray-400 flex items-center gap-2 p-2">
                            <User className="h-4 w-4" /> Área do aluno
                        </div>
                        <div className="text-gray-400 flex items-center gap-2 p-2">
                            <Users className="h-4 w-4" /> Área do professor
                        </div>
                        <div className="text-gray-400 flex items-center gap-2 p-2">
                            <BookOpen className="h-4 w-4" /> Cursos
                        </div>
                        <div className="text-gray-400 flex items-center gap-2 p-2">
                            <Settings className="h-4 w-4" /> Configuração
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-6">
                    <Card className="border-red-200 bg-red-50">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-red-500">
                                <Info className="h-5 w-5" />
                                <p className="font-medium">Erro ao carregar o curso.</p>
                            </div>
                            <p className="text-sm text-red-400 mt-2">
                                Por favor, tente novamente mais tarde ou entre em contato com o suporte.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}