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

export function AppSidebar() {
    const router = useRouter();

    const items = [
        { title: "Home", url: "/home", icon: Home },
        { title: "Área do aluno", url: "/home/aluno", icon: Calendar },
        { title: "Área do professor", url: "/home/professor", icon: Search },
        { title: "Cursos", url: "/home/cursos", icon: Settings },
        { title: "Configuração", url: "/home/configuracao", icon: Inbox },
    ];

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
                                            <Button
                                                onClick={() => router.push(item.url)}
                                                variant="outline"
                                                className="flex flex-row justify-start gap-3 transition-colors duration-300 border-gray-300 hover:bg-gray-100 hover:border-gray-500 focus:ring-2 focus:ring-gray-400"
                                            >
                                                <item.icon className="text-gray-700 transition-colors duration-300 group-hover:text-black" />
                                                <p className="font-semibold text-gray-800 transition-colors duration-300 group-hover:text-black">
                                                    {item.title}
                                                </p>
                                            </Button>
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
                            className="text-black hover:bg-zinc-100 transition-colors"
                        >
                            Desconectar
                        </Button>
                    </SidebarFooter>

                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
