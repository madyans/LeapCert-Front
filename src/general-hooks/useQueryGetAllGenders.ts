import api from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { IGender } from "../interface/general/type-gender";

async function getGenders() {
    const response = await api.get("general/getAllGenders");

    if (!response.data.flag) {
        toast.warning("Erro ao buscar gêneros", {
            description: response.data.message,
            duration: 5000,
            closeButton: true,
        })
        return [];
    }

    const genders: IGender[] = response.data.data;

    return genders;

}

export default function useQueryGetGenders() {
    return useQuery({
        queryKey: ["allGenders"],
        queryFn: getGenders
    })
}