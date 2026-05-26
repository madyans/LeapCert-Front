
import { Separator } from "@/src/components/ui/separator"
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { cookies } from "next/headers"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const isAuthenticated = !!cookieStore.get("accessToken")?.value;

    return (
        <SidebarProvider 
            defaultOpen={isAuthenticated}
            className="bg-[url(../../public/fundoMassaMasTaClaro.png)] bg-[#001122] bg-cover bg-bottom bg-fixed"
        >
            {isAuthenticated && <AppSidebar />}
            <main className="bg-white flex flex-col text-white w-screen flex m-4 rounded-lg gap-2">
                <div className="flex flex-row mt-2 ml-2 gap-4 items-center text-black">
                    {isAuthenticated && <SidebarTrigger className="hover:bg-emerald-200" />}
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
