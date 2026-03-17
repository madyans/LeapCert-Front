import { useQuery } from "@tanstack/react-query";
import IClass from "../interface/IClass";

async function getClasses() {
    // --- MOCK ---
    await new Promise((res) => setTimeout(res, 300)); // simula latência

    const mockCursos: IClass[] = [
        {
            codigo: 1,
            codigo_professor: 1,
            nome: "Desenvolvimento Web com React e Next.js",
            descricao: "Aprenda a construir aplicações web modernas, escaláveis e performáticas usando os frameworks mais populares do mercado.",
            avaliacao: "4.8",
            created_at: new Date().toISOString(),
            codigo_genero: 1,
            genero: "Desenvolvimento",
            path: "/curso-react"
        },
        {
            codigo: 2,
            codigo_professor: 2,
            nome: "Introdução ao Machine Learning com Python",
            descricao: "Um guia prático para começar na área de Inteligência Artificial e construir seus primeiros modelos preditivos.",
            avaliacao: "4.5",
            created_at: new Date().toISOString(),
            codigo_genero: 2,
            genero: "Inteligência Artificial",
            path: "/curso-ml"
        },
        {
            codigo: 3,
            codigo_professor: 3,
            nome: "Design de Interfaces (UI/UX) para Iniciantes",
            descricao: "Domine as melhores práticas de design centrado no usuário, prototipação e usabilidade aplicadas no Figma e em ferramentas modernas.",
            avaliacao: "4.9",
            created_at: new Date().toISOString(),
            codigo_genero: 3,
            genero: "Design",
            path: "/curso-ui-ux"
        },
        {
            codigo: 4,
            codigo_professor: 1,
            nome: "Segurança da Informação e Cyber Security",
            descricao: "Conceitos fundamentais de proteção de dados, redes e criptografia para manter sistemas corporativos e pessoais protegidos.",
            avaliacao: "4.2",
            created_at: new Date().toISOString(),
            codigo_genero: 4,
            genero: "Segurança",
            path: "/curso-seguranca"
        },
        {
            codigo: 5,
            codigo_professor: 2,
            nome: "Arquitetura de Software: Padrões e Práticas",
            descricao: "Aprenda a criar software escalável e de fácil manutenção utilizando Clean Architecture, SOLID e Design Patterns.",
            avaliacao: "5.0",
            created_at: new Date().toISOString(),
            codigo_genero: 5,
            genero: "Engenharia de Software",
            path: "/curso-arquitetura"
        },
        {
            codigo: 6,
            codigo_professor: 4,
            nome: "Gestão Ágil de Projetos com Scrum e Kanban",
            descricao: "Tudo o que você precisa saber para liderar e gerenciar equipes de tecnologia focadas em entregas contínuas e valor.",
            avaliacao: "4.7",
            created_at: new Date().toISOString(),
            codigo_genero: 6,
            genero: "Gestão",
            path: "/curso-agil"
        },
        {
            codigo: 7,
            codigo_professor: 3,
            nome: "Banco de Dados SQL e NoSQL do Zero ao Avançado",
            descricao: "Aprenda a modelar, estruturar e realizar consultas complexas em bancos relacionais (PostgreSQL) e não relacionais (MongoDB).",
            avaliacao: "4.6",
            created_at: new Date().toISOString(),
            codigo_genero: 7,
            genero: "Back-end",
            path: "/curso-bd"
        },
        {
            codigo: 8,
            codigo_professor: 1,
            nome: "Cloud Computing com AWS e Azure",
            descricao: "Entenda os serviços de computação em nuvem, desde armazenamento (S3, Blob) até serverless e instâncias virtuais (EC2, VM).",
            avaliacao: "4.3",
            created_at: new Date().toISOString(),
            codigo_genero: 8,
            genero: "Infraestrutura",
            path: "/curso-cloud"
        }
    ];

    return mockCursos;

    // --- REAL ---
    // const response = await api.get("class");
    // if (!response.data.flag) {
    //     toast.warning("Erro ao buscar cursos", {
    //         description: response.data.message,
    //         duration: 5000,
    //         closeButton: true,
    //     })
    //     return [];
    // }
    // const modules: IClass[] = response.data.data
    // return modules
}

export default function useQueryGetAllClasses() {
    return useQuery({
        queryKey: ["allClasses"],
        queryFn: getClasses
    })
}