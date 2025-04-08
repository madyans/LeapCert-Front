import Image from "next/image";
import Link from "next/link";
import Background from "../../../public/notFoundBg.png";

export default function notFound() {
    return (
        <div className="min-h-screen w-full bg-transparent text-white flex items-center justify-center">
            <div className="z-10 bg-zinc-900 rounded-lg p-8">
                <h1 className="text-2xl font-extrabold text-center">
                    Ops... Essa página ainda não foi desenvolvida!
                </h1>
                <p className="font-light italic text-center text-muted-foreground">
                    Volte para a{" "}
                    <Link href={"/"} className="border-b-2 hover:text-green-500">
                        página principal
                    </Link>
                </p>
            </div>
            <Image
                src={Background}
                alt="Background do site SEDUR (imagem abstrata)"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="-z-10"
            />
        </div>
    );
}
