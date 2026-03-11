import { Card, CardContent } from "@/src/components/ui/card";
import Image from "next/image";
import img2 from "../../../../public/sobrenos2.png";

export const Vision = () => {
    return (
        <section className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div className="flex justify-center">
                <div className="relative max-w-xs sm:max-w-sm md:max-w-md">
                    <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-emerald-600 to-emerald-400 opacity-80 blur-2xl" />
                    <Image
                        src={img2 || "/placeholder.svg"}
                        alt="Nossa visão"
                        width={420}
                        height={420}
                        className="relative z-10 rounded-[28px] shadow-2xl border-4 border-white/80 object-cover"
                    />
                </div>
            </div>
            <div>
                <Card className="bg-white/95 backdrop-blur-md border border-emerald-100/80 shadow-xl rounded-3xl overflow-hidden h-full">
                    <CardContent className="p-6 md:p-8 space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">
                            Nossa visão
                        </h2>
                        <p className="text-sm md:text-base text-zinc-700 leading-relaxed">
                            A negociação de trocas de aprendizado em nossa plataforma é realizada de forma colaborativa,
                            promovendo um ambiente de crescimento mútuo entre os usuários. Incentivamos a interação e o
                            compartilhamento de conhecimentos, onde todos têm a oportunidade de aprender e ensinar.
                        </p>
                        <p className="text-sm md:text-base text-zinc-700 leading-relaxed">
                            Além disso, os usuários têm a liberdade de criar e seguir trilhas de estudos personalizadas,
                            adaptadas aos seus interesses e objetivos individuais. Com recursos de avaliação e feedback,
                            a plataforma oferece um caminho contínuo para o aprimoramento das habilidades de todos os
                            participantes.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}