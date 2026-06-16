'use client';

import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Card } from "@/src/components/ui/card";
import { useUser } from "@/src/context/ContextWrapper";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function CardNavBar() {
    const { loggedUser } = useUser();
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

    const displayName = loggedUser?.nome || userName || "Usuário";
    const initials = displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase() || "U";

    return (
        <Card className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
            <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {initials}
                </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
                <p className="truncate text-sm font-medium text-zinc-900">{displayName}</p>
                <p className="text-xs text-zinc-500">Conta LeapCert</p>
            </div>
        </Card>
    );
}
