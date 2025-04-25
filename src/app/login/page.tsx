"use client"

import { Button } from "@/src/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useUser } from "@/src/context/ContextWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutateLogin } from "./hooks/useMutationAuth";

const formSchema = z.object({
    usuario: z.string().min(2, "Digite ao menos 2 caracteres").max(50),
    senha: z.string().max(50),
})

export default function Page() {
    const router = useRouter();
    const { mutateAsync, data, isPending } = useMutateLogin();
    const { setCookieLoggedUser } = useUser();

    useEffect(() => {
        if (data) {
            const results = data.data;
            setCookieLoggedUser(results);
            router.push("/home");
        }
    }, [data]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            usuario: "",
            senha: ""
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutateAsync({ usuario: values.usuario, senha: values.senha });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6">
            <div className="w-full max-w-md bg-zinc-900 shadow-xl rounded-2xl p-8 space-y-6 border border-zinc-800">
                <h1 className="text-3xl font-bold text-white text-center">Login</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="usuario"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Usuário</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Digite seu usuário"
                                            {...field}
                                            className="bg-zinc-800 text-white border-zinc-700 focus-visible:ring-white"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="senha"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Digite sua senha"
                                            {...field}
                                            className="bg-zinc-800 text-white border-zinc-700 focus-visible:ring-white"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200">
                            {isPending ? (
                                <div className="flex items-center gap-2">
                                    <ReloadIcon className="animate-spin" /> Entrando...
                                </div>
                            ) : (
                                "Entrar"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
