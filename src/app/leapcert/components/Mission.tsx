import { Card, CardContent } from "@/src/components/ui/card";
import Image from "next/image";
import img1 from "../../../../public/sobrenos1.png";

export const Mission = () => {
    return (
        <section className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div className="order-2 md:order-1">
                <Card className="bg-white/95 backdrop-blur-md border border-emerald-100/80 shadow-xl rounded-3xl overflow-hidden h-full">
                    <CardContent className="p-6 md:p-8 space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">
                            Nossa missão
                        </h2>
                        <p className="text-sm md:text-base text-zinc-700 leading-relaxed">
                            Nosso projeto é uma plataforma online inovadora, criada para conectar pessoas que desejam
                            compartilhar e expandir seus conhecimentos de forma colaborativa. Acreditamos que a troca
                            de experiências e o aprendizado contínuo são fundamentais para o crescimento pessoal e
                            profissional.
                        </p>
                        <p className="text-sm md:text-base text-zinc-700 leading-relaxed">
                            A plataforma permite que os usuários ofereçam suas habilidades e expertises em diversas
                            áreas, enquanto exploram novas competências, criando um ambiente dinâmico e acessível para
                            todos.
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
                <div className="relative max-w-xs sm:max-w-sm md:max-w-md">
                    <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-80 blur-2xl" />
                    <Image
                        src={img1 || "/placeholder.svg"}
                        alt="Nossa missão"
                        width={420}
                        height={420}
                        className="relative z-10 rounded-[28px] shadow-2xl border-4 border-white/80 object-cover"
                    />
                </div>
            </div>
        </section>
    )
}