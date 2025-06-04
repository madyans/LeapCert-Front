import { ActiveTab } from "../../cursosId.interface"

interface iProps {
    activeTab: string
    setActiveTab: (e: string) => void
}

export const ButtonTabs = ({ activeTab, setActiveTab }: iProps) => {
    return (
        <>
            <div className="flex flex-col gap-1 text-black">
                <button
                    className={`w-full bg-zinc-100 text-left p-3 border-l-4 ${activeTab === ActiveTab.Trilha ? "border-green-600 bg-green-50 text-green-700" : "border-transparent hover:bg-zinc-100"}`}
                    onClick={() => setActiveTab(ActiveTab.Trilha)}
                >
                    Trilha de aprendizado
                </button>
                <button
                    className={`w-full bg-zinc-100 text-left p-3 border-l-4 ${activeTab === ActiveTab.Forum ? "border-green-600 bg-green-50 text-green-700" : "border-transparent hover:bg-zinc-100"}`}
                    onClick={() => setActiveTab(ActiveTab.Forum)}
                >
                    Forum de discussão
                </button>
                <button
                    className={`w-full bg-zinc-100 text-left p-3 border-l-4 ${activeTab === ActiveTab.Conteudos ? "border-green-600 bg-green-50 text-green-700" : "border-transparent hover:bg-zinc-100"}`}
                    onClick={() => setActiveTab(ActiveTab.Conteudos)}
                >
                    Conteúdos
                </button>
                <button
                    className={`w-full bg-zinc-100 text-left p-3 border-l-4 ${activeTab === ActiveTab.Provas ? "border-green-600 bg-green-50 text-green-700" : "border-transparent hover:bg-zinc-100"}`}
                    onClick={() => setActiveTab(ActiveTab.Provas)}
                >
                    Provas e atividades
                </button>
                <button
                    className={`w-full bg-zinc-100 text-left p-3 border-l-4 ${activeTab === ActiveTab.Anotacoes ? "border-green-600 bg-green-50 text-green-700" : "border-transparent hover:bg-zinc-100"}`}
                    onClick={() => setActiveTab(ActiveTab.Anotacoes)}
                >
                    Anotações
                </button>
                <button
                    className={`w-full bg-zinc-100 text-left p-3 border-l-4 ${activeTab === ActiveTab.Certificados ? "border-green-600 bg-green-50 text-green-700" : "border-transparent hover:bg-zinc-100"}`}
                    onClick={() => setActiveTab(ActiveTab.Certificados)}
                >
                    Certificados
                </button>
                <button
                    className={`w-full bg-zinc-100 text-left p-3 border-l-4 ${activeTab === ActiveTab.Professor ? "border-green-600 bg-green-50 text-green-700" : "border-transparent hover:bg-zinc-100"}`}
                    onClick={() => setActiveTab(ActiveTab.Professor)}
                >
                    Fale com o professor
                </button>
            </div>
        </>
    )
}