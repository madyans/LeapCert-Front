
import { Separator } from "@/src/components/ui/separator"
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { cookies } from "next/headers"
import CourseProgressAlertToaster from "./components/course-progress-alert-toaster"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const isAuthenticated = !!cookieStore.get("accessToken")?.value;

    return (
        <SidebarProvider 
            defaultOpen={isAuthenticated}
            className="min-h-screen bg-zinc-50 text-zinc-950"
        >
            {isAuthenticated && <AppSidebar />}
            <CourseProgressAlertToaster enabled={isAuthenticated} />
            <main className="flex min-h-screen min-w-0 flex-1 flex-col bg-zinc-50 text-zinc-950">
                <div className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-zinc-200 bg-white/95 px-4 backdrop-blur">
                    {isAuthenticated && <SidebarTrigger className="hover:bg-zinc-100" />}
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-zinc-950">LeapCert</p>
                        <p className="text-xs text-zinc-500">Área de aprendizagem</p>
                    </div>
                </div>
                <Separator className="" />
                <div className="min-w-0 flex-1">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}
