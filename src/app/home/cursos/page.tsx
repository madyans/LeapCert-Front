'use client';

import { useCursoModel } from "./cursos.model";
import { CursosView } from "./cursos.view";

export default function Page() {
    const methods = useCursoModel()

    return <CursosView {...methods} />
}
