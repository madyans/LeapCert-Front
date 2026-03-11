export const Hero = () => {
    return (
        <section className="mb-12 sm:mb-14 lg:mb-16 text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/70 border border-emerald-500/40 text-xs sm:text-sm mb-5">
                <span className="h-2 w-2 rounded-full bg-green-300" />
                <span className="uppercase tracking-[0.18em] text-emerald-100/90 font-semibold">
                    Sobre o projeto
                </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
                Sobre o <span className="text-green-300">LeapCert</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-emerald-50/90 max-w-3xl mx-auto">
                Conectando pessoas através do conhecimento e transformando a maneira como aprendemos,
                ensinamos e certificamos o nosso desenvolvimento.
            </p>
        </section>
    )
}