import { Progress } from "@/src/components/ui/progress"

interface iProps {
    calculateProgress: () => number
}

export const CenterTab = ({ calculateProgress }: iProps) => {
    return (
        <>
            <div className="col-span-3 bg-white rounded-md p-6 border h-full">
                <div className="prose max-w-none text-black">
                    <p>
                        Neste curso, vamos explorar a fundo os fundamentos do <strong>MinIO</strong> e como integrá-lo de forma eficiente em aplicações modernas desenvolvidas com <strong>.NET 8</strong>. Cada aula será acompanhada de vídeos de alta qualidade, com passo a passo detalhado para que você possa acompanhar e praticar do conforto da sua casa.
                    </p>
                    <p>
                        Você vai aprender a configurar o MinIO localmente e na nuvem, realizar operações com buckets e objetos, aplicar políticas de acesso, versionamento, segurança com credenciais, e integração completa com APIs desenvolvidas em .NET 8. Também vamos abordar conceitos essenciais como boas práticas de upload/download de arquivos, uso de streams, e como lidar com arquivos grandes em aplicações web e backend.
                    </p>
                    <p>
                        E por fim, como seu instrutor, quero dizer uma coisa: programar é um ato de construção, de curiosidade e de evolução contínua. Cada endpoint que você cria, cada arquivo que armazena, conta uma história de aprendizado. Não tenha medo de errar — é codando que a gente aprende, e é com dedicação que a gente se destaca. Vamos juntos transformar seu conhecimento em uma ferramenta poderosa para o futuro!
                    </p>
                    <p className="text-green-600 font-italic">Nos vemos na primeira aula! 💻🚀</p>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-100">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Seu progresso no curso</h3>
                        <span className="text-sm text-green-700">{calculateProgress()}% concluído</span>
                    </div>
                    <Progress value={calculateProgress()} className="h-2" />
                </div>
            </div>
        </>
    )
}