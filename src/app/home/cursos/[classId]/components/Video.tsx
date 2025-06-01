import { Button } from "@/src/components/ui/button"
import { Download } from "lucide-react"

interface iProps {
    fileUrl: string
    selectedObjectType: string
}

export const VideoComponent = ({ fileUrl, selectedObjectType }: iProps) => {
    return (
        <div className="overflow-hidden rounded-md bg-muted/30 p-2 flex flex-col">
            <div className="relative w-full pt-[56.25%]">
                <video
                    className="absolute top-0 left-0 w-full h-full rounded"
                    controls
                    playsInline
                    controlsList="nodownload"
                >
                    <source src={fileUrl} type={selectedObjectType} />
                    Seu navegador não suporta a reprodução deste formato de vídeo.
                </video>
            </div>
            <Button variant="outline" size="sm" className="mt-4 self-end" onClick={() => window.open(fileUrl, "_blank")}>
                <Download className="h-4 w-4 mr-2" />
                Baixar Vídeo
            </Button>
        </div>
    )
}