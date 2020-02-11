import React from 'react';
import { Button } from 'semantic-ui-react';
import '../styles/Popup.css';

const Popup = (props) => {
	const closeModal = () => {
		const modalEl = document.getElementById('rng__modal');

		modalEl.classList.remove('show__modal');
	};

	return (
		<div id="rng__modal" className={props.className}>
			<div id="rng__popup">
				{/* The X removes the show__modal class from rng__modal */}
				<span id="close__modal-X" onClick={(e) => closeModal(e)}>
					x
				</span>
				<h3>Please Enter a range to generate your Random Number</h3>
				<label htmlFor="lowerBound">Lower Bound:</label>
				<input type="text" name="lowerBound" />
				<label htmlFor="upperBound">Upper Bound:</label>
				<input type="text" name="upperBound" />
				<Button>Generate</Button>
			</div>
		</div>
	);
};

export default Popup;
