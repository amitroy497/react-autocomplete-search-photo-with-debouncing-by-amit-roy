import { FC, useState } from 'react';
import './index.css';

interface AutoCompleteProps {
	items: string;
	stateUpTitle: (arg0: string) => void;
}

const AutoComplete: FC<AutoCompleteProps> = ({ items, stateUpTitle }) => {
	const [suggestions, setSuggestions] = useState([]);
	const [text, setText] = useState('');

	const getSuggestion: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const value = e.target.value;
		let time: number = 0;
		clearTimeout(time);
		let data: [] = [];
		time = setTimeout(() => {
			if (value.length > 0) {
				const regEx = new RegExp(`${value}`, 'i');
				data = JSON.parse(items).filter((v: string) => regEx.test(v));
			}
			setSuggestions(data);
		}, 3000);
		setText(value);
	};

	const suggestionSelected = (value: string) => {
		setText(value);
		setSuggestions([]);
	};
	const renderSuggestions = () => {
		if (suggestions.length === 0) {
			return null;
		}
		return (
			<section className='autoCompleteSection'>
				{suggestions.map((item, index) => (
					<div
						className='autoCompleteField'
						key={index}
						onClick={() => {
							suggestionSelected(item);
							stateUpTitle(item);
						}}
					>
						{item}
					</div>
				))}
			</section>
		);
	};
	return (
		<article className='autoCompleteContainer'>
			<input type='text' value={text} onChange={getSuggestion} />
			{renderSuggestions()}
		</article>
	);
};

export default AutoComplete;
