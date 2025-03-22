import CardHome from "@/components/createdComponents/cardHome";
import Image from "next/image";
import sapo from "../public/sapoHi.png";
import teste from "../public/TESTE.png";

export default function Page() {
    return (
        <div className="w-full min-h-screen flex flex-col bg-emerald-100">
            <header className="bg-emerald-900 text-white w-full py-6 px-4 flex flex-col items-center shadow-md gap-1">
                <div className="relative w-32 h-32 mb-16">
                    <Image
                        src={sapo}
                        alt="Mascote Sapo"
                        layout="responsive"
                        width={128}
                        height={128}
                        quality={100}
                        className="rounded-xl border-4 border-white shadow-lg"
                    />
                </div>
                <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-xl">
                    Leap<span className="text-emerald-200">Cert</span>
                </h1>
                <h3 className="text-lg font-medium opacity-90 italic tracking-wide">
                    O próximo nível do seu <span className="text-emerald-100">conhecimento</span>
                </h3>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center text-center px-2 py-16">
                <h2 className="text-3xl text-zinc-700 font-bold mb-6 tracking-wide">
                    Conheça <span className="text-emerald-600">mais</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-6 w-full">
                    <CardHome imgRoute={teste} description="Teste" routeButton="/" />
                    <CardHome imgRoute={teste} description="Teste" routeButton="/" />
                    <CardHome imgRoute={teste} description="Teste" routeButton="/" />
                </div>
            </main>

            <footer className="bg-emerald-900 text-white w-full py-6 px-4 mt-auto">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-6">
                    <div>
                        <h3 className="text-lg font-bold mb-2">Contato e Suporte</h3>
                        <p>Email: <a href="mailto:suporte@leapcert.com" className="underline">suporte@leapcert.com</a></p>
                        <p>Tel: (11) 1234-5678</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-2">Links Úteis</h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline">Política de Privacidade</a></li>
                            <li><a href="#" className="hover:underline">Termos de Uso</a></li>
                            <li><a href="#" className="hover:underline">Acessibilidade</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-2">Redes Sociais</h3>
                        <div className="flex flex-col space-y-2">
                            <a href="#" className="hover:underline">Instagram</a>
                            <a href="#" className="hover:underline">Twitter</a>
                            <a href="#" className="hover:underline">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm opacity-75">
                    © 2025 LeapCert. Todos os direitos reservados.
                </div>
            </footer>
        </div>
    );
}
