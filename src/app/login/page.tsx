'use client';

import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter()
    return (
        <div className="bg-zinc-950 text-white flex items-center justify-center h-screen">
            <Button onClick={() => router.push("/home")}>Ir para a home page</Button>
        </div>
    )
}