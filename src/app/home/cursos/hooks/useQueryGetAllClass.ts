import api from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import IClass from "../interface/IClass";

async function getClasses() {
    const response = await api.get("class");

    if (!response.data.flag) {
        toast.warning("Erro ao buscar cursos", {
            description: response.data.message,
            duration: 5000,
            closeButton: true,
        })
        return [];
    }

    const modules: IClass[] = response.data.data
    return modules
}

export default function useQueryGetAllClasses() {
    return useQuery({
        queryKey: ["allClasses"],
        queryFn: getClasses
    })
}