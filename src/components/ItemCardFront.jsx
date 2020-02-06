import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import StackGrid from 'react-stack-grid';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const ItemCardFront = (props) => {
	const dispatch = useDispatch();
	const { id, title, description, image } = props.post;

	return (
		<StackGrid columnWidth={240}>
			<Card key={id}>
				{image.url === null ? '' : <Image src={image.url} wrapped ui={false} />}

				<Card.Content>
					<Card.Header>{title}</Card.Header>
					{/* <Card.Meta>
					<span className="date">Joined in 2015</span>
				</Card.Meta> */}
					<Card.Description>{description}</Card.Description>
				</Card.Content>
				<Card.Content extra>
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
		</StackGrid>
	);
};

export default ItemCardFront;
