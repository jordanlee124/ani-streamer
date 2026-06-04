import styled from "styled-components";
import { UniversalColours } from "../../../styles/colours/UniversalColours";

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 9em;
    flex-shrink: 0;
    cursor: pointer;

    &:hover img {
        opacity: 0.8;
    }

    &:hover p {
        color: ${UniversalColours.accent};
    }
`;

export const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-top: 142%;
    border-radius: 0.3em;
    overflow: hidden;
    background-color: ${UniversalColours.surface};
`;

export const CoverImage = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    transition: opacity 0.15s ease;
`;

export const Title = styled.p`
    margin-top: 0.4em;
    font-size: 0.78em;
    color: ${UniversalColours.textPrimary};
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.15s ease;
`;
