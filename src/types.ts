
export enum Language {
    ES = 'es',
    EN = 'en',
    CAT = 'cat'
}

export type Post = {
    id: string;
    date: number,
    author: string,
    cover: string,
    post: {
        [Language.EN]: PostTranslation,
        [Language.ES]: PostTranslation,
        [Language.CAT]: PostTranslation
    }
}

export type PostTranslation = {
    title: string;
    content?: string;
}
