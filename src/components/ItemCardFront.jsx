/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Card, Icon, Image, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ItemCardFront = (props) => {
	const { id, title, description, image } = props.post;

	return (
		<Card key={id}>
			{image === null || image === undefined ? (
				''
			) : (
				// <Image.Group size="small">
				<Image src={image.url} wrapped ui={false} />
				// </Image.Group>
			)}

			<Card.Content textAlign="left">
				<Card.Header>{title}</Card.Header>
				<Card.Description>{description}</Card.Description>
			</Card.Content>
			<Card.Content extra textAlign="left">
				{props.postType === 'manage' ? (
					<div>
						<Link to={`/comments/${id}`}>
							<Icon name="comments" />
						</Link>
						<Link to={`/post-details/${id}`}>
							<Icon name="edit" />
						</Link>
					</div>
				) : (
					<div>
						<Link to={`/comments/${id}`}>
							<Icon name="comments" />
						</Link>
					</div>
				)}
			</Card.Content>
		</Card>
	);
};

export default ItemCardFront;
