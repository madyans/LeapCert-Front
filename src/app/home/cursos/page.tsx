'use client';

import CardLoadingClass from "@/src/components/createdComponents/card-loading-class";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { CLASS_GENDER } from "@/src/constants/CLASS_GENDER";
import { dsp } from "@/src/constants/DEFAULT_STYLE_PAGE";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useQueryGetAllClasses from "./hooks/useQueryGetAllClass";

export default function Page() {
    const router = useRouter()
    const { data: cursos, isLoading } = useQueryGetAllClasses();

    const renderSkeletons = () => {
        return Array.from({ length: 6 }).map((_, idx) => (
            <CardLoadingClass key={idx} idx={idx} />
        ));
    };

    return (
        <div key={Math.random()} className={`${dsp} flex flex-wrap gap-6 justify-center pb-8`}>
            {isLoading
                ? renderSkeletons()
                : cursos != undefined && cursos.map((curso, idx) => (
                    <>
                        <TooltipProvider>
                            <Tooltip key={curso.codigo}>
                                <TooltipTrigger asChild>
                                    <Card
                                        onClick={() => router.push("/")}
                                        key={idx}
                                        className="w-64 h-80 bg-secondary border border-primary/20 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-primary hover:text-primary-foreground cursor-pointer overflow-hidden"
                                    >
                                        <Image
                                            src={`/${CLASS_GENDER[curso.codigo_genero]}`}
                                            alt="Imagem de fundo da categoria"
                                            width={256}
                                            height={112}
                                            className="w-full h-36 object-cover rounded-t-2xl"
                                        />
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-lg font-semibold truncate">{curso.nome}</CardTitle>
                                            <CardDescription className="text-sm italic">
                                                {curso.genero} -{' '}
                                                <span
                                                    className={`font-semibold ${parseFloat(curso.avaliacao) >= 4
                                                        ? 'text-blue-600'
                                                        : parseFloat(curso.avaliacao) >= 2
                                                            ? 'text-yellow-600'
                                                            : 'text-red-600'
                                                        } `}
                                                >
                                                    {parseFloat(curso.avaliacao).toFixed(1)}
                                                </span>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="text-sm">
                                            <p className="line-clamp-2">{curso.descricao}</p>
                                            <p className="mt-4 text-xs text-muted-foreground">
                                                Criado em: {new Date(curso.created_at).toLocaleDateString('pt-br')}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Clique para acessar o curso!</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </>
                ))}
        </div>
    );
}
