import api from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

async function getObject(objectName: string) {
    try {
        const response = await api.get("minio/objects/getObject", {
            params: {
                objectName,
            },
        });

        if (!response.data.flag) {
            toast.warning("Erro ao buscar objeto", {
                description: response.data.message,
                duration: 5000,
                closeButton: true,
            });
            return null;
        }

        return response.data.data as string;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Tente novamente mais tarde.";
        toast.error("Erro de conexão com o servidor", {
            description: message,
            duration: 5000,
            closeButton: true,
        });
        return null;
    }
}

export default function useQueryGetObject(objectName: string, enabled = true) {
    return useQuery({
        queryKey: ["getObject", objectName],
        queryFn: () => getObject(objectName),
        enabled: enabled && objectName.length > 0,
    });
}
