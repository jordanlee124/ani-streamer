import React, { KeyboardEvent, useEffect, useState } from 'react';
import * as Styled from './styled';
import logo from '../../assets/Logo.png';
import searchIcon from '../../assets/search.png'
import { SearchAnime } from '../../store/ConsumeNetStore/operations';
import { useDispatch, useSelector } from 'react-redux';

const Navbar: React.FunctionComponent = () => {
	var [search, setSearch] = useState<string>('');
	var dispatch = useDispatch();
	
	const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			SearchAnime(search, dispatch);
			setSearch('');
		}
	};

	return (
		<Styled.NavbarConatiner>
			<Styled.NavbarLogo src={logo} alt='Logo'/>
			<Styled.NavbarSearchContainer>
				<Styled.SearchIcon src={searchIcon}/>
				<Styled.NavbarSearch 
					placeholder='Search Anime...'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={(e) => handleOnKeyDown(e)}
				/>
			</Styled.NavbarSearchContainer>
		</Styled.NavbarConatiner>
	);
};

export default Navbar;