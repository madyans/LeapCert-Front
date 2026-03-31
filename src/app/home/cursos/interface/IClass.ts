import type { ObjectType } from "./ObjectType";

export default interface IClass {
    codigo: number
    codigo_professor: number
    descricao: string
    avaliacao: string
    created_at: string
    nome: string
    codigo_genero?: number | null
    genero: string
    path?: string | null
    objects?: ObjectType[]
}
