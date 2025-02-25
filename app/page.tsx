import CardLogin from "@/components/createdComponents/cardLogin";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import teste from "../public/bgLeony.jpg";

export default function Page() {
    return (
        <div className="relative w-full bg-background">
            <Image
                src={teste}
                alt="Background do site SEDUR (imagem abstrata)"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="z-0"
            />

            <ScrollArea className="h-full w-full rounded-md max-h-screen overflow-y-auto">
                <main className="relative flex min-h-screen flex-col p-24 z-10 flex items-center justify-center">
                    <CardLogin />
                </main>
            </ScrollArea>
        </div>
    );

}