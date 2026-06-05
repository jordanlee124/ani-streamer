import styled from "styled-components";
import { UniversalColours } from "../../../styles/colours/UniversalColours";

export const Container = styled.nav`
    display: flex;
    align-items: center;
    background-color: ${UniversalColours.surface};
    border-bottom: 1px solid ${UniversalColours.border};
    padding: 0 2em;
    height: 3.5em;
    width: 100%;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 100;
`;

export const Logo = styled.img`
    height: 28px;
    width: auto;
    margin-right: 2em;
    cursor: pointer;
`;
