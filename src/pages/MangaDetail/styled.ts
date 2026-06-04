import styled from "styled-components";
import { UniversalColours } from "../../styles/colours/UniversalColours";

export const PageContainer = styled.div`
    padding: 2em;
    color: ${UniversalColours.textPrimary};
`;

export const HeroCell = styled.div`
    display: flex;
    gap: 2em;
    background-color: ${UniversalColours.surface};
    border-radius: 0.6em;
    padding: 2em;
`;

export const CoverImage = styled.img`
    width: 13em;
    flex-shrink: 0;
    border-radius: 0.4em;
    object-fit: cover;
    align-self: flex-start;
`;

export const InfoPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    min-width: 0;
`;

export const Title = styled.h1`
    font-family: 'Poppins Bold', sans-serif;
    font-size: 1.6rem;
    color: ${UniversalColours.textPrimary};
    margin: 0;
`;

export const MetaRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
    font-size: 0.85rem;
    color: ${UniversalColours.textSecondary};
`;

export const StatusPill = styled.span<{ status: string }>`
    font-size: 0.75rem;
    font-family: 'Poppins Bold', sans-serif;
    padding: 0.2em 0.7em;
    border-radius: 2em;
    text-transform: capitalize;
    background-color: ${({ status }) => {
        switch (status) {
            case 'ongoing':  return '#1a6b3c';
            case 'completed': return '#1a3d6b';
            case 'hiatus':   return '#6b4e1a';
            case 'cancelled': return '#6b1a1a';
            default:          return '#3c3f43';
        }
    }};
    color: #fff;
`;

export const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4em;
`;

export const Description = styled.p`
    font-size: 0.875rem;
    color: ${UniversalColours.textSecondary};
    line-height: 1.7;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const BackButton = styled.button`
    background: none;
    border: none;
    color: ${UniversalColours.textSecondary};
    font-family: 'Poppins Regular', sans-serif;
    font-size: 0.875rem;
    cursor: pointer;
    padding: 0;
    margin-bottom: 1.5em;
    display: flex;
    align-items: center;
    gap: 0.3em;

    &:hover {
        color: ${UniversalColours.textPrimary};
    }
`;
