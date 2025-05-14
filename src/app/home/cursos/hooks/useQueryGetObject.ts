import api from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

async function getObject(bucketName: string, objectName: string) {
    try {
        const response = await api.get("minio/objects/getObject", {
            params: {
                bucketId: bucketName,
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

        return response.data.data;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Tente novamente mais tarde.";
        toast.error("Erro de conexão com o servidor", {
            description: message,
            duration: 5000,
            closeButton: true,
        });
        return [];
    }
}

export default function useQueryGetObject(bucketName: string, objectName: string, enabled = true) {
    return useQuery({
        queryKey: ["getObject", bucketName, objectName],
        queryFn: () => getObject(bucketName, objectName),
        enabled,
    });
}
