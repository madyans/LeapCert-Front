import Image, { StaticImageData } from "next/image"

interface iProps {
    image: StaticImageData
}

export const LeaftTab = ({ image }: iProps) => {
    return (
        <>
            <div className="col-span-1">
                <Image
                    src={image}
                    alt="Course Instructor"
                    className="w-full h-auto rounded-md mb-4"
                />
                <div className="text-sm text-black">
                    <div className="font-semibold">Nome: Eduardo Frois</div>
                    <div className="mt-2">
                        <div className="font-semibold text-green-600">Certificações:</div>
                        <div className="text-xs text-zinc-600">
                            Diploma em Gastronomia Toscana (Università dei Sapori), Certificação Slow Food
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="font-semibold text-green-600">Habilidades:</div>
                        <div className="text-xs text-zinc-600">
                            Massas artesanais, molhos tradicionais, culinária regional italiana
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="font-semibold text-green-600">Experiência profissional:</div>
                        <div className="text-xs text-zinc-600">
                            Chefe em uma villa na Toscana onde aprendeu a fazer massa com minha nonna
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="font-semibold text-green-600">Cursos ministrados:</div>
                        <div className="text-xs text-zinc-600">
                            Massas Frescas Italianas, Sabores da Sicília, Risotto Clássico, Molhos e Técnicas da Cozinha
                            Italiana
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}