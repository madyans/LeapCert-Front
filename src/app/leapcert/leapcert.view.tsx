import Image from "next/image";
import { useRouter } from "next/navigation";
import Fundo from "../../../public/leapcertbg.png";
import { Actions } from "./components/Actions";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Mission } from "./components/Mission";
import { Team } from "./components/Team";
import { Vision } from "./components/Vision";
import { useLeapcertModel } from "./leapcert.model";

type LeapcertViewProps = ReturnType<typeof useLeapcertModel>

export const LeapcertView = (props: LeapcertViewProps) => {
    const { expandedMember, toggleMember } = props
    const router = useRouter()

    return (
        <div className="relative w-full min-h-screen bg-background">
            <div className="absolute inset-0 z-0">
                <Image
                    src={Fundo || "/placeholder.svg"}
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 to-green-800/70 backdrop-blur-sm"></div>
            </div>

            <div className="relative z-10 container mx-auto py-12 px-4 sm:px-6">
                <Header router={router} />
                <Hero />
                <Mission />
                <Vision />
                <Features />
                <Team
                    expandedMember={expandedMember}
                    toggleMember={toggleMember}
                />
                <Actions />
                <Footer />
            </div>
        </div>
    );
}