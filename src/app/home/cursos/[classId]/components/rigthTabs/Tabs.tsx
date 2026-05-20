import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Progress } from "@/src/components/ui/progress"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Skeleton } from "@/src/components/ui/skeleton"
import { Textarea } from "@/src/components/ui/textarea"
import { Award, Calendar, CheckCircle, Circle, Clock, FileQuestion, MessageCircle, Paperclip, PenLine, Search } from "lucide-react"
import { SelectedObject } from "../../../constants/types"
import { ICourseAssessmentItem, ICourseCertificate, ICourseForumTopic, ICourseLearningPathItem, ICourseTeacherContact, ICourseUserNote } from "../../../interface/IClass"
import { ObjectType } from "../../../interface/ObjectType"
import { ActiveTab } from "../../cursosId.interface"

interface iProps {
    activeTab: string,
    getLearningPathIcon: (type: string) => React.JSX.Element
    getFileIcon: (contentType: string) => React.JSX.Element
    forumSearch: string,
    setForumSearch: (e: string) => void
    isLoadingObjects: boolean
    objects: ObjectType[] | undefined
    handleClick: (e: ObjectType) => void | Promise<void>
    handleOpenLearningPathItem: (item: ICourseLearningPathItem) => void | Promise<void>
    selectedObject: SelectedObject
    learningPath: ICourseLearningPathItem[]
    forumTopics: ICourseForumTopic[]
    assessmentItems: ICourseAssessmentItem[]
    certificates: ICourseCertificate[]
    notes: ICourseUserNote[]
    teacherContact: ICourseTeacherContact | null
    emptyContentDescription: string
    setNewNoteTitle: (e: string) => void
    newNoteTitle: string
    newNote: string
    setNewNote: (e: string) => void
    handleAddNote: () => void | Promise<void>
    isSavingNote: boolean
    newForumTitle: string
    setNewForumTitle: (e: string) => void
    newForumSummary: string
    setNewForumSummary: (e: string) => void
    handleCreateForumTopic: () => void | Promise<void>
    isSavingForumTopic: boolean
}

export const AllTabs = ({ activeTab, getLearningPathIcon, forumSearch, setForumSearch, isLoadingObjects, objects, handleClick, handleOpenLearningPathItem, selectedObject, getFileIcon, notes, learningPath, forumTopics, assessmentItems, certificates, teacherContact, emptyContentDescription, setNewNoteTitle, newNoteTitle, newNote, setNewNote, handleAddNote, isSavingNote, newForumTitle, setNewForumTitle, newForumSummary, setNewForumSummary, handleCreateForumTopic, isSavingForumTopic }: iProps) => {
    const emptyState = (message: string) => (
        <div className="rounded-md border border-dashed border-zinc-200 bg-zinc-50 p-4 text-sm leading-5 text-zinc-600">
            {message}
        </div>
    )

    const panelClass = "mt-4 rounded-md border border-zinc-200 bg-white shadow-sm"
    const panelHeaderClass = "border-b border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-950"
    const panelBodyClass = "p-4"
    const fieldClass = "w-full rounded-md border border-zinc-300 bg-white p-2 text-sm text-zinc-900 caret-zinc-900 placeholder:text-zinc-400 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"

    return (
        <>
            {activeTab === ActiveTab.Trilha && (
                <div className={panelClass}>
                    <div className={panelHeaderClass}>Trilha de Aprendizado</div>
                    <div className={panelBodyClass}>
                        <ScrollArea className="max-h-[380px] pr-4">
                            {learningPath.length > 0 ? (
                                <ul className="space-y-3">
                                    {learningPath.map((item) => (
                                        <li key={item.codigo} className="flex items-start gap-3 rounded-md border border-zinc-200 bg-zinc-50/70 p-3">
                                            <div className="mt-0.5">
                                                {item.concluido_padrao ? (
                                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                                ) : (
                                                    <Circle className="h-5 w-5 text-zinc-300" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 text-sm font-medium text-zinc-800">
                                                    <span>{item.titulo}</span>
                                                    <span className="text-zinc-400">{getLearningPathIcon(item.tipo)}</span>
                                                </div>
                                                {item.arquivo_path ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleOpenLearningPathItem(item)}
                                                        className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-green-200 bg-white px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-50"
                                                    >
                                                        <Paperclip className="h-3.5 w-3.5" />
                                                        {item.arquivo_nome ?? "Abrir material"}
                                                    </button>
                                                ) : (
                                                    <div className="mt-2 text-xs text-zinc-500">Sem arquivo anexado</div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : emptyState("Nenhum item de trilha foi cadastrado para este curso.")}
                        </ScrollArea>
                    </div>
                </div>
            )}

            {activeTab === ActiveTab.Forum && (
                <div className={panelClass}>
                    <div className={panelHeaderClass}>Forum de Discussão</div>
                    <div className={panelBodyClass}>
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Pesquisar no forum..."
                                className={`${fieldClass} pr-9`}
                                value={forumSearch}
                                onChange={(e) => setForumSearch(e.target.value)}
                            />
                            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        </div>
                        <ScrollArea className="max-h-[320px] pr-4">
                            {forumTopics.length > 0 ? (
                                <div className="space-y-3">
                                    {forumTopics
                                        .filter((discussion) => `${discussion.titulo} ${discussion.resumo} ${discussion.autor}`.toLowerCase().includes(forumSearch.toLowerCase()))
                                        .map((discussion) => (
                                            <article key={discussion.codigo} className="rounded-md border border-zinc-200 bg-zinc-50/70 p-3">
                                                <div className="mb-2 flex items-center gap-2">
                                                    <Avatar className="h-7 w-7">
                                                        <AvatarFallback className="bg-green-100 text-xs font-semibold text-green-700">{(discussion.autor || "U")[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium text-zinc-800">{discussion.autor || "Usuário"}</span>
                                                </div>
                                                <h4 className="text-sm font-semibold text-zinc-950">{discussion.titulo}</h4>
                                                <p className="mt-1 text-xs leading-5 text-zinc-600">{discussion.resumo}</p>
                                            </article>
                                        ))}
                                </div>
                            ) : emptyState("Nenhum tópico de fórum foi cadastrado para este curso.")}
                        </ScrollArea>
                        <div className="mt-4 space-y-2 rounded-md border border-zinc-200 bg-zinc-50 p-3">
                            <input
                                type="text"
                                placeholder="Título da discussão"
                                className={fieldClass}
                                value={newForumTitle}
                                onChange={(e) => setNewForumTitle(e.target.value)}
                            />
                            <Textarea
                                placeholder="Descreva o assunto da discussão..."
                                className="min-h-[90px] resize-none border-zinc-300 bg-white text-sm text-zinc-900 caret-zinc-900 placeholder:text-zinc-400 focus-visible:ring-green-100"
                                value={newForumSummary}
                                onChange={(e) => setNewForumSummary(e.target.value)}
                            />
                            <Button
                                size="sm"
                                className="w-full bg-green-600 shadow-sm hover:bg-green-700"
                                disabled={!newForumTitle.trim() || !newForumSummary.trim() || isSavingForumTopic}
                                onClick={handleCreateForumTopic}
                            >
                                <MessageCircle className="h-4 w-4 mr-2" />
                                {isSavingForumTopic ? "Criando..." : "Nova discussão"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === ActiveTab.Conteudos && (
                <div className={`${panelClass} text-zinc-950`}>
                    <div className={panelHeaderClass}>Materiais do Curso</div>
                    <div className={panelBodyClass}>
                        {isLoadingObjects ? (
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-full" />
                            </div>
                        ) : objects && objects.length > 0 ? (
                            <ScrollArea className="max-h-64 w-full pr-4">
                                <div className="min-w-[260px]">
                                    <ul className="space-y-2">
                                        {objects.map((obj: ObjectType, idx: number) => (
                                            <li key={idx}>
                                                <button
                                                    onClick={() => handleClick(obj)}
                                                    className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left transition-colors
              ${selectedObject?.name === obj.objectName
                                                            ? "border-green-200 bg-green-50 text-green-700 font-medium"
                                                            : "border-zinc-200 bg-zinc-50 hover:bg-white"
                                                        }`}
                                                >
                                                    {getFileIcon(obj.contentType)}
                                                    <span className="truncate text-sm">{obj.objectName}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollArea>
                        ) : (
                            <div className="rounded-md border border-dashed bg-zinc-50 p-3 space-y-2">
                                <p className="text-sm font-medium text-zinc-800">Nenhum arquivo cadastrado</p>
                                <p className="text-sm text-muted-foreground">{emptyContentDescription}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === ActiveTab.Provas && (
                <div className={`${panelClass} text-zinc-950`}>
                    <div className={panelHeaderClass}>Provas e Atividades</div>
                    <div className={panelBodyClass}>
                        <ScrollArea className="max-h-[380px] pr-4">
                            <div className="space-y-4">
                                {assessmentItems.length > 0 ? assessmentItems.map((assessment) => (
                                    <div key={assessment.codigo} className="rounded-md border border-zinc-200 bg-zinc-50/70 p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            {assessment.tipo === "quiz" && <FileQuestion className="h-4 w-4 text-blue-600" />}
                                            {assessment.tipo === "activity" && <PenLine className="h-4 w-4 text-green-600" />}
                                            {assessment.tipo === "exam" && <FileQuestion className="h-4 w-4 text-red-600" />}
                                            <h4 className="font-medium text-sm">{assessment.titulo}</h4>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                            {assessment.quantidade_questoes && (
                                                <div className="flex items-center gap-1">
                                                    <span className="text-zinc-500">Questões:</span>
                                                    <span>{assessment.quantidade_questoes}</span>
                                                </div>
                                            )}
                                            {assessment.duracao && (
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3 text-zinc-400" />
                                                    <span>{assessment.duracao}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3 text-zinc-400" />
                                                <span>{assessment.prazo ? new Date(assessment.prazo).toLocaleDateString() : "Sem prazo"}</span>
                                            </div>
                                        </div>
                                    </div>
                                )) : emptyState("Nenhuma prova ou atividade foi cadastrada para este curso.")}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            )}

            {activeTab === ActiveTab.Anotacoes && (
                <div className={`${panelClass} text-zinc-950`}>
                    <div className={panelHeaderClass}>Minhas Anotações</div>
                    <div className={panelBodyClass}>
                        <ScrollArea className="mb-4 max-h-[250px] pr-4">
                            <div className="space-y-3">
                                {notes.map((note) => (
                                    <div key={note.codigo} className="rounded-md border border-amber-100 bg-amber-50 p-3">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-medium text-sm">{note.titulo}</h4>
                                            <span className="text-xs text-zinc-500">{new Date(note.updated_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-xs text-zinc-700 whitespace-pre-wrap">{note.conteudo}</p>
                                    </div>
                                ))}
                                {notes.length === 0 ? emptyState("Você ainda não possui anotações neste curso.") : null}
                            </div>
                        </ScrollArea>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Título da anotação"
                                className={fieldClass}
                                value={newNoteTitle}
                                onChange={(e) => setNewNoteTitle(e.target.value)}
                            />
                            <Textarea
                                placeholder="Digite sua anotação aqui..."
                                className="min-h-[100px] resize-none border-zinc-300 bg-white text-sm text-zinc-900 caret-zinc-900 placeholder:text-zinc-400 focus-visible:ring-green-100"
                                value={newNote}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewNote(e.target.value)}
                            />
                            <Button
                                onClick={handleAddNote}
                                className="w-full bg-green-600 hover:bg-green-700"
                                disabled={!newNoteTitle.trim() || !newNote.trim() || isSavingNote}
                            >
                                <PenLine className="h-4 w-4 mr-2" />
                                {isSavingNote ? "Salvando..." : "Salvar Anotação"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === ActiveTab.Certificados && (
                <div className={`${panelClass} text-zinc-950`}>
                    <div className={panelHeaderClass}>Certificados</div>
                    <div className={panelBodyClass}>
                        <ScrollArea className="max-h-[380px] pr-4">
                            <div className="space-y-4">
                                {certificates.length > 0 ? certificates.map((certificate) => (
                                    <div key={certificate.codigo} className="rounded-md border border-zinc-200 bg-zinc-50/70 p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Award className="h-5 w-5 text-amber-500" />
                                            <h4 className="font-medium text-sm">{certificate.titulo}</h4>
                                        </div>
                                        <p className="text-xs text-zinc-600 mb-3">{certificate.descricao}</p>
                                        <div className="mb-2">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>Progresso</span>
                                                <span>{certificate.progresso_padrao}%</span>
                                            </div>
                                            <Progress value={certificate.progresso_padrao} className="h-2" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-zinc-500">{certificate.status}</span>
                                        </div>
                                    </div>
                                )) : emptyState("Nenhum certificado foi cadastrado para este curso.")}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            )}

            {activeTab === ActiveTab.Professor && (
                <div className={`${panelClass} text-zinc-950`}>
                    <div className={panelHeaderClass}>Fale com o Professor</div>
                    <div className={panelBodyClass}>
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                            <Avatar>
                                <AvatarFallback>{(teacherContact?.nome_professor || "P").slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium text-sm">{teacherContact?.nome_professor || "Professor"}</div>
                                <div className="text-xs text-green-600">{teacherContact?.subtitulo || "Professor do curso"}</div>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-zinc-600 mb-2">
                                {teacherContact?.mensagem_orientacao || "Envie uma mensagem diretamente para o professor do curso:"}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
