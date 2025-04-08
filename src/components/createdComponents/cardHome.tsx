'use client';

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface iProps {
    imgRoute: StaticImageData;
    description: string;
    routeButton: string;
    buttonDescription: string;
}

export default function CardHome({ imgRoute, description, routeButton, buttonDescription }: iProps) {
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
                        className="rounded-lg"
                    />
                </CardHeader>
                <CardContent className="">
                    <p className="text-lg font-medium text-gray-800 text-center">
                        {description}
                    </p>
                </CardContent>
                <CardFooter className="w-full">
                    <Button
                        className="w-full font-bold text-white bg-green-600 hover:bg-green-700 transition-transform duration-300 transform hover:scale-105 px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
                        onClick={() => router.push(routeButton)}
                    >
                        {buttonDescription}
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}