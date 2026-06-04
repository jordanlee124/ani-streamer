import styled from "styled-components";
import { UniversalColours } from "../../../styles/colours/UniversalColours";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
    margin-bottom: 1.2em;
`;

export const Title = styled.h2`
    font-family: 'Poppins Bold', sans-serif;
    font-size: 1rem;
    color: ${UniversalColours.textPrimary};
    margin: 0;
`;
