"use client"

import type React from "react"

import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Progress } from "@/src/components/ui/progress"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Skeleton } from "@/src/components/ui/skeleton"
import { Textarea } from "@/src/components/ui/textarea"
import {
    Award,
    BookMarked,
    BookOpen,
    Calendar,
    CheckCircle,
    CheckSquare,
    Circle,
    Clock,
    Download,
    FileIcon,
    FileQuestion,
    FileText,
    Film,
    Home,
    ImageIcon,
    Info,
    Loader2,
    MessageCircle,
    PenLine,
    PlayCircle,
    Send,
    Settings,
    Star,
    User,
    Users,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import image from "../../../../../public/Frois.jpeg"
import { uri_proxy } from "../../../../constants/URL_PROXYIMAGE"
import useQueryGetAllObjects from "../hooks/useQueryGetAllObjects"
import useQueryGetClassById from "../hooks/useQueryGetClassById"
import useQueryGetObject from "../hooks/useQueryGetObject"
import type { ObjectType } from "../interface/ObjectType"

// Mock data for the learning path
const learningPathData = [
    { id: 1, title: "Introdução à Cozinha Italiana", completed: true, type: "video" },
    { id: 2, title: "História dos Molhos Clássicos", completed: true, type: "reading" },
    { id: 3, title: "Técnica: Preparo do Sugo al Pomodoro", completed: false, type: "video" },
    { id: 4, title: "Técnica: Preparo do Pesto Genovês", completed: false, type: "video" },
    { id: 5, title: "Quiz: Molhos Básicos", completed: false, type: "quiz" },
    { id: 6, title: "Técnica: Preparo do Ragù alla Bolognese", completed: false, type: "video" },
    { id: 7, title: "Técnica: Preparo do Molho Bechamel", completed: false, type: "video" },
    { id: 8, title: "Atividade Prática: Prepare seu Molho", completed: false, type: "activity" },
    { id: 9, title: "Avaliação Final", completed: false, type: "exam" },
]

// Mock data for forum discussions
const forumDiscussions = [
    {
        id: 1,
        author: "Maria Silva",
        title: "Dúvida sobre o ponto do molho",
        date: "Ontem",
        replies: 3,
        excerpt: "Estou com dificuldade em identificar o ponto ideal do molho de tomate...",
    },
    {
        id: 2,
        author: "João Pereira",
        title: "Substituição de ingredientes",
        date: "3 dias atrás",
        replies: 7,
        excerpt: "Posso substituir o queijo parmesão por outro tipo de queijo?",
    },
    {
        id: 3,
        author: "Ana Souza",
        title: "Conservação dos molhos",
        date: "1 semana atrás",
        replies: 5,
        excerpt: "Por quanto tempo posso guardar os molhos na geladeira?",
    },
]

// Mock data for assessments
const assessmentsData = [
    {
        id: 1,
        title: "Quiz: Fundamentos da Cozinha Italiana",
        type: "quiz",
        questions: 10,
        duration: "15 minutos",
        deadline: "Sem prazo",
        completed: true,
        score: "8/10",
    },
    {
        id: 2,
        title: "Atividade Prática: Prepare o Sugo al Pomodoro",
        type: "activity",
        deadline: "15/06/2025",
        completed: false,
    },
    {
        id: 3,
        title: "Quiz: Técnicas de Preparo de Molhos",
        type: "quiz",
        questions: 15,
        duration: "20 minutos",
        deadline: "Sem prazo",
        completed: false,
    },
    {
        id: 4,
        title: "Avaliação Final do Curso",
        type: "exam",
        questions: 30,
        duration: "45 minutos",
        deadline: "30/06/2025",
        completed: false,
    },
]

// Mock data for notes
const notesData = [
    {
        id: 1,
        title: "Dicas para o molho de tomate",
        content: "Usar tomates maduros e cozinhar em fogo baixo por pelo menos 30 minutos.",
        date: "10/05/2025",
    },
    {
        id: 2,
        title: "Proporções do pesto",
        content: "2 xícaras de manjericão, 1/2 xícara de pinhões, 1/2 xícara de parmesão, 2 dentes de alho, azeite q.b.",
        date: "12/05/2025",
    },
]

// Mock data for certificates
const certificatesData = [
    {
        id: 1,
        title: "Certificado de Participação",
        description: "Certifica a participação no curso de Molhos e Técnicas de Cozinha Italiana",
        status: "Disponível após conclusão",
        progress: 35,
        available: false,
    },
    {
        id: 2,
        title: "Certificado de Excelência",
        description: "Certifica a conclusão com nota superior a 85% em todas as avaliações",
        status: "Disponível após conclusão com excelência",
        progress: 20,
        available: false,
    },
]

export default function CourseClientView({ classId }: { classId: number }) {
    const [selectedObject, setSelectedObject] = useState<string | null>(null)
    const [selectedObjectType, setSelectedObjectType] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<string>("conteudos")
    const [newNote, setNewNote] = useState<string>("")
    const [newNoteTitle, setNewNoteTitle] = useState<string>("")
    const [notes, setNotes] = useState(notesData)
    const [messageToInstructor, setMessageToInstructor] = useState<string>("")
    const [forumSearch, setForumSearch] = useState<string>("")

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
            // In a real app, this would send the message to the instructor
            alert("Mensagem enviada com sucesso!")
            setMessageToInstructor("")
        }
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

    // Function to get icon based on learning path item type
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

    // Function to render content based on file type
    const renderContent = () => {
        if (!selectedObject || !selectedObjectType) {
            return (
                <div className="flex flex-col items-center justify-center h-[400px] text-center p-6 bg-muted/30 rounded-md">
                    <FileIcon className="h-12 w-12 text-muted-foreground mb-4" />
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
        } else if (selectedObjectType === "application/pdf") {
            return (
                <div className="overflow-hidden rounded-md bg-muted/30 p-2 flex flex-col h-[500px]">
                    <object data={fileUrl} type="application/pdf" className="w-full h-full rounded">
                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                            <p className="text-muted-foreground mb-4">
                                Não foi possível exibir o PDF diretamente. Por favor, baixe o arquivo.
                            </p>
                            <Button onClick={() => window.open(fileUrl, "_blank")}>
                                <Download className="h-4 w-4 mr-2" />
                                Baixar PDF
                            </Button>
                        </div>
                    </object>
                    <Button variant="outline" size="sm" className="mt-4 self-end" onClick={() => window.open(fileUrl, "_blank")}>
                        <Download className="h-4 w-4 mr-2" />
                        Baixar PDF
                    </Button>
                </div>
            )
        } else {
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

    const calculateProgress = () => {
        const completedItems = learningPathData.filter((item) => item.completed).length
        return Math.round((completedItems / learningPathData.length) * 100)
    }

    if (isLoading) {
        return (
            <div className="w-full h-screen flex">
                <div className="w-[200px] bg-zinc-900 p-4 flex-shrink-0">
                    <Skeleton className="h-8 w-full mb-6" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                </div>
                <div className="flex-1 p-6">
                    <Skeleton className="h-12 w-3/4 mb-4" />
                    <Skeleton className="h-40 w-full mb-6" />
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2">
                            <Skeleton className="h-8 w-full mb-4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full mt-2" />
                            <Skeleton className="h-4 w-3/4 mt-2" />
                        </div>
                        <div>
                            <Skeleton className="h-8 w-full mb-4" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full mt-2" />
                            <Skeleton className="h-8 w-full mt-2" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (isError || !course) {
        return (
            <div className="w-full h-screen flex">
                <div className="w-[200px] bg-zinc-900 p-4 flex-shrink-0">
                    <div className="text-white font-bold mb-6">Visualização do curso</div>
                    <div className="space-y-2">
                        <div className="text-gray-400 flex items-center gap-2 p-2">
                            <Home className="h-4 w-4" /> Home
                        </div>
                        <div className="text-gray-400 flex items-center gap-2 p-2">
                            <User className="h-4 w-4" /> Área do aluno
                        </div>
                        <div className="text-gray-400 flex items-center gap-2 p-2">
                            <Users className="h-4 w-4" /> Área do professor
                        </div>
                        <div className="text-gray-400 flex items-center gap-2 p-2">
                            <BookOpen className="h-4 w-4" /> Cursos
                        </div>
                        <div className="text-gray-400 flex items-center gap-2 p-2">
                            <Settings className="h-4 w-4" /> Configuração
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-6">
                    <Card className="border-red-200 bg-red-50">
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
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-screen flex bg-zinc-50">
            <div className="flex-1 overflow-auto">
                <div className="bg-white border-b">
                    <div className="max-w-[1200px] mx-auto p-4 flex items-center gap-3">
                        <div className="text-sm text-zinc-600">Seja bem vindo ao curso</div>
                        <div className="font-semibold text-green-600">{course.nome}</div>
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
                            <div className="col-span-1">
                                <Image
                                    src={image}
                                    alt="Course Instructor"
                                    className="w-full h-auto rounded-md mb-4"
                                />
                                <div className="text-sm text-black">
                                    <div className="font-semibold">Nome: Eduardo Frois</div>
                                    <div className="mt-2">
                                        <div className="font-semibold text-green-600">Certificações:</div>
                                        <div className="text-xs text-zinc-600">
                                            Diploma em Gastronomia Toscana (Università dei Sapori), Certificação Slow Food
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="font-semibold text-green-600">Habilidades:</div>
                                        <div className="text-xs text-zinc-600">
                                            Massas artesanais, molhos tradicionais, culinária regional italiana
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="font-semibold text-green-600">Experiência profissional:</div>
                                        <div className="text-xs text-zinc-600">
                                            Chefe em uma villa na Toscana onde aprendeu a fazer massa com minha nonna
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="font-semibold text-green-600">Cursos ministrados:</div>
                                        <div className="text-xs text-zinc-600">
                                            Massas Frescas Italianas, Sabores da Sicília, Risotto Clássico, Molhos e Técnicas da Cozinha
                                            Italiana
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-3 bg-white rounded-md p-6 border h-full">
                                <div className="prose max-w-none text-black">
                                    <p>
                                        Neste curso, vamos explorar a fundo os fundamentos da cozinha italiana através de seus molhos mais
                                        clássicos e as técnicas que transformam ingredientes simples em pratos extraordinários. Cada aula
                                        será acompanhada de vídeos de alta qualidade, com passo a passo detalhado para que você possa
                                        acompanhar e praticar do conforto da sua casa.
                                    </p>
                                    <p>
                                        Você vai aprender a preparar molhos como o sugo al pomodoro, pesto genovês, ragù alla bolognese,
                                        bechamel, entre outros – todos com base nas receitas tradicionais italianas. Também vamos abordar
                                        técnicas essenciais, como o ponto perfeito da massa, a importância do tempo de cozimento, e como
                                        equilibrar sabores com o uso correto de ervas e finalização. Além dos molhos, o curso traz dicas
                                        valiosas de apresentação e finalização dos pratos, para que sua comida encante tanto o paladar
                                        quanto os olhos.
                                    </p>
                                    <p>
                                        E por fim, como seu professor, quero dizer uma coisa: cozinhar é um ato de amor, de paciência e de
                                        dedicação. Cada molho que você prepara conta uma história, carrega uma tradição. Não tenha medo de
                                        errar, porque é cozinhando que a gente aprende — e é com paixão que a gente se destaca. Vamos juntos
                                        transformar sua cozinha em uma verdadeira cantina italiana!
                                    </p>
                                    <p className="text-green-600 font-italic">Ci vediamo nella prima lezione! 👨‍🍳</p>
                                </div>

                                <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-medium">Seu progresso no curso</h3>
                                        <span className="text-sm text-green-700">{calculateProgress()}% concluído</span>
                                    </div>
                                    <Progress value={calculateProgress()} className="h-2" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <div className="flex flex-col gap-1 text-black">
                            <button
                                className={`w-full bg-zinc-100 text-left p-3 border-l-4 ${activeTab === "trilha" ? "border-green-600 bg-green-50 text-green-700" : "border-transparent hover:bg-zinc-100"}`}
                                onClick={() => setActiveTab("trilha")}
                            >
                                Trilha de aprendizado
                            </button>
                            <button
                                className={`w-full bg-zinc-100 text-left p-3 border-l-4 ${activeTab === "forum" ? "border-green-600 bg-green-50 text-green-700" : "border-transparent hover:bg-zinc-100"}`}
                                onClick={() => setActiveTab("forum")}
                            >
                                Forum de discussão
                            </button>
                            <button
                                className={`w-full bg-zinc-100 text-left p-3 border-l-4 ${activeTab === "conteudos" ? "border-green-600 bg-green-50 text-green-700" : "border-transparent hover:bg-zinc-100"}`}
                                onClick={() => setActiveTab("conteudos")}
                            >
                                Conteúdos
                            </button>
                            <button
                                className={`w-full bg-zinc-100 text-left p-3 border-l-4 ${activeTab === "provas" ? "border-green-600 bg-green-50 text-green-700" : "border-transparent hover:bg-zinc-100"}`}
                                onClick={() => setActiveTab("provas")}
                            >
                                Provas e atividades
                            </button>
                            <button
                                className={`w-full bg-zinc-100 text-left p-3 border-l-4 ${activeTab === "anotacoes" ? "border-green-600 bg-green-50 text-green-700" : "border-transparent hover:bg-zinc-100"}`}
                                onClick={() => setActiveTab("anotacoes")}
                            >
                                Anotações
                            </button>
                            <button
                                className={`w-full bg-zinc-100 text-left p-3 border-l-4 ${activeTab === "certificados" ? "border-green-600 bg-green-50 text-green-700" : "border-transparent hover:bg-zinc-100"}`}
                                onClick={() => setActiveTab("certificados")}
                            >
                                Certificados
                            </button>
                            <button
                                className={`w-full bg-zinc-100 text-left p-3 border-l-4 ${activeTab === "professor" ? "border-green-600 bg-green-50 text-green-700" : "border-transparent hover:bg-zinc-100"}`}
                                onClick={() => setActiveTab("professor")}
                            >
                                Fale com o professor
                            </button>
                        </div>

                        {activeTab === "trilha" && (
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

                        {activeTab === "forum" && (
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

                        {/* Content Tab */}
                        {activeTab === "conteudos" && (
                            <div className="mt-6 border rounded-md bg-white text-black">
                                <div className="p-3 border-b font-medium">Materiais do Curso</div>
                                <div className="p-3">
                                    {isLoadingObjects ? (
                                        <div className="space-y-2">
                                            <Skeleton className="h-8 w-full" />
                                            <Skeleton className="h-8 w-full" />
                                            <Skeleton className="h-8 w-full" />
                                        </div>
                                    ) : objects && objects.length > 0 ? (
                                        <ScrollArea className="h-[350px] pr-4">
                                            <ul className="space-y-1">
                                                {objects.map((obj: ObjectType, idx: number) => (
                                                    <li key={idx}>
                                                        <button
                                                            onClick={() => handleClick(obj)}
                                                            className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors
                                ${selectedObject === obj.objectName
                                                                    ? "bg-green-50 text-green-700 font-medium"
                                                                    : "hover:bg-zinc-50"
                                                                }`}
                                                        >
                                                            {getFileIcon(obj.contentType)}
                                                            <span className="truncate text-sm">{obj.objectName}</span>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </ScrollArea>
                                    ) : (
                                        <p className="text-sm text-muted-foreground py-2">Nenhum material disponível.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Assessments Tab */}
                        {activeTab === "provas" && (
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

                        {/* Notes Tab */}
                        {activeTab === "anotacoes" && (
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

                        {activeTab === "certificados" && (
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

                        {activeTab === "professor" && (
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
                    </div>
                </div>

                {selectedObject && (
                    <div className="max-w-[1200px] mx-auto p-4 mt-4">
                        <Card className="border rounded-md overflow-hidden">
                            <div className="bg-zinc-100 p-3 border-b flex items-center justify-between">
                                <div className="font-medium flex items-center gap-2">
                                    {getFileIcon(selectedObjectType || "")}
                                    <span>{selectedObject}</span>
                                </div>
                                {selectedObjectType && <Badge variant="outline">{selectedObjectType}</Badge>}
                            </div>
                            <CardContent className="p-4">{renderContent()}</CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}

function Search(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}
