import { Card, CardContent } from "@/src/components/ui/card"
import { Sparkles } from "lucide-react"

export const Footer = () => {
    return (
        <>
            <Card className="mt-8 border-dashed border-2 border-muted-foreground/20">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-blue-600 dark:text-blue-400">Dicas para um curso de sucesso</h3>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Use um nome específico e descritivo</li>
                                <li>• Explique claramente os objetivos de aprendizagem</li>
                                <li>• Mencione pré-requisitos se houver</li>
                                <li>• Destaque os benefícios práticos do curso</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}