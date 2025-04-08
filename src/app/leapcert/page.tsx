'use client';

import { MoveLeft } from 'lucide-react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import caio from "../../../public/CaioBoudens.jpeg";
import fefo from "../../../public/Fefo.png";
import frois from "../../../public/Frois.jpeg";
import guto from "../../../public/Guto.jpeg";
import Fundo from "../../../public/leapcertbg.png";
import img1 from "../../../public/sobrenos1.png";
import img2 from "../../../public/sobrenos2.png";

export default function Page() {
    const router = useRouter();

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center bg-background">
            <Image
                src={Fundo}
                alt="Background"
                fill
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                priority
            />

            <main className="relative z-10 w-[95%] max-w-5xl h-full bg-white/80 flex flex-col items-center justify-center p-8 rounded-lg shadow-lg mt-8 mb-8">
                <div className="flex flex-row items-center justify-center w-full">
                    <div className="mr-auto hover:cursor-pointer">
                        <MoveLeft onClick={() => router.back()} />
                    </div>
                    <h1 className="text-6xl font-bold text-gray-800 mb-6 text-center flex-1">Sobre nós</h1>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 mb-8">
                    <div className="bg-orange-200 p-6 rounded-lg shadow-md w-[80%] text-gray-900">
                        <p className="text-lg leading-relaxed">
                            Nosso projeto é uma plataforma online inovadora, criada para conectar pessoas que desejam compartilhar e expandir seus conhecimentos de forma colaborativa. Acreditamos que a troca de experiências e o aprendizado contínuo são fundamentais para o crescimento pessoal e profissional. A plataforma permite que os usuários ofereçam suas habilidades e expertises em diversas áreas, enquanto exploram novas competências, criando um ambiente dinâmico e acessível para todos.

                            Com ferramentas que facilitam a interação entre usuários, oferecemos um espaço para ensino, aprendizado e troca de ideias. Por meio de um sistema intuitivo de agendamento de sessões, mentorias e aulas, buscamos otimizar o tempo e maximizar o potencial de aprendizado dos participantes. Junte-se a nós e descubra como o conhecimento compartilhado pode transformar sua vida e carreira!
                        </p>
                    </div>

                    <div className="flex-shrink-0">
                        <Image
                            src={img1}
                            alt="Sobre nós"
                            width={250}
                            height={250}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full items-center gap-6">
                    <div className="flex-shrink-0">
                        <Image
                            src={img2}
                            alt="Sobre nós"
                            width={250}
                            height={250}
                            className="rounded-lg shadow-md"
                        />
                    </div>

                    <div className="bg-orange-200 p-6 rounded-lg shadow-md w-full text-gray-900 w-auto">
                        <p className="text-lg leading-relaxed">
                            A negociação de trocas de aprendizado em nossa plataforma é realizada de forma colaborativa, promovendo um ambiente de crescimento mútuo entre os usuários. Incentivamos a interação e o compartilhamento de conhecimentos, onde todos têm a oportunidade de aprender e ensinar, criando uma rede de aprendizado dinâmica e enriquecedora. A plataforma foi projetada para facilitar essa troca de experiências de maneira fluida e acessível.

                            Além disso, os usuários têm a liberdade de criar e seguir trilhas de estudos personalizadas, adaptadas aos seus interesses e objetivos individuais. Com recursos de avaliação e feedback, a plataforma oferece um caminho contínuo para o aprimoramento das habilidades de todos os participantes, garantindo que o aprendizado seja constantemente refinado e a experiência de ensino seja cada vez mais eficaz.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 mt-8">
                    <div className="w-64 bg-orange-200 text-white p-6 rounded-lg shadow-md text-center">
                        <h2 className="text-xl font-semibold text-black mb-3">Troque</h2>
                        <p className="text-gray-900">
                            Compartilhe seu conhecimento e experiência em diversas áreas, conectando-se com pessoas que buscam aprender e crescer.
                        </p>
                    </div>

                    <div className="w-64 bg-orange-200 text-white p-6 rounded-lg shadow-md text-center">
                        <h2 className="text-xl font-semibold text-black mb-3">Aprenda</h2>
                        <p className="text-gray-900">
                            Descubra novas habilidades e aprofunde seus conhecimentos com a orientação de especialistas e profissionais experientes.
                        </p>
                    </div>

                    <div className="w-64 bg-orange-200 text-white p-6 rounded-lg shadow-md text-center">
                        <h2 className="text-xl font-semibold text-black mb-3">Agende</h2>
                        <p className="text-gray-900">
                            Organize e participe de sessões de aprendizado de forma simples, otimizando seu tempo e seu potencial de desenvolvimento na plataforma.
                        </p>
                    </div>
                </div>

                <h2 className="text-6xl font-bold text-gray-800 mb-2 mt-8">Nossa equipe</h2>
                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 mt-4">

                    <div className="w-64 bg-orange-200 text-white p-6 rounded-xl shadow-lg text-center flex flex-col items-center gap-4">
                        <Image
                            src={caio}
                            alt="Sobre nós"
                            width={200}
                            height={200}
                            className="rounded-xl shadow-md border-4 border-white"
                        />
                        <div>
                            <p className="text-lg text-black font-semibold">Caio Boudens</p>
                            <p className="text-sm text-black">Infra/DevOps</p>
                        </div>
                    </div>
                    <div className="w-64 bg-orange-200 text-white p-6 rounded-xl shadow-lg text-center flex flex-col items-center gap-4">
                        <Image
                            src={frois}
                            alt="Sobre nós"
                            width={200}
                            height={200}
                            className="rounded-xl shadow-md border-4 border-white"
                        />
                        <div>
                            <p className="text-lg text-black font-semibold">Eduardo Frois</p>
                            <p className="text-sm text-black">Dev. FullStack</p>
                        </div>
                    </div>
                    <div className="w-64 bg-orange-200 text-white p-6 rounded-xl shadow-lg text-center flex flex-col items-center gap-4">
                        <Image
                            src={guto}
                            alt="Sobre nós"
                            width={200}
                            height={200}
                            className="rounded-xl shadow-md border-4 border-white"
                        />
                        <div>
                            <p className="text-lg text-black font-semibold">Matheus Augusto</p>
                            <p className="text-sm text-black">Gestão/Design</p>
                        </div>
                    </div>
                    <div className="w-64 bg-orange-200 text-white p-6 rounded-xl shadow-lg text-center flex flex-col items-center gap-4">
                        <Image
                            src={fefo}
                            alt="Sobre nós"
                            width={200}
                            height={200}
                            className="rounded-xl shadow-md border-4 border-white"
                        />
                        <div>
                            <p className="text-lg text-black font-semibold">Fernando Medeiros</p>
                            <p className="text-sm text-black">Dev/Segurança</p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
