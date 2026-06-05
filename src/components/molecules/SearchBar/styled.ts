import styled from "styled-components";
import { UniversalColours } from "../../../styles/colours/UniversalColours";

export const Container = styled.div`
    display: flex;
    align-items: center;
    background-color: ${UniversalColours.background};
    border: 1px solid ${UniversalColours.border};
    gap: 0.5em;
    height: 2.2em;
    width: 22em;
    padding: 0 0.75em;
    border-radius: 0.4em;

    &:focus-within {
        border-color: ${UniversalColours.accent};
    }
`;

export const SearchIcon = styled.img`
    height: 1em;
    width: 1em;
    opacity: 0.5;
`;

export const FilterButton = styled.button<{ active?: boolean }>`
    background: none;
    border: none;
    padding: 0;
    margin-left: auto;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${({ active }) => active ? UniversalColours.accent : UniversalColours.textSecondary};
    flex-shrink: 0;

    &:hover {
        color: ${UniversalColours.textPrimary};
    }

    svg {
        width: 1em;
        height: 1em;
    }
`;

export const Input = styled.input`
    background: transparent;
    color: ${UniversalColours.textPrimary};
    border: none;
    height: 100%;
    width: 100%;
    font-size: 0.875rem;
    font-family: 'Poppins Regular', sans-serif;

    &::placeholder {
        color: ${UniversalColours.textSecondary};
    }

    &:focus {
        outline: none;
    }
`;
