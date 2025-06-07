import { uri_proxy } from "@/src/constants/URL_PROXYIMAGE"
import { getCookie } from "cookies-next"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { learningPathData, notesData } from "../constants/mock"
import { ContentType, SelectedObject } from "../constants/types"
import useMutateSendObject from "../hooks/mutations/useMutateSendObject"
import useQueryGetAllObjects from "../hooks/useQueryGetAllObjects"
import useQueryGetClassById from "../hooks/useQueryGetClassById"
import useQueryGetObject from "../hooks/useQueryGetObject"
import { ObjectType } from "../interface/ObjectType"
import { FileWithPreview } from "./cursosId.interface"

export const useCursosIdModel = (classId: number) => {
    const [selectedObject, setSelectedObject] = useState<SelectedObject>(null)
    const [selectedObjectType, setSelectedObjectType] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<string>("conteudos")
    const [newNote, setNewNote] = useState<string>("")
    const [newNoteTitle, setNewNoteTitle] = useState<string>("")
    const [notes, setNotes] = useState(notesData)
    const [messageToInstructor, setMessageToInstructor] = useState<string>("")
    const [forumSearch, setForumSearch] = useState<string>("")
    const [control, setControl] = useState<boolean>(false)
    const [isLoggedUserTeacher, setIsLoggedUserTeacher] = useState<boolean>(false)
    const [files, setFiles] = useState<FileWithPreview[]>([])
    const [isDragOver, setIsDragOver] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    const { mutateAsync } = useMutateSendObject()

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const processFiles = (fileList: FileList) => {
        const newFiles: FileWithPreview[] = Array.from(fileList).map((file) => {
            const fileWithPreview = file as FileWithPreview
            fileWithPreview.id = Math.random().toString(36).substr(2, 9)
            fileWithPreview.uploadProgress = 0

            if (file.type.startsWith("image/")) {
                fileWithPreview.preview = URL.createObjectURL(file)
            }

            return fileWithPreview
        })

        setFiles((prev) => [...prev, ...newFiles])
    }

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)

        const droppedFiles = e.dataTransfer.files
        if (droppedFiles.length > 0) {
            processFiles(droppedFiles)
        }
    }, [])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files
        if (selectedFiles && selectedFiles.length > 0) {
            processFiles(selectedFiles)
        }
    }

    const removeFile = (fileId: string) => {
        setFiles((prev) => {
            const fileToRemove = prev.find((f) => f.id === fileId)
            if (fileToRemove?.preview) {
                URL.revokeObjectURL(fileToRemove.preview)
            }
            return prev.filter((f) => f.id !== fileId)
        })
    }

    const simulateUpload = async () => {
        setIsUploading(true);

        for (const file of files) {
            for (let progress = 0; progress <= 90; progress += 10) {
                await new Promise((resolve) => setTimeout(resolve, 50));
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === file.id ? { ...f, uploadProgress: progress } : f
                    )
                );
            }

            try {
                await mutateAsync({
                    path: course?.path || "",
                    object: file,
                });

                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === file.id ? { ...f, uploadProgress: 100 } : f
                    )
                );

                setControl(!control)
            } catch (err: unknown) {
                const error = err as Error;
                toast.error(`Erro ao enviar o arquivo ${file.name}: ${error.message}`);
            }
        }

        setIsUploading(false);
        console.log("Upload completo para todos os arquivos.");
    };

    const clearAll = () => {
        files.forEach((file) => {
            if (file.preview) {
                URL.revokeObjectURL(file.preview)
            }
        })
        setFiles([])
    }

    const cookie = getCookie("UID");
    const userId = cookie ? JSON.parse(atob(cookie as string)) : null;

    const { data: course, isLoading, isError } = useQueryGetClassById(classId)

    useEffect(() => {
        console.log("teste effect")
        console.log(Number(userId) === course?.codigo_professor)
        console.log("Number(userId)", Number(userId))
        console.log("course?.codigo_professor", course?.codigo_professor)
        setIsLoggedUserTeacher(Number(userId) === course?.codigo_professor)
    }, [course])

    const { data: objects, isLoading: isLoadingObjects } = useQueryGetAllObjects(
        "leapcert",
        course?.path,
        !!course?.path
    )

    const { isLoading: isLoadingObjectData } = useQueryGetObject(
        "leapcert",
        `${course?.path}${selectedObject ? `/${selectedObject.name}` : ""}`,
        !!selectedObject
    )

    const handleClick = (obj: ObjectType) => {
        setSelectedObject({
            name: obj.objectName,
            mimeType: obj.contentType,
            url: `${uri_proxy}${course?.path}/${obj.objectName}`,
        })
    }

    const handleAddNote = () => {
        if (newNoteTitle.trim() && newNote.trim()) {
            const newNoteItem = {
                id: notes.length + 1,
                title: newNoteTitle,
                content: newNote,
                date: new Date().toLocaleDateString(),
            }
            setNotes([...notes, newNoteItem])
            setNewNote("")
            setNewNoteTitle("")
        }
    }

    const handleSendMessage = () => {
        if (messageToInstructor.trim()) {
            alert("Mensagem enviada com sucesso!")
            setMessageToInstructor("")
        }
    }

    const calculateProgress = () => {
        const completedItems = learningPathData.filter((item) => item.completed).length
        return Math.round((completedItems / learningPathData.length) * 100)
    }

    const fileUrl = selectedObject?.url ?? ""

    const getContentType = (mimeType: string): ContentType => {
        if (mimeType.startsWith("image/")) return ContentType.Image
        if (mimeType.startsWith("video/")) return ContentType.Video
        if (mimeType === "application/pdf") return ContentType.PDF
        return ContentType.Unsupported
    }

    return {
        selectedObject,
        setSelectedObject,
        selectedObjectType,
        setSelectedObjectType,
        activeTab,
        setActiveTab,
        newNote,
        setNewNote,
        newNoteTitle,
        setNewNoteTitle,
        notes,
        setNotes,
        messageToInstructor,
        setMessageToInstructor,
        forumSearch,
        setForumSearch,
        course,
        isLoading,
        isError,
        objects,
        isLoadingObjects,
        isLoadingObjectData,
        handleClick,
        handleAddNote,
        handleSendMessage,
        calculateProgress,
        fileUrl,
        getContentType,
        isLoggedUserTeacher,
        control, setControl,
        formatFileSize,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleFileSelect,
        removeFile,
        simulateUpload,
        clearAll,
        isDragOver,
        files,
        isUploading,
    }
}
