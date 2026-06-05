import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tag } from '../../components/atoms';
import { ChapterRow } from '../../components/molecules';
import {
    MangaDexManga, MangaDexChapter,
    MangaDexEntityResponse, MangaDexChapterResponse,
    getCoverUrlFull, getMangaTitle, getMangaDescription, getMangaAuthor,
} from '../../types/mangaDex';
import * as Styled from './styled';

const MangaDetail: React.FunctionComponent = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [manga, setManga] = useState<MangaDexManga | null>(null);
    const [chapters, setChapters] = useState<MangaDexChapter[]>([]);

    useEffect(() => {
        if (!id) return;
        fetch(`/api/manga/${id}`)
            .then(res => res.json())
            .then((data: MangaDexEntityResponse) => setManga(data.data))
            .catch(console.error);

        fetch(`/api/manga/${id}/chapters`)
            .then(res => res.json())
            .then((data: MangaDexChapterResponse) => setChapters(data.data))
            .catch(console.error);
    }, [id]);

    const chapterRefs = useMemo(() => chapters.map(ch => {
        const { volume, chapter: num } = ch.attributes;
        const label = [
            volume ? `Vol. ${volume}` : null,
            num ? `Ch. ${num}` : 'Oneshot',
        ].filter(Boolean).join(' · ');
        return { id: ch.id, label };
    }), [chapters]);

    if (!manga) return null;

    const title = getMangaTitle(manga);
    const description = getMangaDescription(manga);
    const author = getMangaAuthor(manga);
    const coverUrl = getCoverUrlFull(manga);
    const { status, year, tags } = manga.attributes;

    return (
        <Styled.PageContainer>
            <Styled.BackButton onClick={() => navigate(-1)}>
                ← Back
            </Styled.BackButton>

            <Styled.HeroCell>
                <Styled.CoverImage src={coverUrl} alt={title} />
                <Styled.InfoPanel>
                    <Styled.Title>{title}</Styled.Title>
                    <Styled.MetaRow>
                        <Styled.StatusPill status={status}>{status}</Styled.StatusPill>
                        {year && <span>{year}</span>}
                        {author && <span>{author}</span>}
                    </Styled.MetaRow>
                    <Styled.TagList>
                        {tags.map(tag => (
                            <Tag key={tag.id}>{tag.attributes.name.en}</Tag>
                        ))}
                    </Styled.TagList>
                    <Styled.Description>{description}</Styled.Description>
                </Styled.InfoPanel>
            </Styled.HeroCell>

            {chapterRefs.length > 0 && (
                <Styled.ChaptersCell>
                    <Styled.ChaptersCellHeader>
                        <Styled.ChaptersCellTitle>Chapters</Styled.ChaptersCellTitle>
                        <Styled.ChapterCount>{chapters.length} chapters</Styled.ChapterCount>
                    </Styled.ChaptersCellHeader>
                    <Styled.ChapterList>
                        {chapters.map((chapter, index) => (
                            <ChapterRow
                                key={chapter.id}
                                chapter={chapter}
                                onClick={() => navigate(`/chapter/${chapter.id}`, {
                                    state: {
                                        label: chapterRefs[index].label,
                                        chapters: chapterRefs,
                                        currentIndex: index,
                                    }
                                })}
                            />
                        ))}
                    </Styled.ChapterList>
                </Styled.ChaptersCell>
            )}
        </Styled.PageContainer>
    );
};

export default MangaDetail;
