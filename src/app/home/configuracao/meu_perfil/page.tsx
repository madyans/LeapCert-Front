"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { User, KeyRound } from "lucide-react";

import { useUser } from "@/src/context/ContextWrapper";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Separator } from "@/src/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";

import { MeuPerfilFormValues, meuPerfilSchema } from "./meu-perfil.schema";
import { useMutateUpdateUser } from "./hooks/mutations/useMutateUpdateUser";

export default function Page() {
    const { loggedUser, setLoggedUser } = useUser();
    const { mutateAsync, isPending } = useMutateUpdateUser();

    const form = useForm<MeuPerfilFormValues>({
        resolver: zodResolver(meuPerfilSchema),
        defaultValues: {
            nome: loggedUser?.nome ?? "",
            usuario: loggedUser?.usuario ?? "",
            senha: "",
            confirmar_senha: "",
        },
        mode: "onBlur",
    });

    useEffect(() => {
        form.reset({
            nome: loggedUser?.nome ?? "",
            usuario: loggedUser?.usuario ?? "",
            senha: "",
            confirmar_senha: "",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedUser?.codigo]);

    const onSubmit = async (values: MeuPerfilFormValues) => {
        if (!loggedUser) return;

        const payload = {
            codigo: loggedUser.codigo,
            nome: values.nome.trim(),
            usuario: values.usuario.trim(),
            senha: values.senha?.trim() ? values.senha.trim() : undefined,
        };

        const ok = await mutateAsync(payload);
        if (!ok) return;

        setLoggedUser({
            ...loggedUser,
            nome: payload.nome,
            usuario: payload.usuario,
        });

        form.reset({
            nome: payload.nome,
            usuario: payload.usuario,
            senha: "",
            confirmar_senha: "",
        });
    };

    return (
        <div className="p-6 h-full w-full max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-zinc-900">Meu Perfil</h1>
                    <p className="text-sm text-muted-foreground">
                        Atualize suas informações. A senha é opcional.
                    </p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/home/configuracao">Voltar</Link>
                </Button>
            </div>

            {!loggedUser ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Você não está autenticado</CardTitle>
                        <CardDescription>Faça login para editar seu perfil.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/login">Ir para login</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5 text-emerald-700" />
                            Informações da conta
                        </CardTitle>
                        <CardDescription>
                            Código do usuário: <span className="font-medium">{loggedUser.codigo}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="nome"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Seu nome" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="usuario"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Usuário</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Seu usuário" autoCapitalize="none" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Separator />

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-900">
                                        <KeyRound className="w-4 h-4 text-zinc-700" />
                                        Trocar senha (opcional)
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="senha"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nova senha</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="••••••••" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="confirmar_senha"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirmar senha</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="••••••••" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            form.reset({
                                                nome: loggedUser.nome ?? "",
                                                usuario: loggedUser.usuario ?? "",
                                                senha: "",
                                                confirmar_senha: "",
                                            })
                                        }
                                        disabled={isPending}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button type="submit" disabled={isPending}>
                                        {isPending ? "Salvando..." : "Salvar alterações"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}