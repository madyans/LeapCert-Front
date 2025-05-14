import api from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

async function getObjects(bucketName: string, prefix?: string) {
    try {
        const response = await api.get("minio/objects/getAllObjects", {
            params: {
                bucketName,
                prefix,
            },
        });

        if (!response.data.flag) {
            toast.warning("Erro ao buscar objetos", {
                description: response.data.message,
                duration: 5000,
                closeButton: true,
            });
            return [];
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

export default function useQueryGetAllObjects(bucketName: string, prefix?: string, enabled = true) {
    return useQuery({
        queryKey: ["allObjects", bucketName, prefix],
        queryFn: () => getObjects(bucketName, prefix),
        enabled,
    });
}

