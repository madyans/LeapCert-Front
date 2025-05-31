import { Card, CardContent } from "@/src/components/ui/card";
import Image from "next/image";
import img1 from "../../../../public/sobrenos1.png";

export const Mission = () => {
    return (
        <>
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
        </>
    )
}