export interface DictionaryEntity {
    word: string
    phonetic?: string
    phonetics: PhoneticEntity[]
    meanings: MeaningEntity[]
    license: LicenseEntity
    sourceUrls: string[]
}

export interface LicenseEntity {
    name: string
    url: string
}

export interface PhoneticEntity {
    text?: string
    audio: string
    sourceUrl?: string
    license?: LicenseEntity
}

export interface DefinitionEntity {
    definition: string
    synonyms: string[]
    antonyms: string[]
    example?: string
}

export interface MeaningEntity {
    partOfSpeech: string
    definitions: DefinitionEntity[]
    synonyms: string[]
    antonyms: string[]
}
