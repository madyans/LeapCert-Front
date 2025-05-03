'use client';

import useQueryGetClassById from "../hooks/useQueryGetClassById";

export default function CourseClientView({ classId }: { classId: number }) {
    const { data: course, isLoading, isError } = useQueryGetClassById(classId);

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    if (isError || !course) {
        return <p className="text-red-500">Erro ao carregar o curso.</p>;
    }

    return (
        <div className="text-black p-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold">{course.nome}</h2>
            <p className="text-sm italic text-muted-foreground">{course.genero}</p>
            <p className="text-base">{course.descricao}</p>
        </div>
    );
}
