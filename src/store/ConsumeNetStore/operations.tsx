import { ANIME } from "@consumet/extensions";
import { searchFailed, searchRequested, searchSucceeded } from "./animeSlice";
import { Dispatch } from "redux";


export const SearchAnime = async (search: string, dispatch: Dispatch) => {
    const animeProvider = new ANIME.Gogoanime();
    try {
        dispatch(searchRequested());

        const result = await animeProvider.search(search);
        dispatch(searchSucceeded(result));
    } catch (error) {
        dispatch(searchFailed(error));
    }
};