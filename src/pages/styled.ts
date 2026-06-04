import styled from "styled-components";
import { UniversalColours } from "../styles/colours/UniversalColours";

export const HomeContainer = styled.div`
    padding: 2em;
    color: ${UniversalColours.textPrimary};
`;

export const ResultsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.2em;
`;
