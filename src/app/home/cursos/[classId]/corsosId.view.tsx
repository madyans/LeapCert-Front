"use client"


import { ContentView } from "./components/counteudo-view"
import FileUpload from "./components/send-object.view"
import { useCursosIdModel } from "./cursosId.model"
import { FunctionsComponents } from "./functions-components/functions"

export type CourseClientViewProps = ReturnType<typeof useCursosIdModel>

export default function CourseClientView(props: CourseClientViewProps) {
    const { isError, isLoading, course, control } = props
    console.log("teste", control)

    {
        FunctionsComponents({
            isLoading,
            isError,
            course
        })
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