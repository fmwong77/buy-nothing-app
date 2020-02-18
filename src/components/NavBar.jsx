import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Dropdown, Menu, Icon } from 'semantic-ui-react';

import '../styles/NavBar.css';
import { signIn, postInfo, filterInfo } from '../actions';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name });
		if (name === 'sign-out') {
			this.props.signIn({
				id: null,
				username: '',
				isSignedIn: false
			});

			this.props.postInfo({
				category_id: null,
				category: ''
			});

			this.props.filterInfo({
				category_id: null,
				category: ''
			});

			localStorage.removeItem('token');
		}
	};

	render() {
		const { activeItem } = this.state;

		return (
			<div className="App">
				<Menu fixed="top" inverted>
					<Container>
						<Menu.Item header>
							<i class="fa fa-diamond fa-2x" aria-hidden="true"></i>
							Gift-Away
						</Menu.Item>
						<Menu.Item
							as={Link}
							to="/"
							name="home"
							active={activeItem === 'home'}
							onClick={this.handleItemClick}
						></Menu.Item>

						<Menu.Item as={Link}></Menu.Item>

						<Dropdown item simple text="Member's Area">
							<Dropdown.Menu>
								{this.props.isSignedIn ? (
									<Dropdown.Item as={Link} to="/post-browser">
										View Posts
									</Dropdown.Item>
								) : (
									<Dropdown.Item as={Link} to="/sign-in">
										View Posts
									</Dropdown.Item>
								)}
								<Dropdown.Divider />
								<Dropdown.Item>
									<Icon name="dropdown" />
									<span className="text">Manage My Post</span>
									<Dropdown.Menu>
										<Dropdown.Item as={Link} to="/new-post">
											Create New Post
										</Dropdown.Item>
										<Dropdown.Item as={Link} to="/manage-my-post">
											Edit My Post
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown.Item>
								<Dropdown.Item as={Link} to="/change-password">
									Change Password
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Menu.Item
							as={Link}
							to="/sign-up"
							name="sign-up"
							active={activeItem === 'sign-up'}
							onClick={this.handleItemClick}
						>
							Sign Up
						</Menu.Item>
						{this.props.isSignedIn ? (
							<Menu.Item
								as={Link}
								to="/"
								name="sign-out"
								active={activeItem === 'sign-out'}
								onClick={this.handleItemClick}
							>
								Sign Out
							</Menu.Item>
						) : (
							<Menu.Item
								as={Link}
								to="/sign-in"
								name="sign-in"
								active={activeItem === 'sign-in'}
								onClick={this.handleItemClick}
							>
								Sign In
							</Menu.Item>
						)}
						{!this.props.isSignedIn ? null : (
							<Menu.Item>Welcome {this.props.username}</Menu.Item>
						)}
					</Container>
				</Menu>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.user.isSignedIn, username: state.user.username };
};

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (user) => {
			dispatch(signIn(user));
		},
		postInfo: () => {
			dispatch(postInfo({ category_id: null, category: '', image: null }));
		},
		filterInfo: () => {
			dispatch(filterInfo({ category_id: null, category: '' }));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
