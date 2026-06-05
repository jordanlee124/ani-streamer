import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MangaDexManga, getCoverUrl, getMangaTitle } from "../../../types/mangaDex";
import { Button } from "../../atoms";
import { MangaCard } from "../../molecules";
import * as Styled from "./styled";

const CARD_EM = 9;
const GAP_EM = 1.2;

interface PaginatedRowProps {
    items: MangaDexManga[];
    showRanking?: boolean;
}

const PaginatedRow: React.FunctionComponent<PaginatedRowProps> = ({ items, showRanking = false }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollAreaRef.current;
        if (!el) return;

        const calculate = (width: number) => {
            const fs = parseFloat(getComputedStyle(el).fontSize);
            const count = Math.max(1, Math.floor((width + GAP_EM * fs) / ((CARD_EM + GAP_EM) * fs)));
            setPerPage(count);
        };

        const observer = new ResizeObserver(([entry]) => calculate(entry.contentRect.width));
        observer.observe(el);
        calculate(el.clientWidth);

        return () => observer.disconnect();
    }, []);

    useEffect(() => { setPage(0); }, [perPage]);

    const totalPages = Math.ceil(items.length / perPage);
    const visible = items.slice(page * perPage, (page + 1) * perPage);

    return (
        <Styled.Container>
            <Button hidden={page === 0} onClick={() => setPage(p => p - 1)}>‹</Button>
            <Styled.ScrollArea ref={scrollAreaRef}>
                <Styled.Row>
                    {visible.map((manga, index) => (
                        <MangaCard
                            key={manga.id}
                            title={getMangaTitle(manga)}
                            image={getCoverUrl(manga)}
                            ranking={showRanking ? page * perPage + index + 1 : undefined}
                            onClick={() => navigate(`/manga/${manga.id}`)}
                        />
                    ))}
                </Styled.Row>
            </Styled.ScrollArea>
            <Button hidden={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>›</Button>
        </Styled.Container>
    );
};

export default PaginatedRow;
