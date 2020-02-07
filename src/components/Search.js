/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { fetchCategories } from '../actions';
import { useSelector, useDispatch } from 'react-redux';

const Search = (props) => {
	const dispatch = useDispatch();
	// const categories = useSelector((state) => state.categories);
	const [categories, setCategories] = useState('');

	useEffect(() => {
		dispatch(fetchCategories());
	}, []);

	const handleFilter = (e) => {
		e.preventDefault();

		let filteredArray;
		if (e.target.filter.value === 'All') {
			filteredArray = this.state.allBots.filter((b) =>
				b.name.includes(e.target.searchTerm.value)
			);
		} else {
			filteredArray = this.state.allBots
				.filter((bot) => bot.bot_class === e.target.filter.value)
				.filter((b) => b.name.includes(e.target.searchTerm.value));
		}
		this.setState({ bots: filteredArray });
	};

	const onChange = (e) => {
		// console.log(e.target.value);

		// const filteredArray = this.state.allBots.filter((bot) =>
		// 	bot.name.includes(e.target.value)
		// );

		// this.setState({ bots: filteredArray });
		setCategories();
	};

	const handleCheckbox = () => {};
	console.log(categories);

	return (
		<div className="ui search">
			<form onSubmit={(event) => handleFilter(event)}>
				<div className="ui icon input">
					Search by Title:<br></br>
					<input
						className="prompt"
						onChange={(event) => onChange(event)}
						name="searchTerm"
					/>
					<i className="search icon" />
				</div>
				<Form.Select
					fluid
					// label="Category"
					name="category"
					options={
						categories.categories === undefined
							? null
							: categories.categories.map((cat) => {
									return {
										key: cat.id,
										text: cat.category,
										value: cat.id
									};
							  })
					}
					placeholder="Select a Category"
					onChange={(e, { value, text }) => {
						// setCategory(text);
					}}
				/>
				<div class="ui checkbox">
					<input
						type="checkbox"
						class="hidden"
						readonly=""
						tabindex="0"
						onChange={handleCheckbox}
					/>
					<label>Show all</label>
				</div>
				<button type="submit" className="ui secondary button">
					Filter
				</button>
			</form>
		</div>
	);
};

export default Search;
