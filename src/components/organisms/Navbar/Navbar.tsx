import React from "react";
import { useDispatch } from "react-redux";
import { SearchBar } from "../../molecules";
import { SearchManga } from "../../../store/ConsumeNetStore/operations";
import logo from "../../../assets/Logo.png";
import * as Styled from "./styled";

const Navbar: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    return (
        <Styled.Container>
            <Styled.Logo src={logo} alt="Logo" />
            <SearchBar onSearch={(query) => SearchManga(query, dispatch)} />
        </Styled.Container>
    );
};

export default Navbar;
