"use client"

import { useCreateClassModel } from "./create.model"
import { CreateClassView } from "./create.view"

export default function Page() {
    const methods = useCreateClassModel()

    return <CreateClassView {...methods} />
}   
