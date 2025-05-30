export const Footer = () => {
    return (
        <footer className="bg-emerald-900 text-white w-full py-6 px-4 mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-6">
                <div>
                    <h3 className="text-lg font-bold mb-2">Contato e Suporte</h3>
                    <p>
                        Email:{" "}
                        <a href="mailto:suporte@leapcert.com" className="underline">
                            suporte@leapcert.com
                        </a>
                    </p>
                    <p>Tel: (11) 1234-5678</p>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-2">Links Úteis</h3>
                    <ul className="space-y-1">
                        <li>
                            <a href="#" className="hover:underline">
                                Política de Privacidade
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Termos de Uso
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Acessibilidade
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-2">Redes Sociais</h3>
                    <div className="flex flex-col space-y-2">
                        <a href="#" className="hover:underline">
                            Instagram
                        </a>
                        <a href="#" className="hover:underline">
                            Twitter
                        </a>
                        <a href="#" className="hover:underline">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center text-sm opacity-75">
                <p>{`© 2025 LeapCert. Todos os direitos reservados.`}</p>
            </div>
        </footer>
    )
}