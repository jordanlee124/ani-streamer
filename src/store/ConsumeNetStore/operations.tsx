import {
    popularFailed,
    popularRequested,
    popularSucceeded,
    searchFailed,
    searchRequested,
    searchSucceeded,
} from "./animeSlice";
import { Dispatch } from "redux";
import { MangaDexResponse } from "../../types/mangaDex";

export const GetPopular = async (dispatch: Dispatch) => {
    try {
        dispatch(popularRequested());
        const res = await fetch('/api/manga/popular');
        if (!res.ok) throw new Error('Failed to fetch popular manga');
        const data: MangaDexResponse = await res.json();
        dispatch(popularSucceeded(data.data));
    } catch (error) {
        dispatch(popularFailed((error as Error).message));
    }
};

export const SearchManga = async (query: string, dispatch: Dispatch) => {
    try {
        dispatch(searchRequested());
        const res = await fetch(`/api/manga/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Search failed');
        const data: MangaDexResponse = await res.json();
        dispatch(searchSucceeded(data.data));
    } catch (error) {
        dispatch(searchFailed((error as Error).message));
    }
};
