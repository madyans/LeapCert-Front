import { RefObject } from "react"

interface iProps {
    frogRef: RefObject<HTMLDivElement>
    leftEyeRef: RefObject<HTMLDivElement>
    rightEyeRef: RefObject<HTMLDivElement>
}

export const Frog = ({ frogRef, leftEyeRef, rightEyeRef }: iProps) => {
    return (
        <div
            ref={frogRef}
            className="mx-auto mb-5 flex h-28 w-28 items-center justify-center"
        >
            <div className="relative">
                <div className="relative z-10 h-20 w-28 rounded-[44%] bg-green-500 shadow-lg shadow-green-900/15 transition-all duration-300 hover:bg-green-400">
                    <div className="absolute inset-0 rounded-[44%] bg-gradient-to-b from-green-300/40 to-transparent" />
                </div>

                <div
                    ref={leftEyeRef}
                    className="absolute left-3 top-1 z-20 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white"
                >
                    <div className="h-5 w-5 rounded-full bg-black transition-transform duration-75" />
                </div>
                <div
                    ref={rightEyeRef}
                    className="absolute right-3 top-1 z-20 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white"
                >
                    <div className="h-5 w-5 rounded-full bg-black transition-transform duration-75" />
                </div>

                <div className="absolute bottom-3 left-1/2 z-20 h-5 w-14 -translate-x-1/2 rounded-full bg-green-700">
                    <div className="absolute left-1/2 top-1.5 h-1 w-9 -translate-x-1/2 rounded-full bg-green-800/50" />
                </div>

                <div className="absolute -bottom-3 left-2 z-0 h-10 w-8 rotate-45 rounded-full bg-green-600" />
                <div className="absolute -bottom-3 right-2 z-0 h-10 w-8 -rotate-45 rounded-full bg-green-600" />
            </div>
        </div>
    )
}
