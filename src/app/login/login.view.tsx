import { CardLogin } from "./components/CardLogin"
import { Frog } from "./components/Frog"
import { useLoginModel } from "./login.model"

type LoginViewType = ReturnType<typeof useLoginModel>

export const LoginView = (props: LoginViewType) => {
    const { frogRef, leftEyeRef, rightEyeRef, form, isPending, onSubmit, setShowPassword, showPassword } = props

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#f6faf7] text-zinc-950">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-100/80 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />

            <div className="relative grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
                <section className="hidden bg-green-900 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-green-50">
                        <span className="h-2 w-2 rounded-full bg-green-300" />
                        LeapCert
                    </div>

                    <div className="max-w-xl space-y-6">
                        <div className="inline-flex rounded-full bg-green-400/15 px-4 py-2 text-sm font-medium text-green-100">
                            Plataforma de aprendizagem
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-5xl font-semibold leading-tight tracking-tight">
                                Continue evoluindo nos seus cursos.
                            </h1>
                            <p className="max-w-lg text-base leading-7 text-green-50/80">
                                Acesse sua conta para acompanhar aulas, materiais e progresso em um ambiente simples e organizado.
                            </p>
                        </div>
                    </div>

                    <div className="grid max-w-lg grid-cols-3 gap-3 text-sm text-green-50/85">
                        <div className="rounded-lg border border-white/10 bg-white/10 p-4">
                            <strong className="block text-lg text-white">Cursos</strong>
                            trilhas organizadas
                        </div>
                        <div className="rounded-lg border border-white/10 bg-white/10 p-4">
                            <strong className="block text-lg text-white">Progresso</strong>
                            acompanhamento claro
                        </div>
                        <div className="rounded-lg border border-white/10 bg-white/10 p-4">
                            <strong className="block text-lg text-white">Materiais</strong>
                            tudo em um lugar
                        </div>
                    </div>
                </section>

                <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
                    <div className="w-full max-w-[430px]">
                        <div className="mb-8 text-center lg:hidden">
                            <p className="text-sm font-semibold text-green-700">LeapCert</p>
                            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
                                Acesse sua área
                            </h1>
                            <p className="mt-2 text-sm text-zinc-600">
                                Entre para continuar seus cursos.
                            </p>
                        </div>

                        <Frog
                            frogRef={frogRef}
                            leftEyeRef={leftEyeRef}
                            rightEyeRef={rightEyeRef}
                        />

                        <CardLogin
                            form={form}
                            isPending={isPending}
                            onSubmit={onSubmit}
                            setShowPassword={setShowPassword}
                            showPassword={showPassword}
                        />

                        <div className="mt-8 text-center text-xs text-zinc-500">
                            © 2026 LeapCert. Todos os direitos reservados.
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
