'use client';


import { Button } from "@/src/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/src/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    const router = useRouter();

    return (
        <Sidebar>
            <SidebarContent className="bg-white">
                <SidebarGroup>
                    <SidebarGroupLabel className="h-12">
                        <div className="rounded bg-emerald-300 text-white w-full h-12 flex items-center justify-center font-bold">
                            LeapCert
                        </div>
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-2">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    <SidebarFooter>
                        <Button
                            variant={"outline"}
                            onClick={() => router.push("/")}
                        >Sair</Button>
                    </SidebarFooter>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
