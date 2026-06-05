import React, { KeyboardEvent, useState } from "react";
import * as Styled from "./styled";
import searchIcon from "../../../assets/search.png";

interface SearchBarProps {
    onSearch: (query: string) => void;
    onFilter?: () => void;
    filterActive?: boolean;
}

const SearchBar: React.FunctionComponent<SearchBarProps> = ({ onSearch, onFilter, filterActive }) => {
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
            <Styled.FilterButton active={filterActive} onClick={onFilter} aria-label="Filter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
            </Styled.FilterButton>
        </Styled.Container>
    );
};

export default SearchBar;
