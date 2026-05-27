import api from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";
import type { IStudentCourses } from "../interface/IClass";

async function getStudentCourses(): Promise<IStudentCourses> {
    const response = await api.get("class/student/courses");

    if (!response.data.flag) {
        return {
            cursos_criados: [],
            cursos_conectados: [],
            cursos_em_andamento: [],
        };
    }

    return response.data.data as IStudentCourses;
}

export default function useQueryGetStudentCourses() {
    return useQuery({
        queryKey: ["studentCourses"],
        queryFn: getStudentCourses,
    });
}
