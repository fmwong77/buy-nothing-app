import React from 'react';
import { Container } from 'semantic-ui-react';
import ItemCardFront from './ItemCardFront';
import '../styles/ItemCard.css';
import { Grid } from 'semantic-ui-react';

// const useForceUpdate = () => {
// 	const [value, setValue] = useState(0); // integer state
// 	console.log('forceUpdate');
// 	return () => setValue((value) => ++value); // update the state to force render
// };

const ItemCard = (props) => {
	// const forceUpdate = useForceUpdate();
	// useEffect(() => {
	// 	forceUpdate();
	// }, [forceUpdate]);

	return (
		// <Grid relaxed columns={4}>
		<div className="item-card">
			{/* <Container text style={{ marginTop: '7em' }}> */}
			<ItemCardFront {...props} />
			{/* </Container> */}
		</div>
		// </Grid>
	);
};

export default ItemCard;
