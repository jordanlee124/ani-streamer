import styled from "styled-components";
import { UniversalColours } from "../styles/colours/UniversalColours";

export const HomeContainer = styled.div`
    color: ${UniversalColours.textPrimary};
`;

/* ── Hero ────────────────────────────────────────────────────── */

export const HeroSection = styled.section`
    position: relative;
    height: 28em;
    overflow: hidden;
`;

export const HeroBg = styled.div<{ src: string }>`
    position: absolute;
    inset: 0;
    background-image: url(${({ src }) => src});
    background-size: cover;
    background-position: center top;
    filter: blur(14px) brightness(0.32);
    transform: scale(1.12);
`;

export const HeroGradient = styled.div`
    position: absolute;
    inset: 0;
    background:
        linear-gradient(to right, rgba(25,26,28,0.98) 28%, rgba(25,26,28,0.15) 68%, transparent),
        linear-gradient(to top, rgba(25,26,28,1) 0%, transparent 48%);
`;

export const HeroContent = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 2.5em;
    max-width: 40em;
    z-index: 1;
`;

export const HeroTitle = styled.h1`
    font-family: 'Poppins Bold', sans-serif;
    font-size: 2rem;
    color: ${UniversalColours.textPrimary};
    margin: 0 0 0.35em;
    line-height: 1.15;
`;

export const HeroMeta = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5em;
    margin-bottom: 0.8em;
`;

export const HeroMetaTag = styled.span`
    font-family: 'Poppins Regular', sans-serif;
    font-size: 0.75rem;
    color: ${UniversalColours.textSecondary};
    border: 1px solid ${UniversalColours.border};
    border-radius: 2em;
    padding: 0.15em 0.6em;
`;

export const HeroDescription = styled.p`
    font-family: 'Poppins Regular', sans-serif;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 0 1.4em;
    line-height: 1.7;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const HeroActions = styled.div`
    display: flex;
    gap: 0.75em;
`;

export const HeroButton = styled.button<{ variant?: 'ghost' }>`
    font-family: 'Poppins Bold', sans-serif;
    font-size: 0.875rem;
    padding: 0.55em 1.6em;
    border-radius: 0.4em;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    background-color: ${({ variant }) => variant === 'ghost' ? 'transparent' : UniversalColours.accent};
    border: 1px solid ${({ variant }) => variant === 'ghost' ? UniversalColours.border : UniversalColours.accent};
    color: ${({ variant }) => variant === 'ghost' ? UniversalColours.textSecondary : '#fff'};

    &:hover {
        background-color: ${({ variant }) => variant === 'ghost' ? UniversalColours.surfaceHover : UniversalColours.accentHover};
        border-color: ${({ variant }) => variant === 'ghost' ? UniversalColours.border : UniversalColours.accentHover};
        color: ${UniversalColours.textPrimary};
    }
`;

/* ── Sections ────────────────────────────────────────────────── */

export const Sections = styled.div`
    padding: 2em 2em 3em;
    display: flex;
    flex-direction: column;
    gap: 2.5em;
`;

export const Section = styled.div``;

export const ResultsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.2em;
`;
