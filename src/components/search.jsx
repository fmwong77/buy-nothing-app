/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { Form, Checkbox } from 'semantic-ui-react';
import { fetchCategories, allPosts, filterInfo } from '../actions';
import { useSelector, useDispatch } from 'react-redux';

const Search = (props) => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const category = useSelector((state) => state.filterInfo);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(fetchCategories());
	}, []);

	const handleFilter = (e) => {
		e.preventDefault();

		let searchTerm = '';
		const searchAll = e.target.name === 'showAll';
		const token = localStorage.getItem('token');
		let filteredArray;

		if (!searchAll) {
			searchTerm = e.target.searchTerm.value;
		} else {
			dispatch(filterInfo({ category: '', category_id: null }));
		}

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
				if (
					(searchTerm.length === 0 &&
						category.category_id === 0 &&
						category.category_id === null) ||
					searchAll
				) {
					dispatch(allPosts(data));
				} else if (
					(category.category_id !== null) &
					(category.category_id !== 0)
				) {
					filteredArray = data
						.filter((p) => p.title.includes(searchTerm))
						.filter((cat) => cat.category_id === category.category_id);
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
						dispatch(
							filterInfo({
								category_id: value,
								category: text
							})
						);
					}}
					// text={category.category}
				/>
				<button type="submit" className="ui secondary button">
					Filter
				</button>
				<button
					name="showAll"
					className="ui secondary button"
					onClick={(e) => handleFilter(e)}
				>
					Show All
				</button>
			</form>
		</div>
	);
};

export default Search;
