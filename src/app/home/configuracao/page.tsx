import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ChevronRight, LayoutDashboard, LogOut, ShieldCheck, SlidersHorizontal, UserRoundCog } from "lucide-react";

export default function Page() {
    return (
        <div className="p-6 h-full w-full max-w-7xl mx-auto space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-zinc-900">Configurações</h1>
                <p className="text-sm text-muted-foreground">
                    Gerencie suas preferências e informações de conta.
                </p>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow p-5 space-y-4">
                <h2 className="text-base font-semibold flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
                    Acessos rápidos
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Link
                        href="/home/configuracao/meu_perfil"
                        className="rounded-lg border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition-colors p-3"
                    >
                        <div className="flex items-start gap-2.5">
                            <div className="h-8 w-8 rounded-md bg-white border border-emerald-100 flex items-center justify-center">
                                <UserRoundCog className="w-4 h-4 text-emerald-700" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-sm font-semibold text-zinc-900">Meu perfil</p>
                                <p className="text-xs text-muted-foreground">
                                    Atualize seus dados de acesso.
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/home"
                        className="rounded-lg border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition-colors p-3"
                    >
                        <div className="flex items-start gap-2.5">
                            <div className="h-8 w-8 rounded-md bg-white border border-emerald-100 flex items-center justify-center">
                                <LayoutDashboard className="w-4 h-4 text-emerald-700" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-sm font-semibold text-zinc-900">Dashboard</p>
                                <p className="text-xs text-muted-foreground">
                                    Voltar para visão geral.
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/"
                        className="rounded-lg border border-rose-100 bg-rose-50/40 hover:bg-rose-50 transition-colors p-3"
                    >
                        <div className="flex items-start gap-2.5">
                            <div className="h-8 w-8 rounded-md bg-white border border-rose-100 flex items-center justify-center">
                                <LogOut className="w-4 h-4 text-rose-600" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-sm font-semibold text-zinc-900">Sair</p>
                                <p className="text-xs text-muted-foreground">
                                    Encerrar sessão com segurança.
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow p-5 space-y-3">
                <h2 className="text-base font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    Preferências
                </h2>
                <p className="text-sm text-muted-foreground">
                    Novas opções de notificação, privacidade e segurança podem ser habilitadas conforme integração com o back-end.
                </p>
                <Button size="sm" variant="outline" asChild>
                    <Link href="/home/configuracao/meu_perfil" className="inline-flex items-center gap-2">
                        Ajustar perfil agora
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}