export interface MangaDexRelationship {
    id: string;
    type: string;
    attributes?: {
        fileName?: string;
        name?: string;
    };
}

export interface MangaDexManga {
    id: string;
    type: 'manga';
    attributes: {
        title: { [lang: string]: string };
        description: { [lang: string]: string };
        status: 'ongoing' | 'completed' | 'hiatus' | 'cancelled';
        year: number | null;
        contentRating: string;
        lastChapter: string | null;
        lastVolume: string | null;
        tags: Array<{ id: string; attributes: { name: { en: string } } }>;
    };
    relationships: MangaDexRelationship[];
}

export interface MangaDexEntityResponse {
    result: 'ok' | 'error';
    data: MangaDexManga;
}

export interface MangaDexResponse {
    result: 'ok' | 'error';
    data: MangaDexManga[];
    limit: number;
    offset: number;
    total: number;
}

export const getCoverUrl = (manga: MangaDexManga): string | undefined => {
    const cover = manga.relationships.find(r => r.type === 'cover_art');
    if (!cover?.attributes?.fileName) return undefined;
    return `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}.256.jpg`;
};

export const getCoverUrlFull = (manga: MangaDexManga): string | undefined => {
    const cover = manga.relationships.find(r => r.type === 'cover_art');
    if (!cover?.attributes?.fileName) return undefined;
    return `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}.512.jpg`;
};

export const getMangaDescription = (manga: MangaDexManga): string => {
    const d = manga.attributes.description;
    return d.en || Object.values(d)[0] || 'No description available.';
};

export const getMangaAuthor = (manga: MangaDexManga): string | undefined =>
    manga.relationships.find(r => r.type === 'author')?.attributes?.name;

export const getMangaTitle = (manga: MangaDexManga): string => {
    const t = manga.attributes.title;
    return t.en || t['ja-ro'] || t.ja || Object.values(t)[0] || 'Unknown Title';
};
