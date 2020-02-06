/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Comment, Header, Form, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchComments, postComment } from '../actions';
import CommentCard from './CommentCard';

const CommentContainier = (props) => {
	const dispatch = useDispatch();
	const comments = useSelector((state) => state.comments);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(fetchComments(props.match.params.id));
	}, []);
	console.log(comments);

	const handleSubmit = (e) => {
		console.log(e.target.content.value);
		console.log(props.match.params.id);
		console.log(user.id);

		dispatch(
			postComment(props.match.params.id, user.id, e.target.content.value)
		);
	};

	return (
		// <Grid verticalAlign="middle" textAlign="center">
		// 	<Grid.Column style={{ maxWidth: 850 }}>
		<Comment.Group>
			<Header as="h3" dividing>
				Comments
			</Header>
			{comments ? (
				comments.map((comment) => <CommentCard comment={comment} />)
			) : (
				<div></div>
			)}
			<Form reply onSubmit={handleSubmit}>
				<Form.TextArea name="content" />
				<Button
					content="Add Comment"
					labelPosition="left"
					icon="edit"
					primary
					type="submit"
				/>
			</Form>
		</Comment.Group>
		// 	</Grid.Column>
		// </Grid>
	);
};

export default CommentContainier;
