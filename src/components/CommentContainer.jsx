/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Comment, Header, Form, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
	fetchComments,
	postComment,
	postReply,
	reply,
	replyInfo
} from '../actions';
import CommentCard from './CommentCard';

const CommentContainier = (props) => {
	const dispatch = useDispatch();
	const comments = useSelector((state) => state.comments);
	const user = useSelector((state) => state.user);
	const replyData = useSelector((state) => state.reply);
	const replyState = useSelector((state) => state.replyInfo);

	useEffect(() => {
		dispatch(fetchComments(props.match.params.id));
		// resetReply();
	}, []);

	const handleSubmit = (e) => {
		console.log(e.target.content.value);
		console.log(props.match.params.id);
		console.log(user.id);
		e.preventDefault();
		dispatch(
			postComment(props.match.params.id, user.id, e.target.content.value)
		);
		resetReplyState();
		// props.history.push('/manage-my-post');
	};

	const resetReplyState = () => {
		// const data = [];
		dispatch(replyInfo(null));
	};

	const handleSubmitReply = (e) => {
		console.log(e.target.content.value);
		console.log(replyState[0].comment_id);
		console.log(user.id);
		e.preventDefault();
		const data = {
			comment_id: replyState[0].comment_id,
			user_id: user.id,
			content: e.target.content.value
		};
		dispatch(postReply(data));
		resetReplyState();
	};

	console.log(replyData);
	console.log(replyState);

	return (
		// <Grid verticalAlign="middle" textAlign="center">
		// 	<Grid.Column style={{ maxWidth: 850 }}>
		<div>
			<br></br>
			<br></br>
			<br></br>
			<Comment.Group>
				<Header as="h3" dividing>
					Comments
				</Header>
				{comments.length === 0
					? null
					: comments.map((comment) => <CommentCard comment={comment} />)}
				<Form comment onSubmit={handleSubmit}>
					<Form.TextArea name="content" />
					<Button
						content="Add Comment"
						labelPosition="left"
						icon="edit"
						primary
						type="submit"
					/>
				</Form>
				{replyState.length === 0 ? null : (
					<Form reply onSubmit={handleSubmitReply}>
						<Form.TextArea
							name="content"
							defaultValue={`@${replyState[0].username} `}
						/>
						<Button
							content="Add Reply"
							labelPosition="left"
							icon="edit"
							primary
							type="submit"
						/>
					</Form>
				)}
			</Comment.Group>
		</div>

		// 	</Grid.Column>
		// </Grid>
	);
};

export default CommentContainier;
