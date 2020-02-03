import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';

import '../styles/NavBar.css';
import { signOut } from '../actions';

const NavBar = () => {
	const dispatch = useDispatch();
	const isSignedIn = useSelector((state) => state.user);

	const handleItemClick = (e, { name }) => {
		// setState({ activeItem: name });
		if (name === 'sign-out') {
			dispatch(
				signOut({
					id: null,
					username: null,
					isSignedIn: false
				})
			);
		}
	};

	// const { activeItem } = state;

	return (
		<div className="App">
			<Menu fixed="top" inverted>
				<Container>
					<Menu.Item as="a" header>
						<Image
							size="mini"
							src="/static/images/logo.png"
							style={{ marginRight: '1.5em' }}
						/>
						Gift Away - {isSignedIn}
					</Menu.Item>
					<Menu.Item
						as={Link}
						to="home"
						name="home"
						// active={activeItem === 'home'}
						onClick={handleItemClick}
					></Menu.Item>

					<Menu.Item
						as={Link}
						to="first-page"
						name="first-page"
						// active={activeItem === 'first-page'}
						onClick={handleItemClick}
					>
						Page 1
					</Menu.Item>

					<Dropdown item simple text="Member's Area">
						<Dropdown.Menu>
							<Dropdown.Item>Manage My Post</Dropdown.Item>
							<Dropdown.Item>Change Password</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Menu.Item
						as={Link}
						to="sign-up"
						name="sign-up"
						// active={activeItem === 'sign-up'}
						onClick={handleItemClick}
					>
						Sign Up
					</Menu.Item>
					{isSignedIn ? (
						<Menu.Item
							as={Link}
							to="sign-out"
							name="sign-out"
							// active={activeItem === 'sign-out'}
							onClick={handleItemClick}
						>
							Sign Out
						</Menu.Item>
					) : (
						<Menu.Item
							as={Link}
							to="sign-in"
							name="sign-in"
							// active={activeItem === 'sign-in'}
							onClick={handleItemClick}
						>
							Sign In
						</Menu.Item>
					)}
				</Container>
			</Menu>
		</div>
	);
};

export default NavBar;
