import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';

import { Container, Dropdown, Image, Icon, Menu } from 'semantic-ui-react';

import '../styles/NavBar.css';
import Login from './Login';
import SignUp from './SignUp';

class NavBar extends Component {
	state = {};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;

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
							Gift Away
						</Menu.Item>
						<Menu.Item
							as={Link}
							to="home"
							name="home"
							active={activeItem === 'home'}
							onClick={this.handleItemClick}
						></Menu.Item>

						<Menu.Item
							as={Link}
							to="first-page"
							name="first-page"
							active={activeItem === 'first-page'}
							onClick={this.handleItemClick}
						>
							Page 1
						</Menu.Item>

						<Dropdown item simple text="Member's Area">
							<Dropdown.Menu>
								<Dropdown.Item>Manage My Post</Dropdown.Item>
								<Dropdown.Item>Change Password</Dropdown.Item>
								{/* <Dropdown.Divider />
								<Dropdown.Header>Header Item</Dropdown.Header>
								<Dropdown.Item>
									<Icon name="dropdown" />
									<span className="text">Submenu</span>
									<Dropdown.Menu>
										<Dropdown.Item>List Item</Dropdown.Item>
										<Dropdown.Item>List Item</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown.Item>
								<Dropdown.Item>List Item</Dropdown.Item> */}
							</Dropdown.Menu>
						</Dropdown>
						<Menu.Item
							as={Link}
							to="sign-up"
							name="sign-up"
							active={activeItem === 'sign-up'}
							onClick={this.handleItemClick}
						>
							Sign Up
						</Menu.Item>
						<Menu.Item
							as={Link}
							to="sign-in"
							name="sign-in"
							active={activeItem === 'sign-in'}
							onClick={this.handleItemClick}
						>
							Sign In
						</Menu.Item>
					</Container>
				</Menu>
			</div>
		);
	}
}

export default NavBar;
