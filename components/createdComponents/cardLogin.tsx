import Image from "next/image";
import imgSapo from "../../public/sapo.png";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function CardLogin() {
    return (
        <div className="bg-white w-[900px] h-[600px] rounded-lg flex flex-row shadow-lg">
            <div className="relative w-[700px] h-[600px] rounded-l-lg overflow-hidden">
                <Image
                    src={imgSapo}
                    alt="Imagem dos sapos"
                    fill
                    className="object-cover"
                    quality={100}
                />
            </div>

            <div className="w-full p-8 flex flex-col justify-center items-center text-center space-y-6">
                <p className="text-lg font-semibold">Entrar com:</p>

                <div className="w-full flex flex-col gap-4">
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold">
                        Entrar com Google
                    </Button>
                    <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold">
                        Entrar com GitHub
                    </Button>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold">
                        Entrar com LeapCert
                    </Button>
                </div>

                <div className="flex items-center w-full">
                    <Separator className="flex-1" />
                    <p className="mx-4">ou</p>
                    <Separator className="flex-1" />
                </div>


                <p className="text-sm text-gray-500">
                    Se ainda não possuir cadastro:
                </p>

                <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold">
                    Registrar
                </Button>
            </div>
        </div>
    );
}
