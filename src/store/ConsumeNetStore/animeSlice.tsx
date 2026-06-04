import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MangaDexManga } from "../../types/mangaDex";

interface MangaState {
    popular: {
        results?: MangaDexManga[];
        isLoading: boolean;
    };
    search: {
        results?: MangaDexManga[];
        isLoading: boolean;
    };
    error?: string;
}

const initialState: MangaState = {
    popular: {
        results: undefined,
        isLoading: false,
    },
    search: {
        results: undefined,
        isLoading: false,
    },
    error: undefined,
};

export const mangaSlice = createSlice({
    name: 'manga',
    initialState,
    reducers: {
        popularRequested: (state) => {
            state.popular.isLoading = true;
        },
        popularSucceeded: (state, action: PayloadAction<MangaDexManga[]>) => {
            state.popular.results = action.payload;
            state.popular.isLoading = false;
        },
        popularFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.popular.isLoading = false;
        },
        searchRequested: (state) => {
            state.search.isLoading = true;
        },
        searchSucceeded: (state, action: PayloadAction<MangaDexManga[]>) => {
            state.search.results = action.payload;
            state.search.isLoading = false;
        },
        searchFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.search.isLoading = false;
        },
        clearSearch: (state) => {
            state.search.results = undefined;
            state.search.isLoading = false;
        },
    },
});

export const {
    popularRequested,
    popularSucceeded,
    popularFailed,
    searchRequested,
    searchSucceeded,
    searchFailed,
    clearSearch,
} = mangaSlice.actions;

export default mangaSlice.reducer;
