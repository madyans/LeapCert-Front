import useQueryGetAllClasses from "./hooks/useQueryGetAllClass";

export const useCursoModel = () => {
    const { data: cursos, isLoading } = useQueryGetAllClasses();
    const cursosArray = Array.isArray(cursos) ? cursos : [];

    return { cursos, isLoading, cursosArray }
}   