import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import Bubble from './Bubble';
import '../styles/App.css';
import '../styles/Home.css';
import Others from '../assets/others.jpeg';
import Kitchen from '../assets/kitchen.jpeg';
import Furniture from '../assets/furniture.jpeg';
import Toys from '../assets/toys.jpeg';
import Electronics from '../assets/electronics.jpeg';
import Apparel from '../assets/apparel.jpeg';
import Pets from '../assets/pets.jpeg';
import Beauty from '../assets/beauty.jpeg';
import Sports from '../assets/sports.jpeg';
import Books from '../assets/books.jpeg';
import School from '../assets/school.jpeg';

const Home = () => {
	const categoryArr = [
		{
			text: 'Kitchen & Dining',
			id: 2
		},
		{ text: 'Furniture', id: 1 },
		{ text: 'Toys', id: 3 },
		{ text: 'Electronics & Computers', id: 4 },
		{ text: 'Apparel', id: 8 },
		{ text: 'Pets', id: 9 },
		{ text: 'Beauty, Personal Care & Health', id: 5 },
		{ text: 'Sports & Outdoor', id: 6 },
		{ text: 'Video games, movies, music & books', id: 7 },
		{ text: 'School & office supplies', id: 10 },
		{ text: 'Others', id: 11 }
	];

	const renderImage = (category) => {
		switch (category) {
			case 'Kitchen & Dining':
				return Kitchen;
			case 'Furniture':
				return Furniture;
			case 'Toys':
				return Toys;
			case 'Electronics':
				return Electronics;
			case 'Apparel':
				return Apparel;
			case 'Pets':
				return Pets;
			case 'Beauty, Personal Care & Health':
				return Beauty;
			case 'Sports & Outdoor':
				return Sports;
			case 'Video games, movies, music & books':
				return Books;
			case 'School & office supplies':
				return School;
			case 'Others':
				return Others;

			default:
				return Pets;
		}
	};

	return (
		<div className="sample-page-one" id="chart">
			<Container text style={{ marginTop: '7em' }}>
				<Header as="h1">Welcome to Gift-Away!!!</Header>
				<p>Sign in and click on the bubble to view the posted items.</p>

				<div id="categories__container" className="grid">
					{categoryArr.map((category) => (
						<Bubble
							category_id={category.id}
							category={category.text}
							image={renderImage(category.text)}
						/>
					))}
				</div>
			</Container>
		</div>
	);
};

export default Home;
