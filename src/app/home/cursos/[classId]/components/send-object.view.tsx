import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Progress } from "@/src/components/ui/progress"
import { Archive, ArrowLeft, CheckCircle2, Cloud, File, FileText, ImageIcon, Upload, Video, X } from "lucide-react"
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
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 w-full">
            <div className="bg-gradient-to-r from-green-400 via-blue-400 to-indigo-400 text-white">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <Cloud className="h-6 w-6" />
                                </div>
                                <h1 className="text-3xl font-bold">Upload para {course?.nome}</h1>
                            </div>
                            <p className="text-blue-100 text-lg">Gerencie seus arquivos na nuvem de forma simples e segura</p>
                        </div>
                        <Button
                            onClick={() => setControl(!control)}
                            variant="secondary"
                            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-200"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Voltar ao conteúdo
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-full h-full px-6 py-8 space-y-8">
                <Card
                    className={`
                    border-2 border-dashed transition-all duration-300 shadow-lg hover:shadow-xl
                    ${isDragOver
                            ? "border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-blue-200/50 scale-[1.02]"
                            : "border-gray-300 hover:border-blue-300 bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50"
                        }
                `}
                >
                    <CardContent
                        className="p-16 text-center"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div
                            className={`
                            mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-300
                            ${isDragOver
                                    ? "bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/30"
                                    : "bg-gradient-to-br from-gray-100 to-gray-200 hover:from-blue-100 hover:to-indigo-100"
                                }
                        `}
                        >
                            <Upload
                                className={`h-12 w-12 transition-colors duration-300 ${isDragOver ? "text-white" : "text-gray-600 hover:text-blue-600"
                                    }`}
                            />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-2xl font-semibold text-gray-800 mb-2">
                                    {isDragOver ? "✨ Solte os arquivos aqui!" : "📁 Arraste seus arquivos"}
                                </p>
                                <p className="text-gray-600">Suporte para imagens, vídeos, documentos e muito mais</p>
                            </div>

                            <div className="flex items-center gap-4 justify-center">
                                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
                                <span className="text-sm text-gray-500 font-medium">OU</span>
                                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
                            </div>

                            <input type="file" multiple onChange={handleFileSelect} className="hidden" id="file-upload" />
                            <Button
                                asChild
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                            >
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <Upload className="h-5 w-5 mr-2" />
                                    Selecionar Arquivos
                                </label>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {files.length > 0 && (
                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">Arquivos Selecionados</h3>
                                        <p className="text-sm text-gray-600">
                                            {files.length} arquivo{files.length !== 1 ? "s" : ""} pronto{files.length !== 1 ? "s" : ""} para
                                            upload
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={clearAll}
                                        className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Limpar Tudo
                                    </Button>
                                    <Button
                                        onClick={simulateUpload}
                                        disabled={isUploading}
                                        size="sm"
                                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-200"
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
                                        className="group flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 transition-all duration-200 hover:shadow-md"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex-shrink-0 relative">
                                            {file.preview ? (
                                                <div className="relative">
                                                    <img
                                                        src={file.preview || "/placeholder.svg"}
                                                        alt={file.name}
                                                        className="h-16 w-16 object-cover rounded-xl shadow-md border-2 border-white"
                                                    />
                                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <ImageIcon className="h-3 w-3 text-white" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-md border-2 border-white">
                                                    {getFileIcon(file)}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-800 truncate text-lg">{file.name}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-sm text-gray-600 font-medium">{formatFileSize(file.size)}</span>
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200"
                                                >
                                                    {file.type && file.type.includes("/") ? file.type.split("/")[1].toUpperCase() : "Unknown"}
                                                </Badge>
                                            </div>

                                            {typeof file.uploadProgress === "number" && file.uploadProgress > 0 && (
                                                <div className="mt-3 space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-medium text-gray-700">Progresso do upload</span>
                                                        <span className="text-sm font-semibold text-blue-600">{file.uploadProgress}%</span>
                                                    </div>
                                                    <Progress value={file.uploadProgress} className="h-3 bg-gray-200" />
                                                </div>
                                            )}
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFile(file.id)}
                                            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-100 hover:text-red-600 rounded-full w-10 h-10 p-0"
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
                    <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200 shadow-md">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{files.length}</div>
                                    <div className="text-sm text-gray-600 font-medium">Arquivo{files.length !== 1 ? "s" : ""}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-indigo-600">
                                        {formatFileSize(files.reduce((total, file) => total + (file.size ?? 0), 0))}
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">Tamanho Total</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {new Set(files.map((f) => (f.type ?? "").split("/")[0])).size}
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">
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
