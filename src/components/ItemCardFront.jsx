/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Card, Icon, Image, Grid } from 'semantic-ui-react';
import StackGrid from 'react-stack-grid';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const ItemCardFront = (props) => {
	// const dispatch = useDispatch();
	const { id, title, description, image } = props.post;
	console.log(image);

	// useEffect(() => {
	// 	forceUpdate();
	// }, []);

	return (
		// <StackGrid columnWidth={240}>
		// <Grid.Row columns={4}>
		// 	<Grid.Column>
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
				{/* <Card.Meta>
					<span className="date">Joined in 2015</span>
				</Card.Meta> */}
				<Card.Description>{description}</Card.Description>
			</Card.Content>
			<Card.Content extra textAlign="left">
				{props.postType === 'manage' ? (
					<div>
						{/* <Link to="/">
								<Icon name="like" />
							</Link> */}
						<Link to={`/comments/${id}`}>
							<Icon name="comments" />
						</Link>
						<Link to={`/post-details/${id}`}>
							<Icon name="edit" />
						</Link>
					</div>
				) : (
					<div>
						{/* <Link to="/">
								<Icon name="like" />
							</Link> */}
						<Link to={`/comments/${id}`}>
							<Icon name="comments" />
						</Link>
					</div>
				)}
			</Card.Content>
		</Card>
		// 	</Grid.Column>
		// </Grid.Row>
		// {/* </StackGrid> */}
	);
};

export default ItemCardFront;
