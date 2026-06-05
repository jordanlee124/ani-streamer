import styled from "styled-components";
import { UniversalColours } from "../../styles/colours/UniversalColours";

export const PageContainer = styled.div`
    padding: 2em;
    color: ${UniversalColours.textPrimary};
    max-width: 960px;
    margin: 0 auto;
`;

export const PageTitle = styled.h1`
    font-family: 'Poppins Bold', sans-serif;
    font-size: 1.4rem;
    margin: 0 0 1.5em;
    color: ${UniversalColours.textPrimary};
`;

export const FilterSection = styled.div`
    background-color: ${UniversalColours.surface};
    border: 1px solid ${UniversalColours.border};
    border-radius: 0.5em;
    padding: 1.5em;
    display: flex;
    flex-direction: column;
    gap: 1.25em;
    margin-bottom: 2em;
`;

export const FilterGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

export const FilterLabel = styled.span`
    font-family: 'Poppins Bold', sans-serif;
    font-size: 0.75rem;
    color: ${UniversalColours.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.06em;
`;

export const FilterPills = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
`;

export const FilterPill = styled.button<{ active: boolean }>`
    font-family: 'Poppins Regular', sans-serif;
    font-size: 0.8rem;
    padding: 0.3em 0.9em;
    border-radius: 2em;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    background-color: ${({ active }) => active ? UniversalColours.accent : 'transparent'};
    border: 1px solid ${({ active }) => active ? UniversalColours.accent : UniversalColours.border};
    color: ${({ active }) => active ? '#fff' : UniversalColours.textSecondary};

    &:hover {
        border-color: ${({ active }) => active ? UniversalColours.accentHover : UniversalColours.textSecondary};
        color: ${({ active }) => active ? '#fff' : UniversalColours.textPrimary};
        background-color: ${({ active }) => active ? UniversalColours.accentHover : 'transparent'};
    }
`;

export const TitleInput = styled.input`
    background-color: ${UniversalColours.background};
    border: 1px solid ${UniversalColours.border};
    border-radius: 0.4em;
    color: ${UniversalColours.textPrimary};
    font-family: 'Poppins Regular', sans-serif;
    font-size: 0.875rem;
    padding: 0.55em 0.9em;
    width: 100%;
    box-sizing: border-box;
    outline: none;

    &::placeholder {
        color: ${UniversalColours.textSecondary};
    }

    &:focus {
        border-color: ${UniversalColours.accent};
    }
`;

export const TagsHeader = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75em;
    margin-bottom: 0.25em;
`;

export const TagHint = styled.span`
    font-family: 'Poppins Regular', sans-serif;
    font-size: 0.75rem;
    color: ${UniversalColours.textSecondary};
    font-style: italic;
`;

export const ModeToggleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.35em;
    margin-left: auto;
`;

export const ModeLabel = styled.span`
    font-family: 'Poppins Regular', sans-serif;
    font-size: 0.75rem;
    color: ${UniversalColours.textSecondary};
`;

export const ModeToggleBtn = styled.button<{ active: boolean }>`
    font-family: 'Poppins Bold', sans-serif;
    font-size: 0.7rem;
    padding: 0.15em 0.5em;
    border-radius: 0.25em;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    background-color: ${({ active }) => active ? UniversalColours.accent : 'transparent'};
    border: 1px solid ${({ active }) => active ? UniversalColours.accent : UniversalColours.border};
    color: ${({ active }) => active ? '#fff' : UniversalColours.textSecondary};

    &:hover {
        border-color: ${UniversalColours.accent};
        color: #fff;
        background-color: ${UniversalColours.accentHover};
    }
`;

export const TagGroupSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4em;
    margin-top: 0.5em;
`;

export const TagGroupTitle = styled.span`
    font-family: 'Poppins Bold', sans-serif;
    font-size: 0.7rem;
    color: ${UniversalColours.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const TagsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4em;
`;

export const TagPill = styled.button<{ state: 'included' | 'excluded' | 'none' }>`
    font-family: 'Poppins Regular', sans-serif;
    font-size: 0.75rem;
    padding: 0.2em 0.65em;
    border-radius: 2em;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    background-color: ${({ state }) =>
        state === 'included' ? UniversalColours.accent :
        state === 'excluded' ? UniversalColours.error : 'transparent'};
    border: 1px solid ${({ state }) =>
        state === 'included' ? UniversalColours.accent :
        state === 'excluded' ? UniversalColours.error : UniversalColours.border};
    color: ${({ state }) => state !== 'none' ? '#fff' : UniversalColours.textSecondary};

    &:hover {
        color: ${UniversalColours.textPrimary};
        border-color: ${({ state }) =>
            state === 'excluded' ? UniversalColours.errorHover : UniversalColours.textSecondary};
        background-color: ${({ state }) =>
            state === 'included' ? UniversalColours.accentHover :
            state === 'excluded' ? UniversalColours.errorHover : 'transparent'};
    }
`;

export const SearchButton = styled.button`
    font-family: 'Poppins Bold', sans-serif;
    font-size: 0.875rem;
    padding: 0.6em 2em;
    border-radius: 0.4em;
    cursor: pointer;
    background-color: ${UniversalColours.accent};
    border: 1px solid ${UniversalColours.accent};
    color: #fff;
    align-self: flex-start;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: ${UniversalColours.accentHover};
        border-color: ${UniversalColours.accentHover};
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

export const ResultsHeader = styled.p`
    font-family: 'Poppins Regular', sans-serif;
    font-size: 0.875rem;
    color: ${UniversalColours.textSecondary};
    margin: 0 0 1em;
`;

export const ResultsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.2em;
`;
