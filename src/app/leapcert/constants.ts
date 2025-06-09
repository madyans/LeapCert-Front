import caio from "../../../public/CaioBoudens.jpeg";
import fefo from "../../../public/Fefo.png";
import frois from "../../../public/Frois.jpeg";
import guto from "../../../public/Guto.jpeg";

export const teamMembers = [
    {
        id: 1,
        name: "Caio Boudens",
        role: "Infra/DevOps",
        image: caio,
        bio: "Especialista em infraestrutura e DevOps com experiência em ambientes de nuvem e automação de processos. Responsável pela arquitetura e escalabilidade da plataforma LeapCert.",
        location: "Brasília, Brasil",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux", "Redes"],
        linkedin: "https://www.linkedin.com/in/caioboudens",
        github: "https://github.com/Boudens",
        email: "caioboudens00@gmail.com"
    },
    {
        id: 2,
        name: "Eduardo Frois",
        role: "Dev. FullStack",
        image: frois,
        bio: "Desenvolvedor Full Stack com foco em tecnologias modernas e experiência em projetos de grande escala. Lidera o desenvolvimento das funcionalidades principais da plataforma.",
        location: "Brasília, Brasil",
        skills: ["React", "Node.js", "TypeScript", "SQL", "EntityFramework", "Postgress", ".NET", "Docker", "CI/CD", "Object Storage"],
        linkedin: "https://linkedin.com/in/efroisdrumond",
        github: "https://github.com/FroisPeek",
        email: "efroisdrumond@gmail.com.br"
    },
    {
        id: 3,
        name: "Matheus Augusto",
        role: "Gestão/Design",
        image: guto,
        bio: "Designer de produto e gerente de projetos com experiência em UX/UI e metodologias ágeis. Responsável pela experiência do usuário e gestão do desenvolvimento da plataforma.",
        location: "Brasília, Brasil",
        skills: ["UI/UX", "Figma", "Product Management", "Scrum", "Design Thinking"],
        linkedin: "https://linkedin.com/in/matheus-augusto",
        github: "https://github.com/matheusaugusto",
        email: "matheus@leapcert.com"
    },
    {
        id: 4,
        name: "Fernando Medeiros",
        role: "Dev/Segurança",
        image: fefo,
        bio: "Especialista em segurança da informação e desenvolvimento seguro. Responsável pela implementação de protocolos de segurança e proteção de dados na plataforma.",
        location: "Brasília, Brasil",
        skills: ["Cybersecurity", "Penetration Testing", "Python", "Java", "OAuth"],
        linkedin: "https://linkedin.com/in/fernando-medeiros",
        github: "https://github.com/fernandomedeiros",
        email: "fernando@leapcert.com"
    }
] as const;