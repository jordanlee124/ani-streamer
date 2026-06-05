import React from "react";
import { MangaDexChapter } from "../../../types/mangaDex";
import * as Styled from "./styled";

interface ChapterRowProps {
    chapter: MangaDexChapter;
    onClick?: () => void;
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

const ChapterRow: React.FunctionComponent<ChapterRowProps> = ({ chapter, onClick }) => {
    const { volume, chapter: num, title, pages, publishAt } = chapter.attributes;

    const label = [
        volume ? `Vol. ${volume}` : null,
        num ? `Ch. ${num}` : 'Oneshot',
    ].filter(Boolean).join(' · ');

    return (
        <Styled.Container onClick={onClick}>
            <Styled.Left>
                <Styled.ChapterLabel>{label}</Styled.ChapterLabel>
                {title && <Styled.ChapterTitle>{title}</Styled.ChapterTitle>}
            </Styled.Left>
            <Styled.Right>
                <Styled.Meta>{pages} pages</Styled.Meta>
                <Styled.Meta>{formatDate(publishAt)}</Styled.Meta>
            </Styled.Right>
        </Styled.Container>
    );
};

export default ChapterRow;
