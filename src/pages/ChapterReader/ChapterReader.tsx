import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { MangaDexAtHome } from '../../types/mangaDex';
import * as Styled from './styled';

interface ChapterRef {
    id: string;
    label: string;
}

interface ReaderState {
    label?: string;
    chapters?: ChapterRef[];
    currentIndex?: number;
}

const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const ChapterReader: React.FunctionComponent = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [atHome, setAtHome] = useState<MangaDexAtHome | null>(null);
    const [zoom, setZoom] = useState(1);
    const [zoomText, setZoomText] = useState('100');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageText, setPageText] = useState('1');
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const pageInputFocused = useRef(false);

    const canZoomOut = zoom > ZOOM_STEPS[0];
    const canZoomIn = zoom < ZOOM_STEPS[ZOOM_STEPS.length - 1];

    const applyZoom = (value: number) => {
        const clamped = Math.min(200, Math.max(50, Math.round(value)));
        setZoom(clamped / 100);
        setZoomText(String(clamped));
    };

    const handleZoomBlur = () => {
        const parsed = parseInt(zoomText, 10);
        applyZoom(isNaN(parsed) ? zoom * 100 : parsed);
    };

    const handleZoomKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
    };

    const state = (location.state as ReaderState | null) ?? {};
    const { label, chapters = [], currentIndex = -1 } = state;

    const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
    const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

    useEffect(() => {
        if (!id) return;
        setAtHome(null);
        setCurrentPage(0);
        setPageText('1');
        window.scrollTo(0, 0);
        fetch(`/api/chapter/${id}/pages`)
            .then(res => res.json())
            .then((data: MangaDexAtHome) => setAtHome(data))
            .catch(console.error);
    }, [id]);

    useEffect(() => {
        if (!atHome) return;
        const handleScroll = () => {
            if (pageInputFocused.current) return;
            const refs = pageRefs.current;
            for (let i = refs.length - 1; i >= 0; i--) {
                const ref = refs[i];
                if (ref && ref.getBoundingClientRect().top <= window.innerHeight * 0.5) {
                    setCurrentPage(i);
                    setPageText(String(i + 1));
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [atHome]);

    const scrollToPage = (index: number) => {
        pageRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setCurrentPage(index);
        setPageText(String(index + 1));
    };

    const applyPage = (value: number) => {
        const total = atHome?.chapter.dataSaver.length ?? 1;
        scrollToPage(Math.min(total, Math.max(1, value)) - 1);
    };

    const handlePageBlur = () => {
        pageInputFocused.current = false;
        const parsed = parseInt(pageText, 10);
        applyPage(isNaN(parsed) ? currentPage + 1 : parsed);
    };

    const handlePageKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
    };

    const goTo = (chapter: ChapterRef, index: number) => {
        navigate(`/chapter/${chapter.id}`, {
            state: { label: chapter.label, chapters, currentIndex: index },
        });
    };

    return (
        <Styled.PageContainer>
            <Styled.TopBar>
                <Styled.BackButton onClick={() => navigate(-1)}>← Back</Styled.BackButton>
                {label && <Styled.ChapterLabel>{label}</Styled.ChapterLabel>}
                {atHome && (
                    <Styled.PageCounter>
                        <Styled.ZoomInput
                            value={pageText}
                            onChange={e => setPageText(e.target.value)}
                            onFocus={e => { pageInputFocused.current = true; e.target.select(); }}
                            onBlur={handlePageBlur}
                            onKeyDown={handlePageKey}
                        />
                        <span>/ {atHome.chapter.dataSaver.length}</span>
                    </Styled.PageCounter>
                )}
                <Styled.ZoomControls>
                    <Styled.ZoomButton disabled={!canZoomOut} onClick={() => applyZoom(([...ZOOM_STEPS].reverse().find(s => s < zoom) ?? zoom) * 100)}>−</Styled.ZoomButton>
                    <Styled.ZoomInput
                        value={zoomText}
                        onChange={e => setZoomText(e.target.value)}
                        onBlur={handleZoomBlur}
                        onKeyDown={handleZoomKey}
                        onFocus={e => e.target.select()}
                    />
                    <Styled.ZoomButton disabled={!canZoomIn} onClick={() => applyZoom((ZOOM_STEPS.find(s => s > zoom) ?? zoom) * 100)}>+</Styled.ZoomButton>
                </Styled.ZoomControls>
            </Styled.TopBar>

            {!atHome ? (
                <Styled.LoadingCell>Loading pages…</Styled.LoadingCell>
            ) : (
                <Styled.PagesColumn>
                    {atHome.chapter.dataSaver.map((filename, i) => (
                        <Styled.PageWrapper
                            key={i}
                            zoom={zoom}
                            ref={el => { pageRefs.current[i] = el; }}
                        >
                            <Styled.ClickZone
                                side="left"
                                onClick={() => scrollToPage(Math.max(0, i - 1))}
                            />
                            <Styled.ClickZone
                                side="right"
                                onClick={() => scrollToPage(Math.min(atHome.chapter.dataSaver.length - 1, i + 1))}
                            />
                            <Styled.MangaPage
                                src={`${atHome.baseUrl}/data-saver/${atHome.chapter.hash}/${filename}`}
                                alt={`Page ${i + 1}`}
                            />
                        </Styled.PageWrapper>
                    ))}
                </Styled.PagesColumn>
            )}

            <Styled.BottomBar>
                <Styled.NavButton
                    disabled={!prev}
                    onClick={() => prev && goTo(prev, currentIndex - 1)}
                >
                    ‹ Prev
                </Styled.NavButton>
                <Styled.NavButton
                    disabled={!next}
                    onClick={() => next && goTo(next, currentIndex + 1)}
                >
                    Next ›
                </Styled.NavButton>
            </Styled.BottomBar>
        </Styled.PageContainer>
    );
};

export default ChapterReader;
