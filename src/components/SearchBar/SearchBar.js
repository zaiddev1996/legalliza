import { React } from 'react';
import './SearchBar.css';
import { ReactComponent as SearchIcon } from '../../assets/images/search-icon.svg';

export function SearchBar({ className, onChange }) {
	return (
		<div className={`search-bar-main  d-flex ${className}`}>
			<input
				placeholder="Pesquisar Fazendas..."
				className="input-search"
				type={'text'}
				// value={'asd'}
				onChange={(e) => {
					// onChange();
					onChange(e.target.value);
				}}
			/>
			<SearchIcon className="align-self-center search-icon" />
		</div>
	);
}
