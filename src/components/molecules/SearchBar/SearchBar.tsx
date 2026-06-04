import React, { KeyboardEvent, useState } from "react";
import * as Styled from "./styled";
import searchIcon from "../../../assets/search.png";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FunctionComponent<SearchBarProps> = ({ onSearch }) => {
    const [value, setValue] = useState("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && value.trim()) {
            onSearch(value.trim());
            setValue("");
        }
    };

    return (
        <Styled.Container>
            <Styled.SearchIcon src={searchIcon} alt="search" />
            <Styled.Input
                placeholder="Search Manga..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </Styled.Container>
    );
};

export default SearchBar;
