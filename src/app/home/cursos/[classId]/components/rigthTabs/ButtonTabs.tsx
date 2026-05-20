import { ActiveTab } from "../../cursosId.interface"
import { Award, BookOpenCheck, ClipboardList, FileText, MessageCircle, NotebookPen, UserRound } from "lucide-react"

interface iProps {
    activeTab: string
    setActiveTab: (e: string) => void
}

export const ButtonTabs = ({ activeTab, setActiveTab }: iProps) => {
    const tabs = [
        { id: ActiveTab.Trilha, label: "Trilha de aprendizado", icon: BookOpenCheck },
        { id: ActiveTab.Forum, label: "Forum de discussão", icon: MessageCircle },
        { id: ActiveTab.Conteudos, label: "Conteúdos", icon: FileText },
        { id: ActiveTab.Provas, label: "Provas e atividades", icon: ClipboardList },
        { id: ActiveTab.Anotacoes, label: "Anotações", icon: NotebookPen },
        { id: ActiveTab.Certificados, label: "Certificados", icon: Award },
        { id: ActiveTab.Professor, label: "Fale com o professor", icon: UserRound },
    ]

    return (
        <nav className="rounded-md border border-zinc-200 bg-white p-2 shadow-sm">
            <div className="flex flex-col gap-1 text-zinc-900">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    const selected = activeTab === tab.id

                    return (
                        <button
                            key={tab.id}
                            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors ${selected
                                ? "bg-green-50 text-green-700 ring-1 ring-green-100"
                                : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <Icon className={`h-4 w-4 ${selected ? "text-green-600" : "text-zinc-400"}`} />
                            <span>{tab.label}</span>
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}
