import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Progress } from "@/src/components/ui/progress"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Skeleton } from "@/src/components/ui/skeleton"
import { Textarea } from "@/src/components/ui/textarea"
import { Award, Calendar, CheckCircle, CheckSquare, Circle, Clock, FileQuestion, MessageCircle, PenLine, Search, Send } from "lucide-react"
import { assessmentsData, certificatesData, forumDiscussions, learningPathData, notesData } from "../../../constants/mock"
import { SelectedObject } from "../../../constants/types"
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
    handleClick: (e: ObjectType) => void
    selectedObject: SelectedObject
    notes: typeof notesData
    setNewNoteTitle: (e: string) => void
    newNoteTitle: string
    newNote: string
    setNewNote: (e: string) => void
    handleAddNote: () => void
    messageToInstructor: string
    setMessageToInstructor: (e: string) => void
    handleSendMessage: () => void
}

export const AllTabs = ({ activeTab, getLearningPathIcon, forumSearch, setForumSearch, isLoadingObjects, objects, handleClick, selectedObject, getFileIcon, notes, setNewNoteTitle, newNoteTitle, newNote, setNewNote, handleAddNote, messageToInstructor, setMessageToInstructor, handleSendMessage }: iProps) => {
    return (
        <>
            {activeTab === ActiveTab.Trilha && (
                <div className="mt-6 border rounded-md bg-white">
                    <div className="p-3 border-b font-medium text-black">Trilha de Aprendizado</div>
                    <div className="p-3">
                        <ScrollArea className="h-[400px] pr-4">
                            <ul className="space-y-3">
                                {learningPathData.map((item) => (
                                    <li key={item.id} className="flex items-start gap-2">
                                        <div className="mt-0.5">
                                            {item.completed ? (
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                            ) : (
                                                <Circle className="h-5 w-5 text-zinc-300" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className={`${item.completed ? "text-zinc-700" : "text-zinc-600"}`}>
                                                    {item.title}
                                                </span>
                                                {getLearningPathIcon(item.type)}
                                            </div>
                                            {!item.completed && (
                                                <Button variant="link" size="sm" className="h-auto p-0 text-green-600">
                                                    Iniciar
                                                </Button>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>
                    </div>
                </div>
            )}

            {activeTab === ActiveTab.Forum && (
                <div className="mt-6 border rounded-md bg-white">
                    <div className="p-3 border-b font-medium text-black">Forum de Discussão</div>
                    <div className="p-3">
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Pesquisar no forum..."
                                className="w-full p-2 pr-8 border rounded-md text-sm"
                                value={forumSearch}
                                onChange={(e) => setForumSearch(e.target.value)}
                            />
                            <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0">
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>
                        <ScrollArea className="h-[350px] pr-4">
                            <div className="space-y-4">
                                {forumDiscussions.map((discussion) => (
                                    <div key={discussion.id} className="border rounded-md p-3 hover:bg-zinc-50">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium">{discussion.author}</span>
                                            <span className="text-xs text-zinc-500">{discussion.date}</span>
                                        </div>
                                        <h4 className="font-medium text-sm mb-1">{discussion.title}</h4>
                                        <p className="text-xs text-zinc-600 mb-2">{discussion.excerpt}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-zinc-500">{discussion.replies} respostas</span>
                                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                                                Ver discussão
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="mt-4 flex justify-end">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Nova discussão
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === ActiveTab.Conteudos && (
                <div className="mt-6 border rounded-md bg-white text-black h-72">
                    <div className="p-3 border-b font-medium">Materiais do Curso</div>
                    <div className="p-3">
                        {isLoadingObjects ? (
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-full" />
                            </div>
                        ) : objects && objects.length > 0 ? (
                            <ScrollArea className="h-52 w-full pr-4">
                                <div className="min-w-[600px]"> {/* força largura maior que o container */}
                                    <ul className="space-y-1">
                                        {objects.map((obj: ObjectType, idx: number) => (
                                            <li key={idx}>
                                                <button
                                                    onClick={() => handleClick(obj)}
                                                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors
              ${selectedObject?.name === obj.objectName
                                                            ? "bg-green-50 text-green-700 font-medium"
                                                            : "hover:bg-zinc-50"
                                                        }`}
                                                >
                                                    {getFileIcon(obj.contentType)}
                                                    <span className="text-sm whitespace-nowrap overflow-auto">{obj.objectName}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollArea>
                        ) : (
                            <p className="text-sm text-muted-foreground py-2">Nenhum material disponível.</p>
                        )}
                    </div>
                </div>
            )}

            {activeTab === ActiveTab.Provas && (
                <div className="mt-6 border rounded-md bg-white text-black">
                    <div className="p-3 border-b font-medium">Provas e Atividades</div>
                    <div className="p-3">
                        <ScrollArea className="h-[400px] pr-4">
                            <div className="space-y-4">
                                {assessmentsData.map((assessment) => (
                                    <div key={assessment.id} className="border rounded-md p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            {assessment.type === "quiz" && <FileQuestion className="h-4 w-4 text-blue-600" />}
                                            {assessment.type === "activity" && <PenLine className="h-4 w-4 text-green-600" />}
                                            {assessment.type === "exam" && <FileQuestion className="h-4 w-4 text-red-600" />}
                                            <h4 className="font-medium text-sm">{assessment.title}</h4>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                            {assessment.questions && (
                                                <div className="flex items-center gap-1">
                                                    <span className="text-zinc-500">Questões:</span>
                                                    <span>{assessment.questions}</span>
                                                </div>
                                            )}
                                            {assessment.duration && (
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3 text-zinc-400" />
                                                    <span>{assessment.duration}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3 text-zinc-400" />
                                                <span>{assessment.deadline}</span>
                                            </div>
                                            {assessment.completed && (
                                                <div className="flex items-center gap-1">
                                                    <CheckSquare className="h-3 w-3 text-green-600" />
                                                    <span className="text-green-600">Concluído</span>
                                                </div>
                                            )}
                                        </div>
                                        {assessment.score && (
                                            <div className="text-xs bg-green-50 text-green-700 p-2 rounded mb-3">
                                                Sua nota: {assessment.score}
                                            </div>
                                        )}
                                        <Button
                                            size="sm"
                                            className={`w-full ${assessment.completed
                                                ? "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
                                                : "bg-green-600 hover:bg-green-700"
                                                }`}
                                            disabled={assessment.completed}
                                        >
                                            {assessment.completed ? "Concluído" : "Iniciar"}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            )}

            {activeTab === ActiveTab.Anotacoes && (
                <div className="mt-6 border rounded-md bg-white text-black">
                    <div className="p-3 border-b font-medium">Minhas Anotações</div>
                    <div className="p-3">
                        <ScrollArea className="h-[250px] pr-4 mb-4">
                            <div className="space-y-3">
                                {notes.map((note) => (
                                    <div key={note.id} className="border rounded-md p-3 bg-yellow-50 border-yellow-100">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-medium text-sm">{note.title}</h4>
                                            <span className="text-xs text-zinc-500">{note.date}</span>
                                        </div>
                                        <p className="text-xs text-zinc-700 whitespace-pre-wrap">{note.content}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Título da anotação"
                                className="w-full p-2 border rounded-md text-sm"
                                value={newNoteTitle}
                                onChange={(e) => setNewNoteTitle(e.target.value)}
                            />
                            <Textarea
                                placeholder="Digite sua anotação aqui..."
                                className="min-h-[100px] text-sm"
                                value={newNote}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewNote(e.target.value)}
                            />
                            <Button
                                onClick={handleAddNote}
                                className="w-full bg-green-600 hover:bg-green-700"
                                disabled={!newNoteTitle.trim() || !newNote.trim()}
                            >
                                <PenLine className="h-4 w-4 mr-2" />
                                Salvar Anotação
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === ActiveTab.Certificados && (
                <div className="mt-6 border rounded-md bg-white text-black">
                    <div className="p-3 border-b font-medium">Certificados</div>
                    <div className="p-3">
                        <ScrollArea className="h-[400px] pr-4">
                            <div className="space-y-4">
                                {certificatesData.map((certificate) => (
                                    <div key={certificate.id} className="border rounded-md p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Award className="h-5 w-5 text-amber-500" />
                                            <h4 className="font-medium text-sm">{certificate.title}</h4>
                                        </div>
                                        <p className="text-xs text-zinc-600 mb-3">{certificate.description}</p>
                                        <div className="mb-2">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>Progresso</span>
                                                <span>{certificate.progress}%</span>
                                            </div>
                                            <Progress value={certificate.progress} className="h-2" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-zinc-500">{certificate.status}</span>
                                            <Button
                                                size="sm"
                                                disabled={!certificate.available}
                                                className={`${certificate.available ? "bg-green-600 hover:bg-green-700" : "bg-zinc-200 text-zinc-500"
                                                    }`}
                                            >
                                                {certificate.available ? "Baixar" : "Indisponível"}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            )}

            {activeTab === ActiveTab.Professor && (
                <div className="mt-6 border rounded-md bg-white text-black">
                    <div className="p-3 border-b font-medium">Fale com o Professor</div>
                    <div className="p-3">
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                            <Avatar>
                                <AvatarFallback>GB</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium text-sm">Giovanni Bellucci</div>
                                <div className="text-xs text-green-600">Professor do curso</div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-zinc-600 mb-2">
                                Envie uma mensagem diretamente para o professor do curso:
                            </p>
                            <Textarea
                                placeholder="Digite sua mensagem aqui..."
                                className="min-h-[150px] text-sm"
                                value={messageToInstructor}
                                onChange={(e) => setMessageToInstructor(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={handleSendMessage}
                            className="w-full bg-green-600 hover:bg-green-700"
                            disabled={!messageToInstructor.trim()}
                        >
                            <Send className="h-4 w-4 mr-2" />
                            Enviar Mensagem
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}