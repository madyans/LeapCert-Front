import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Progress } from "@/src/components/ui/progress"
import { Archive, ArrowLeft, CheckCircle2, Cloud, File, FileText, ImageIcon, Upload, Video, X } from "lucide-react"
import Image from "next/image"
import type { CourseClientViewProps } from "../corsosId.view"

export default function FileUpload(props: CourseClientViewProps) {
    const {
        control,
        setControl,
        isDragOver,
        handleDragLeave,
        handleDrop,
        handleDragOver,
        handleFileSelect,
        files,
        clearAll,
        formatFileSize,
        simulateUpload,
        isUploading,
        removeFile,
        course
    } = props

    const getFileIcon = (file: File) => {
        if (!file.type) return <File className="h-8 w-8 text-gray-500" />

        if (file.type.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-blue-500" />
        if (file.type.startsWith("video/")) return <Video className="h-8 w-8 text-purple-500" />
        if (file.type.includes("pdf") || file.type.includes("document"))
            return <FileText className="h-8 w-8 text-red-500" />
        if (file.type.includes("zip") || file.type.includes("rar")) return <Archive className="h-8 w-8 text-yellow-500" />

        return <File className="h-8 w-8 text-gray-500" />
    }


    return (
        <div className="w-full bg-zinc-50">
            <div className="border-b border-zinc-200 bg-white">
                <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0 space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="rounded-md bg-green-50 p-2 text-green-700">
                                    <Cloud className="h-5 w-5" />
                                </div>
                                <h1 className="truncate text-2xl font-semibold text-zinc-950">Upload para {course?.nome}</h1>
                            </div>
                            <p className="text-sm leading-6 text-zinc-600">Adicione materiais do curso e acompanhe o envio dos arquivos selecionados.</p>
                        </div>
                        <Button
                            onClick={() => setControl(!control)}
                            variant="outline"
                            className="w-fit rounded-md"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar ao conteúdo
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mx-auto h-full max-w-5xl space-y-6 px-4 py-6 sm:px-6">
                <Card
                    className={`
                    rounded-lg border-2 border-dashed shadow-sm transition-colors
                    ${isDragOver
                            ? "border-green-500 bg-green-50"
                            : "border-zinc-300 bg-white hover:border-green-300"
                        }
                `}
                >
                    <CardContent
                        className="p-8 text-center sm:p-12"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div
                            className={`
                            mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-lg transition-colors
                            ${isDragOver
                                    ? "bg-green-600"
                                    : "bg-zinc-100"
                                }
                        `}
                        >
                            <Upload
                                className={`h-10 w-10 transition-colors ${isDragOver ? "text-white" : "text-zinc-500"
                                    }`}
                            />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="mb-2 text-xl font-semibold text-zinc-900">
                                    {isDragOver ? "Solte os arquivos aqui" : "Arraste seus arquivos"}
                                </p>
                                <p className="text-sm text-zinc-600">Suporte para imagens, vídeos, documentos e arquivos compactados.</p>
                            </div>

                            <div className="flex items-center gap-4 justify-center">
                                <div className="h-px flex-1 bg-zinc-200"></div>
                                <span className="text-sm font-medium text-zinc-500">OU</span>
                                <div className="h-px flex-1 bg-zinc-200"></div>
                            </div>

                            <input type="file" multiple onChange={handleFileSelect} className="hidden" id="file-upload" />
                            <Button
                                asChild
                                size="lg"
                                className="rounded-md bg-green-600 text-white shadow-sm hover:bg-green-700"
                            >
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <Upload className="mr-2 h-5 w-5" />
                                    Selecionar Arquivos
                                </label>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {files.length > 0 && (
                    <Card className="rounded-lg border-zinc-200 bg-white shadow-sm">
                        <CardContent className="p-5 sm:p-6">
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-md bg-green-50 p-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-zinc-900">Arquivos selecionados</h3>
                                        <p className="text-sm text-zinc-600">
                                            {files.length} arquivo{files.length !== 1 ? "s" : ""} pronto{files.length !== 1 ? "s" : ""} para
                                            upload
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={clearAll}
                                        className="rounded-md transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Limpar tudo
                                    </Button>
                                    <Button
                                        onClick={simulateUpload}
                                        disabled={isUploading}
                                        size="sm"
                                        className="rounded-md bg-green-600 shadow-sm hover:bg-green-700"
                                    >
                                        <Cloud className="h-4 w-4 mr-2" />
                                        {isUploading ? "Enviando..." : "Enviar para nuvem"}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {files.map((file, index) => (
                                    <div
                                        key={file.id}
                                        className="group flex items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-green-200 hover:bg-green-50/40"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex-shrink-0 relative">
                                            {file.preview ? (
                                                <div className="relative">
                                                    <Image
                                                        src={file.preview || "/placeholder.svg"}
                                                        alt={file.name}
                                                        width={64}
                                                        height={64}
                                                        unoptimized={true}
                                                        className="h-16 w-16 rounded-lg border border-zinc-200 object-cover"
                                                    />
                                                    <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
                                                        <ImageIcon className="h-3 w-3 text-white" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100">
                                                    {getFileIcon(file)}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="truncate text-base font-semibold text-zinc-900">{file.name}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-sm font-medium text-zinc-600">{formatFileSize(file.size)}</span>
                                                <Badge
                                                    variant="secondary"
                                                    className="border-green-200 bg-green-50 text-xs text-green-700"
                                                >
                                                    {file.type && file.type.includes("/") ? file.type.split("/")[1].toUpperCase() : "Unknown"}
                                                </Badge>
                                            </div>

                                            {typeof file.uploadProgress === "number" && file.uploadProgress > 0 && (
                                                <div className="mt-3 space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-medium text-zinc-700">Progresso do upload</span>
                                                        <span className="text-sm font-semibold text-green-700">{file.uploadProgress}%</span>
                                                    </div>
                                                    <Progress value={file.uploadProgress} className="h-3 bg-zinc-200" />
                                                </div>
                                            )}
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFile(file.id)}
                                            className="h-10 w-10 flex-shrink-0 rounded-md p-0 opacity-0 transition-opacity hover:bg-red-100 hover:text-red-600 group-hover:opacity-100"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {Array.isArray(files) && files.length > 0 && (
                    <Card className="rounded-lg border-zinc-200 bg-white shadow-sm">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-700">{files.length}</div>
                                    <div className="text-sm font-medium text-zinc-600">Arquivo{files.length !== 1 ? "s" : ""}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-zinc-900">
                                        {formatFileSize(files.reduce((total, file) => total + (file.size ?? 0), 0))}
                                    </div>
                                    <div className="text-sm font-medium text-zinc-600">Tamanho total</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-zinc-900">
                                        {new Set(files.map((f) => (f.type ?? "").split("/")[0])).size}
                                    </div>
                                    <div className="text-sm font-medium text-zinc-600">
                                        Tipo{new Set(files.map((f) => (f.type ?? "").split("/")[0])).size !== 1 ? "s" : ""}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
