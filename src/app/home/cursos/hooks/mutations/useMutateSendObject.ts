import api from "@/src/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface iProps {
    object: File;
    path: string;
}

async function sendObject({ object, path }: iProps) {
    const formData = new FormData();
    formData.append("File", object);
    formData.append("Path", path);

    const response = await api.post("minio/sendObject", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    if (!response.data.flag) {
        toast.error("Erro ao enviar objeto", {
            description: response.data.message,
            duration: 5000,
            closeButton: true,
        });
        return false;
    }

    return response.data.data;
}

export default function useMutateSendObject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["sendObject"],
        mutationFn: (data: iProps) => sendObject(data),
        onSuccess: () => {
            toast.success("Arquivo enviado com sucesso", {
                description: "Seu arquivo foi armazenado com sucesso",
                duration: 5000,
                closeButton: true,
            });
            queryClient.invalidateQueries({ queryKey: ["allObjects"], exact: false })
        },
    });
}
