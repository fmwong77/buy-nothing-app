import React from 'react';
import { Segment, Grid, Image } from 'semantic-ui-react';

const Bubble = () => {
	return (
		<div className="sample-page-one">
			<Grid columns="equal">
				<Grid.Row>
					<Grid.Column>
						<Image
							circular
							size="big"
							src="./images/product1.png"
							style={{ marginTop: '2em' }}
						/>
					</Grid.Column>
					<Grid.Column>
						<Image
							circular
							size="small"
							src="./images/product1.png"
							style={{ marginTop: '2em' }}
						/>
					</Grid.Column>
					<Grid.Column>
						<Image
							circular
							size="medium"
							src="./images/product1.png"
							style={{ marginTop: '2em' }}
						/>
					</Grid.Column>
					<Grid.Column>
						<Image
							circular
							size="small"
							src="./images/product1.png"
							style={{ marginTop: '2em' }}
						/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<Image
							circular
							size="big"
							src="./images/product1.png"
							style={{ marginTop: '2em' }}
						/>
					</Grid.Column>
					<Grid.Column>
						<Image
							circular
							size="small"
							src="./images/product1.png"
							style={{ marginTop: '2em' }}
						/>
					</Grid.Column>
					<Grid.Column>
						<Image
							circular
							size="small"
							src="./images/product1.png"
							style={{ marginTop: '2em' }}
						/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<Image
							circular
							size="medium"
							src="./images/product1.png"
							style={{ marginTop: '2em' }}
						/>
					</Grid.Column>
					<Grid.Column>
						<Image
							circular
							size="small"
							src="./images/product1.png"
							style={{ marginTop: '2em' }}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
	);
};

export default Bubble;
