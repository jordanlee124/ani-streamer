import styled from "styled-components";
import { UniversalColours } from "../../../styles/colours/UniversalColours";

export const StyledBadge = styled.span`
    position: absolute;
    top: 0.3em;
    left: 0.3em;
    background: rgba(0, 0, 0, 0.75);
    color: ${UniversalColours.textPrimary};
    font-size: 0.7em;
    font-family: 'Poppins Bold', sans-serif;
    padding: 0.15em 0.45em;
    border-radius: 0.25em;
`;
