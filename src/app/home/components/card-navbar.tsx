'use client';

import { Card } from "@/src/components/ui/card";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useEffect, useState } from "react";
import sapoHi from "../../../../public/sapoHi.png";

export default function CardNavBar() {
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const cookie = getCookie("UU") as string | undefined;
        if (cookie) {
            try {
                const decoded = JSON.parse(atob(cookie));
                setUserName(decoded);
            } catch (err) {
                console.error("Erro ao decodificar cookie:", err);
            }
        }
    }, []);

    return (
        <Card className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 bg-white">
            <Image
                src={sapoHi}
                width={60}
                height={60}
                alt="Avatar"
                className="rounded-md"
            />
            <div className="flex flex-col justify-center">
                <p className="text-base font-medium text-gray-800">{userName}</p>
                <p className="text-sm text-gray-600">Interesses: Desenvolvimento, IA</p>
                <p className="text-sm text-gray-600">Cursos ministrados: Algoritmos</p>
            </div>
        </Card>
    );
}
