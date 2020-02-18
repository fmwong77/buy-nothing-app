import React from 'react';
import ItemCardFront from './ItemCardFront';
import '../styles/ItemCard.css';

const ItemCard = (props) => {
	return (
		<div className="item-card">
			<ItemCardFront {...props} />
		</div>
	);
};

export default ItemCard;
