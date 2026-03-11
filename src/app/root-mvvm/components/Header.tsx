import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="w-full bg-gradient-to-b from-emerald-950/95 via-emerald-900 to-emerald-900 text-white shadow-lg border-b border-emerald-800/80">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
                <Link href="/" className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl overflow-hidden bg-emerald-500 flex items-center justify-center shadow-lg ring-2 ring-emerald-300/70">
                        <Image
                            src="/favicon.ico"
                            alt="Logo LeapCert"
                            width={40}
                            height={40}
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            Leap<span className="text-green-300">Cert</span>
                        </span>
                        <span className="text-xs sm:text-sm text-emerald-100/80">
                            Um salto para o próximo nível do seu aprendizado
                        </span>
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/" className="relative text-emerald-50 hover:text-green-300 transition-colors">
                        Início
                    </Link>
                    <a href="#featured" className="relative text-emerald-50 hover:text-green-300 transition-colors">
                        Destaques
                    </a>
                    <a href="#courses" className="relative text-emerald-50 hover:text-green-300 transition-colors">
                        Cursos
                    </a>
                    <Link href="/leapcert" className="relative text-emerald-50 hover:text-green-300 transition-colors">
                        Sobre
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold text-xs sm:text-sm px-4 py-2 shadow-lg shadow-emerald-500/30 transition-colors"
                    >
                        <UserIcon className="h-4 w-4" />
                        <span>Login</span>
                    </Link>
                </div>
            </div>

        </header>
    )
}