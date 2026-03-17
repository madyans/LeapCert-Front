import { Button } from "@/src/components/ui/button"
import { Download } from "lucide-react"
import Image from "next/image"

interface iProps {
    fileUrl: string
    selectedObject: string
}

export const ImageComponent = ({ fileUrl, selectedObject }: iProps) => {
    return (
        <div className="overflow-hidden rounded-md bg-muted/30 p-2 flex flex-col">
            <Image
                src={fileUrl || "/placeholder.svg"}
                alt={`Conteúdo de ${selectedObject}`}
                width={1200}
                height={1200}
                unoptimized={true}
                className="w-full h-auto max-h-[400px] object-contain rounded"
            />
            <Button variant="outline" size="sm" className="mt-4 self-end" onClick={() => window.open(fileUrl, "_blank")}>
                <Download className="h-4 w-4 mr-2" />
                Baixar Imagem
            </Button>
        </div>
    )
}