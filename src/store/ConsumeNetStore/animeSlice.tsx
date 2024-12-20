import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CNResponse, CNResponseResults } from "../../types/consumeNet";


export interface AnimeState {
    searchResults?: CNResponse;
    errors?: any;
    searchIsLoading: boolean;
}

const initialState: AnimeState = {
    searchResults: undefined,
    errors: undefined,
    searchIsLoading: false
}

export const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        searchRequested: (state) => {
            state.searchIsLoading = true;
        },
        searchSucceeded: (state, action: PayloadAction<CNResponse>) => {
            state.searchResults = action.payload;
            state.searchIsLoading = false;
        },
        searchFailed: (state, action: PayloadAction<any>) => {
            state.errors = action.payload;
            state.searchIsLoading = false;
        }
    }
});

export const {
    searchRequested,
    searchSucceeded,
    searchFailed
} = animeSlice.actions;

export default animeSlice.reducer;