import api from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

async function getModules() {
    const response = await api.get("module");

    if (!response.data.flag) {
        toast.warning("Erro ao buscar módulos", {
            description: response.data.message,
            duration: 5000,
            closeButton: true,
        })
        return [];
    }

    return response.data.data
}

export default function useQueryGetModules() {
    return useQuery({
        queryKey: ["allModules"],
        queryFn: getModules
    })
}