import { RootState } from "../store";

export const selectPopular = (state: RootState) => state.manga.popular;
export const selectSearch = (state: RootState) => state.manga.search;
