import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Textarea } from "@/src/components/ui/textarea"
import { ArrowLeft, BookMarked, Circle, Download, FileIcon, FileQuestion, FileText, Film, ImageIcon, Loader2, PenLine, PlayCircle, Star } from "lucide-react"
import image from "../../../../../../public/Frois.jpeg"
import Link from "next/link"
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
    const { activeTab, assessmentItems, calculateProgress, certificates, control, course, courseDescription, courseSections, forumSearch, forumTopics, handleAddNote, handleClick, handleCreateForumTopic, handleOpenLearningPathItem, handleSubmitRating, instructorSummary, isLoadingObjects, isLoggedUserTeacher, isSavingForumTopic, isSavingNote, isSubmittingRating, learningPath, newForumSummary, newForumTitle, newNote, newNoteTitle, notes, objects, ratingComment, ratingValue, selectedObject, selectedObjectType, setActiveTab, setControl, setForumSearch, setNewForumSummary, setNewForumTitle, setNewNote, setNewNoteTitle, setRatingComment, setRatingValue, getContentType, isLoadingObjectData, isAuthenticated, classId } = props
    const rating = Number.parseFloat(course?.avaliacao ?? "0")

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
        <div className="flex-1 overflow-auto bg-zinc-50">
            <div className="border-b border-zinc-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="min-w-0">
                            <Link href="/home/cursos" className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900">
                                <ArrowLeft className="h-4 w-4" />
                                Cursos
                            </Link>
                            <h1 className="truncate text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
                                {course?.nome ?? "Detalhes do curso"}
                            </h1>
                            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">
                                Explore as informações, materiais e recursos vinculados a este curso.
                            </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-3 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-4 w-4 ${star <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-semibold text-zinc-700">{rating.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                <main className="min-w-0">
                    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                        <LeaftTab
                            image={image}
                            courseName={course?.nome ?? "Curso"}
                            summary={instructorSummary}
                            sectionCount={courseSections.length}
                        />

                        <CenterTab calculateProgress={calculateProgress} description={courseDescription} sections={courseSections} />
                    </div>
                </main>

                <aside className="min-w-0 xl:sticky xl:top-4 xl:self-start">
                    {isAuthenticated && isLoggedUserTeacher ?
                        <>
                            <div className="grid gap-2 mb-4">
                                <Button className="w-full bg-green-600 shadow-sm hover:bg-green-700" onClick={() => setControl(!control)}>Criar conteúdo</Button>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={`/home/cursos/${classId}/edit`}>Editar tópicos</Link>
                                </Button>
                            </div>
                        </>
                        : null}

                    {isAuthenticated ? (
                        <>
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
                                handleOpenLearningPathItem={handleOpenLearningPathItem}
                                learningPath={learningPath}
                                isLoadingObjects={isLoadingObjects}
                                isSavingNote={isSavingNote}
                                newNote={newNote}
                                newNoteTitle={newNoteTitle}
                                notes={notes}
                                objects={objects}
                                forumTopics={forumTopics}
                                handleCreateForumTopic={handleCreateForumTopic}
                                assessmentItems={assessmentItems}
                                certificates={certificates}
                                teacherContact={course?.contato_professor ?? null}
                                isSavingForumTopic={isSavingForumTopic}
                                emptyContentDescription={courseDescription}
                                selectedObject={selectedObject}
                                setForumSearch={setForumSearch}
                                newForumSummary={newForumSummary}
                                newForumTitle={newForumTitle}
                                setNewForumSummary={setNewForumSummary}
                                setNewForumTitle={setNewForumTitle}
                                setNewNote={setNewNote}
                                setNewNoteTitle={setNewNoteTitle}
                            />
                        </>
                    ) : (
                        <Card className="mt-2 border-zinc-200 shadow-sm">
                            <CardContent className="pt-6 space-y-3">
                                <p className="text-sm text-zinc-700">
                                    O conteúdo completo deste curso esta disponivel apenas para usuarios autenticados.
                                </p>
                                <Button asChild className="w-full">
                                    <Link href={`/login?redirect=/home/cursos/${classId}`}>Entrar para acessar</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {isAuthenticated && course ? (
                        <Card className="mt-4 border-zinc-200 shadow-sm">
                            <CardContent className="pt-6 space-y-3">
                                <h3 className="font-semibold text-zinc-900">Avaliar curso</h3>
                                <div className="flex flex-wrap gap-2">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <Button
                                            key={value}
                                            type="button"
                                            variant={ratingValue === value ? "default" : "outline"}
                                            onClick={() => setRatingValue(value)}
                                        >
                                            {value}
                                        </Button>
                                    ))}
                                </div>
                                <Textarea
                                    value={ratingComment}
                                    onChange={(e) => setRatingComment(e.target.value)}
                                    placeholder="Comentário opcional sobre o curso"
                                    className="min-h-[100px]"
                                />
                                <Button onClick={handleSubmitRating} disabled={!ratingValue || isSubmittingRating} className="w-full">
                                    {isSubmittingRating ? "Salvando avaliação..." : "Salvar avaliação"}
                                </Button>
                            </CardContent>
                        </Card>
                    ) : null}
                </aside>
            </div>

            {isAuthenticated && selectedObject && (
                <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6">
                    <Card className="overflow-hidden rounded-md border-zinc-200 shadow-sm">
                        <div className="bg-zinc-100 p-3 border-b flex items-center justify-between">
                            <div className="font-medium flex items-center gap-2">
                                {getFileIcon(selectedObjectType || selectedObject.mimeType || "")}
                                <span>{selectedObject.name}</span>
                            </div>
                            {(selectedObjectType || selectedObject.mimeType) ? (
                                <Badge variant="outline">{selectedObjectType || selectedObject.mimeType}</Badge>
                            ) : null}
                        </div>
                        <CardContent className="p-4">{renderContent()}</CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
