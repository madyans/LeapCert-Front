'use client';

import { useState } from "react";
import { uri_proxy } from "../../../../constants/URL_PROXYIMAGE";
import useQueryGetAllObjects from "../hooks/useQueryGetAllObjects";
import useQueryGetClassById from "../hooks/useQueryGetClassById";
import useQueryGetObject from "../hooks/useQueryGetObject";

export default function CourseClientView({ classId }: { classId: number }) {
    const [selectedObject, setSelectedObject] = useState<string | null>(null);

    const { data: course, isLoading, isError } = useQueryGetClassById(classId);

    const { data: objects, isLoading: isLoadingObjects } = useQueryGetAllObjects(
        "leapcert",
        course?.path,
        !!course?.path
    );

    const { data: objectData } = useQueryGetObject(
        "leapcert",
        `${course?.path}${selectedObject ? `/${selectedObject}` : ''}`,
        !!selectedObject
    );

    const handleClick = (obj: string) => {
        setSelectedObject(obj);
    };

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

            <h3 className="mt-4 font-semibold">Arquivos:</h3>
            {isLoadingObjects ? (
                <p>Carregando arquivos...</p>
            ) : (
                <ul className="list-disc pl-5">
                    {objects?.map((obj: string, idx: number) => (
                        <li
                            key={idx}
                            onClick={() => handleClick(obj)}
                            className={`cursor-pointer hover:text-blue-600 ${selectedObject === obj ? "font-bold text-blue-700" : ""
                                }`}
                        >
                            {obj}
                        </li>
                    ))}
                </ul>
            )}

            {selectedObject && (
                <div className="mt-6 p-4 border rounded bg-gray-50">
                    <h4 className="font-semibold mb-2">
                        Conteúdo de: <span className="text-blue-700">{selectedObject}</span>
                    </h4>
                    {objectData &&
                        <img
                            src={uri_proxy + `${course?.path}${selectedObject}`}
                            alt="Imagem"
                        />}
                </div>
            )}
        </div>
    );
}
