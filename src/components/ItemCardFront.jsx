import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import StackGrid from 'react-stack-grid';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ItemCardFront = (props) => {
	const { id, title, description, image } = props.post;

	return (
		<StackGrid columnWidth={200}>
			<Card key={id}>
				<Image src={image.url} wrapped ui={false} />
				<Card.Content>
					<Card.Header>{title}</Card.Header>
					{/* <Card.Meta>
					<span className="date">Joined in 2015</span>
				</Card.Meta> */}
					<Card.Description>{description}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					{props.postType === 'manage' ? (
						<Link to="/item-details?type=manage">
							<Icon name="edit" />
						</Link>
					) : (
						<div>
							<Link to="/">
								<Icon name="like" />
							</Link>
							<Link to="/">
								<Icon name="comments" />
							</Link>
						</div>
					)}
				</Card.Content>
			</Card>
		</StackGrid>
	);
};

export default ItemCardFront;
