import styled from "styled-components";
import { UniversalColours } from "../../styles/colours/UniversalColours";

export const PageContainer = styled.div`
    min-height: 100vh;
    background-color: ${UniversalColours.background};
`;

export const TopBar = styled.div`
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 1em;
    background-color: ${UniversalColours.surface};
    border-bottom: 1px solid ${UniversalColours.border};
    padding: 0 2em;
    height: 3.5em;
    box-sizing: border-box;
`;

export const BackButton = styled.button`
    background: none;
    border: none;
    color: ${UniversalColours.textSecondary};
    font-family: 'Poppins Regular', sans-serif;
    font-size: 0.875rem;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 0.3em;
    flex-shrink: 0;

    &:hover {
        color: ${UniversalColours.textPrimary};
    }
`;

export const ChapterLabel = styled.span`
    font-family: 'Poppins Bold', sans-serif;
    font-size: 0.875rem;
    color: ${UniversalColours.textPrimary};
`;

export const PageCounter = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3em;
    margin-left: auto;
    font-size: 0.8rem;
    color: ${UniversalColours.textSecondary};
    font-family: 'Poppins Regular', sans-serif;
    flex-shrink: 0;
`;

export const BottomBar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    background-color: ${UniversalColours.surface};
    border-top: 1px solid ${UniversalColours.border};
    padding: 0.75em 2em;
`;

export const NavButton = styled.button<{ disabled?: boolean }>`
    background-color: ${UniversalColours.surfaceHover};
    border: 1px solid ${UniversalColours.border};
    border-radius: 0.3em;
    color: ${({ disabled }) => disabled ? UniversalColours.textSecondary : UniversalColours.textPrimary};
    font-size: 0.875rem;
    font-family: 'Poppins Regular', sans-serif;
    padding: 0.5em 1.5em;
    cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
    opacity: ${({ disabled }) => disabled ? 0.35 : 1};
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;

    &:hover:not([disabled]) {
        background-color: ${UniversalColours.accent};
        border-color: ${UniversalColours.accent};
        color: #fff;
    }
`;

export const PagesColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25em;
    padding: 1.5em 0 6em;
`;

export const PageWrapper = styled.div<{ zoom: number }>`
    position: relative;
    max-width: ${({ zoom }) => `min(${Math.round(800 * zoom)}px, 100%)`};
    width: 100%;
    display: block;
`;

export const ZoomControls = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 0.4em;
`;

export const ZoomButton = styled.button`
    background: none;
    border: 1px solid ${UniversalColours.border};
    border-radius: 0.25em;
    color: ${UniversalColours.textSecondary};
    font-size: 0.875rem;
    width: 1.75em;
    height: 1.75em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;

    &:hover:not(:disabled) {
        color: ${UniversalColours.textPrimary};
        border-color: ${UniversalColours.accent};
    }

    &:disabled {
        opacity: 0.35;
        cursor: default;
    }
`;

export const ZoomInput = styled.input`
    font-size: 0.8rem;
    color: ${UniversalColours.textPrimary};
    font-family: 'Poppins Regular', sans-serif;
    background: none;
    border: 1px solid transparent;
    border-radius: 0.25em;
    padding: 0.1em 0.25em;
    width: 3.5em;
    text-align: center;
    outline: none;

    &:hover {
        border-color: ${UniversalColours.border};
    }

    &:focus {
        border-color: ${UniversalColours.accent};
        background: ${UniversalColours.surface};
    }
`;

export const MangaPage = styled.img`
    width: 100%;
    display: block;
`;

export const ClickZone = styled.div<{ side: 'left' | 'right' }>`
    position: absolute;
    top: 0;
    bottom: 0;
    ${({ side }) => side}: 0;
    width: 50%;
    cursor: ${({ side }) => side === 'left' ? 'w-resize' : 'e-resize'};
    z-index: 1;
`;

export const LoadingCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60vh;
    color: ${UniversalColours.textSecondary};
    font-size: 0.875rem;
`;
