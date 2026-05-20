"use client"


import { ContentView } from "./components/counteudo-view"
import FileUpload from "./components/send-object.view"
import { useCursosIdModel } from "./cursosId.model"
import { FunctionsComponents } from "./functions-components/functions"
import { Card, CardContent } from "@/src/components/ui/card"

export type CourseClientViewProps = ReturnType<typeof useCursosIdModel>

export default function CourseClientView(props: CourseClientViewProps) {
    const { isError, isLoading, course, control, courseAccessMessage } = props

    const stateView = FunctionsComponents({
        isLoading,
        isError: isError && !courseAccessMessage,
        course,
    })

    if (stateView) {
        return stateView
    }

    if (courseAccessMessage) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-zinc-50 p-6">
                <Card className="w-full max-w-xl border-amber-200 bg-amber-50">
                    <CardContent className="pt-6 space-y-3">
                        <h2 className="text-lg font-semibold text-amber-900">Acesso restrito</h2>
                        <p className="text-sm text-amber-800">{courseAccessMessage}</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex bg-zinc-50">
            {control ? (
                <div className="w-full h-full">
                    <FileUpload {...props} />
                </div>
            ) : (
                <div className="w-full h-full">
                    <ContentView {...props} />
                </div>
            )}
        </div>
    )
}
