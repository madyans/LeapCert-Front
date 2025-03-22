'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface iProps {
    imgRoute: StaticImageData;
    description: string;
    routeButton: string
}

export default function CardHome({ imgRoute, description, routeButton }: iProps) {
    const router = useRouter()

    return (
        <>
            <Card>
                <CardHeader>
                    <Image
                        src={imgRoute}
                        alt="Mascote Sapo"
                        width={325}
                        height={200}
                        quality={100}
                        className="rounded"
                    />
                </CardHeader>
                <CardContent>
                    <p>{description}</p>
                </CardContent>
                <CardFooter className="w-full">
                    <Button className="w-full" onClick={() => router.push(routeButton)}>Clique aqui</Button>
                </CardFooter>
            </Card>
        </>
    )
}