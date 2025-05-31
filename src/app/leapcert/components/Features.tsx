import { Card, CardContent } from "@/src/components/ui/card"

export const Features = () => {
    return (
        <>
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
        </>
    )
}