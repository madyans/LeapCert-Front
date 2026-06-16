import { CardLogin } from "./components/CardLogin"
import { Frog } from "./components/Frog"
import { useLoginModel } from "./login.model"

type LoginViewType = ReturnType<typeof useLoginModel>

export const LoginView = (props: LoginViewType) => {
    const { frogRef, leftEyeRef, rightEyeRef, form, isPending, onSubmit, setShowPassword, showPassword } = props

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-50 p-6">
            <div className="absolute inset-x-0 top-0 h-48 bg-green-900" />
            <div className="absolute inset-x-0 top-48 h-px bg-green-200" />
            <div className="pointer-events-none absolute right-8 top-8 hidden h-28 w-28 rounded-full border border-green-300/40 md:block" />
            <div className="pointer-events-none absolute bottom-8 left-8 hidden h-20 w-20 rounded-full border border-green-200 md:block" />

            <div className="relative mb-6 text-center">
                <p className="text-sm font-medium text-green-100">LeapCert</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">Acesse sua área de aprendizado</h1>
            </div>

            <div className="relative w-full max-w-md">
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

                <div className="mt-6 text-center text-sm text-zinc-500">© 2026 LeapCert. Todos os direitos reservados.</div>
            </div>
        </div>
    )
}
