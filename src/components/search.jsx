/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
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
			`https://gift-away-backend.herokuapp.com/api/v1/posts?type=${props.type}&user_id=${user.id}`,
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
			<Grid textAlign="center" verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 550 }}>
					<Form onSubmit={(event) => handleFilter(event)}>
						<Form.Field>
							<input placeholder="Filter by Title" name="searchTerm" />
						</Form.Field>
						<Form.Select
							fluid
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
						/>
						<Button type="submit" secondary>
							Filter
						</Button>
						<Button
							type="submit"
							name="showAll"
							onClick={(e) => handleFilter(e)}
							secondary
						>
							Show All
						</Button>
					</Form>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default Search;
