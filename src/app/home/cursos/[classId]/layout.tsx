"use client";

import { Button } from "@/src/components/ui/button";
import { dsp } from "@/src/constants/DEFAULT_STYLE_PAGE";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <>
            <div className={`${dsp} flex flex-row items-center gap-4`}>
                <Button
                    variant="ghost"
                    className="p-1 rounded-full hover:bg-gray-200"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-6 h-6 text-slate-500" />
                </Button>

                <div>
                    <h1 className="text-3xl font-extrabold">Detalhes do Curso</h1>
                    <p className="text-slate-500 text-sm italic">
                        Explore todas as informações essenciais para tomar sua próxima decisão com confiança.
                    </p>
                </div>
            </div>

            {children}
        </>
    );
}
