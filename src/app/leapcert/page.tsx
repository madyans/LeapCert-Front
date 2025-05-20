'use client';

import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { ArrowLeft, ChevronDown, ExternalLink, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import caio from "../../../public/CaioBoudens.jpeg";
import fefo from "../../../public/Fefo.png";
import frois from "../../../public/Frois.jpeg";
import guto from "../../../public/Guto.jpeg";
import Fundo from "../../../public/leapcertbg.png";
import img1 from "../../../public/sobrenos1.png";
import img2 from "../../../public/sobrenos2.png";

export default function Page() {
    const router = useRouter();
    const [expandedMember, setExpandedMember] = useState<number | null>(null);

    const teamMembers = [
        {
            id: 1,
            name: "Caio Boudens",
            role: "Infra/DevOps",
            image: caio,
            bio: "Especialista em infraestrutura e DevOps com experiência em ambientes de nuvem e automação de processos. Responsável pela arquitetura e escalabilidade da plataforma LeapCert.",
            location: "São Paulo, Brasil",
            skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
            linkedin: "https://linkedin.com/in/caio-boudens",
            github: "https://github.com/caioboudens",
            email: "caio@leapcert.com"
        },
        {
            id: 2,
            name: "Eduardo Frois",
            role: "Dev. FullStack",
            image: frois,
            bio: "Desenvolvedor Full Stack com foco em tecnologias modernas e experiência em projetos de grande escala. Lidera o desenvolvimento das funcionalidades principais da plataforma.",
            location: "Rio de Janeiro, Brasil",
            skills: ["React", "Node.js", "TypeScript", "MongoDB", "GraphQL", "Postgress", ".NET"],
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
            location: "Belo Horizonte, Brasil",
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
            location: "Curitiba, Brasil",
            skills: ["Cybersecurity", "Penetration Testing", "Python", "Java", "OAuth"],
            linkedin: "https://linkedin.com/in/fernando-medeiros",
            github: "https://github.com/fernandomedeiros",
            email: "fernando@leapcert.com"
        }
    ];

    const toggleMember = (id: number) => {
        if (expandedMember === id) {
            setExpandedMember(null);
        } else {
            setExpandedMember(id);
        }
    };

    return (
        <div className="relative w-full min-h-screen bg-background">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={Fundo || "/placeholder.svg"}
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 to-green-800/70 backdrop-blur-sm"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 container mx-auto py-12 px-4 sm:px-6">
                {/* Header with navigation */}
                <header className="mb-12">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.back()}
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full h-10 w-10"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="sr-only">Voltar</span>
                        </Button>
                        <nav className="hidden md:flex space-x-4">
                            <Button asChild variant="ghost" className="text-white hover:text-green-200 hover:bg-white/10">
                                <Link href="/">Início</Link>
                            </Button>
                            <Button asChild variant="ghost" className="text-white hover:text-green-200 hover:bg-white/10">
                                <Link href="/cursos">Cursos</Link>
                            </Button>
                            <Button asChild variant="ghost" className="text-white hover:text-green-200 hover:bg-white/10">
                                <Link href="/login">Entrar</Link>
                            </Button>
                            <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
                                <Link href="/cadastro">Cadastre-se</Link>
                            </Button>
                        </nav>
                    </div>
                </header>

                {/* Hero section */}
                <section className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Sobre o <span className="text-green-300">LeapCert</span>
                    </h1>
                    <p className="text-xl text-green-50 max-w-3xl mx-auto">
                        Conectando pessoas através do conhecimento e transformando a maneira como aprendemos e ensinamos.
                    </p>
                </section>

                {/* Mission section */}
                <section className="grid md:grid-cols-2 gap-8 mb-16 items-center">
                    <div className="order-2 md:order-1">
                        <Card className="bg-white/95 backdrop-blur-md border-none shadow-xl overflow-hidden h-full">
                            <CardContent className="p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-green-800 mb-4">Nossa Missão</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Nosso projeto é uma plataforma online inovadora, criada para conectar pessoas que desejam compartilhar e expandir seus conhecimentos de forma colaborativa. Acreditamos que a troca de experiências e o aprendizado contínuo são fundamentais para o crescimento pessoal e profissional.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    A plataforma permite que os usuários ofereçam suas habilidades e expertises em diversas áreas, enquanto exploram novas competências, criando um ambiente dinâmico e acessível para todos.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center">
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-green-400 to-green-600 opacity-75 blur-lg"></div>
                            <Image
                                src={img1 || "/placeholder.svg"}
                                alt="Nossa Missão"
                                width={400}
                                height={400}
                                className="rounded-xl shadow-2xl relative z-10 border-4 border-white"
                            />
                        </div>
                    </div>
                </section>

                {/* Vision section */}
                <section className="grid md:grid-cols-2 gap-8 mb-16 items-center">
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-green-600 to-green-400 opacity-75 blur-lg"></div>
                            <Image
                                src={img2 || "/placeholder.svg"}
                                alt="Nossa Visão"
                                width={400}
                                height={400}
                                className="rounded-xl shadow-2xl relative z-10 border-4 border-white"
                            />
                        </div>
                    </div>
                    <div>
                        <Card className="bg-white/95 backdrop-blur-md border-none shadow-xl overflow-hidden h-full">
                            <CardContent className="p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-green-800 mb-4">Nossa Visão</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    A negociação de trocas de aprendizado em nossa plataforma é realizada de forma colaborativa, promovendo um ambiente de crescimento mútuo entre os usuários. Incentivamos a interação e o compartilhamento de conhecimentos, onde todos têm a oportunidade de aprender e ensinar.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Além disso, os usuários têm a liberdade de criar e seguir trilhas de estudos personalizadas, adaptadas aos seus interesses e objetivos individuais. Com recursos de avaliação e feedback, a plataforma oferece um caminho contínuo para o aprimoramento das habilidades de todos os participantes.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Features section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white text-center mb-10">O que oferecemos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Troque",
                                description: "Compartilhe seu conhecimento e experiência em diversas áreas, conectando-se com pessoas que buscam aprender e crescer.",
                                icon: (
                                    <svg className="h-12 w-12 text-green-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 1l4 4-4 4"></path>
                                        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                                        <path d="M7 23l-4-4 4-4"></path>
                                        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                                    </svg>
                                )
                            },
                            {
                                title: "Aprenda",
                                description: "Descubra novas habilidades e aprofunde seus conhecimentos com a orientação de especialistas e profissionais experientes.",
                                icon: (
                                    <svg className="h-12 w-12 text-green-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                    </svg>
                                )
                            },
                            {
                                title: "Agende",
                                description: "Organize e participe de sessões de aprendizado de forma simples, otimizando seu tempo e seu potencial de desenvolvimento na plataforma.",
                                icon: (
                                    <svg className="h-12 w-12 text-green-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                )
                            }
                        ].map((feature, index) => (
                            <Card key={index} className="bg-white/95 backdrop-blur-md border-none shadow-xl overflow-hidden h-full hover:transform hover:scale-105 transition-all duration-300">
                                <CardContent className="p-6 flex flex-col items-center text-center">
                                    {feature.icon}
                                    <h3 className="text-xl font-bold text-green-800 mb-3">{feature.title}</h3>
                                    <p className="text-gray-700">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Team section */}
                <section>
                    <h2 className="text-3xl font-bold text-white text-center mb-10">Nossa Equipe</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="relative">
                                <Card
                                    className={`bg-white/95 backdrop-blur-md border-none shadow-xl overflow-hidden transition-all duration-300 ${expandedMember === member.id ? 'scale-105 z-20' : 'hover:shadow-2xl hover:transform hover:scale-102'
                                        }`}
                                >
                                    <CardContent className="p-0">
                                        <div className="relative">
                                            <div className="h-48 bg-gradient-to-b from-green-400 to-green-600 relative">
                                                <Image
                                                    src={member.image || "/placeholder.svg"}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover object-center opacity-90 mix-blend-overlay"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                                                <h3 className="text-xl font-bold">{member.name}</h3>
                                                <p className="text-green-200">{member.role}</p>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <div className="flex items-center text-sm text-gray-600 mb-4">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                <span>{member.location}</span>
                                            </div>

                                            <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                                                {member.bio}
                                            </p>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full flex items-center justify-center gap-1 border-green-500 text-green-600 hover:bg-green-50"
                                                onClick={() => toggleMember(member.id)}
                                            >
                                                {expandedMember === member.id ? 'Ver menos' : 'Ver mais'}
                                                <ChevronDown className={`h-4 w-4 transition-transform ${expandedMember === member.id ? 'rotate-180' : ''}`} />
                                            </Button>

                                            {expandedMember === member.id && (
                                                <div className="mt-4 animate-fadeIn">
                                                    <h4 className="font-medium text-green-800 mb-2">Habilidades</h4>
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {member.skills.map((skill, index) => (
                                                            <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <h4 className="font-medium text-green-800 mb-2">Contato</h4>
                                                    <div className="flex space-x-3">
                                                        <a
                                                            href={member.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                                                            aria-label={`LinkedIn de ${member.name}`}
                                                        >
                                                            <Linkedin className="h-4 w-4" />
                                                        </a>
                                                        <a
                                                            href={member.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                                                            aria-label={`GitHub de ${member.name}`}
                                                        >
                                                            <Github className="h-4 w-4" />
                                                        </a>
                                                        <a
                                                            href={`mailto:${member.email}`}
                                                            className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                                                            aria-label={`Email de ${member.name}`}
                                                        >
                                                            <Mail className="h-4 w-4" />
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA section */}
                <section className="mt-16 text-center">
                    <Card className="bg-gradient-to-r from-green-600 to-green-800 border-none shadow-xl overflow-hidden">
                        <CardContent className="p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-white mb-4">Pronto para começar sua jornada?</h2>
                            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                                Junte-se a milhares de pessoas que já estão transformando suas vidas através do compartilhamento de conhecimento na plataforma LeapCert.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50">
                                    <Link href="/cadastro">
                                        Criar uma conta gratuita
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                                    <Link href="/cursos">
                                        Explorar cursos
                                        <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Footer */}
                <footer className="mt-16 text-center text-green-100 text-sm">
                    <p>© {new Date().getFullYear()} LeapCert. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
}
