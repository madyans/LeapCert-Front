import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export const Actions = () => {
    return (
        <section className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-green-600 to-green-800 border-none shadow-xl overflow-hidden">
                <CardContent className="p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Pronto para começar sua jornada?</h2>
                    <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                        Junte-se a milhares de pessoas que já estão transformando suas vidas através do compartilhamento de conhecimento na plataforma LeapCert.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50">
                            <Link href="/cadastro">
                                Criar uma conta gratuita
                            </Link>
                        </Button>
                        <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50">
                            <Link href="/cursos">
                                Explorar cursos
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}