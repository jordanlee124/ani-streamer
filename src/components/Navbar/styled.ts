import styled from "styled-components";
import { UniversalColours } from "../../styles/colours/UniversalColours";

export const NavbarConatiner = styled.div`
    display: flex;
    background: radial-gradient(circle at center, ${UniversalColours.darkGrey} 50%, ${UniversalColours.darkBlue} 100%);
    align-items: center;
    gap: 1em;
    
    height: auto;
    width: 90%;
    
    border-radius: 3em;
    padding: 1em 2em;
    margin-top: 1em;

    position: relative;
    left: 50%;
    transform: translateX(-50%);
`;

export const NavbarLogo = styled.img`
    height: 40px;
    width: 250px;
`;

export const SearchIcon = styled.img`
    height: 1.5em;
    width: 1.5em;
`;

export const NavbarSearchContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: ${UniversalColours.darkBlueGrey};
    gap: 0.5em;
    height: 3em;
    width: 20em;
    padding: 0 1em;
    border-radius: 1em;
`;

export const NavbarSearch = styled.input`
    background-color: ${UniversalColours.darkBlueGrey};
    color: white;
    border: none;
    height: 100%;
    width: 100%;
    font-size: medium;

    &:focus {
        outline: none;
    }
`;