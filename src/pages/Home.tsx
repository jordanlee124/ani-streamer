import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MangaCard, SectionHeader } from '../components/molecules';
import { PaginatedRow } from '../components/organisms';
import { selectPopular, selectSearch } from '../store/ConsumeNetStore/selector';
import { GetPopular } from '../store/ConsumeNetStore/operations';
import { clearSearch } from '../store/ConsumeNetStore/animeSlice';
import { getCoverUrl, getMangaTitle } from '../types/mangaDex';
import { HomeContainer, ResultsGrid } from './styled';

const Home: React.FunctionComponent = () => {
    const popular = useSelector(selectPopular);
    const search = useSelector(selectSearch);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        GetPopular(dispatch);
    }, []);

    const isSearchActive = !!search.results;

    return (
        <HomeContainer>
            <SectionHeader
                title={isSearchActive ? 'Search Results' : 'Popular Manga'}
                onClear={isSearchActive ? () => dispatch(clearSearch()) : undefined}
            />
            {isSearchActive ? (
                <ResultsGrid>
                    {search.results?.map((manga) => (
                        <MangaCard
                            key={manga.id}
                            title={getMangaTitle(manga)}
                            image={getCoverUrl(manga)}
                            onClick={() => navigate(`/manga/${manga.id}`)}
                        />
                    ))}
                </ResultsGrid>
            ) : (
                popular.results && <PaginatedRow items={popular.results} />
            )}
        </HomeContainer>
    );
};

export default Home;
