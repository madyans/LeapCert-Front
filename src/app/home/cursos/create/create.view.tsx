import { dsp } from "@/src/constants/DEFAULT_STYLE_PAGE"
import { useRouter } from "next/navigation"
import { Footer } from "./components/Footer"
import { FormCreate } from "./components/Form"
import { Header } from "./components/Header"
import { useCreateClassModel } from "./create.model"

type CreateClassViewProps = ReturnType<typeof useCreateClassModel>

export const CreateClassView = (props: CreateClassViewProps) => {
    const router = useRouter()
    const { dataGenders, form, isLoadingGenders, isPending, onSubmit } = props

    if (isLoadingGenders) return null;

    return (
        <div className={`${dsp} space-y-2 bg-zinc-50 rounded`}>
            <Header router={router} />

            <div className="max-w-2xl mx-auto">

                <FormCreate
                    dataGenders={dataGenders}
                    form={form}
                    isLoadingGenders={isLoadingGenders}
                    isPending={isPending}
                    onSubmit={onSubmit}
                    router={router}
                />

                <Footer />
            </div>
        </div>
    )
}