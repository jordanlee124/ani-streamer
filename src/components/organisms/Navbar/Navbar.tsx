import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../molecules";
import { SearchManga } from "../../../store/ConsumeNetStore/operations";
import logo from "../../../assets/Logo.png";
import * as Styled from "./styled";

const Navbar: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Styled.Container>
            <Styled.Logo src={logo} alt="Logo" onClick={() => navigate('/')} />
            <SearchBar
                onSearch={(query) => SearchManga(query, dispatch)}
                onFilter={() => navigate('/search')}
            />
        </Styled.Container>
    );
};

export default Navbar;
