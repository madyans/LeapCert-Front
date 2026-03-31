import api from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ObjectType } from "../interface/ObjectType";

async function getObjects(prefix?: string | null) {
    try {
        const normalized = prefix?.trim();
        const response = await api.get("minio/objects/getAllObjects", {
            params: {
                prefix: normalized && normalized.length > 0 ? (normalized.endsWith("/") ? normalized : `${normalized}/`) : undefined,
                recursive: true,
                versions: false,
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

        const data: ObjectType[] = response.data.data
        return data;
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

export default function useQueryGetAllObjects(prefix?: string | null, enabled = true) {
    return useQuery({
        queryKey: ["allObjects", prefix],
        queryFn: () => getObjects(prefix),
        enabled: enabled && !!prefix?.trim(),
    });
}

