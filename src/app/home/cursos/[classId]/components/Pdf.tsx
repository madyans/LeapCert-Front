import { Button } from "@/src/components/ui/button"
import { Download } from "lucide-react"

interface iProps {
    fileUrl: string
}

export const PdfComponent = ({ fileUrl }: iProps) => {
    return (
        <div className="overflow-hidden rounded-md bg-muted/30 p-2 flex flex-col h-[500px]">
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <p className="text-muted-foreground mb-4">
                    Não foi possível exibir o PDF diretamente. Por favor, baixe o arquivo.
                </p>
                <Button onClick={() => window.open(fileUrl, "_blank")}>
                    <Download className="h-4 w-4 mr-2" />
                    Baixar PDF
                </Button>
            </div>
            <Button variant="outline" size="sm" className="mt-4 self-end" onClick={() => window.open(fileUrl, "_blank")}>
                <Download className="h-4 w-4 mr-2" />
                Baixar PDF
            </Button>
        </div>
    )
}