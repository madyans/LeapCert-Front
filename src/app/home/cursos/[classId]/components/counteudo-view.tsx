import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { BookMarked, Circle, Download, FileIcon, FileQuestion, FileText, Film, ImageIcon, Loader2, PenLine, PlayCircle, Star } from "lucide-react"
import image from "../../../../../../public/Frois.jpeg"
import { ContentType } from "../../constants/types"
import { CourseClientViewProps } from "../corsosId.view"
import { CenterTab } from "./center-tab"
import { ImageComponent } from "./Image"
import { LeaftTab } from "./left-tab"
import { PdfComponent } from "./Pdf"
import { ButtonTabs } from "./rigthTabs/ButtonTabs"
import { AllTabs } from "./rigthTabs/Tabs"
import { VideoComponent } from "./Video"

export const ContentView = (props: CourseClientViewProps) => {
    const { activeTab, calculateProgress, control, course, forumSearch, handleAddNote, handleClick, handleSendMessage, isLoadingObjects, isLoggedUserTeacher, messageToInstructor, newNote, newNoteTitle, notes, objects, selectedObject, selectedObjectType, setActiveTab, setControl, getContentType, isLoadingObjectData, setForumSearch, setMessageToInstructor, setNewNote, setNewNoteTitle } = props

    const getLearningPathIcon = (type: string) => {
        switch (type) {
            case "video":
                return <PlayCircle className="h-4 w-4" />
            case "reading":
                return <BookMarked className="h-4 w-4" />
            case "quiz":
                return <FileQuestion className="h-4 w-4" />
            case "activity":
                return <PenLine className="h-4 w-4" />
            case "exam":
                return <FileQuestion className="h-4 w-4" />
            default:
                return <Circle className="h-4 w-4" />
        }
    }

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

    const renderContent = () => {
        if (!selectedObject) {
            return (
                <div className="flex flex-col items-center justify-center h-[400px] text-center p-6 bg-muted/30 rounded-md">
                    <FileIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Selecione um arquivo da lista para visualizar seu conteúdo</p>
                </div>
            );
        }

        if (isLoadingObjectData) {
            return (
                <div className="flex flex-col items-center justify-center h-[400px]">
                    <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">Carregando conteúdo...</p>
                </div>
            );
        }

        const contentType = getContentType(selectedObject.mimeType);

        switch (contentType) {
            case ContentType.Image:
                return <ImageComponent fileUrl={selectedObject.url} selectedObject={selectedObject.name} />;
            case ContentType.Video:
                return <VideoComponent fileUrl={selectedObject.url} selectedObjectType={selectedObject.mimeType} />;
            case ContentType.PDF:
                return <PdfComponent fileUrl={selectedObject.url} />;
            case ContentType.Unsupported:
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-[400px] text-center p-6 bg-muted/30 rounded-md">
                        <FileIcon className="h-16 w-16 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-6">
                            Este tipo de arquivo ({selectedObject.mimeType}) não pode ser visualizado diretamente.
                        </p>
                        <Button onClick={() => window.open(selectedObject.url, "_blank")} className="gap-2">
                            <Download className="h-4 w-4" />
                            Baixar Arquivo
                        </Button>
                    </div>
                );
        }
    };

    return (
        <div className="flex-1 overflow-auto">
            <div className="bg-white border-b">
                <div className="max-w-[1200px] mx-auto p-4 flex items-center gap-3">
                    <div className="text-sm text-zinc-600">Seja bem vindo ao curso</div>
                    <div className="font-semibold text-green-600">{course && course.nome}</div>
                    <div className="flex items-center ml-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-zinc-500 ml-1">(1.286)</span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-6 p-4">
                <div className="col-span-3">
                    <div className="grid grid-cols-4 gap-6">
                        <LeaftTab image={image} />

                        <CenterTab calculateProgress={calculateProgress} />
                    </div>
                </div>

                <div className="col-span-1">
                    <div>{isLoggedUserTeacher ?
                        <>
                            <Button className="w-full mb-4" onClick={() => setControl(!control)}>Criar conteúdo</Button>
                        </>
                        : null}
                    </div>

                    <ButtonTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <AllTabs
                        activeTab={activeTab}
                        forumSearch={forumSearch}
                        getFileIcon={getFileIcon}
                        getLearningPathIcon={getLearningPathIcon}
                        handleAddNote={handleAddNote}
                        handleClick={handleClick}
                        handleSendMessage={handleSendMessage}
                        isLoadingObjects={isLoadingObjects}
                        messageToInstructor={messageToInstructor}
                        newNote={newNote}
                        newNoteTitle={newNoteTitle}
                        notes={notes}
                        objects={objects}
                        selectedObject={selectedObject}
                        setForumSearch={setForumSearch}
                        setMessageToInstructor={setMessageToInstructor}
                        setNewNote={setNewNote}
                        setNewNoteTitle={setNewNoteTitle}
                    />
                </div>
            </div>

            {selectedObject && (
                <div className="max-w-[1200px] mx-auto p-4 mt-4">
                    <Card className="border rounded-md overflow-hidden">
                        <div className="bg-zinc-100 p-3 border-b flex items-center justify-between">
                            <div className="font-medium flex items-center gap-2">
                                {getFileIcon(selectedObjectType || "")}
                                <span>{selectedObject.name}</span>
                            </div>
                            {selectedObjectType && <Badge variant="outline">{selectedObjectType}</Badge>}
                        </div>
                        <CardContent className="p-4">{renderContent()}</CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}   