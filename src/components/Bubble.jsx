import React from 'react';
import '../styles/Bubble.css';

const Bubble = (props) => {
	const handleClick = (category) => {
		console.log(props.category);
	};
	return (
		<div className="bubble__container">
			<span
				className="bubble"
				style={{ backgroundImage: `url('${props.image}'` }}
				onClick={handleClick}
			>
				{/* <span className="bubble__text">{category}</span> */}
			</span>
		</div>
	);
};

export default Bubble;
