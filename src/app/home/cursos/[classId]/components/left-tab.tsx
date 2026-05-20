import Image, { StaticImageData } from "next/image"
import { BookOpen, Layers3 } from "lucide-react"

interface iProps {
    image: StaticImageData
    courseName: string
    summary: string
    sectionCount: number
}

export const LeaftTab = ({ image, courseName, summary, sectionCount }: iProps) => {
    return (
        <aside className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="overflow-hidden rounded-md border border-zinc-100 bg-zinc-50">
                <Image
                    src={image}
                    alt="Course Instructor"
                    className="aspect-square h-auto w-full object-cover"
                />
            </div>

            <div className="mt-4 space-y-4 text-sm text-zinc-800">
                <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Curso</div>
                    <div className="mt-1 text-base font-semibold leading-snug text-zinc-950">{courseName}</div>
                </div>

                <div className="rounded-md bg-green-50 p-3 text-green-950">
                    <div className="flex items-center gap-2 font-semibold text-green-700">
                        <BookOpen className="h-4 w-4" />
                        Resumo
                    </div>
                    <p className="mt-2 text-sm leading-5 text-zinc-700">{summary}</p>
                </div>

                <div className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2">
                    <div className="flex items-center gap-2 font-medium text-zinc-700">
                        <Layers3 className="h-4 w-4 text-green-600" />
                        Seções
                    </div>
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-sm font-semibold text-zinc-900">{sectionCount}</span>
                </div>
            </div>
        </aside>
    )
}
