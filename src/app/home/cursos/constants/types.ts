export enum ContentType {
    Image = "image",
    Video = "video",
    PDF = "pdf",
    Unsupported = "unsupported"
}

export type SelectedObject = {
    name: string;
    url: string;
    mimeType: string;
} | null;