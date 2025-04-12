
import { Separator } from "@/src/components/ui/separator"
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="bg-[url(../../public/fundoMassaMasTaClaro.png)] bg-[#001122] bg-cover bg-bottom bg-fixed">
            <AppSidebar />
            <main className="bg-slate-50 flex flex-col text-white w-screen flex m-4 rounded-lg gap-2">
                <div className="flex flex-row mt-2 ml-2 gap-4 items-center text-black">
                    <SidebarTrigger className="hover:bg-emerald-200" />
                    <h1 className="text-2xl font-bold text-gray-800">
                        Seja bem-vindo ao <span className="text-primary">LeapCert</span>!
                    </h1>
                </div>
                <Separator className="" />
                {children}
            </main>
        </SidebarProvider>
    )
}
