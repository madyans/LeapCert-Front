'use client';

import { Button } from "@/src/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/src/components/ui/sidebar";
import {
    Calendar,
    Home,
    Inbox,
    Search,
    Settings
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import teste from "../../../../public/TESTE.png";
import CardNavBar from "./card-navbar";

// Menu items.
const items = [
    { title: "Home", url: "#", icon: Home },
    { title: "Inbox", url: "#", icon: Inbox },
    { title: "Calendar", url: "#", icon: Calendar },
    { title: "Search", url: "#", icon: Search },
    { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
    const router = useRouter();

    return (
        <Sidebar>
            <SidebarContent className="bg-white shadow-lg pt-8">
                <SidebarGroup className="flex flex-col justify-between h-full">
                    <div>
                        <SidebarGroupLabel className="flex items-center justify-center mb-14 mt-4">
                            <Image
                                src={teste}
                                alt="Bem-vindo!"
                                className="rounded shadow-md w-full"
                            />
                        </SidebarGroupLabel>

                        <SidebarGroupContent className="mt-2">
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title} className="border rounded">
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
                    </div>

                    <SidebarFooter className="mt-10">
                        <CardNavBar />
                        <Button
                            onClick={() => router.push("/")}
                            variant={"outline"}
                            className="text-black hover:bg-red-100"
                        >
                            Desconectar
                        </Button>
                    </SidebarFooter>

                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
