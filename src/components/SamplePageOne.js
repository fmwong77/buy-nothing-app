import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';

const SamplePageOne = () => {
	return (
		<div className="sample-page-one">
			<Container text style={{ marginTop: '7em' }}>
				<p>Welcome to Sample Page One!!!</p>
				<Header as="h1">Semantic UI React Fixed Template</Header>
				<p>This is a basic fixed menu template using fixed size containers.</p>
				<p>
					A text container is used for the main container, which is useful for
					single column layouts.
				</p>

				<Image
					src="/static/images/wireframe/media-paragraph.png"
					style={{ marginTop: '2em' }}
				/>
				<Image
					src="/static/images/wireframe/paragraph.png"
					style={{ marginTop: '2em' }}
				/>
				<Image
					src="/static/images/wireframe/paragraph.png"
					style={{ marginTop: '2em' }}
				/>
			</Container>
		</div>
	);
};

export default SamplePageOne;
