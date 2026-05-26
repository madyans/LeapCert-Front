import { Card, CardContent } from "@/src/components/ui/card"
import { Skeleton } from "@/src/components/ui/skeleton"
import { Info } from "lucide-react"
import IClass from "../../interface/IClass"

interface iProps {
    isLoading: boolean
    isError: boolean
    course: IClass | null | undefined
}

export const FunctionsComponents = ({ course, isError, isLoading }: iProps) => {

    if (isLoading) {
        return (
            <div className="w-full h-screen p-6">
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
        )
    }

    if (isError || !course) {
        return (
            <div className="w-full h-screen p-6">
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-red-500">
                            <Info className="h-5 w-5" />
                            <p className="font-medium">Erro ao carregar o curso.</p>
                        </div>
                        <p className="text-sm text-red-400 mt-2">
                            É necessário criar um curso para acessar essa página. Por favor, volte para a página inicial e crie um curso para visualizar seus detalhes aqui.
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }
}