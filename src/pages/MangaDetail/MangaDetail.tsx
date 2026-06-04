import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tag } from '../../components/atoms';
import { MangaDexManga, MangaDexEntityResponse, getCoverUrlFull, getMangaTitle, getMangaDescription, getMangaAuthor } from '../../types/mangaDex';
import * as Styled from './styled';

const MangaDetail: React.FunctionComponent = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [manga, setManga] = useState<MangaDexManga | null>(null);

    useEffect(() => {
        if (!id) return;
        fetch(`/api/manga/${id}`)
            .then(res => res.json())
            .then((data: MangaDexEntityResponse) => setManga(data.data))
            .catch(console.error);
    }, [id]);

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
        </Styled.PageContainer>
    );
};

export default MangaDetail;
