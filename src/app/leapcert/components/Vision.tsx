import { Card, CardContent } from "@/src/components/ui/card";
import Image from "next/image";
import img2 from "../../../../public/sobrenos2.png";

export const Vision = () => {
    return (
        <>
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
        </>
    )
}