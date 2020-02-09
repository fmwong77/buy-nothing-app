/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { fetchCategories, allPosts } from '../actions';
import { useSelector, useDispatch } from 'react-redux';

const Search = (props) => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	let category_id = null;
	const user = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(fetchCategories());
	}, []);

	const handleFilter = (e) => {
		e.preventDefault();

		let filteredArray;
		const searchTerm = e.target.searchTerm.value;
		const token = localStorage.getItem('token');

		fetch(
			`http://localhost:3000/api/v1/posts?type=${props.type}&user_id=${user.id}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (searchTerm.length === 0 && category_id === 0) {
					dispatch(allPosts(data));
				} else if ((category_id !== null) & (category_id !== 0)) {
					filteredArray = data
						.filter((p) => p.title.includes(searchTerm))
						.filter((cat) => cat.category_id === category_id);
					dispatch(allPosts(filteredArray));
				} else {
					filteredArray = data.filter((p) => p.title.includes(searchTerm));
					dispatch(allPosts(filteredArray));
				}
			});
	};

	const renderCategory = () => {
		let categoriesArr = [{ key: 0, text: 'All Category', value: 0 }];

		let arr = categories.categories.map((cat) => {
			return {
				key: cat.id,
				text: cat.category,
				value: cat.id
			};
		});

		return categoriesArr.concat(arr);
	};

	return (
		<div className="ui search">
			<form onSubmit={(event) => handleFilter(event)}>
				<div className="ui icon input">
					Search by Title:<br></br>
					<input
						className="prompt"
						// onChange={(event) => onChange(event)}
						name="searchTerm"
					/>
					<i className="search icon" />
				</div>

				<Form.Select
					// fluid
					label="Category"
					name="category"
					options={renderCategory()}
					placeholder="Select a Category"
					onChange={(e, { value, text }) => {
						category_id = value;
					}}
				/>
				<button type="submit" className="ui secondary button">
					Filter
				</button>
			</form>
		</div>
	);
};

export default Search;
