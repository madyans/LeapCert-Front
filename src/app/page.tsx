"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { useRouter } from "next/navigation"
import sapoLivro from "../../public/sapo flor.png"
import sapoQuiz from "../../public/sapo.png"
import sapoCertificado from "../../public/sapo1.png"
import { Button } from "../components/ui/button"

export default function CoursesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const router = useRouter()

    const courses = [
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

    const filteredCourses = courses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const categories = [
        { id: "all", name: "Todos" },
        { id: "programacao", name: "Programação" },
        { id: "design", name: "Design" },
        { id: "marketing", name: "Marketing" },
        { id: "gestao", name: "Gestão" },
        { id: "tecnologia", name: "Tecnologia" },
    ]

    return (
        <div className="w-full min-h-screen flex flex-col bg-green-50">
            <header className="bg-emerald-900 text-white w-full py-6 px-4 flex flex-col items-center shadow-md gap-1">
                <Link href="/" className="text-5xl font-extrabold tracking-wide drop-shadow-xl">
                    Leap<span className="text-green-300">Cert</span>
                </Link>
                <h3 className="text-lg font-medium opacity-90 italic tracking-wide">
                    Um <span className="text-green-300">salto</span> para o próximo nível do seu aprendizado
                </h3>
            </header>

            <div className="bg-emerald-800 text-white py-4 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-2xl font-bold">Nossos Cursos</h2>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar cursos..."
                                className="py-2 px-4 pr-10 rounded-full bg-emerald-700 text-white placeholder-emerald-200 border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-300 w-full md:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <SearchIcon className="h-5 w-5 text-emerald-300" />
                            </div>
                        </div>
                        <Link
                            href="/login"
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition-colors duration-200 flex items-center gap-1"
                        >
                            <UserIcon className="h-4 w-4" />
                            <span>Entrar</span>
                        </Link>
                    </div>
                </div>
            </div>

            <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-7xl mx-auto w-full">
                {/* Featured Courses */}
                <section className="w-full mb-12">
                    <h2 className="text-3xl text-zinc-700 font-bold mb-6 tracking-wide text-center">
                        Cursos <span className="text-emerald-600">em Destaque</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {courses
                            .filter((course) => course.featured)
                            .map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl border border-emerald-100"
                                >
                                    <div className="relative h-48 bg-emerald-100">
                                        <Image
                                            src={course.image || "/placeholder.svg"}
                                            alt={course.title}
                                            fill
                                            className="object-contain p-2"
                                        />
                                        <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {course.level}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-emerald-800 mb-2">{course.title}</h3>
                                        <p className="text-zinc-600 mb-4">{course.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-zinc-500 flex items-center">
                                                <ClockIcon className="h-4 w-4 mr-1" />
                                                {course.duration}
                                            </span>
                                            <Button
                                                onClick={() => router.push("/login")}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                                            >
                                                Ver curso
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>

                {/* Category Filter */}
                <section className="w-full mb-8">
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full transition-colors duration-200 ${selectedCategory === category.id
                                    ? "bg-emerald-600 text-white"
                                    : "bg-white text-emerald-700 hover:bg-emerald-100"
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </section>

                {/* All Courses */}
                <section className="w-full">
                    <h2 className="text-3xl text-zinc-700 font-bold mb-6 tracking-wide text-center">
                        Todos os <span className="text-emerald-600">Cursos</span>
                    </h2>

                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden border border-emerald-100 flex flex-col"
                                >
                                    <div className="relative h-40 bg-emerald-50">
                                        <Image
                                            src={course.image || "/placeholder.svg"}
                                            alt={course.title}
                                            fill
                                            className="object-contain p-2"
                                        />
                                        <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {course.level}
                                        </div>
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="text-lg font-bold text-emerald-800 mb-2">{course.title}</h3>
                                        <p className="text-zinc-600 mb-4 text-sm flex-1">{course.description}</p>
                                        <div className="flex justify-between items-center mt-auto">
                                            <span className="text-xs text-zinc-500 flex items-center">
                                                <ClockIcon className="h-3 w-3 mr-1" />
                                                {course.duration}
                                            </span>
                                            <Link
                                                href={`/cursos/${course.id}`}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-3 rounded text-sm transition-colors duration-200"
                                            >
                                                Ver curso
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="inline-flex justify-center items-center p-4 bg-emerald-100 rounded-full mb-4">
                                <SearchIcon className="h-8 w-8 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-700 mb-2">Nenhum curso encontrado</h3>
                            <p className="text-zinc-600">Tente ajustar seus filtros ou termos de busca</p>
                        </div>
                    )}
                </section>

                {/* Call to Action */}
                <section className="w-full mt-16 bg-emerald-800 rounded-xl p-8 text-white text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">
                            Pronto para dar o próximo <span className="text-green-300">salto</span>?
                        </h2>
                        <p className="text-emerald-100 mb-6">
                            Cadastre-se hoje e tenha acesso a todos os nossos cursos e recursos exclusivos.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/cadastro"
                                className="bg-white text-emerald-800 hover:bg-green-100 py-3 px-6 rounded-full font-bold transition-colors duration-200"
                            >
                                Cadastre-se Gratuitamente
                            </Link>
                            <Link
                                href="/leapcert"
                                className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-3 px-6 rounded-full font-bold transition-colors duration-200"
                            >
                                Saiba Mais
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-emerald-900 text-white w-full py-6 px-4 mt-auto">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-6">
                    <div>
                        <h3 className="text-lg font-bold mb-2">Contato e Suporte</h3>
                        <p>
                            Email:{" "}
                            <a href="mailto:suporte@leapcert.com" className="underline">
                                suporte@leapcert.com
                            </a>
                        </p>
                        <p>Tel: (11) 1234-5678</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-2">Links Úteis</h3>
                        <ul className="space-y-1">
                            <li>
                                <a href="#" className="hover:underline">
                                    Política de Privacidade
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Termos de Uso
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Acessibilidade
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-2">Redes Sociais</h3>
                        <div className="flex flex-col space-y-2">
                            <a href="#" className="hover:underline">
                                Instagram
                            </a>
                            <a href="#" className="hover:underline">
                                Twitter
                            </a>
                            <a href="#" className="hover:underline">
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm opacity-75">
                    <p>{`© 2025 LeapCert. Todos os direitos reservados.`}</p>
                </div>
            </footer>
        </div>
    )
}

// Icons
function SearchIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}

function UserIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}

function ClockIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
