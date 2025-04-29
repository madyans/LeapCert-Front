import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { dsp } from "@/src/constants/DEFAULT_STYLE_PAGE";
import cursos from "@/src/constants/MOCA_CURSOS";
import Image from "next/image";
import imgTeste from "../../../../public/sapoHi.png";

export default function Page() {
    return (
        <div className={`${dsp} flex flex-wrap gap-6 justify-center pb-8`}>
            {cursos.map((curso, idx) => (
                <Card
                    key={idx}
                    className="w-64 h-80 bg-secondary border border-primary/20 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-primary hover:text-primary-foreground cursor-pointer overflow-hidden"
                >
                    <Image
                        src={imgTeste}
                        alt="Fundo massa"
                        width={256}
                        height={112}
                        className="w-full h-36 object-cover rounded-t-2xl"
                    />
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold truncate">{curso.nome}</CardTitle>
                        <CardDescription className="text-sm italic">{curso.genero}</CardDescription>
                    </CardHeader>

                    <CardContent className="text-sm">
                        <p className="line-clamp-2">{curso.descricao}</p>
                        <p className="mt-4 text-xs text-muted-foreground">Criado em: {curso.data_criacao}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
