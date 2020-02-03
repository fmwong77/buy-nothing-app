import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container, Dropdown, Image, Menu, Icon } from 'semantic-ui-react';

import '../styles/NavBar.css';
import { signOut } from '../actions';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name });
		if (name === 'sign-out') {
			this.props.signOut({
				id: null,
				username: null,
				isSignedIn: false
			});

			console.log(this.props);

			// this.props.history.push('/');
		}
	};

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
							// to="item-browser"
							// name="item-browser"
							// active={activeItem === 'item-browser'}
							// onClick={this.handleItemClick}
						></Menu.Item>

						<Dropdown item simple text="Member's Area">
							<Dropdown.Menu>
								{this.props.isSignedIn ? (
									<Dropdown.Item as={Link} to="item-browser">
										View Posts
									</Dropdown.Item>
								) : (
									<Dropdown.Item as={Link} to="sign-in">
										View Posts
									</Dropdown.Item>
								)}
								{this.props.isSignedIn ? (
									<Dropdown.Item as={Link} to="manage-my-post">
										Manage My Post
									</Dropdown.Item>
								) : (
									<Dropdown.Item as={Link} to="sign-in">
										Manage My Post
									</Dropdown.Item>
								)}
								{/* {this.props.isSignedIn ? ( */}
								<Dropdown.Item>Change Password</Dropdown.Item>
								{/* ) : (
									<Dropdown.Item as={Link} to="sign-in">
										Change Password
									</Dropdown.Item>
								)} */}
								<Dropdown.Divider />
								<Dropdown.Header>Manage My Post</Dropdown.Header>
								<Dropdown.Item>
									<Icon name="dropdown" />
									<span className="text">Submenu</span>
									<Dropdown.Menu>
										<Dropdown.Item>Create New Post</Dropdown.Item>
										<Dropdown.Item>Edit Current Post</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown.Item>
								<Dropdown.Item>Change Password</Dropdown.Item>
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
						{this.props.isSignedIn ? (
							<Menu.Item
								as={Link}
								to="sign-out"
								name="sign-out"
								active={activeItem === 'sign-out'}
								onClick={this.handleItemClick}
							>
								Sign Out
							</Menu.Item>
						) : (
							<Menu.Item
								as={Link}
								to="sign-in"
								name="sign-in"
								active={activeItem === 'sign-in'}
								onClick={this.handleItemClick}
							>
								Sign In
							</Menu.Item>
						)}
					</Container>
				</Menu>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state.user.isSignedIn);

	return { isSignedIn: state.user.isSignedIn };
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: (user) => {
			console.log(user);

			dispatch(signOut(user));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
