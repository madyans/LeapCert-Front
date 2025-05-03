import * as Icons from "lucide-react";

export default interface IModules {
    codigo: number;
    icone: keyof typeof Icons;
    nome: string;
    rota: string;
    hasChildren: boolean;
    childoff: null | number;
}
