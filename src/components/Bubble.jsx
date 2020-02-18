/* eslint-disable no-lone-blocks */
import React from 'react';
import '../styles/Bubble.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterInfo } from '../actions';

const Bubble = (props) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(
			filterInfo({
				category_id: props.category_id,
				category: props.category
			})
		);
	};

	return (
		<div className="bubble__container">
			<Link to="/post-browser">
				<span
					className="bubble"
					style={{
						backgroundImage: `url('${props.image}'`
					}}
					onClick={handleClick}
				>
					<div className="overlay">
						<span className="bubble__text">{props.category}</span>
					</div>
				</span>
			</Link>
		</div>
	);
};

export default Bubble;
