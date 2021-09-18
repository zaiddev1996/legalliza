import { React } from 'react';
import './SearchBar.css';
import { ReactComponent as SearchIcon } from '../../assets/images/search-icon.svg';

export function SearchBar({ className }) {
	return (
		<div className={`search-bar-main  d-flex ${className}`}>
			<input placeholder="Pesquisar Fazendas..." className="input-search" />
			<SearchIcon className="align-self-center search-icon" />
		</div>
	);
}
