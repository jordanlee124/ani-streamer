import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MangaCard, SectionHeader } from '../components/molecules';
import { PaginatedRow } from '../components/organisms';
import { selectPopular, selectSearch } from '../store/ConsumeNetStore/selector';
import { GetPopular } from '../store/ConsumeNetStore/operations';
import { clearSearch } from '../store/ConsumeNetStore/animeSlice';
import {
    MangaDexManga, MangaDexResponse,
    getCoverUrl, getCoverUrlFull, getMangaTitle, getMangaDescription, getMangaAuthor,
} from '../types/mangaDex';
import * as Styled from './styled';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const fetchSection = (url: string, set: (items: MangaDexManga[]) => void) =>
    fetch(url)
        .then(r => r.json())
        .then((d: MangaDexResponse) => set(d.data ?? []))
        .catch(console.error);

const Home: React.FunctionComponent = () => {
    const popular = useSelector(selectPopular);
    const search = useSelector(selectSearch);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [recent, setRecent]       = useState<MangaDexManga[]>([]);
    const [topRated, setTopRated]   = useState<MangaDexManga[]>([]);
    const [newTitles, setNewTitles] = useState<MangaDexManga[]>([]);

    useEffect(() => {
        GetPopular(dispatch);
        fetchSection('/api/manga/recent',   setRecent);
        fetchSection('/api/manga/toprated', setTopRated);
        fetchSection('/api/manga/new',      setNewTitles);
    }, []);

    const isSearchActive = !!search.results;
    const featured = popular.results?.[0] ?? null;
    const featuredCover = featured ? getCoverUrlFull(featured) : undefined;

    return (
        <Styled.HomeContainer>
            {isSearchActive ? (
                <Styled.Sections>
                    <Styled.Section>
                        <SectionHeader
                            title="Search Results"
                            onClear={() => dispatch(clearSearch())}
                        />
                        <Styled.ResultsGrid>
                            {search.results?.map(manga => (
                                <MangaCard
                                    key={manga.id}
                                    title={getMangaTitle(manga)}
                                    image={getCoverUrl(manga)}
                                    onClick={() => navigate(`/manga/${manga.id}`)}
                                />
                            ))}
                        </Styled.ResultsGrid>
                    </Styled.Section>
                </Styled.Sections>
            ) : (
                <>
                    {featured && featuredCover && (
                        <Styled.HeroSection>
                            <Styled.HeroBg src={featuredCover} />
                            <Styled.HeroGradient />
                            <Styled.HeroContent>
                                <Styled.HeroTitle>{getMangaTitle(featured)}</Styled.HeroTitle>
                                <Styled.HeroMeta>
                                    {getMangaAuthor(featured) && (
                                        <Styled.HeroMetaTag>{getMangaAuthor(featured)}</Styled.HeroMetaTag>
                                    )}
                                    <Styled.HeroMetaTag>
                                        {capitalize(featured.attributes.status)}
                                    </Styled.HeroMetaTag>
                                    {featured.attributes.year && (
                                        <Styled.HeroMetaTag>{featured.attributes.year}</Styled.HeroMetaTag>
                                    )}
                                    {featured.attributes.tags.slice(0, 3).map(tag => (
                                        <Styled.HeroMetaTag key={tag.id}>
                                            {tag.attributes.name.en}
                                        </Styled.HeroMetaTag>
                                    ))}
                                </Styled.HeroMeta>
                                <Styled.HeroDescription>
                                    {getMangaDescription(featured)}
                                </Styled.HeroDescription>
                                <Styled.HeroActions>
                                    <Styled.HeroButton onClick={() => navigate(`/manga/${featured.id}`)}>
                                        View Details
                                    </Styled.HeroButton>
                                    <Styled.HeroButton variant="ghost" onClick={() => navigate('/search')}>
                                        Browse All
                                    </Styled.HeroButton>
                                </Styled.HeroActions>
                            </Styled.HeroContent>
                        </Styled.HeroSection>
                    )}

                    <Styled.Sections>
                        {popular.results && (
                            <Styled.Section>
                                <SectionHeader title="Popular Manga" />
                                <PaginatedRow items={popular.results} showRanking />
                            </Styled.Section>
                        )}

                        {recent.length > 0 && (
                            <Styled.Section>
                                <SectionHeader title="Recently Updated" />
                                <PaginatedRow items={recent} />
                            </Styled.Section>
                        )}

                        {topRated.length > 0 && (
                            <Styled.Section>
                                <SectionHeader title="Top Rated" />
                                <PaginatedRow items={topRated} />
                            </Styled.Section>
                        )}

                        {newTitles.length > 0 && (
                            <Styled.Section>
                                <SectionHeader title="New Titles" />
                                <PaginatedRow items={newTitles} />
                            </Styled.Section>
                        )}
                    </Styled.Sections>
                </>
            )}
        </Styled.HomeContainer>
    );
};

export default Home;
