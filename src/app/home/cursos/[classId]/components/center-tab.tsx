import { Progress } from "@/src/components/ui/progress"
import { ICourseSection } from "../../interface/IClass"
import { CheckCircle2 } from "lucide-react"

interface iProps {
    calculateProgress: () => number
    description: string
    sections: ICourseSection[]
}

export const CenterTab = ({ calculateProgress, description, sections }: iProps) => {
    const hasSections = sections.length > 0

    return (
        <section className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="space-y-6 text-zinc-950">
                <div className="rounded-md border border-green-100 bg-green-50/70 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-green-700">Descrição do curso</div>
                    <p className="mt-2 text-base leading-7 text-zinc-800">{description}</p>
                </div>

                {hasSections ? (
                    <div className="space-y-4">
                        {sections.map((section, index) => (
                            <section key={section.codigo || section.ordem} className="group rounded-md border border-zinc-200 bg-white p-4 transition-colors hover:border-green-200 hover:bg-green-50/30">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-green-100 text-sm font-semibold text-green-700">
                                        {index + 1}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-base font-semibold text-zinc-950">{section.titulo}</h3>
                                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-700">{section.conteudo}</p>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-md border border-dashed bg-zinc-50 p-4">
                        <p className="text-sm text-zinc-600">Nenhuma seção detalhada foi cadastrada para este curso.</p>
                    </div>
                )}
            </div>

            <div className="mt-6 rounded-md border border-zinc-200 bg-zinc-50 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 font-medium text-zinc-900">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Seu progresso no curso
                    </div>
                    <span className="text-sm font-semibold text-green-700">{calculateProgress()}% concluído</span>
                </div>
                <Progress value={calculateProgress()} className="h-2" />
            </div>
        </section>
    )
}
