import { SearchIcon, UserIcon } from "lucide-react";
import Link from "next/link";

interface iProps {
    searchTerm: string,
    setSearchTerm: (e: string) => void
}

export const Header = ({ searchTerm, setSearchTerm }: iProps) => {

    return (
        <>
            <header className="bg-emerald-900 text-white w-full py-6 px-4 flex flex-col items-center shadow-md gap-1">
                <Link href="/" className="text-5xl font-extrabold tracking-wide drop-shadow-xl">
                    Leap<span className="text-green-300">Cert</span>
                </Link>
                <h3 className="text-lg font-medium opacity-90 italic tracking-wide">
                    Um <span className="text-green-300">salto</span> para o próximo nível do seu aprendizado
                </h3>
            </header>

            <div className="bg-emerald-800 text-white py-4 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-2xl font-bold">Nossos Cursos</h2>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar cursos..."
                                className="py-2 px-4 pr-10 rounded-full bg-emerald-700 text-white placeholder-emerald-200 border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-300 w-full md:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <SearchIcon className="h-5 w-5 text-emerald-300" />
                            </div>
                        </div>
                        <Link
                            href="/login"
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition-colors duration-200 flex items-center gap-1"
                        >
                            <UserIcon className="h-4 w-4" />
                            <span>Entrar</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}