'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Fundo from "../../public/fundoMassaMasTaClaro.png";
import sapoOi from "../../public/sapo.png";
import { formSchema } from "./interface/cadastroType";

export default function Cadastro() {
    const router = useRouter();
    const styledLabel = 'text-gray-900 font-bold'

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            nome_usuario: "",
            senha: "",
            confirmar_senha: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="relative w-full bg-background min-h-screen flex items-center justify-center">
            <Image
                src={Fundo}
                alt="Background"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="absolute top-0 left-0 w-full h-full z-0"
            />

            <Card className="relative z-10 flex flex-row w-[80%] max-w-5xl rounded-lg shadow-lg overflow-hidden bg-white/90">
                <Image
                    src={sapoOi}
                    alt="Sapo Oi"
                    quality={100}
                    className="rounded-l-lg w-1/3"
                />

                <div className="w-2/3 p-8 flex flex-col">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Cadastro de Usuário
                    </h1>

                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={styledLabel} >E-mail</FormLabel>
                                        <FormControl>
                                            <Input placeholder="seuemail@email.com" {...field} />
                                        </FormControl>
                                        <FormDescription>Informe um e-mail válido</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="nome_usuario"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={styledLabel} >Nome de Usuário</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Seu nome de usuário" {...field} />
                                        </FormControl>
                                        <FormDescription>Precisamos de um nome de usuário único, então pode caprichar</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="senha"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={styledLabel} >Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormDescription>Nunca compartilhe sua senha com ninguem</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmar_senha"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={styledLabel} >Confirmar Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-between gap-4">
                                <Button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="bg-gray-600 w-1/2 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all shadow-md"
                                >
                                    Voltar
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-green-600 w-1/2 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md"
                                >
                                    Criar Conta
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </Card>
        </div>
    );
}
