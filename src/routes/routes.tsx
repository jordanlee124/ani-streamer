import Home from '../pages/Home';
import MangaDetail from '../pages/MangaDetail/MangaDetail';
import { Route } from '../types/routes';

export const routes: Route[] = [
    { path: '/', component: <Home /> },
    { path: '/manga/:id', component: <MangaDetail /> },
];
