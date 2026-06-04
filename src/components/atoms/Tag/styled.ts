import styled from "styled-components";
import { UniversalColours } from "../../../styles/colours/UniversalColours";

export const StyledTag = styled.span`
    display: inline-block;
    background-color: ${UniversalColours.surfaceHover};
    color: ${UniversalColours.textSecondary};
    font-size: 0.72rem;
    font-family: 'Poppins Regular', sans-serif;
    padding: 0.25em 0.65em;
    border-radius: 2em;
    white-space: nowrap;
`;
