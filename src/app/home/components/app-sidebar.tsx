'use client';

import LucideIcon from "@/src/components/createdComponents/lucide-icon";
import { Button } from "@/src/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/src/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/src/components/ui/sidebar";
import { Skeleton } from "@/src/components/ui/skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import teste from "../../../../public/TESTE.png";
import useQueryGetModules from "../hooks/useQueryGetModules";
import IModules from "../interface/IModules";
import CardNavBar from "./card-navbar";

export function AppSidebar() {
    const { data: modules, isLoading } = useQueryGetModules();
    const router = useRouter()

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
                                ) : (
                                    modules?.filter((item: IModules) => item.childoff === null)
                                        .map((item: IModules) => {
                                            const children = modules.filter(
                                                (child) => child.childoff === item.codigo
                                            );

                                            if (item.hasChildren && children.length > 0) {
                                                return (
                                                    <Collapsible key={item.codigo}>
                                                        <SidebarMenuItem>
                                                            <CollapsibleTrigger asChild>
                                                                <SidebarMenuButton className="w-full flex items-center justify-between gap-3 border border-2">
                                                                    <LucideIcon
                                                                        icon={item.icone}
                                                                        className="text-gray-700 transition-colors duration-300 group-hover:text-black"
                                                                    />
                                                                    <p className="font-semibold text-gray-800 transition-colors duration-300 group-hover:text-black">{item.nome}</p>
                                                                    <LucideIcon
                                                                        icon="ChevronDown"
                                                                        className="h-4 w-4 ml-auto transition-transform group-data-[state=open]:rotate-180"
                                                                    />
                                                                </SidebarMenuButton>
                                                            </CollapsibleTrigger>
                                                            <CollapsibleContent>
                                                                <SidebarMenuSub>
                                                                    {children.map((child) => (
                                                                        <SidebarMenuSubItem
                                                                            key={child.codigo}
                                                                            onClick={() => router.push(child.rota)}
                                                                            className="hover:cursor-pointer"
                                                                        >
                                                                            <div className="flex flex-row gap-3 items-center mt-1">
                                                                                <LucideIcon
                                                                                    icon={child.icone}
                                                                                    className="text-gray-700 transition-colors duration-300 group-hover:text-black w-4 h-4"
                                                                                />
                                                                                <p className="font-semibold text-gray-800 transition-colors duration-300 group-hover:text-black">{child.nome}</p>
                                                                            </div>
                                                                        </SidebarMenuSubItem>
                                                                    ))}
                                                                </SidebarMenuSub>
                                                            </CollapsibleContent>
                                                        </SidebarMenuItem>
                                                    </Collapsible>
                                                );
                                            } else {
                                                return (
                                                    <SidebarMenuItem
                                                        key={item.codigo}
                                                    >
                                                        <SidebarMenuButton asChild>
                                                            <Button
                                                                onClick={() => router.push(item.rota)}
                                                                variant="outline"
                                                                className="border border-2 flex flex-row justify-start gap-3 transition-colors duration-300 hover:bg-gray-100 hover:border-gray-500 focus:ring-2 focus:ring-gray-400"
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
                                                );
                                            }
                                        })
                                )}
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
