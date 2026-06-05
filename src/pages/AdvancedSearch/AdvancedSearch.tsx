import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MangaCard } from '../../components/molecules';
import {
    MangaDexManga, MangaDexResponse, MangaDexTag, MangaDexTagResponse,
    getCoverUrl, getMangaTitle,
} from '../../types/mangaDex';
import * as Styled from './styled';

const STATUS_OPTIONS = [
    { value: 'ongoing',   label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'hiatus',    label: 'Hiatus' },
    { value: 'cancelled', label: 'Cancelled' },
];

const DEMOGRAPHIC_OPTIONS = [
    { value: 'shounen', label: 'Shounen' },
    { value: 'shoujo',  label: 'Shoujo' },
    { value: 'josei',   label: 'Josei' },
    { value: 'seinen',  label: 'Seinen' },
];

const CONTENT_RATING_OPTIONS = [
    { value: 'safe',         label: 'Safe' },
    { value: 'suggestive',   label: 'Suggestive' },
    { value: 'erotica',      label: 'Erotica' },
    { value: 'pornographic', label: 'Pornographic' },
];

const LANGUAGE_OPTIONS = [
    { value: 'ja',    label: 'Japanese' },
    { value: 'ko',    label: 'Korean' },
    { value: 'zh',    label: 'Chinese (Simplified)' },
    { value: 'zh-hk', label: 'Chinese (Traditional)' },
    { value: 'en',    label: 'English' },
];

const SORT_OPTIONS = [
    { value: 'latest',    label: 'Latest Upload' },
    { value: 'relevance', label: 'Relevance' },
    { value: 'follows',   label: 'Most Followed' },
    { value: 'rating',    label: 'Top Rated' },
    { value: 'year',      label: 'Year' },
];

const TAG_GROUP_ORDER = ['genre', 'theme', 'format', 'content'] as const;
const TAG_GROUP_LABELS: Record<string, string> = {
    genre: 'Genre', theme: 'Theme', format: 'Format', content: 'Content',
};

const STORAGE_KEY = 'advancedSearch';

interface SavedFilters {
    title: string;
    statuses: string[];
    demographics: string[];
    contentRatings: string[];
    originalLanguages: string[];
    sort: string;
    includedTags: string[];
    excludedTags: string[];
    includedTagsMode: 'AND' | 'OR';
    results: MangaDexManga[] | null;
}

function loadSaved(): Partial<SavedFilters> {
    try {
        const s = sessionStorage.getItem(STORAGE_KEY);
        return s ? JSON.parse(s) : {};
    } catch { return {}; }
}

function saveSaved(state: SavedFilters) {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

const AdvancedSearch: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const [saved] = useState<Partial<SavedFilters>>(loadSaved);
    const [title, setTitle] = useState(saved.title ?? '');
    const [statuses, setStatuses] = useState<string[]>(saved.statuses ?? []);
    const [demographics, setDemographics] = useState<string[]>(saved.demographics ?? []);
    const [contentRatings, setContentRatings] = useState<string[]>(saved.contentRatings ?? ['safe', 'suggestive']);
    const [originalLanguages, setOriginalLanguages] = useState<string[]>(saved.originalLanguages ?? []);
    const [sort, setSort] = useState(saved.sort ?? 'latest');
    const [includedTags, setIncludedTags] = useState<string[]>(saved.includedTags ?? []);
    const [excludedTags, setExcludedTags] = useState<string[]>(saved.excludedTags ?? []);
    const [includedTagsMode, setIncludedTagsMode] = useState<'AND' | 'OR'>(saved.includedTagsMode ?? 'AND');
    const [allTags, setAllTags] = useState<MangaDexTag[]>([]);
    const [results, setResults] = useState<MangaDexManga[] | null>(saved.results ?? null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        saveSaved({ title, statuses, demographics, contentRatings, originalLanguages, sort, includedTags, excludedTags, includedTagsMode, results });
    }, [title, statuses, demographics, contentRatings, originalLanguages, sort, includedTags, excludedTags, includedTagsMode, results]);

    useEffect(() => {
        fetch('/api/manga/tags')
            .then(res => res.json())
            .then((data: MangaDexTagResponse) => setAllTags(data?.data ?? []))
            .catch(console.error);
    }, []);

    const toggleMulti = (set: React.Dispatch<React.SetStateAction<string[]>>, value: string) =>
        set(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);

    const toggleTag = (id: string) => {
        if (includedTags.includes(id)) {
            setIncludedTags(prev => prev.filter(t => t !== id));
            setExcludedTags(prev => [...prev, id]);
        } else if (excludedTags.includes(id)) {
            setExcludedTags(prev => prev.filter(t => t !== id));
        } else {
            setIncludedTags(prev => [...prev, id]);
        }
    };

    const tagState = (id: string): 'included' | 'excluded' | 'none' =>
        includedTags.includes(id) ? 'included' : excludedTags.includes(id) ? 'excluded' : 'none';

    const handleSearch = async () => {
        setLoading(true);
        const params = new URLSearchParams({ sort });
        if (title.trim()) params.set('title', title.trim());
        statuses.forEach(s => params.append('status', s));
        demographics.forEach(d => params.append('demographic', d));
        contentRatings.forEach(r => params.append('contentRating', r));
        originalLanguages.forEach(l => params.append('originalLanguage', l));
        includedTags.forEach(t => params.append('includedTags', t));
        excludedTags.forEach(t => params.append('excludedTags', t));
        if (includedTags.length > 0) params.set('includedTagsMode', includedTagsMode);

        try {
            const res = await fetch(`/api/manga/advanced?${params.toString()}`);
            const data: MangaDexResponse = await res.json();
            setResults(data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const tagsByGroup = (allTags ?? []).reduce<Record<string, MangaDexTag[]>>((acc, tag) => {
        const g = tag.attributes.group;
        if (!acc[g]) acc[g] = [];
        acc[g].push(tag);
        return acc;
    }, {});

    return (
        <Styled.PageContainer>
            <Styled.PageTitle>Advanced Search</Styled.PageTitle>

            <Styled.FilterSection>
                <Styled.FilterGroup>
                    <Styled.FilterLabel>Title</Styled.FilterLabel>
                    <Styled.TitleInput
                        placeholder="Search by title…"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    />
                </Styled.FilterGroup>

                <Styled.FilterGroup>
                    <Styled.FilterLabel>Status</Styled.FilterLabel>
                    <Styled.FilterPills>
                        {STATUS_OPTIONS.map(({ value, label }) => (
                            <Styled.FilterPill key={value} active={statuses.includes(value)} onClick={() => toggleMulti(setStatuses, value)}>
                                {label}
                            </Styled.FilterPill>
                        ))}
                    </Styled.FilterPills>
                </Styled.FilterGroup>

                <Styled.FilterGroup>
                    <Styled.FilterLabel>Demographic</Styled.FilterLabel>
                    <Styled.FilterPills>
                        {DEMOGRAPHIC_OPTIONS.map(({ value, label }) => (
                            <Styled.FilterPill key={value} active={demographics.includes(value)} onClick={() => toggleMulti(setDemographics, value)}>
                                {label}
                            </Styled.FilterPill>
                        ))}
                    </Styled.FilterPills>
                </Styled.FilterGroup>

                <Styled.FilterGroup>
                    <Styled.FilterLabel>Content Rating</Styled.FilterLabel>
                    <Styled.FilterPills>
                        {CONTENT_RATING_OPTIONS.map(({ value, label }) => (
                            <Styled.FilterPill key={value} active={contentRatings.includes(value)} onClick={() => toggleMulti(setContentRatings, value)}>
                                {label}
                            </Styled.FilterPill>
                        ))}
                    </Styled.FilterPills>
                </Styled.FilterGroup>

                <Styled.FilterGroup>
                    <Styled.FilterLabel>Original Language</Styled.FilterLabel>
                    <Styled.FilterPills>
                        {LANGUAGE_OPTIONS.map(({ value, label }) => (
                            <Styled.FilterPill key={value} active={originalLanguages.includes(value)} onClick={() => toggleMulti(setOriginalLanguages, value)}>
                                {label}
                            </Styled.FilterPill>
                        ))}
                    </Styled.FilterPills>
                </Styled.FilterGroup>

                <Styled.FilterGroup>
                    <Styled.FilterLabel>Sort By</Styled.FilterLabel>
                    <Styled.FilterPills>
                        {SORT_OPTIONS.map(({ value, label }) => (
                            <Styled.FilterPill key={value} active={sort === value} onClick={() => setSort(value)}>
                                {label}
                            </Styled.FilterPill>
                        ))}
                    </Styled.FilterPills>
                </Styled.FilterGroup>

                {allTags.length > 0 && (
                    <Styled.FilterGroup>
                        <Styled.FilterLabel>Tags</Styled.FilterLabel>
                        <Styled.TagsHeader>
                            <Styled.TagHint>Click to include · Again to exclude · Again to clear</Styled.TagHint>
                            <Styled.ModeToggleRow>
                                <Styled.ModeLabel>Included mode:</Styled.ModeLabel>
                                <Styled.ModeToggleBtn active={includedTagsMode === 'AND'} onClick={() => setIncludedTagsMode('AND')}>AND</Styled.ModeToggleBtn>
                                <Styled.ModeToggleBtn active={includedTagsMode === 'OR'} onClick={() => setIncludedTagsMode('OR')}>OR</Styled.ModeToggleBtn>
                            </Styled.ModeToggleRow>
                        </Styled.TagsHeader>
                        {TAG_GROUP_ORDER.map(group => tagsByGroup[group]?.length > 0 && (
                            <Styled.TagGroupSection key={group}>
                                <Styled.TagGroupTitle>{TAG_GROUP_LABELS[group]}</Styled.TagGroupTitle>
                                <Styled.TagsGrid>
                                    {tagsByGroup[group].map(tag => (
                                        <Styled.TagPill key={tag.id} state={tagState(tag.id)} onClick={() => toggleTag(tag.id)}>
                                            {tag.attributes.name.en}
                                        </Styled.TagPill>
                                    ))}
                                </Styled.TagsGrid>
                            </Styled.TagGroupSection>
                        ))}
                    </Styled.FilterGroup>
                )}

                <Styled.SearchButton onClick={handleSearch} disabled={loading}>
                    {loading ? 'Searching…' : 'Search'}
                </Styled.SearchButton>
            </Styled.FilterSection>

            {results && (
                <>
                    <Styled.ResultsHeader>{results.length} results</Styled.ResultsHeader>
                    <Styled.ResultsGrid>
                        {results.map(manga => (
                            <MangaCard
                                key={manga.id}
                                title={getMangaTitle(manga)}
                                image={getCoverUrl(manga)}
                                onClick={() => navigate(`/manga/${manga.id}`)}
                            />
                        ))}
                    </Styled.ResultsGrid>
                </>
            )}
        </Styled.PageContainer>
    );
};

export default AdvancedSearch;
