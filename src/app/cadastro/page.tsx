"use client"

import { useCadastroModel } from "./cadastro.model"
import { CadastroView } from "./cadastro.view"

export default function Cadastro() {
    const methods = useCadastroModel()

    return <CadastroView {...methods} />
}

