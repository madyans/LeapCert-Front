import sapoLivro from "../../../public/sapo flor.png";
import sapoQuiz from "../../../public/sapo.png";
import sapoCertificado from "../../../public/sapo1.png";

export const courses = [
    {
        id: 1,
        title: "Fundamentos de Programação",
        description: "Aprenda os conceitos básicos de programação com exemplos práticos",
        category: "programacao",
        level: "Iniciante",
        duration: "20 horas",
        image: sapoLivro,
        featured: true,
    },
    {
        id: 2,
        title: "Design de Interfaces",
        description: "Crie interfaces intuitivas e atraentes para aplicações web e mobile",
        category: "design",
        level: "Intermediário",
        duration: "15 horas",
        image: sapoQuiz,
        featured: false,
    },
    {
        id: 3,
        title: "Desenvolvimento Web Avançado",
        description: "Técnicas avançadas para desenvolvimento de aplicações web modernas",
        category: "programacao",
        level: "Avançado",
        duration: "30 horas",
        image: sapoCertificado,
        featured: true,
    },
    {
        id: 4,
        title: "Marketing Digital",
        description: "Estratégias eficazes para promover produtos e serviços online",
        category: "marketing",
        level: "Intermediário",
        duration: "12 horas",
        image: sapoLivro,
        featured: false,
    },
    {
        id: 5,
        title: "Gestão de Projetos",
        description: "Metodologias e ferramentas para gerenciar projetos com eficiência",
        category: "gestao",
        level: "Intermediário",
        duration: "25 horas",
        image: sapoQuiz,
        featured: true,
    },
    {
        id: 6,
        title: "Inteligência Artificial",
        description: "Introdução aos conceitos e aplicações de IA no mundo moderno",
        category: "tecnologia",
        level: "Avançado",
        duration: "35 horas",
        image: sapoCertificado,
        featured: false,
    },
]

export type CourseType = typeof courses[number];

export const categories = [
    { id: "all", name: "Todos" },
    { id: "programacao", name: "Programação" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "gestao", name: "Gestão" },
    { id: "tecnologia", name: "Tecnologia" },
]