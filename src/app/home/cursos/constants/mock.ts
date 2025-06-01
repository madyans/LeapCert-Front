export const learningPathData = [
    { id: 1, title: "Introdução ao MinIO e ao Armazenamento de Objetos", completed: true, type: "video" },
    { id: 2, title: "Conceitos de Buckets, Objetos e Políticas no MinIO", completed: true, type: "reading" },
    { id: 3, title: "Configurando o MinIO Localmente com Docker", completed: false, type: "video" },
    { id: 4, title: "Consumindo a API S3 do MinIO usando .NET", completed: false, type: "video" },
    { id: 5, title: "Quiz: Fundamentos de MinIO com .NET", completed: false, type: "quiz" },
    { id: 6, title: "Upload de Arquivos com `MinioClient` no .NET", completed: false, type: "video" },
    { id: 7, title: "Download, Listagem e Exclusão de Arquivos", completed: false, type: "video" },
    { id: 8, title: "Atividade Prática: Criando um Serviço de Upload em ASP.NET Core", completed: false, type: "activity" },
    { id: 9, title: "Avaliação Final: Integração Completa com Interface Front-End", completed: false, type: "exam" },
]

export const forumDiscussions = [
    {
        id: 1,
        author: "Carlos Mendes",
        title: "Erro ao conectar no MinIO via .NET",
        date: "Ontem",
        replies: 4,
        excerpt: "Estou recebendo uma exceção de conexão ao tentar usar o MinioClient no meu projeto ASP.NET Core...",
    },
    {
        id: 2,
        author: "Fernanda Lima",
        title: "Como configurar buckets com políticas específicas?",
        date: "3 dias atrás",
        replies: 6,
        excerpt: "Quero criar um bucket com política de leitura pública, alguém sabe qual o melhor jeito de configurar isso via código?",
    },
    {
        id: 3,
        author: "Rafael Oliveira",
        title: "Upload de arquivos grandes com MinIO e .NET",
        date: "1 semana atrás",
        replies: 3,
        excerpt: "Alguém já implementou upload de arquivos grandes? Quais estratégias usar para evitar timeouts e garantir integridade?",
    },
]
export const assessmentsData = [
    {
        id: 1,
        title: "Quiz: Fundamentos do MinIO e Armazenamento de Objetos",
        type: "quiz",
        questions: 10,
        duration: "15 minutos",
        deadline: "Sem prazo",
        completed: true,
        score: "9/10",
    },
    {
        id: 2,
        title: "Atividade Prática: Configuração do Servidor MinIO",
        type: "activity",
        deadline: "15/06/2025",
        completed: false,
    },
    {
        id: 3,
        title: "Quiz: Uso do SDK MinIO com .NET",
        type: "quiz",
        questions: 15,
        duration: "20 minutos",
        deadline: "Sem prazo",
        completed: false,
    },
    {
        id: 4,
        title: "Avaliação Final do Curso: Projeto Integrado MinIO + .NET",
        type: "exam",
        questions: 30,
        duration: "45 minutos",
        deadline: "30/06/2025",
        completed: false,
    },
]

export const notesData = [
    {
        id: 1,
        title: "Configuração básica do MinIO",
        content: "Lembre-se de configurar as variáveis de ambiente MINIO_ACCESS_KEY e MINIO_SECRET_KEY antes de iniciar o servidor.",
        date: "10/05/2025",
    },
    {
        id: 2,
        title: "Uso do SDK MinIO com .NET",
        content: "Para autenticar, crie uma instância do cliente MinIO usando as credenciais e o endpoint corretos.",
        date: "12/05/2025",
    },
]

export const certificatesData = [
    {
        id: 1,
        title: "Certificado de Participação",
        description: "Certifica a participação no curso de MinIO com .NET",
        status: "Disponível após conclusão do curso",
        progress: 35,
        available: false,
    },
    {
        id: 2,
        title: "Certificado de Excelência",
        description: "Certifica a conclusão com nota superior a 85% em todas as avaliações do curso de MinIO com .NET",
        status: "Disponível após conclusão com excelência",
        progress: 20,
        available: false,
    },
]
