export type CNResponse = {
    currentPage?: number;
    hasNextPage?: boolean;
    totalPages?: number;
    totalResults?: number;
    results?: CNResponseResults[];
};

export type CNResponseResults = {
    id: string;
    title: string | ITitle;
    url?: string;
    image?: string;
    imageHash?: string;
    cover?: string;
    coverHash?: string;
    status?: MediaStatus;
    rating?: number;
    type?: MediaFormat;
    releaseDate?: string;
    [x: string]: any;
};

export interface ITitle {
    romaji?: string;
    english?: string;
    native?: string;
    userPreferred?: string;
}

export declare enum MediaStatus {
    ONGOING = "Ongoing",
    COMPLETED = "Completed",
    HIATUS = "Hiatus",
    CANCELLED = "Cancelled",
    NOT_YET_AIRED = "Not yet aired",
    UNKNOWN = "Unknown"
}

export declare enum MediaFormat {
    TV = "TV",
    TV_SHORT = "TV_SHORT",
    MOVIE = "MOVIE",
    SPECIAL = "SPECIAL",
    OVA = "OVA",
    ONA = "ONA",
    MUSIC = "MUSIC",
    MANGA = "MANGA",
    NOVEL = "NOVEL",
    ONE_SHOT = "ONE_SHOT"
}