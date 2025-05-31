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
            className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-40 h-40 flex items-center justify-center"
        >
            <div className="relative">
                {/* Frog body */}
                <div className="w-32 h-24 bg-green-500 rounded-full shadow-lg relative z-10 transition-all duration-300 hover:bg-green-400">
                    {/* Add subtle texture to the frog */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-green-400/30 to-transparent"></div>
                </div>

                {/* Frog eyes */}
                <div
                    ref={leftEyeRef}
                    className="absolute top-2 left-4 w-10 h-10 bg-white rounded-full z-20 flex items-center justify-center overflow-hidden"
                >
                    <div className="w-6 h-6 bg-black rounded-full transition-transform duration-75"></div>
                </div>
                <div
                    ref={rightEyeRef}
                    className="absolute top-2 right-4 w-10 h-10 bg-white rounded-full z-20 flex items-center justify-center overflow-hidden"
                >
                    <div className="w-6 h-6 bg-black rounded-full transition-transform duration-75"></div>
                </div>

                {/* Frog mouth */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-green-700 rounded-full z-20">
                    {/* Add smile line */}
                    <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-green-800/50 rounded-t-full"></div>
                </div>

                {/* Frog legs */}
                <div className="absolute -bottom-4 left-2 w-10 h-14 bg-green-600 rounded-full z-0 transform rotate-45"></div>
                <div className="absolute -bottom-4 right-2 w-10 h-14 bg-green-600 rounded-full z-0 transform -rotate-45"></div>
            </div>
        </div>
    )
}