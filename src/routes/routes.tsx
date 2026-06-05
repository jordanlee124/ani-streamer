import Home from '../pages/Home';
import MangaDetail from '../pages/MangaDetail/MangaDetail';
import ChapterReader from '../pages/ChapterReader/ChapterReader';
import AdvancedSearch from '../pages/AdvancedSearch/AdvancedSearch';
import { Route } from '../types/routes';

export const routes: Route[] = [
    { path: '/', component: <Home /> },
    { path: '/search', component: <AdvancedSearch /> },
    { path: '/manga/:id', component: <MangaDetail /> },
    { path: '/chapter/:id', component: <ChapterReader /> },
];
