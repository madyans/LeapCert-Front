'use client';

import LucideIcon from "@/src/components/createdComponents/lucide-icon";
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
import { Skeleton } from "@/src/components/ui/skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import teste from "../../../../public/TESTE.png";
import useQueryGetModules from "../hooks/useQueryGetModules";
import IModules from "../interface/IModules";
import CardNavBar from "./card-navbar";

export function AppSidebar() {
    const router = useRouter();
    const { data: modules, isLoading } = useQueryGetModules();

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
                                {isLoading ? (
                                    Array.from({ length: 4 }).map((_, idx) => (
                                        <SidebarMenuItem key={idx} className="border rounded">
                                            <Skeleton className="h-10 w-full" />
                                        </SidebarMenuItem>
                                    ))
                                ) : modules?.map((item: IModules) => (
                                    <SidebarMenuItem key={item.codigo} className="border rounded">
                                        <SidebarMenuButton asChild>
                                            <Button
                                                onClick={() => router.push(item.rota)}
                                                variant="outline"
                                                className="flex flex-row justify-start gap-3 transition-colors duration-300 border-gray-300 hover:bg-gray-100 hover:border-gray-500 focus:ring-2 focus:ring-gray-400"
                                            >
                                                <LucideIcon
                                                    icon={item.icone}
                                                    className="text-gray-700 transition-colors duration-300 group-hover:text-black"
                                                />
                                                <p className="font-semibold text-gray-800 transition-colors duration-300 group-hover:text-black">
                                                    {item.nome}
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
