import Image from "next/image";
import Fundo from "../../../public/leapcertbg.png";
import { Footer } from "../root-mvvm/components/Footer";
import { Header } from "../root-mvvm/components/Header";
import { Actions } from "./components/Actions";
import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { Mission } from "./components/Mission";
import { Team } from "./components/Team";
import { Vision } from "./components/Vision";
import { useLeapcertModel } from "./leapcert.model";

type LeapcertViewProps = ReturnType<typeof useLeapcertModel>

export const LeapcertView = (props: LeapcertViewProps) => {
    const { expandedMember, toggleMember } = props

    return (
        <div className="relative w-full min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800/95 to-emerald-50">
            <div className="absolute inset-0 z-0 opacity-40">
                <Image
                    src={Fundo || "/placeholder.svg"}
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-900/70 to-emerald-800/80 backdrop-blur-sm" />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />

                <main className="flex-1">
                    <div className="container mx-auto py-10 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
                        <Hero />
                        <Mission />
                        <Vision />
                        <Features />
                        <Team
                            expandedMember={expandedMember}
                            toggleMember={toggleMember}
                        />
                        <Actions />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}