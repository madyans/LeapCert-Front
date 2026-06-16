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
import { useUser } from "@/src/context/ContextWrapper";
import { cn } from "@/lib/utils";
import { deleteCookie } from "cookies-next";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import useQueryGetModules from "../hooks/useQueryGetModules";
import IModules from "../interface/IModules";
import CardNavBar from "./card-navbar";

export function AppSidebar() {
    const { data: modules, isLoading } = useQueryGetModules();
    const { setLoggedUser } = useUser();
    const router = useRouter()
    const pathname = usePathname()

    const visibleModules = (modules ?? []).filter((item: IModules) => item.nome !== "Meus Cursos")

    const isRouteActive = (route?: string) => {
        if (!route) return false
        return pathname === route || pathname.startsWith(`${route}/`)
    }

    const handleLogout = async () => {
        await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
        }).catch(() => undefined);

        for (const name of ["accessToken", "UP", "UID", "UU"]) {
            deleteCookie(name, { path: "/" });
            deleteCookie(name, { path: "/", domain: "localhost" });
        }

        setLoggedUser(null);
        router.replace("/");
        router.refresh();
    }

    return (
        <Sidebar>
            <SidebarContent className="border-r border-zinc-200 bg-white">
                <SidebarGroup className="flex h-full flex-col justify-between px-3 py-4">
                    <div>
                        <SidebarGroupLabel className="mb-6 flex h-auto items-center justify-start px-2 py-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                                LC
                            </div>
                            <div className="ml-3 min-w-0">
                                <p className="text-sm font-semibold text-zinc-950">LeapCert</p>
                                <p className="text-xs font-normal text-zinc-500">Cursos e progresso</p>
                            </div>
                        </SidebarGroupLabel>

                        <SidebarGroupContent>
                            <SidebarMenu className="gap-1">
                                {isLoading ? (
                                    Array.from({ length: 4 }).map((_, idx) => (
                                        <SidebarMenuItem key={idx}>
                                            <Skeleton className="h-10 w-full rounded-md" />
                                        </SidebarMenuItem>
                                    ))
                                ) : (
                                    visibleModules.filter((item: IModules) => item.childoff === null)
                                        .map((item: IModules) => {
                                            const children = visibleModules.filter(
                                                (child) => child.childoff === item.codigo
                                            );
                                            const active = isRouteActive(item.rota) || children.some((child) => isRouteActive(child.rota));

                                            if (item.hasChildren && children.length > 0) {
                                                return (
                                                    <Collapsible key={item.codigo}>
                                                        <SidebarMenuItem>
                                                            <CollapsibleTrigger asChild>
                                                                <SidebarMenuButton
                                                                    className={cn(
                                                                        "h-10 w-full justify-start gap-3 rounded-md px-3 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950",
                                                                        active && "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
                                                                    )}
                                                                >
                                                                    <LucideIcon
                                                                        icon={item.icone}
                                                                        className="h-4 w-4 shrink-0"
                                                                    />
                                                                    <span className="truncate text-sm font-medium">{item.nome}</span>
                                                                    <LucideIcon
                                                                        icon="ChevronDown"
                                                                        className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180"
                                                                    />
                                                                </SidebarMenuButton>
                                                            </CollapsibleTrigger>
                                                            <CollapsibleContent>
                                                                <SidebarMenuSub className="ml-4 mt-1 border-l border-zinc-200 pl-3">
                                                                    {children.map((child) => (
                                                                        <SidebarMenuSubItem
                                                                            key={child.codigo}
                                                                            onClick={() => router.push(child.rota)}
                                                                            className={cn(
                                                                                "rounded-md px-2 py-2 hover:cursor-pointer hover:bg-zinc-100",
                                                                                isRouteActive(child.rota) && "bg-primary/10 text-primary"
                                                                            )}
                                                                        >
                                                                            <div className="flex items-center gap-2">
                                                                                <LucideIcon
                                                                                    icon={child.icone}
                                                                                    className="h-4 w-4 shrink-0"
                                                                                />
                                                                                <span className="truncate text-sm font-medium">{child.nome}</span>
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
                                                                variant="ghost"
                                                                className={cn(
                                                                    "h-10 w-full justify-start gap-3 rounded-md px-3 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950",
                                                                    active && "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
                                                                )}
                                                            >
                                                                <LucideIcon
                                                                    icon={item.icone}
                                                                    className="h-4 w-4 shrink-0"
                                                                />
                                                                <span className="truncate text-sm font-medium">
                                                                    {item.nome}
                                                                </span>
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

                    <SidebarFooter className="mt-6 gap-3 p-0">
                        <CardNavBar />
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="h-10 w-full justify-start gap-2 border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
                        >
                            <LogOut className="h-4 w-4" />
                            Sair
                        </Button>
                    </SidebarFooter>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
