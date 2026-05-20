import type { ObjectType } from "./ObjectType";

export interface ICourseSection {
    codigo: number
    titulo: string
    conteudo: string
    ordem: number
}

export interface ICourseLearningPathItem {
    codigo: number
    titulo: string
    tipo: string
    concluido_padrao: boolean
    arquivo_nome?: string | null
    arquivo_path?: string | null
    arquivo_tipo?: string | null
    ordem: number
}

export interface ICourseForumTopic {
    codigo: number
    autor: string
    titulo: string
    resumo: string
    ordem: number
}

export interface ICourseAssessmentItem {
    codigo: number
    titulo: string
    tipo: string
    quantidade_questoes?: number | null
    duracao?: string | null
    prazo?: string | null
    ordem: number
}

export interface ICourseCertificate {
    codigo: number
    titulo: string
    descricao: string
    status: string
    progresso_padrao: number
    disponivel_padrao: boolean
    ordem: number
}

export interface ICourseTeacherContact {
    codigo: number
    nome_professor: string
    subtitulo: string
    mensagem_orientacao: string
}

export interface ICourseUserNote {
    codigo: number
    codigo_curso: number
    codigo_usuario: number
    titulo: string
    conteudo: string
    created_at: string
    updated_at: string
}

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
    conteudo_descricao: string
    instrutor_resumo: string
    minha_nota?: number | null
    meu_comentario?: string | null
    secoes: ICourseSection[]
    trilha: ICourseLearningPathItem[]
    forum_topicos: ICourseForumTopic[]
    avaliacoes_itens: ICourseAssessmentItem[]
    certificados: ICourseCertificate[]
    contato_professor?: ICourseTeacherContact | null
    anotacoes: ICourseUserNote[]
}
