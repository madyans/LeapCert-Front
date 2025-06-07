export enum ActiveTab {
    Trilha = "trilha",
    Forum = "forum",
    Conteudos = "conteudos",
    Provas = "provas",
    Anotacoes = "anotacoes",
    Certificados = "certificados",
    Professor = "professor"
}

export interface FileWithPreview extends File {
    preview?: string
    id: string
    uploadProgress?: number
}