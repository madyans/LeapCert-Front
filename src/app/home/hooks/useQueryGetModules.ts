import { useQuery } from "@tanstack/react-query";
import IModules from "../interface/IModules";

async function getModules() {
    // --- MOCK ---
    await new Promise((res) => setTimeout(res, 300));

    const mockModules: IModules[] = [
        {
            codigo: 1,
            icone: "LayoutDashboard",
            nome: "Dashboard",
            rota: "/home",
            hasChildren: false,
            childoff: null,
        },
        {
            codigo: 2,
            icone: "BookOpen",
            nome: "Catálogo de Cursos",
            rota: "/home/cursos",
            hasChildren: false,
            childoff: null,
        },
        {
            codigo: 3,
            icone: "User",
            nome: "Área do Aluno",
            rota: "/home/aluno",
            hasChildren: true,
            childoff: null,
        },
        {
            codigo: 4,
            icone: "GraduationCap",
            nome: "Meus Cursos",
            rota: "/home/aluno/cursos",
            hasChildren: false,
            childoff: 3, // Child of Área do Aluno
        },
        {
            codigo: 5,
            icone: "Settings",
            nome: "Configurações",
            rota: "/home/configuracao",
            hasChildren: false,
            childoff: null,
        }
    ];

    return mockModules;

    // --- REAL ---
    // const response = await api.get("module");
    // if (!response.data.flag) {
    //     toast.warning("Erro ao buscar módulos", {
    //         description: response.data.message,
    //         duration: 5000,
    //         closeButton: true,
    //     })
    //     return [];
    // }
    // const modules: IModules[] = response.data.data
    // return modules
}

export default function useQueryGetModules() {
    return useQuery({
        queryKey: ["allModules"],
        queryFn: getModules
    })
}