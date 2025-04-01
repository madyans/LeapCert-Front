'use client';

import CardHome from "@/components/createdComponents/cardHome";
import sapoFlor from "../public/sapo flor.png";
import sapo1 from "../public/sapo1.png";
import teste from "../public/TESTE.png";

export default function Page() {
    return (
        <div className="w-full min-h-screen flex flex-col bg-green-50">
            <header className="bg-emerald-900 text-white w-full py-6 px-4 flex flex-col items-center shadow-md gap-1">
                <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-xl">
                    Leap<span className="text-green-300">Cert</span>
                </h1>
                <h3 className="text-lg font-medium opacity-90 italic tracking-wide">
                    Um <span className="text-green-300">salto</span> para o próximo nível do seu aprendizado
                </h3>

            </header>

            <main className="flex-1 flex flex-col items-center justify-center text-center px-2 py-16">
                <h2 className="text-3xl text-zinc-700 font-bold mb-6 tracking-wide">
                    Conheça <span className="text-emerald-600">mais</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-6 w-full">
                    <CardHome imgRoute={sapoFlor} description="Conheça mais sobre o LeapCert" routeButton="/leapcert" buttonDescription="Salto de conhecimento" />
                    <CardHome imgRoute={teste} description="Fazer cadastro no sistema" routeButton="/cadastro" buttonDescription="Cadastre-se" />
                    <CardHome imgRoute={sapo1} description="Faça login no sistema e entre" routeButton="/login" buttonDescription="Entrar" />
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
                    <p>
                        {`© 2025 LeapCert ${process.env.version}. Todos os direitos reservados.`}
                    </p>
                </div>
            </footer>
        </div>
    );
}
