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
                        Neste curso, vamos explorar a fundo os fundamentos da cozinha italiana através de seus molhos mais
                        clássicos e as técnicas que transformam ingredientes simples em pratos extraordinários. Cada aula
                        será acompanhada de vídeos de alta qualidade, com passo a passo detalhado para que você possa
                        acompanhar e praticar do conforto da sua casa.
                    </p>
                    <p>
                        Você vai aprender a preparar molhos como o sugo al pomodoro, pesto genovês, ragù alla bolognese,
                        bechamel, entre outros – todos com base nas receitas tradicionais italianas. Também vamos abordar
                        técnicas essenciais, como o ponto perfeito da massa, a importância do tempo de cozimento, e como
                        equilibrar sabores com o uso correto de ervas e finalização. Além dos molhos, o curso traz dicas
                        valiosas de apresentação e finalização dos pratos, para que sua comida encante tanto o paladar
                        quanto os olhos.
                    </p>
                    <p>
                        E por fim, como seu professor, quero dizer uma coisa: cozinhar é um ato de amor, de paciência e de
                        dedicação. Cada molho que você prepara conta uma história, carrega uma tradição. Não tenha medo de
                        errar, porque é cozinhando que a gente aprende — e é com paixão que a gente se destaca. Vamos juntos
                        transformar sua cozinha em uma verdadeira cantina italiana!
                    </p>
                    <p className="text-green-600 font-italic">Ci vediamo nella prima lezione! 👨‍🍳</p>
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