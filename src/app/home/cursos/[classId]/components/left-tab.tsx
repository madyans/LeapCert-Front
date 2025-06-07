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
                            Microsoft Certified: Azure Developer Associate, AWS Certified Developer – Associate
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="font-semibold text-green-600">Habilidades:</div>
                        <div className="text-xs text-zinc-600">
                            .NET 8, MinIO, Armazenamento em Nuvem, APIs REST, Docker, Entity Framework Core
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="font-semibold text-green-600">Experiência profissional:</div>
                        <div className="text-xs text-zinc-600">
                            Mais de 10 anos desenvolvendo soluções escaláveis com .NET, com foco em integrações com serviços em nuvem e armazenamento distribuído
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="font-semibold text-green-600">Cursos ministrados:</div>
                        <div className="text-xs text-zinc-600">
                            APIs REST com .NET, Armazenamento com MinIO e S3, Arquitetura de Microsserviços com .NET 8, Integração de Serviços em Nuvem
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}