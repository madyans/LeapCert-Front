export const Footer = () => {
    return (
        <footer className="w-full mt-auto bg-gradient-to-t from-emerald-950 via-emerald-900 to-emerald-900 text-emerald-50 border-t border-emerald-800/70">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-10">
                    <div className="space-y-3 max-w-sm">
                        <h3 className="text-xl font-bold tracking-tight">
                            Leap<span className="text-green-300">Cert</span>
                        </h3>
                        <p className="text-sm text-emerald-100/80">
                            Uma plataforma pensada para apoiar sua jornada de aprendizado com clareza, simplicidade e foco no que realmente importa.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                        <div>
                            <h4 className="text-base font-semibold mb-3 text-emerald-50">
                                Contato e Suporte
                            </h4>
                            <div className="space-y-1.5 text-emerald-100/80">
                                <p>
                                    Email:{" "}
                                    <a href="mailto:suporte@leapcert.com" className="underline underline-offset-4 hover:text-green-200">
                                        suporte@leapcert.com
                                    </a>
                                </p>
                                <p>Tel: (11) 1234-5678</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-base font-semibold mb-3 text-emerald-50">
                                Links Úteis
                            </h4>
                            <ul className="space-y-1.5 text-emerald-100/80">
                                <li>
                                    <a href="#" className="hover:text-green-200 transition-colors">
                                        Política de Privacidade
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-green-200 transition-colors">
                                        Termos de Uso
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-green-200 transition-colors">
                                        Acessibilidade
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-base font-semibold mb-3 text-emerald-50">
                                Redes Sociais
                            </h4>
                            <div className="flex sm:flex-col gap-2 text-emerald-100/80">
                                <a href="#" className="hover:text-green-200 transition-colors">
                                    Instagram
                                </a>
                                <a href="#" className="hover:text-green-200 transition-colors">
                                    Twitter
                                </a>
                                <a href="#" className="hover:text-green-200 transition-colors">
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-emerald-800/70 text-center text-xs sm:text-sm text-emerald-200/80">
                    <p>{`© 2026 LeapCert. Todos os direitos reservados.`}</p>
                </div>
            </div>
        </footer>
    )
}