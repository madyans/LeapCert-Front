import { uri_proxy } from "@/src/constants/URL_PROXYIMAGE"
import { useState } from "react"
import { learningPathData, notesData } from "../constants/mock"
import { ContentType, SelectedObject } from "../constants/types"
import useQueryGetAllObjects from "../hooks/useQueryGetAllObjects"
import useQueryGetClassById from "../hooks/useQueryGetClassById"
import useQueryGetObject from "../hooks/useQueryGetObject"
import { ObjectType } from "../interface/ObjectType"

export const useCursosIdModel = (classId: number) => {
    const [selectedObject, setSelectedObject] = useState<SelectedObject>(null)
    const [selectedObjectType, setSelectedObjectType] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<string>("conteudos")
    const [newNote, setNewNote] = useState<string>("")
    const [newNoteTitle, setNewNoteTitle] = useState<string>("")
    const [notes, setNotes] = useState(notesData)
    const [messageToInstructor, setMessageToInstructor] = useState<string>("")
    const [forumSearch, setForumSearch] = useState<string>("")

    const { data: course, isLoading, isError } = useQueryGetClassById(classId)

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
    }
}
