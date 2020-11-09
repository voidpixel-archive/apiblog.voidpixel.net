
export enum Language {
    ES = 'es',
    EN = 'en'
}

export type Post = {
    id: string;
    date: number,
    author: string,
    cover: string,
    post: {
        [Language.EN]: PostTranslation,
        [Language.ES]: PostTranslation
    }
}

export type PostTranslation = {
    title: string;
    content?: string;
}