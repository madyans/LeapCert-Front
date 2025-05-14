import api from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import IClass from "../interface/IClass";

async function getById(id: number): Promise<IClass | null> {
    const response = await api.get(`class/${id}`);

    if (!response.data.flag) {
        toast.warning("Erro ao buscar cursos", {
            description: response.data.message,
            duration: 5000,
            closeButton: true,
        })
        return null;
    }

    const modules: IClass = response.data.data
    return modules
}

export default function useQueryGetClassById(id: number) {
    return useQuery({
        queryKey: ["allClasses"],
        queryFn: () => getById(id)
    })
}