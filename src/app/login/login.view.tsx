import { CardLogin } from "./components/CardLogin"
import { Frog } from "./components/Frog"
import { useLoginModel } from "./login.model"

type LoginViewType = ReturnType<typeof useLoginModel>

export const LoginView = (props: LoginViewType) => {
    const { frogRef, leftEyeRef, rightEyeRef, form, isPending, onSubmit, setShowPassword, showPassword } = props

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-800 via-green-900 to-green-950 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-300 rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-yellow-400 rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-green-500 rounded-full opacity-15 animate-pulse"></div>

                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-600 rounded-full opacity-30"></div>
                <div className="absolute -bottom-5 left-20 w-32 h-32 bg-green-700 rounded-full opacity-40"></div>
                <div className="absolute -bottom-8 left-40 w-36 h-36 bg-green-800 rounded-full opacity-30"></div>
                <div className="absolute -bottom-12 right-20 w-40 h-40 bg-green-600 rounded-full opacity-30"></div>
                <div className="absolute -bottom-6 right-40 w-32 h-32 bg-green-700 rounded-full opacity-40"></div>
            </div>

            <div className="w-full max-w-md relative">
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

                <div className="text-center mt-6 text-green-200 text-sm">© 2025 LeapCert. Todos os direitos reservados.</div>
            </div>
        </div>
    )
}