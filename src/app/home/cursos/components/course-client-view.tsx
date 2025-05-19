"use client"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Skeleton } from "@/src/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Book, Download, FileIcon, FileText, FileType, Film, ImageIcon, Info, Loader2 } from "lucide-react"
import { useState } from "react"
import { uri_proxy } from "../../../../constants/URL_PROXYIMAGE"
import useQueryGetAllObjects from "../hooks/useQueryGetAllObjects"
import useQueryGetClassById from "../hooks/useQueryGetClassById"
import useQueryGetObject from "../hooks/useQueryGetObject"
import type { ObjectType } from "../interface/ObjectType"

export default function CourseClientView({ classId }: { classId: number }) {
    const [selectedObject, setSelectedObject] = useState<string | null>(null)
    const [selectedObjectType, setSelectedObjectType] = useState<string | null>(null)

    const { data: course, isLoading, isError } = useQueryGetClassById(classId)

    const { data: objects, isLoading: isLoadingObjects } = useQueryGetAllObjects("leapcert", course?.path, !!course?.path)

    const { isLoading: isLoadingObjectData } = useQueryGetObject(
        "leapcert",
        `${course?.path}${selectedObject ? `/${selectedObject}` : ""}`,
        !!selectedObject,
    )

    const handleClick = (obj: ObjectType) => {
        setSelectedObject(obj.objectName)
        setSelectedObjectType(obj.contentType)
    }

    // Function to get the appropriate icon based on content type
    const getFileIcon = (contentType: string) => {
        if (contentType.startsWith("image/")) {
            return <ImageIcon className="h-4 w-4 flex-shrink-0" />
        } else if (contentType.startsWith("video/")) {
            return <Film className="h-4 w-4 flex-shrink-0" />
        } else if (contentType === "application/pdf") {
            return <FileText className="h-4 w-4 flex-shrink-0" />
        } else {
            return <FileIcon className="h-4 w-4 flex-shrink-0" />
        }
    }

    // Function to render content based on file type
    const renderContent = () => {
        if (!selectedObject || !selectedObjectType) {
            return (
                <div className="flex flex-col items-center justify-center h-[400px] text-center p-6 bg-muted/30 rounded-md">
                    <FileType className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Selecione um arquivo da lista para visualizar seu conteúdo</p>
                </div>
            )
        }

        if (isLoadingObjectData) {
            return (
                <div className="flex flex-col items-center justify-center h-[400px]">
                    <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">Carregando conteúdo...</p>
                </div>
            )
        }

        const fileUrl = uri_proxy + `${course?.path || ""}/${selectedObject}`

        // Handle different content types
        if (selectedObjectType.startsWith("image/")) {
            return (
                <div className="overflow-hidden rounded-md bg-muted/30 p-2 flex flex-col">
                    <img
                        src={fileUrl || "/placeholder.svg"}
                        alt={`Conteúdo de ${selectedObject}`}
                        className="w-full h-auto max-h-[400px] object-contain rounded"
                    />
                    <Button variant="outline" size="sm" className="mt-4 self-end" onClick={() => window.open(fileUrl, "_blank")}>
                        <Download className="h-4 w-4 mr-2" />
                        Baixar Imagem
                    </Button>
                </div>
            )
        } else if (selectedObjectType.startsWith("video/")) {
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
        else {
            // For other file types, show download option
            return (
                <div className="flex flex-col items-center justify-center h-[400px] text-center p-6 bg-muted/30 rounded-md">
                    <FileIcon className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-6">
                        Este tipo de arquivo ({selectedObjectType}) não pode ser visualizado diretamente.
                    </p>
                    <Button onClick={() => window.open(fileUrl, "_blank")} className="gap-2">
                        <Download className="h-4 w-4" />
                        Baixar Arquivo
                    </Button>
                </div>
            )
        }
    }

    if (isLoading) {
        return (
            <div className="w-full max-w-4xl mx-auto p-6">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-1/2 mt-2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-full mt-2" />
                        <Skeleton className="h-4 w-full mt-2" />
                        <Skeleton className="h-4 w-3/4 mt-2" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (isError || !course) {
        return (
            <Card className="w-full max-w-4xl mx-auto p-6 border-red-200 bg-red-50">
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
        )
    }

    return (
        <div className="w-full mx-auto p-4">
            <Card className="shadow-sm">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold">{course.nome}</CardTitle>
                            <CardDescription className="mt-1">
                                <Badge variant="outline" className="text-xs">
                                    {course.genero}
                                </Badge>
                            </CardDescription>
                        </div>
                        <Book className="h-6 w-6 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-base text-muted-foreground mb-6">{course.descricao}</p>

                    <Tabs defaultValue="content" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="content" className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                <span>Conteúdo do Curso</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="content" className="mt-0">
                            <div className="grid md:grid-cols-3 gap-6">
                                <Card className="md:col-span-1 h-fit">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg font-medium">Arquivos</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {isLoadingObjects ? (
                                            <div className="space-y-2">
                                                <Skeleton className="h-8 w-full" />
                                                <Skeleton className="h-8 w-full" />
                                                <Skeleton className="h-8 w-full" />
                                            </div>
                                        ) : objects && objects.length > 0 ? (
                                            <ScrollArea className="h-[400px] pr-4">
                                                <ul className="space-y-1">
                                                    {objects.map((obj: ObjectType, idx: number) => (
                                                        <li key={idx}>
                                                            <button
                                                                onClick={() => handleClick(obj)}
                                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors
                                  ${selectedObject === obj.objectName
                                                                        ? "bg-primary/10 text-primary font-medium"
                                                                        : "hover:bg-muted"
                                                                    }`}
                                                            >
                                                                {getFileIcon(obj.contentType)}
                                                                <span className="truncate">{obj.objectName}</span>
                                                                <Badge variant="outline" className="ml-auto text-[10px] px-1 py-0 h-5">
                                                                    {obj.contentType.split("/")[1]?.toUpperCase() || obj.contentType}
                                                                </Badge>
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </ScrollArea>
                                        ) : (
                                            <p className="text-sm text-muted-foreground py-2">Nenhum arquivo disponível.</p>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card className="md:col-span-2">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg font-medium">
                                            {selectedObject ? (
                                                <div className="flex items-center justify-between">
                                                    <span>
                                                        Visualizando: <span className="text-primary">{selectedObject}</span>
                                                    </span>
                                                    {selectedObjectType && <Badge variant="outline">{selectedObjectType}</Badge>}
                                                </div>
                                            ) : (
                                                "Selecione um arquivo para visualizar"
                                            )}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>{renderContent()}</CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
