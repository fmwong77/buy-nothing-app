import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';

const Home = () => {
	return (
		<div className="sample-page-one" id="chart">
			<Container text style={{ marginTop: '7em' }}>
				<Header as="h1">Welcome to Gift Away!!!</Header>
				<p>This is a basic fixed menu template using fixed size containers.</p>
				<p>
					A text container is used for the main container, which is useful for
					single column layouts.
				</p>

				{/* <Bubble /> */}
			</Container>
		</div>
	);
};

export default Home;
