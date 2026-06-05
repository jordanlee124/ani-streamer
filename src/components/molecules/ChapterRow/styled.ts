import styled from "styled-components";
import { UniversalColours } from "../../../styles/colours/UniversalColours";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75em 1em;
    border-bottom: 1px solid ${UniversalColours.border};
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: ${UniversalColours.surfaceHover};
    }
`;

export const Left = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    min-width: 0;
`;

export const ChapterLabel = styled.span`
    font-family: 'Poppins Bold', sans-serif;
    font-size: 0.875rem;
    color: ${UniversalColours.textPrimary};
`;

export const ChapterTitle = styled.span`
    font-size: 0.78rem;
    color: ${UniversalColours.textSecondary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5em;
    flex-shrink: 0;
    margin-left: 1em;
`;

export const Meta = styled.span`
    font-size: 0.75rem;
    color: ${UniversalColours.textSecondary};
    white-space: nowrap;
`;
