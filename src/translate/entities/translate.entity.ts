export interface Translate {
    translations: Translation[]
}
export interface Translation {
    detected_source_language: string
    text: string
}
